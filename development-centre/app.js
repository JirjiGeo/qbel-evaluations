const libraryKey = 'qbel-development-library';
const trainingKey = 'qbel-development-training';
const resourceBucket = 'development-resources';
let resources = JSON.parse(localStorage.getItem(libraryKey) || '[]');
let assignments = JSON.parse(localStorage.getItem(trainingKey) || '[]');
let activeResourceCategory = 'Job descriptions';
let selectedQuarter = currentQuarterKey();
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
function cloudClient() { return window.parent?.supabaseClient || window.supabaseClient || null; }
function currentQuarterKey(date = new Date()) { return `${date.getFullYear()}-Q${Math.floor(date.getMonth() / 3) + 1}`; }
function quarterLabel(key) { const [year, quarter] = key.split('-'); return `${quarter} ${year}`; }
function quarterOptions() { const year = new Date().getFullYear(); return [year - 1, year, year + 1].flatMap((item) => [1, 2, 3, 4].map((quarter) => `${item}-Q${quarter}`)); }
function assignmentQuarter(assignment) { return assignment.quarter || currentQuarterKey(new Date(`${assignment.assignedDate}T00:00:00`)); }

function employees() {
  try { return JSON.parse(localStorage.getItem('northstar-employees') || '[]').filter((employee) => !employee.deleted).sort((first, second) => String(first.name || first.full_name || '').localeCompare(String(second.name || second.full_name || ''), undefined, { sensitivity: 'base', numeric: true })); } catch (error) { return []; }
}
function save() { localStorage.setItem(libraryKey, JSON.stringify(resources)); localStorage.setItem(trainingKey, JSON.stringify(assignments)); }
async function loadCloudDevelopmentData() {
  const client = cloudClient();
  if (!client) return;
  const [{ data: cloudResources, error: resourceError }, { data: cloudAssignments, error: assignmentError }] = await Promise.all([
    client.from('development_resources').select('id, title, department, category, file_name, file_type, file_path, recommended, created_at').order('created_at', { ascending: true }),
    client.from('training_assignments').select('*').order('created_at', { ascending: true })
  ]);
  if (resourceError || assignmentError) { notify('Development Centre cloud data could not be loaded.'); return; }
  if (cloudResources?.length) resources = cloudResources.map((resource) => ({ id: resource.id, title: resource.title, department: resource.department, category: resource.category, recommended: resource.recommended, fileName: resource.file_name, fileType: resource.file_type, filePath: resource.file_path, dataUrl: null, createdAt: resource.created_at }));
  else if (resources.length) {
    const migratedResources = [];
    for (const resource of resources) migratedResources.push(await insertCloudResource(resource));
    const resourceIds = new Map(migratedResources.map((resource, index) => [resources[index].id, resource.id]));
    resources = migratedResources;
    assignments = assignments.map((assignment) => ({ ...assignment, resourceId: resourceIds.get(assignment.resourceId) || assignment.resourceId }));
  }
  if (cloudAssignments?.length) assignments = cloudAssignments.map((assignment) => ({ id: assignment.id, employeeId: assignment.employee_id, resourceId: assignment.resource_id, quarter: assignment.quarter || currentQuarterKey(new Date(`${assignment.assigned_date}T00:00:00`)), assignedDate: assignment.assigned_date, scheduledDate: assignment.scheduled_date, scheduledTime: assignment.scheduled_time, dueDate: assignment.due_date, status: assignment.status, completedDate: assignment.completed_date, resultStatus: assignment.result_status || 'Pending', resultSource: assignment.result_source || 'manual', passedDate: assignment.passed_date, trainingValidUntil: assignment.training_valid_until, skillsToDevelop: assignment.skills_to_develop || [] }));
  save(); renderResources(); renderAssignmentOptions(); renderDashboard(); renderEmployeeLearning();
  if ($('#trackerView').classList.contains('active')) renderTracker();
}
async function insertCloudResource(resource) {
  const client = cloudClient();
  if (!client) return resource;
  const file = resource.file || (resource.dataUrl ? await (await fetch(resource.dataUrl)).blob() : null);
  if (!file) throw new Error('The selected file could not be read.');
  const filePath = `${crypto.randomUUID()}/${resource.fileName.replace(/[\\/]/g, '_')}`;
  const { error: uploadError } = await client.storage.from(resourceBucket).upload(filePath, file, { contentType: file.type || 'application/octet-stream' });
  if (uploadError) throw uploadError;
  const { data, error } = await client.from('development_resources').insert({ title: resource.title, department: resource.department, category: resource.category, recommended: resource.recommended, file_name: resource.fileName, file_type: resource.fileType, file_path: filePath, file_data: null }).select('id, title, department, category, recommended, file_name, file_type, file_path, created_at').single();
  if (error) {
    await client.storage.from(resourceBucket).remove([filePath]);
    throw error;
  }
  return { ...resource, id: data.id, filePath: data.file_path, dataUrl: null, file: undefined, createdAt: data.created_at };
}
async function insertCloudAssignment(assignment) { const client = cloudClient(); if (!client) return assignment; const { data, error } = await client.from('training_assignments').insert({ employee_id: assignment.employeeId, resource_id: assignment.resourceId, quarter: assignment.quarter, assigned_date: assignment.assignedDate, scheduled_date: assignment.scheduledDate || null, scheduled_time: assignment.scheduledTime || null, due_date: assignment.dueDate || null, status: assignment.status, completed_date: assignment.completedDate || null, skills_to_develop: assignment.skillsToDevelop || [] }).select().single(); if (error) throw error; return { ...assignment, id: data.id, scheduledDate: data.scheduled_date, scheduledTime: data.scheduled_time, resultStatus: data.result_status || 'Pending', resultSource: data.result_source || 'manual', passedDate: data.passed_date, trainingValidUntil: data.training_valid_until }; }
async function loadResourceFile(resource) {
  if (resource.dataUrl) return resource;
  const client = cloudClient();
  if (!client || resource.id.startsWith('resource-')) throw new Error('Resource file is unavailable.');
  if (resource.filePath) {
    const { data, error } = await client.storage.from(resourceBucket).download(resource.filePath);
    if (error) throw error;
    resource.dataUrl = await readFile(data);
    return resource;
  }
  const { data, error } = await client.from('development_resources').select('file_data').eq('id', resource.id).single();
  if (error || !data?.file_data) throw error || new Error('Resource file is unavailable.');
  resource.dataUrl = data.file_data;
  return resource;
}
function notify(message) { const toast = $('#devToast'); toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2400); }
function renderEmployeeLearning() {
  const activeEmployees = employees();
  const employeeSelect = $('#learningEmployeeSelect');
  if (!activeEmployees.length) {
    $('#learningWelcome').textContent = 'Welcome to your learning page';
    $('#learningRole').textContent = 'Add employees to begin tracking development.';
    return;
  }
  const currentId = employeeSelect.value || activeEmployees[0].id;
  employeeSelect.innerHTML = activeEmployees.map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)}</option>`).join('');
  employeeSelect.value = activeEmployees.some((employee) => employee.id === currentId) ? currentId : activeEmployees[0].id;
  const employee = activeEmployees.find((item) => item.id === employeeSelect.value) || activeEmployees[0];
  const resourceMap = new Map(resources.map((resource) => [resource.id, resource]));
  const employeeAssignments = assignments.filter((assignment) => assignment.employeeId === employee.id);
  const tests = employeeAssignments.filter((assignment) => resourceMap.get(assignment.resourceId)?.category === 'Tests');
  const courseAssignments = employeeAssignments.filter((assignment) => resourceMap.get(assignment.resourceId)?.category !== 'Tests');
  const completedCourses = courseAssignments.filter((assignment) => assignment.status === 'Completed').length;
  const today = new Date().toISOString().slice(0, 10);
  const validCourses = courseAssignments.filter((assignment) => assignment.status === 'Completed' && (!assignment.trainingValidUntil || assignment.trainingValidUntil >= today)).length;
  const expiredCourses = courseAssignments.filter((assignment) => assignment.status === 'Completed' && assignment.trainingValidUntil && assignment.trainingValidUntil < today).length;
  const failedCourses = courseAssignments.filter((assignment) => assignment.resultStatus === 'Failed').length;
  const passedCourses = courseAssignments.filter((assignment) => assignment.resultStatus === 'Passed').length;
  $('#learningWelcome').textContent = `Welcome back, ${employee.name}`;
  $('#learningRole').textContent = employee.role || employee.designation || employee.department || 'Employee';
  const validityScale = Math.max(validCourses, expiredCourses, 1);
  $('#validCourseCount').textContent = validCourses;
  $('#expiredCourseCount').textContent = expiredCourses;
  $('#validCourseBar').style.height = `${Math.max((validCourses / validityScale) * 100, validCourses ? 8 : 0)}%`;
  $('#expiredCourseBar').style.height = `${Math.max((expiredCourses / validityScale) * 100, expiredCourses ? 8 : 0)}%`;
  const certificatesEarned = window.getEmployeeCertificateCount?.(employee.id) || 0;
  const learningMetrics = [['active', '↗', 'Active courses', courseAssignments.filter((assignment) => assignment.status !== 'Completed').length, '#168273'], ['completed', '✓', 'Completed courses', completedCourses, '#3c8655'], ['failed', '!', 'Failed courses', failedCourses, '#bf7150'], ['passed', '◇', 'Passed courses', passedCourses, '#ad8535']];
  $('#learningKpis').innerHTML = learningMetrics.map(([kind, marker, label, value, color]) => `<article class="learning-kpi" data-kpi="${kind}" style="--metric-color:${color}"><div class="learning-kpi-top"><span>${label}</span><span class="learning-kpi-mark" aria-hidden="true">${marker}</span></div><strong>${value}</strong></article>`).join('');
  const roadmapItems = [...employeeAssignments].sort((first, second) => {
    const firstRank = first.status === 'Completed' ? 1 : 0;
    const secondRank = second.status === 'Completed' ? 1 : 0;
    return firstRank - secondRank || `${first.dueDate || '9999-12-31'}`.localeCompare(`${second.dueDate || '9999-12-31'}`);
  });
  $('#learningRoadmap').innerHTML = roadmapItems.length ? roadmapItems.map((assignment, index) => {
    const resource = resourceMap.get(assignment.resourceId);
    const state = assignment.status === 'Completed' ? 'complete' : assignment.resultStatus === 'Failed' ? 'attention' : index === 0 ? 'current' : 'next';
    const certificate = window.hasEmployeeCertificate?.(employee.id, assignment.id) ? '<span class="roadmap-certificate">Certificate earned</span>' : '';
    return `<div class="roadmap-step ${state}"><span class="roadmap-marker">${state === 'complete' ? '&#10003;' : state === 'attention' ? '!' : '&#8594;'}</span><div class="roadmap-step-content"><div class="roadmap-step-heading"><strong>${escapeHtml(resource?.title || 'Deleted resource')}</strong></div>${certificate}</div></div>`;
  }).join('') : '<div class="dashboard-empty"><strong>Your learning journey starts here.</strong><span>No assignments have been made for this employee yet.</span></div>';
  const upcomingCourses = courseAssignments.filter((assignment) => assignment.status !== 'Completed').sort((first, second) => `${first.scheduledDate || first.dueDate || '9999-12-31'}T${first.scheduledTime || '23:59'}`.localeCompare(`${second.scheduledDate || second.dueDate || '9999-12-31'}T${second.scheduledTime || '23:59'}`));
  const nextCourse = upcomingCourses[0];
  $('#nextCourseEmpty').hidden = Boolean(nextCourse);
  $('#nextCourseDetails').hidden = !nextCourse;
  if (nextCourse) {
    const resource = resourceMap.get(nextCourse.resourceId);
    $('#nextCourseTitle').textContent = resource?.title || 'Deleted resource';
    const courseDate = nextCourse.scheduledDate || nextCourse.dueDate;
    $('#nextCourseDateLabel').textContent = nextCourse.scheduledDate ? 'Session date' : 'Due date';
    $('#nextCourseDate').textContent = courseDate ? new Date(`${courseDate}T00:00:00`).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not scheduled';
    $('#nextCourseTimeLabel').textContent = nextCourse.scheduledDate ? 'Start time' : 'Session time';
    $('#nextCourseTime').textContent = nextCourse.scheduledTime ? new Date(`1970-01-01T${nextCourse.scheduledTime}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : 'Not scheduled';
    const skills = nextCourse.skillsToDevelop || nextCourse.skills_to_develop || [];
    $('#nextCourseSkills').textContent = skills.length ? `Skills: ${skills.join(', ')}` : `${resource?.category || 'Course'} · ${nextCourse.status}`;
  }
  const completedCourseAssignments = courseAssignments.filter((assignment) => assignment.status === 'Completed').sort((first, second) => `${first.scheduledDate || first.dueDate || '9999-12-31'}T${first.scheduledTime || '23:59'}`.localeCompare(`${second.scheduledDate || second.dueDate || '9999-12-31'}T${second.scheduledTime || '23:59'}`));
  $('#employeeCourseCount').textContent = `${completedCourseAssignments.length} of ${courseAssignments.length}`;
  $('#assignedLearning').innerHTML = completedCourseAssignments.length ? completedCourseAssignments.map((assignment) => {
    const resource = resourceMap.get(assignment.resourceId);
    const result = assignment.resultStatus || 'Pending';
    const skills = assignment.skillsToDevelop || assignment.skills_to_develop || [];
    const skillLine = skills.length ? `<small class="course-row-skills">Skills: ${skills.map(escapeHtml).join(', ')}</small>` : '';
    const validity = assignment.trainingValidUntil ? `<span>Valid through ${escapeHtml(assignment.trainingValidUntil)}</span>` : '';
    const sessionDate = assignment.scheduledDate ? new Date(`${assignment.scheduledDate}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : null;
    const sessionTime = assignment.scheduledTime ? new Date(`1970-01-01T${assignment.scheduledTime}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : null;
    const session = sessionDate ? `Scheduled ${sessionDate}${sessionTime ? ` · ${sessionTime}` : ' · Time to be confirmed'}` : 'Session to be scheduled';
    const dueDate = assignment.dueDate ? `<small>Due ${escapeHtml(assignment.dueDate)}</small>` : '';
    return `<article class="course-row"><div class="course-row-heading"><div><strong>${escapeHtml(resource?.title || 'Deleted resource')}</strong><small class="course-session">${session}</small>${dueDate}</div><span class="course-status course-status-${assignment.status.toLowerCase().replace(/\s+/g, '-')}" >${escapeHtml(assignment.status)}</span></div><div class="course-row-details"><span>Result: ${escapeHtml(result)}</span>${validity}</div>${skillLine}</article>`;
  }).join('') : '<div class="course-empty">No completed courses yet.</div>';
}
function renderDashboard() {
  const activeEmployees = employees();
  const employeeMap = new Map(activeEmployees.map((employee) => [employee.id, employee]));
  const resourceMap = new Map(resources.map((resource) => [resource.id, resource]));
  const activeLearners = new Set(assignments.filter((assignment) => assignment.status !== 'Completed').map((assignment) => assignment.employeeId));
  const completedCourses = assignments.filter((assignment) => assignment.status === 'Completed' && resourceMap.get(assignment.resourceId)?.category === 'Courses').length;
  const completionRate = assignments.length ? Math.round((assignments.filter((assignment) => assignment.status === 'Completed').length / assignments.length) * 100) : 0;
  const coveredEmployees = new Set(assignments.map((assignment) => assignment.employeeId));
  const directoryCoverage = activeEmployees.length ? Math.round((coveredEmployees.size / activeEmployees.length) * 100) : 0;
  const certificateCount = activeEmployees.reduce((total, employee) => total + (window.getEmployeeCertificateCount?.(employee.id) || 0), 0);
  $('#dashboardKpis').innerHTML = [
    ['Total employees', activeEmployees.length, 'Current directory'],
    ['Active learners', activeLearners.size, 'With open development activity'],
    ['Courses completed', completedCourses, 'Completed course assignments'],
    ['Training completion', `${completionRate}%`, 'Across tracked assignments'],
    ['Exam pass rate', 'Set up', 'Assessment results required'],
    ['Active IDPs', 'Set up', 'Development plans required']
  ].map(([label, value, note]) => `<article class="dashboard-kpi"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join('');
  $('#atlasActiveLearners').textContent = activeLearners.size;
  $('#atlasCompletionRate').textContent = `${completionRate}%`;
  $('#atlasCoverage').textContent = `${directoryCoverage}%`;
  $('#atlasCertificates').textContent = certificateCount;
  const departmentCounts = [...new Set(activeEmployees.map((employee) => employee.department))].sort().map((department) => {
    const departmentIds = new Set(activeEmployees.filter((employee) => employee.department === department).map((employee) => employee.id));
    const departmentAssignments = assignments.filter((assignment) => departmentIds.has(assignment.employeeId));
    const completed = departmentAssignments.filter((assignment) => assignment.status === 'Completed').length;
    return { department, percentage: departmentAssignments.length ? Math.round((completed / departmentAssignments.length) * 100) : 0, completed, total: departmentAssignments.length };
  });
  $('#departmentCompletion').innerHTML = departmentCounts.length ? departmentCounts.map((item) => `<div class="progress-row"><div><strong>${escapeHtml(item.department)}</strong><small>${item.completed}/${item.total} completed</small></div><div class="dashboard-progress"><span style="width:${item.percentage}%"></span></div><b>${item.percentage}%</b></div>`).join('') : '<div class="dashboard-empty"><strong>No department activity yet.</strong><span>Assign a course or training to start measuring completion.</span></div>';
  const upcoming = assignments.filter((assignment) => assignment.status !== 'Completed' && assignment.dueDate).sort((first, second) => first.dueDate.localeCompare(second.dueDate)).slice(0, 5);
  $('#upcomingCourses').innerHTML = upcoming.length ? upcoming.map((assignment) => { const employee = employeeMap.get(assignment.employeeId); const resource = resourceMap.get(assignment.resourceId); return `<div class="upcoming-item"><div><strong>${escapeHtml(resource?.title || 'Deleted resource')}</strong><small>${escapeHtml(employee?.name || 'Unknown employee')}</small></div><time>${escapeHtml(assignment.dueDate)}</time></div>`; }).join('') : '<div class="dashboard-empty"><strong>No upcoming activity.</strong><span>Assignments with due dates will appear here.</span></div>';
}
function openModal(id) { const modal = $(`#${id}`); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
function closeModal(id) { const modal = $(`#${id}`); modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
function fileType(name) { const extension = name.split('.').pop().toUpperCase(); return extension === 'PPTX' ? 'PPT' : extension; }
function readFile(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); }); }
function isPdf(resource) { return resource.fileName.toLowerCase().endsWith('.pdf'); }
function dataUrlToArrayBuffer(dataUrl) {
  const base64 = dataUrl.split(',')[1] || '';
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return bytes.buffer;
}
async function readDocxDocument(dataUrl) {
  const buffer = dataUrlToArrayBuffer(dataUrl);
  const view = new DataView(buffer);
  let endOffset = -1;
  for (let offset = buffer.byteLength - 22; offset >= Math.max(0, buffer.byteLength - 65557); offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) { endOffset = offset; break; }
  }
  if (endOffset < 0) throw new Error('Invalid DOCX archive');
  const entryCount = view.getUint16(endOffset + 10, true);
  const directoryOffset = view.getUint32(endOffset + 16, true);
  let offset = directoryOffset;
  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(offset, true) !== 0x02014b50) break;
    const compression = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localHeaderOffset = view.getUint32(offset + 42, true);
    const name = new TextDecoder().decode(new Uint8Array(buffer, offset + 46, nameLength));
    if (name === 'word/document.xml') {
      const localNameLength = view.getUint16(localHeaderOffset + 26, true);
      const localExtraLength = view.getUint16(localHeaderOffset + 28, true);
      const start = localHeaderOffset + 30 + localNameLength + localExtraLength;
      const compressed = new Uint8Array(buffer, start, compressedSize);
      const xmlBuffer = compression === 0 ? compressed.slice().buffer : await new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer();
      return new TextDecoder().decode(xmlBuffer);
    }
    offset += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error('DOCX document content not found');
}
function docxXmlToHtml(xml) {
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  if (document.querySelector('parsererror')) throw new Error('Unable to read DOCX content');
  return [...document.getElementsByTagNameNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 'p')].map((paragraph) => {
    const text = [...paragraph.getElementsByTagNameNS('http://schemas.openxmlformats.org/wordprocessingml/2006/main', 't')].map((node) => escapeHtml(node.textContent)).join('');
    return text ? `<p>${text}</p>` : '<p>&nbsp;</p>';
  }).join('');
}
async function previewResource(resource) {
  const preview = $('#resourcePreview');
  preview.hidden = false;
  preview.innerHTML = `<div class="preview-loading">Loading document...</div>`;
  try {
    await loadResourceFile(resource);
  } catch (error) {
    closeResourcePreview();
    notify('Resource file could not be loaded from Supabase.');
    return;
  }
  preview.innerHTML = `<div class="resource-preview-header"><div><span class="eyebrow">Document preview</span><strong>${escapeHtml(resource.title)}</strong></div><div class="preview-actions"><a class="preview-download" href="${resource.dataUrl}" download="${escapeHtml(resource.fileName)}">Download</a><button class="row-action" type="button" data-close-preview>Close</button></div></div><div class="preview-loading">Preparing document preview...</div>`;
  if (isPdf(resource)) {
    preview.insertAdjacentHTML('beforeend', `<object class="resource-pdf" data="${resource.dataUrl}" type="application/pdf"><p>PDF preview is unavailable in this browser.</p></object>`);
  } else if (/\.docx$/i.test(resource.fileName)) {
    try {
      const xml = await readDocxDocument(resource.dataUrl);
      preview.querySelector('.preview-loading').outerHTML = `<article class="docx-preview">${docxXmlToHtml(xml) || '<p>This Word document has no readable text.</p>'}</article>`;
    } catch (error) {
      preview.querySelector('.preview-loading').outerHTML = officeFallback(resource);
    }
  } else {
    preview.querySelector('.preview-loading').outerHTML = officeFallback(resource);
  }
  preview.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function officeFallback(resource) { return `<div class="office-preview"><span class="resource-icon">${escapeHtml(resource.fileType)}</span><h3>${escapeHtml(resource.fileName)}</h3><p>This file format cannot be rendered directly in the browser. You can still download the original file.</p><a class="primary-button" href="${resource.dataUrl}" download="${escapeHtml(resource.fileName)}">Download file</a></div>`; }
function closeResourcePreview() { const preview = $('#resourcePreview'); preview.hidden = true; preview.innerHTML = ''; }

function renderResources() {
  const department = $('#libraryDepartment').value;
  const filtered = resources.filter((resource) => (department === 'all' || resource.department === department) && resource.category === activeResourceCategory);
  $('#resourceList').innerHTML = filtered.length ? `<div class="resource-button-list">${filtered.map((resource) => `<article class="resource-card"><div><button class="resource-title-button" data-preview-resource="${resource.id}" type="button"><span class="resource-icon">${escapeHtml(resource.fileType)}</span><span><strong>${escapeHtml(resource.title)}</strong><small>${escapeHtml(resource.fileName)} · ${escapeHtml(resource.department)}</small></span></button></div><button class="row-action" data-delete-resource="${resource.id}" type="button">Delete</button></article>`).join('')}</div>` : `<div class="empty-state">No ${escapeHtml(activeResourceCategory.toLowerCase())} match this department. Add one to begin.</div>`;
}
function renderAssignmentOptions() {
  const employeeOptions = employees().map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)} · ${escapeHtml(employee.department)}</option>`).join('');
  $('#assignmentEmployee').innerHTML = employeeOptions || '<option value="">No employees found</option>';
  const currentProfileEmployee = $('#profileEmployeeSelect')?.value;
  $('#profileEmployeeSelect').innerHTML = employeeOptions || '<option value="">No employees found</option>';
  if (currentProfileEmployee && employees().some((employee) => employee.id === currentProfileEmployee)) $('#profileEmployeeSelect').value = currentProfileEmployee;
  const resourceOptions = resources.filter((resource) => ['Courses', 'Trainings', 'Tests'].includes(resource.category)).map((resource) => `<option value="${escapeHtml(resource.id)}">${escapeHtml(resource.title)} · ${escapeHtml(resource.category)}</option>`).join('');
  $('#assignmentResource').innerHTML = resourceOptions || '<option value="">Add a course, training or test first</option>';
  $('#trackerQuarter').innerHTML = quarterOptions().map((quarter) => `<option value="${quarter}" ${quarter === selectedQuarter ? 'selected' : ''}>${quarterLabel(quarter)}</option>`).join('');
  $('#assignmentQuarter').innerHTML = quarterOptions().map((quarter) => `<option value="${quarter}" ${quarter === selectedQuarter ? 'selected' : ''}>${quarterLabel(quarter)}</option>`).join('');
  const departments = [...new Set(employees().map((employee) => employee.department))].sort();
  $('#trainingDepartmentFilter').innerHTML = '<option value="all">All departments</option>' + departments.map((department) => `<option>${escapeHtml(department)}</option>`).join('');
}
function assignmentIsOverdue(assignment) { return assignment.status !== 'Completed' && assignment.dueDate && assignment.dueDate < new Date().toISOString().slice(0, 10); }
function renderTracker() {
  const employeeMap = new Map(employees().map((employee) => [employee.id, employee]));
  const resourceMap = new Map(resources.map((resource) => [resource.id, resource]));
  const quarterAssignments = assignments.filter((assignment) => assignmentQuarter(assignment) === selectedQuarter);
  const completed = quarterAssignments.filter((assignment) => assignment.status === 'Completed').length;
  const overdue = quarterAssignments.filter(assignmentIsOverdue).length;
  const completionRate = quarterAssignments.length ? Math.round((completed / quarterAssignments.length) * 100) : 0;
  $('#trackerQuarterLabel').textContent = quarterLabel(selectedQuarter);
  $('#trackerSummary').innerHTML = `<div class="summary-card"><span>Quarter assignments</span><strong>${quarterAssignments.length}</strong></div><div class="summary-card"><span>In progress</span><strong>${quarterAssignments.filter((assignment) => assignment.status === 'In progress').length}</strong></div><div class="summary-card"><span>Completed</span><strong>${completed}<small>/${quarterAssignments.length}</small></strong></div><div class="summary-card summary-alert"><span>Overdue</span><strong>${overdue}<small>${completionRate}% complete</small></strong></div>`;
  const recommended = resources.filter((resource) => resource.recommended && ['Courses', 'Trainings', 'Tests'].includes(resource.category));
  $('#recommendedList').innerHTML = recommended.length ? recommended.map((resource) => `<button class="recommended-card" type="button" data-recommended-resource="${escapeHtml(resource.id)}"><strong>${escapeHtml(resource.title)}</strong><small>${escapeHtml(resource.category)} · ${escapeHtml(resource.department)}</small></button>`).join('') : '<p class="learning-empty">Mark courses or tests as recommended in the resource library.</p>';
  const query = $('#trainingSearch').value.toLowerCase().trim();
  const statusFilter = $('#trainingStatusFilter').value;
  const departmentFilter = $('#trainingDepartmentFilter').value;
  const filteredAssignments = quarterAssignments.filter((assignment) => {
    const employee = employeeMap.get(assignment.employeeId) || { name: 'Unknown employee', department: '—' };
    const resource = resourceMap.get(assignment.resourceId) || { title: 'Deleted resource' };
    const matchesQuery = `${employee.name} ${employee.department} ${resource.title}`.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'all' || (statusFilter === 'overdue' ? assignmentIsOverdue(assignment) : assignment.status === statusFilter);
    return matchesQuery && matchesStatus && (departmentFilter === 'all' || employee.department === departmentFilter);
  });
  $('#trainingRows').innerHTML = filteredAssignments.length ? filteredAssignments.map((assignment) => {
    const employee = employeeMap.get(assignment.employeeId) || { name: 'Unknown employee', department: '—' };
    const resource = resourceMap.get(assignment.resourceId) || { title: 'Deleted resource', category: 'Training' };
    const overdueClass = assignmentIsOverdue(assignment) ? ' overdue-row' : '';
    const statusClass = assignment.status.toLowerCase().replace(/\s+/g, '-');
    const resultStatus = assignment.resultStatus || 'Pending';
    const resultDisabled = assignment.status !== 'Completed' || assignment.resultSource === 'assessment';
    const resultTitle = assignment.resultSource === 'assessment' ? 'Set by latest assessment score.' : 'Set after training is completed.';
    return `<tr class="${overdueClass}"><td><strong>${escapeHtml(employee.name)}</strong></td><td>${escapeHtml(employee.department)}</td><td><strong>${escapeHtml(resource.title)}</strong><small class="resource-type">${escapeHtml(resource.category)}</small></td><td>${escapeHtml(assignment.assignedDate)}</td><td>${escapeHtml(assignment.dueDate || 'No due date')}</td><td><select class="status status-${statusClass}" data-status-assignment="${assignment.id}"><option ${assignment.status === 'Assigned' ? 'selected' : ''}>Assigned</option><option ${assignment.status === 'In progress' ? 'selected' : ''}>In progress</option><option ${assignment.status === 'Completed' ? 'selected' : ''}>Completed</option></select>${assignmentIsOverdue(assignment) ? '<small class="overdue-label">Overdue</small>' : ''}</td><td><select class="status result-${resultStatus.toLowerCase()}" data-result-assignment="${assignment.id}" title="${resultTitle}" ${resultDisabled ? 'disabled' : ''}><option value="Pending" ${resultStatus === 'Pending' ? 'selected' : ''}>Pending</option><option value="Passed" ${resultStatus === 'Passed' ? 'selected' : ''}>Passed</option><option value="Failed" ${resultStatus === 'Failed' ? 'selected' : ''}>Failed</option></select></td><td>${escapeHtml(assignment.trainingValidUntil || 'Not issued')}</td><td><button class="row-action" data-delete-assignment="${assignment.id}" type="button">Delete</button></td></tr>`;
  }).join('') : '<tr><td colspan="9" class="empty-state">No matching assignments for this quarter.</td></tr>';
  renderLearningProfile();
}
function learningItem(assignment, resourceMap) { const resource = resourceMap.get(assignment.resourceId); return `<article class="learning-item"><strong>${escapeHtml(resource?.title || 'Deleted resource')}</strong><small>${escapeHtml(assignment.dueDate || assignment.assignedDate)}${assignment.status === 'Completed' ? ' · Completed' : ''}</small></article>`; }
function renderLearningProfile() {
  const employeeId = $('#profileEmployeeSelect')?.value;
  const resourceMap = new Map(resources.map((resource) => [resource.id, resource]));
  const employeeAssignments = assignments.filter((assignment) => assignment.employeeId === employeeId);
  const attended = employeeAssignments.filter((assignment) => assignment.status === 'Completed');
  const upcoming = employeeAssignments.filter((assignment) => assignment.status !== 'Completed');
  const courses = attended.filter((assignment) => resourceMap.get(assignment.resourceId)?.category === 'Courses');
  const renderList = (items) => items.length ? items.map((item) => learningItem(item, resourceMap)).join('') : '<p class="learning-empty">No records yet.</p>';
  $('#attendedTrainings').innerHTML = renderList(attended);
  $('#upcomingTrainings').innerHTML = renderList(upcoming);
  $('#coursesTaken').innerHTML = renderList(courses);
}
function switchView(view) { document.querySelectorAll('.section-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.view === view)); $('#dashboardView').classList.toggle('active', view === 'dashboard'); $('#learningView').classList.toggle('active', view === 'learning'); $('#libraryView').classList.toggle('active', view === 'library'); $('#trackerView').classList.toggle('active', view === 'tracker'); $('#modulesView').classList.toggle('active', view === 'modules'); if (view === 'dashboard') renderDashboard(); if (view === 'learning') renderEmployeeLearning(); if (view === 'tracker') { renderAssignmentOptions(); renderTracker(); } if (view === 'modules') window.renderDevelopmentModules?.(); }

document.querySelectorAll('.section-tab').forEach((tab) => tab.addEventListener('click', () => switchView(tab.dataset.view)));
document.querySelectorAll('[data-learning-action]').forEach((button) => button.addEventListener('click', () => { const action = button.dataset.learningAction; if (['library', 'tracker'].includes(action)) switchView(action); else if (window.openDevelopmentModule) window.openDevelopmentModule(action); else notify(`${button.textContent.trim()} is not available yet.`); }));
document.querySelectorAll('.resource-tabs .resource-tab').forEach((tab) => tab.addEventListener('click', () => { activeResourceCategory = tab.dataset.resourceCategory; document.querySelectorAll('.resource-tabs .resource-tab').forEach((item) => item.classList.toggle('active', item === tab)); closeResourcePreview(); renderResources(); }));
$('#openResourceForm').addEventListener('click', () => openModal('resourceModal'));
$('#openAssignmentForm').addEventListener('click', () => { renderAssignmentOptions(); openModal('assignmentModal'); });
$('#dashboardAssignButton').addEventListener('click', () => { renderAssignmentOptions(); openModal('assignmentModal'); });
$('#recommendedList').addEventListener('click', (event) => { const button = event.target.closest('[data-recommended-resource]'); if (!button) return; renderAssignmentOptions(); $('#assignmentResource').value = button.dataset.recommendedResource; openModal('assignmentModal'); });
$('#learningEmployeeSelect').addEventListener('change', renderEmployeeLearning);
$('#profileEmployeeSelect').addEventListener('change', renderLearningProfile);
document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => closeModal(button.dataset.close)));
$('#libraryDepartment').addEventListener('change', renderResources);
$('#trackerQuarter').addEventListener('change', (event) => { selectedQuarter = event.target.value; renderTracker(); });
$('#devCentreSignOutButton')?.addEventListener('click', async () => {
  const parentAuth = window.parent?.Auth;
  if (parentAuth) {
    await parentAuth.logout();
    window.parent.location.reload();
  } else {
    window.location.href = '../index.html';
  }
});
$('#trainingSearch').addEventListener('input', renderTracker);
$('#trainingStatusFilter').addEventListener('change', renderTracker);
$('#trainingDepartmentFilter').addEventListener('change', renderTracker);
$('#resourceForm').addEventListener('submit', async (event) => { event.preventDefault(); const file = $('#resourceFile').files[0]; if (!file) return; const allowed = /\.(pdf|doc|docx|ppt|pptx)$/i.test(file.name); if (!allowed) { notify('Please upload a PDF, Word or PowerPoint file.'); return; } const resource = { id: `resource-${Date.now()}`, title: $('#resourceTitle').value.trim(), department: $('#resourceDepartment').value, category: $('#resourceCategory').value, recommended: $('#resourceRecommended').checked, fileName: file.name, fileType: fileType(file.name), file, dataUrl: await readFile(file), createdAt: new Date().toISOString() }; try { resources.unshift(await insertCloudResource(resource)); save(); renderResources(); renderAssignmentOptions(); closeModal('resourceModal'); event.target.reset(); notify('Resource added successfully.'); } catch (error) { console.error('Resource upload failed:', error); notify(`Upload failed: ${error.message || 'Supabase rejected the request.'}`); } });
$('#assignmentForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const selectedEmployees = Array.from($('#assignmentEmployee').selectedOptions).map((option) => option.value).filter(Boolean);
  const resourceId = $('#assignmentResource').value;
  if (!selectedEmployees.length || !resourceId) { notify('Please select at least one employee and a course or test.'); return; }
  const skillsToDevelop = [...new Set($('#assignmentSkills').value.split(/[\n,]/).map((skill) => skill.trim()).filter(Boolean))];
  const scheduledDate = $('#assignmentScheduledDate').value;
  const scheduledTime = $('#assignmentScheduledTime').value;
  const assignmentsToCreate = selectedEmployees.map((employeeId) => ({ id: `training-${Date.now()}-${employeeId}`, employeeId, resourceId, quarter: $('#assignmentQuarter').value, assignedDate: new Date().toISOString().slice(0, 10), scheduledDate, scheduledTime, dueDate: $('#assignmentDue').value, status: $('#assignmentStatus').value, skillsToDevelop }));
  try {
    const createdAssignments = await Promise.all(assignmentsToCreate.map((assignment) => insertCloudAssignment(assignment)));
    assignments.unshift(...createdAssignments);
    save();
    renderTracker();
    renderEmployeeLearning();
    window.dispatchEvent(new Event('development-modules-refresh'));
    closeModal('assignmentModal');
    event.target.reset();
    notify(selectedEmployees.length > 1 ? 'Development activity and skill goals assigned.' : 'Development activity and skill goals assigned.');
  } catch (error) {
    console.error('Training assignment failed:', error);
    notify(`Development activity could not be saved: ${error.message || 'Supabase rejected the request.'}`);
  }
});
document.addEventListener('click', async (event) => { const previewButton = event.target.closest('[data-preview-resource]'); if (previewButton) { const resource = resources.find((item) => item.id === previewButton.dataset.previewResource); if (resource) previewResource(resource); } const closePreviewButton = event.target.closest('[data-close-preview]'); if (closePreviewButton) closeResourcePreview(); const resourceButton = event.target.closest('[data-delete-resource]'); if (resourceButton) { const client = cloudClient(); const resourceId = resourceButton.dataset.deleteResource; const resource = resources.find((item) => item.id === resourceId); if (client && !resourceId.startsWith('resource-')) { if (resource?.filePath) { const { error } = await client.storage.from(resourceBucket).remove([resource.filePath]); if (error) { console.error('Resource file deletion failed:', error); notify(`Delete failed: ${error.message}`); return; } } const { error } = await client.from('development_resources').delete().eq('id', resourceId); if (error) { console.error('Resource deletion failed:', error); notify(`Delete failed: ${error.message}`); return; } } resources = resources.filter((item) => item.id !== resourceId); save(); renderResources(); renderAssignmentOptions(); closeResourcePreview(); notify('Resource deleted.'); } const assignmentButton = event.target.closest('[data-delete-assignment]'); if (assignmentButton) { const client = cloudClient(); if (client && !assignmentButton.dataset.deleteAssignment.startsWith('training-')) await client.from('training_assignments').delete().eq('id', assignmentButton.dataset.deleteAssignment); assignments = assignments.filter((assignment) => assignment.id !== assignmentButton.dataset.deleteAssignment); save(); renderTracker(); notify('Assignment deleted.'); } });
document.addEventListener('change', async (event) => {
  const status = event.target.closest('[data-status-assignment]');
  if (!status) return;
  const assignment = assignments.find((item) => item.id === status.dataset.statusAssignment);
  if (!assignment) return;
  const previousStatus = assignment.status;
  const nextStatus = status.value;
  const resource = resources.find((item) => item.id === assignment.resourceId);
  const issuesCertificate = nextStatus === 'Completed' && ['Courses', 'Trainings'].includes(resource?.category);
  const client = cloudClient();
  if (issuesCertificate && (!client || assignment.id.startsWith('training-'))) {
    status.value = previousStatus;
    notify('Sign in to Supabase before completing a course so its certificate can be issued.');
    return;
  }
  try {
    if (client && !assignment.id.startsWith('training-')) {
      const completedDate = nextStatus === 'Completed' ? new Date().toISOString().slice(0, 10) : null;
      const { error } = await client.from('training_assignments').update({ status: nextStatus, completed_date: completedDate }).eq('id', assignment.id);
      if (error) throw error;
    }
    assignment.status = nextStatus;
    assignment.completedDate = nextStatus === 'Completed' ? new Date().toISOString().slice(0, 10) : null;
    save();
    renderTracker();
    window.dispatchEvent(new Event('development-modules-refresh'));
    if (issuesCertificate && assignment.resultStatus === 'Passed') notify('Course completed. Its one-year certificate is available in the Certificates section.');
    else if (issuesCertificate) notify('Course completed. Mark it Passed to issue a one-year completion certificate.');
    else notify('Training status updated.');
  } catch (error) {
    status.value = previousStatus;
    console.error('Training status update failed:', error);
    notify(`Training status update failed: ${error.message}`);
  }
});
document.addEventListener('change', async (event) => {
  const result = event.target.closest('[data-result-assignment]');
  if (!result) return;
  const assignment = assignments.find((item) => item.id === result.dataset.resultAssignment);
  if (!assignment) return;
  const previousResult = assignment.resultStatus || 'Pending';
  if (assignment.status !== 'Completed') {
    result.value = previousResult;
    notify('Mark the training Completed before recording an outcome.');
    return;
  }
  if (assignment.resultSource === 'assessment') {
    result.value = previousResult;
    notify('This result is set by the latest assessment score.');
    return;
  }
  const client = cloudClient();
  if (!client || assignment.id.startsWith('training-')) {
    result.value = previousResult;
    notify('Sign in to Supabase before recording training outcomes.');
    return;
  }
  const passedDate = result.value === 'Passed' ? new Date().toISOString().slice(0, 10) : null;
  const { data, error } = await client.from('training_assignments').update({ result_status: result.value, result_source: 'manual', passed_date: passedDate }).eq('id', assignment.id).select('result_status, result_source, passed_date, training_valid_until').single();
  if (error) {
    result.value = previousResult;
    console.error('Training outcome update failed:', error);
    notify(`Training outcome could not be saved: ${error.message}`);
    return;
  }
  assignment.resultStatus = data.result_status;
  assignment.resultSource = data.result_source;
  assignment.passedDate = data.passed_date;
  assignment.trainingValidUntil = data.training_valid_until;
  save();
  renderTracker();
  window.dispatchEvent(new Event('development-modules-refresh'));
  notify(data.result_status === 'Passed' ? `Training passed. Valid through ${data.training_valid_until}.` : `Training outcome recorded: ${data.result_status}.`);
});
window.addEventListener('development-modules-refresh', () => { void loadCloudDevelopmentData(); });
renderResources();
renderDashboard();
renderEmployeeLearning();
void loadCloudDevelopmentData();
