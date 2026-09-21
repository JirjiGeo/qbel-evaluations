const libraryKey = 'qbel-development-library';
const trainingKey = 'qbel-development-training';
let resources = JSON.parse(localStorage.getItem(libraryKey) || '[]');
let assignments = JSON.parse(localStorage.getItem(trainingKey) || '[]');
const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
function cloudClient() { return window.parent?.supabaseClient || window.supabaseClient || null; }

function employees() {
  try { return JSON.parse(localStorage.getItem('northstar-employees') || '[]').filter((employee) => !employee.deleted); } catch (error) { return []; }
}
function save() { localStorage.setItem(libraryKey, JSON.stringify(resources)); localStorage.setItem(trainingKey, JSON.stringify(assignments)); }
async function loadCloudDevelopmentData() {
  const client = cloudClient();
  if (!client) return;
  const [{ data: cloudResources, error: resourceError }, { data: cloudAssignments, error: assignmentError }] = await Promise.all([
    client.from('development_resources').select('id, title, department, category, file_name, file_type, created_at').order('created_at', { ascending: true }),
    client.from('training_assignments').select('*').order('created_at', { ascending: true })
  ]);
  if (resourceError || assignmentError) { notify('Development Centre cloud data could not be loaded.'); return; }
  if (cloudResources?.length) resources = cloudResources.map((resource) => ({ id: resource.id, title: resource.title, department: resource.department, category: resource.category, fileName: resource.file_name, fileType: resource.file_type, dataUrl: null, createdAt: resource.created_at }));
  else if (resources.length) {
    const migratedResources = [];
    for (const resource of resources) migratedResources.push(await insertCloudResource(resource));
    const resourceIds = new Map(migratedResources.map((resource, index) => [resources[index].id, resource.id]));
    resources = migratedResources;
    assignments = assignments.map((assignment) => ({ ...assignment, resourceId: resourceIds.get(assignment.resourceId) || assignment.resourceId }));
  }
  if (cloudAssignments?.length) assignments = cloudAssignments.map((assignment) => ({ id: assignment.id, employeeId: assignment.employee_id, resourceId: assignment.resource_id, assignedDate: assignment.assigned_date, dueDate: assignment.due_date, status: assignment.status, completedDate: assignment.completed_date }));
  save(); renderResources(); renderAssignmentOptions();
  if ($('#trackerView').classList.contains('active')) renderTracker();
}
async function insertCloudResource(resource) { const client = cloudClient(); if (!client) return resource; const { data, error } = await client.from('development_resources').insert({ title: resource.title, department: resource.department, category: resource.category, file_name: resource.fileName, file_type: resource.fileType, file_data: resource.dataUrl }).select('id, title, department, category, file_name, file_type, created_at').single(); if (error) throw error; return { ...resource, id: data.id, createdAt: data.created_at }; }
async function insertCloudAssignment(assignment) { const client = cloudClient(); if (!client) return assignment; const { data, error } = await client.from('training_assignments').insert({ employee_id: assignment.employeeId, resource_id: assignment.resourceId, assigned_date: assignment.assignedDate, due_date: assignment.dueDate || null, status: assignment.status, completed_date: assignment.completedDate || null }).select().single(); if (error) throw error; return { ...assignment, id: data.id }; }
async function loadResourceFile(resource) {
  if (resource.dataUrl) return resource;
  const client = cloudClient();
  if (!client || resource.id.startsWith('resource-')) throw new Error('Resource file is unavailable.');
  const { data, error } = await client.from('development_resources').select('file_data').eq('id', resource.id).single();
  if (error || !data?.file_data) throw error || new Error('Resource file is unavailable.');
  resource.dataUrl = data.file_data;
  return resource;
}
function notify(message) { const toast = $('#devToast'); toast.textContent = message; toast.classList.add('show'); window.setTimeout(() => toast.classList.remove('show'), 2400); }
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
  const category = $('#libraryCategory').value;
  const filtered = resources.filter((resource) => (department === 'all' || resource.department === department) && (category === 'all' || resource.category === category));
  $('#resourceList').innerHTML = filtered.length ? filtered.map((resource) => `<article class="resource-card"><span class="resource-icon">${escapeHtml(resource.fileType)}</span><div><h3>${escapeHtml(resource.title)}</h3><p>${escapeHtml(resource.fileName)}</p><div class="resource-meta"><span class="resource-tag">${escapeHtml(resource.department)}</span><span class="resource-tag">${escapeHtml(resource.category)}</span></div></div><div><button class="row-action" data-preview-resource="${resource.id}" type="button">View</button><button class="row-action" data-delete-resource="${resource.id}" type="button">Delete</button></div></article>`).join('') : '<div class="empty-state">No resources match these filters. Add a job description, process, policy or course to begin.</div>';
}
function renderAssignmentOptions() {
  const employeeOptions = employees().map((employee) => `<option value="${escapeHtml(employee.id)}">${escapeHtml(employee.name)} · ${escapeHtml(employee.department)}</option>`).join('');
  $('#assignmentEmployee').innerHTML = employeeOptions || '<option value="">No employees found</option>';
  const currentProfileEmployee = $('#profileEmployeeSelect')?.value;
  $('#profileEmployeeSelect').innerHTML = employeeOptions || '<option value="">No employees found</option>';
  if (currentProfileEmployee && employees().some((employee) => employee.id === currentProfileEmployee)) $('#profileEmployeeSelect').value = currentProfileEmployee;
  const resourceOptions = resources.filter((resource) => resource.category === 'Courses').map((resource) => `<option value="${escapeHtml(resource.id)}">${escapeHtml(resource.title)} · ${escapeHtml(resource.department)}</option>`).join('');
  $('#assignmentResource').innerHTML = resourceOptions || '<option value="">Add a course resource first</option>';
}
function renderTracker() {
  const employeeMap = new Map(employees().map((employee) => [employee.id, employee]));
  const resourceMap = new Map(resources.map((resource) => [resource.id, resource]));
  const completed = assignments.filter((assignment) => assignment.status === 'Completed').length;
  $('#trackerSummary').innerHTML = `<div class="summary-card"><span>Total assignments</span><strong>${assignments.length}</strong></div><div class="summary-card"><span>In progress</span><strong>${assignments.filter((assignment) => assignment.status === 'In progress').length}</strong></div><div class="summary-card"><span>Completed</span><strong>${completed}</strong></div>`;
  $('#trainingRows').innerHTML = assignments.length ? assignments.map((assignment) => { const employee = employeeMap.get(assignment.employeeId) || { name: 'Unknown employee', department: '—' }; const resource = resourceMap.get(assignment.resourceId) || { title: 'Deleted resource' }; const statusClass = assignment.status.toLowerCase().replace(/\s+/g, '-'); return `<tr><td><strong>${escapeHtml(employee.name)}</strong></td><td>${escapeHtml(employee.department)}</td><td>${escapeHtml(resource.title)}</td><td>${escapeHtml(assignment.assignedDate)}</td><td>${escapeHtml(assignment.dueDate)}</td><td><select class="status status-${statusClass}" data-status-assignment="${assignment.id}"><option ${assignment.status === 'Assigned' ? 'selected' : ''}>Assigned</option><option ${assignment.status === 'In progress' ? 'selected' : ''}>In progress</option><option ${assignment.status === 'Completed' ? 'selected' : ''}>Completed</option></select></td><td><button class="row-action" data-delete-assignment="${assignment.id}" type="button">Delete</button></td></tr>`; }).join('') : '<tr><td colspan="7" class="empty-state">No training assignments yet.</td></tr>';
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
function switchView(view) { document.querySelectorAll('.section-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.view === view)); $('#libraryView').classList.toggle('active', view === 'library'); $('#trackerView').classList.toggle('active', view === 'tracker'); if (view === 'tracker') { renderAssignmentOptions(); renderTracker(); } }

document.querySelectorAll('.section-tab').forEach((tab) => tab.addEventListener('click', () => switchView(tab.dataset.view)));
$('#openResourceForm').addEventListener('click', () => openModal('resourceModal'));
$('#openAssignmentForm').addEventListener('click', () => { renderAssignmentOptions(); openModal('assignmentModal'); });
$('#profileEmployeeSelect').addEventListener('change', renderLearningProfile);
document.querySelectorAll('[data-close]').forEach((button) => button.addEventListener('click', () => closeModal(button.dataset.close)));
$('#libraryDepartment').addEventListener('change', renderResources);
$('#libraryCategory').addEventListener('change', renderResources);
$('#resourceForm').addEventListener('submit', async (event) => { event.preventDefault(); const file = $('#resourceFile').files[0]; if (!file) return; const allowed = /\.(pdf|doc|docx|ppt|pptx)$/i.test(file.name); if (!allowed) { notify('Please upload a PDF, Word or PowerPoint file.'); return; } const resource = { id: `resource-${Date.now()}`, title: $('#resourceTitle').value.trim(), department: $('#resourceDepartment').value, category: $('#resourceCategory').value, fileName: file.name, fileType: fileType(file.name), dataUrl: await readFile(file), createdAt: new Date().toISOString() }; try { resources.unshift(await insertCloudResource(resource)); save(); renderResources(); renderAssignmentOptions(); closeModal('resourceModal'); event.target.reset(); notify('Resource added successfully.'); } catch (error) { notify('Resource could not be saved to Supabase.'); } });
$('#assignmentForm').addEventListener('submit', async (event) => { event.preventDefault(); const selectedEmployees = Array.from($('#assignmentEmployee').selectedOptions).map((option) => option.value).filter(Boolean); const resourceId = $('#assignmentResource').value; if (!selectedEmployees.length || !resourceId) { notify('Please select at least one employee and a course.'); return; } const assignmentsToCreate = selectedEmployees.map((employeeId) => ({ id: `training-${Date.now()}-${employeeId}`, employeeId, resourceId, assignedDate: new Date().toISOString().slice(0, 10), dueDate: $('#assignmentDue').value, status: $('#assignmentStatus').value })); try { const createdAssignments = await Promise.all(assignmentsToCreate.map((assignment) => insertCloudAssignment(assignment))); assignments.unshift(...createdAssignments); save(); renderTracker(); closeModal('assignmentModal'); event.target.reset(); notify(selectedEmployees.length > 1 ? 'Training assigned to selected employees.' : 'Training assigned successfully.'); } catch (error) { notify('Training could not be saved to Supabase.'); } });
document.addEventListener('click', async (event) => { const previewButton = event.target.closest('[data-preview-resource]'); if (previewButton) { const resource = resources.find((item) => item.id === previewButton.dataset.previewResource); if (resource) previewResource(resource); } const closePreviewButton = event.target.closest('[data-close-preview]'); if (closePreviewButton) closeResourcePreview(); const resourceButton = event.target.closest('[data-delete-resource]'); if (resourceButton) { const client = cloudClient(); if (client && !resourceButton.dataset.deleteResource.startsWith('resource-')) await client.from('development_resources').delete().eq('id', resourceButton.dataset.deleteResource); resources = resources.filter((resource) => resource.id !== resourceButton.dataset.deleteResource); save(); renderResources(); renderAssignmentOptions(); closeResourcePreview(); notify('Resource deleted.'); } const assignmentButton = event.target.closest('[data-delete-assignment]'); if (assignmentButton) { const client = cloudClient(); if (client && !assignmentButton.dataset.deleteAssignment.startsWith('training-')) await client.from('training_assignments').delete().eq('id', assignmentButton.dataset.deleteAssignment); assignments = assignments.filter((assignment) => assignment.id !== assignmentButton.dataset.deleteAssignment); save(); renderTracker(); notify('Assignment deleted.'); } });
document.addEventListener('change', async (event) => { const status = event.target.closest('[data-status-assignment]'); if (!status) return; const assignment = assignments.find((item) => item.id === status.dataset.statusAssignment); if (assignment) { assignment.status = status.value; const client = cloudClient(); if (client && !assignment.id.startsWith('training-')) await client.from('training_assignments').update({ status: assignment.status, completed_date: assignment.status === 'Completed' ? new Date().toISOString().slice(0, 10) : null }).eq('id', assignment.id); save(); renderTracker(); notify('Training status updated.'); } });
renderResources();
void loadCloudDevelopmentData();
