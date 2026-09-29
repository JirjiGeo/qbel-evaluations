const moduleClient = () => window.parent?.supabaseClient || window.supabaseClient || null;
const moduleBucket = 'development-certificates';
const moduleTables = {
  plans: 'development_plans',
  skills: 'development_skills',
  certificates: 'employee_certifications',
  assessments: 'training_assessment_results',
  impact: 'training_impact_records'
};
const moduleRows = { plans: [], skills: [], certificates: [], assessments: [], impact: [] };
let moduleAssignments = [];
let moduleResources = [];
let moduleReturnFocus = null;
let moduleSessionUserId = null;
let moduleLoadedUserId = null;
let moduleLoadingUserId = null;
const module$ = (selector) => document.querySelector(selector);
const moduleEscape = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

function moduleNotify(message) {
  const toast = module$('#devToast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 5000);
}

function moduleEmployees() {
  try { return JSON.parse(localStorage.getItem('northstar-employees') || '[]').filter((employee) => !employee.deleted); } catch (error) { return []; }
}

function moduleEmployeeName(id) {
  const employee = moduleEmployees().find((item) => item.id === id);
  return employee?.name || employee?.full_name || 'Unknown employee';
}

function moduleDate(value) {
  if (!value) return 'No date';
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function moduleSelectOptions(items, label) {
  return `<option value="">Select ${label}</option>${items.map((item) => `<option value="${moduleEscape(item.value)}">${moduleEscape(item.label)}</option>`).join('')}`;
}

function moduleEmployeeOptions() {
  return moduleSelectOptions(moduleEmployees().map((employee) => ({ value: employee.id, label: `${employee.name || employee.full_name} · ${employee.department || 'No department'}` })), 'employee');
}

function moduleAssignmentOptions(category) {
  const resourcesById = new Map(moduleResources.map((resource) => [resource.id, resource]));
  const assignments = category ? moduleAssignments.filter((assignment) => resourcesById.get(assignment.resource_id)?.category === category) : moduleAssignments;
  return moduleSelectOptions(assignments.map((assignment) => ({
    value: assignment.id,
    label: `${moduleEmployeeName(assignment.employee_id)} · ${resourcesById.get(assignment.resource_id)?.title || 'Learning activity'} · ${moduleDate(assignment.assigned_date)}`
  })), category ? 'assigned test' : 'training assignment');
}

function moduleAssignmentLabel(id) {
  const assignment = moduleAssignments.find((item) => item.id === id);
  const resource = moduleResources.find((item) => item.id === assignment?.resource_id);
  return assignment ? `${moduleEmployeeName(assignment.employee_id)} · ${resource?.title || 'Learning activity'}` : 'Training assignment';
}

async function loadDevelopmentModules(userId) {
  const client = moduleClient();
  if (!client || !userId || moduleSessionUserId !== userId) return false;
  const tableQueries = Object.entries(moduleTables).map(([key, table]) => client.from(table).select('*').order('created_at', { ascending: false }));
  const [tableResults, assignmentResult, resourceResult] = await Promise.all([
    Promise.all(tableQueries),
    client.from('training_assignments').select('id, employee_id, resource_id, assigned_date, status').order('assigned_date', { ascending: false }),
    client.from('development_resources').select('id, title, category')
  ]);
  const failedResult = tableResults.find((result) => result.error) || assignmentResult.error && assignmentResult || resourceResult.error && resourceResult;
  if (failedResult?.error) {
    console.error('Development modules could not be loaded:', failedResult.error);
    moduleNotify(`Development modules could not load: ${failedResult.error.message}`);
    return false;
  }
  if (moduleSessionUserId !== userId) return false;
  Object.keys(moduleTables).forEach((key, index) => { moduleRows[key] = tableResults[index].data || []; });
  moduleAssignments = assignmentResult.data || [];
  moduleResources = resourceResult.data || [];
  renderDevelopmentModules();
  return true;
}

async function loadDevelopmentModulesForSession(session) {
  const userId = session?.user?.id;
  if (!userId || moduleLoadedUserId === userId || moduleLoadingUserId === userId) return;
  if (moduleSessionUserId !== userId) {
    moduleRows.plans = [];
    moduleRows.skills = [];
    moduleRows.certificates = [];
    moduleRows.assessments = [];
    moduleRows.impact = [];
    moduleAssignments = [];
    moduleResources = [];
    moduleSessionUserId = userId;
  }
  moduleLoadingUserId = userId;
  const loaded = await loadDevelopmentModules(userId);
  if (moduleSessionUserId === userId && loaded) moduleLoadedUserId = userId;
  if (moduleLoadingUserId === userId) moduleLoadingUserId = null;
}

function initializeDevelopmentModuleAuth() {
  const client = moduleClient();
  if (!client?.auth) {
    window.setTimeout(initializeDevelopmentModuleAuth, 150);
    return;
  }
  client.auth.onAuthStateChange((event, session) => {
    if (!session) {
      if (event === 'SIGNED_OUT') {
        moduleSessionUserId = null;
        moduleLoadedUserId = null;
        moduleLoadingUserId = null;
        Object.keys(moduleRows).forEach((key) => { moduleRows[key] = []; });
        moduleAssignments = [];
        moduleResources = [];
        renderDevelopmentModules();
      }
      return;
    }
    void loadDevelopmentModulesForSession(session);
  });
  client.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Supabase session could not be checked:', error);
      return;
    }
    if (data?.session) void loadDevelopmentModulesForSession(data.session);
  }).catch((error) => console.error('Supabase session could not be checked:', error));
}

function moduleStatus(value) {
  const status = String(value || 'Planned');
  return `<span class="module-badge${status === 'Expired' || status === 'Overdue' ? ' alert' : ''}">${moduleEscape(status)}</span>`;
}

function moduleRecordMarkup(kind, record) {
  const linkedAssignment = ['assessments', 'impact'].includes(kind) ? moduleAssignments.find((item) => item.id === record.assignment_id) : null;
  const employee = moduleEmployeeName(linkedAssignment?.employee_id || record.employee_id);
  let title = '';
  let details = '';
  if (kind === 'plans') {
    title = record.goal;
    details = `${moduleEscape(record.action_plan)} · Due ${moduleDate(record.due_date)} · ${moduleStatus(record.status)}`;
  } else if (kind === 'skills') {
    const gap = Math.max(0, record.target_level - record.current_level);
    title = record.competency;
    details = `Current ${record.current_level}/5 · Target ${record.target_level}/5 · Gap ${gap} · Assessed ${moduleDate(record.assessed_on)}`;
  } else if (kind === 'certificates') {
    title = record.certificate_name;
    const days = record.expires_on ? Math.ceil((new Date(`${record.expires_on}T00:00:00`) - new Date(new Date().toDateString())) / 86400000) : null;
    const status = days === null ? 'No expiry' : days < 0 ? 'Expired' : days <= 30 ? 'Expiring soon' : 'Current';
    details = `${moduleEscape(record.issuer || 'Issuer not recorded')} · Issued ${moduleDate(record.issued_on)} · Expires ${moduleDate(record.expires_on)} · ${moduleStatus(status)}`;
    if (record.file_name) details += ` · ${moduleEscape(record.file_name)}`;
  } else if (kind === 'assessments') {
    title = moduleAssignmentLabel(record.assignment_id);
    details = `Attempt ${moduleDate(record.attempted_on)} · Score ${record.score}% · Pass mark ${record.pass_mark}% · ${moduleStatus(record.passed ? 'Passed' : 'Not passed')}`;
    if (record.notes) details += ` · ${moduleEscape(record.notes)}`;
  } else {
    title = moduleAssignmentLabel(record.assignment_id);
    const difference = Number(record.after_value) - Number(record.before_value);
    const sign = difference > 0 ? '+' : '';
    details = `${moduleEscape(record.measure)} · ${record.before_value} → ${record.after_value} (${sign}${difference}) · Measured ${moduleDate(record.measured_on)}`;
    if (record.notes) details += ` · ${moduleEscape(record.notes)}`;
  }
  const certificateAction = kind === 'certificates' && record.training_assignment_id
    ? `<button class="row-action" type="button" data-print-certificate="${moduleEscape(record.id)}">Print / Save PDF</button>`
    : kind === 'certificates' && record.file_path
      ? `<button class="row-action" type="button" data-download-certificate="${moduleEscape(record.id)}">Download</button>`
      : '';
  return `<article class="module-record"><div class="module-record-content"><strong>${moduleEscape(title)}</strong><small>${moduleEscape(employee)}</small><div class="module-record-meta">${details}</div></div><div class="module-record-actions">${certificateAction}<button class="row-action" type="button" data-delete-module="${kind}" data-record-id="${moduleEscape(record.id)}" aria-label="Delete ${moduleEscape(title)}">Delete</button></div></article>`;
}

function moduleRenderList(kind) {
  const rows = moduleRows[kind];
  module$(`#moduleList-${kind}`).innerHTML = rows.length ? rows.map((record) => moduleRecordMarkup(kind, record)).join('') : '<div class="module-empty">No records yet.</div>';
}

function renderEmployeeModuleWidgets() {
  const employeeId = module$('#learningEmployeeSelect')?.value;
  if (!employeeId) return;
  const skills = moduleRows.skills.filter((row) => row.employee_id === employeeId);
  module$('#learningSkills').innerHTML = skills.length ? skills.map((row) => `<article class="learning-item"><strong>${moduleEscape(row.competency)}</strong><small>Current ${row.current_level}/5 · Target ${row.target_level}/5 · Gap ${Math.max(0, row.target_level - row.current_level)}</small></article>`).join('') : '<p class="learning-empty">No skill ratings recorded.</p>';
  const plans = moduleRows.plans.filter((row) => row.employee_id === employeeId);
  module$('#learningPlan').innerHTML = plans.length ? plans.map((row) => `<article class="learning-item"><strong>${moduleEscape(row.goal)}</strong><small>${moduleEscape(row.status)} · Due ${moduleDate(row.due_date)}</small></article>`).join('') : '<p class="learning-empty">No development goals recorded.</p>';
  const certificates = moduleRows.certificates.filter((row) => row.employee_id === employeeId);
  module$('#learningCertificates').innerHTML = certificates.length ? certificates.map((row) => `<article class="learning-item"><strong>${moduleEscape(row.certificate_name)}</strong><small>${moduleEscape(row.issuer || 'Issuer not recorded')} · Expires ${moduleDate(row.expires_on)}</small>${row.training_assignment_id ? `<button class="row-action" type="button" data-print-certificate="${moduleEscape(row.id)}">Print / Save PDF</button>` : ''}</article>`).join('') : '<p class="learning-empty">No certificates recorded.</p>';
  const assignmentsById = new Map(moduleAssignments.map((item) => [item.id, item]));
  const tests = moduleAssignments.filter((item) => item.employee_id === employeeId && moduleResources.some((resource) => resource.id === item.resource_id && resource.category === 'Tests'));
  module$('#employeeAssessments').innerHTML = tests.length ? tests.map((assignment) => {
    const resource = moduleResources.find((item) => item.id === assignment.resource_id);
    const attempts = moduleRows.assessments.filter((item) => item.assignment_id === assignment.id).sort((a, b) => b.attempted_on.localeCompare(a.attempted_on));
    const result = attempts[0];
    return `<article class="learning-item"><strong>${moduleEscape(resource?.title || 'Assigned test')}</strong><small>${result ? `${result.score}% · ${result.passed ? 'Passed' : 'Not passed'} · ${attempts.length} attempt(s)` : `No result yet · ${moduleEscape(assignment.status)}`}</small></article>`;
  }).join('') : '<p class="learning-empty">No tests assigned.</p>';
  const impacts = moduleRows.impact.filter((row) => assignmentsById.get(row.assignment_id)?.employee_id === employeeId);
  module$('#learningImpact').innerHTML = impacts.length ? impacts.map((row) => `<article class="learning-item"><strong>${moduleEscape(row.measure)}</strong><small>${moduleEscape(moduleAssignmentLabel(row.assignment_id))} · ${row.before_value} → ${row.after_value} · ${moduleDate(row.measured_on)}</small></article>`).join('') : '<p class="learning-empty">No before-and-after measures recorded.</p>';
}

function renderModuleDashboard() {
  const today = new Date();
  const expiring = moduleRows.certificates.filter((row) => row.expires_on).map((row) => ({ ...row, days: Math.ceil((new Date(`${row.expires_on}T00:00:00`) - new Date(today.toDateString())) / 86400000) })).filter((row) => row.days <= 30).sort((a, b) => a.days - b.days);
  module$('#certificationAlerts').innerHTML = expiring.length ? expiring.slice(0, 5).map((row) => `<article class="learning-item"><strong>${moduleEscape(row.certificate_name)}</strong><small>${moduleEscape(moduleEmployeeName(row.employee_id))} · ${row.days < 0 ? `Expired ${Math.abs(row.days)} days ago` : `Expires in ${row.days} days`}</small></article>`).join('') : '<p class="learning-empty">No certificates are expired or due within 30 days.</p>';
  const gaps = moduleRows.skills.map((row) => ({ ...row, gap: Math.max(0, row.target_level - row.current_level) })).filter((row) => row.gap > 0).sort((a, b) => b.gap - a.gap).slice(0, 5);
  module$('#skillGapSummary').innerHTML = gaps.length ? gaps.map((row) => `<article class="learning-item"><strong>${moduleEscape(row.competency)}</strong><small>${moduleEscape(moduleEmployeeName(row.employee_id))} · ${row.current_level}/5 current, ${row.target_level}/5 target</small></article>`).join('') : '<p class="learning-empty">No recorded skill gaps.</p>';
  const kpis = [...document.querySelectorAll('#dashboardKpis .dashboard-kpi')];
  const passRate = moduleRows.assessments.length ? Math.round(moduleRows.assessments.filter((row) => row.passed).length / moduleRows.assessments.length * 100) : null;
  const exams = kpis.find((card) => card.querySelector('span')?.textContent === 'Exam pass rate');
  if (exams) { exams.querySelector('strong').textContent = passRate === null ? 'No results' : `${passRate}%`; exams.querySelector('small').textContent = `${moduleRows.assessments.length} recorded attempts`; }
  const plans = kpis.find((card) => card.querySelector('span')?.textContent === 'Active IDPs');
  if (plans) { plans.querySelector('strong').textContent = moduleRows.plans.filter((row) => row.status !== 'Completed').length; plans.querySelector('small').textContent = 'Open development goals'; }
}

function renderDevelopmentModules() {
  Object.keys(moduleTables).forEach(moduleRenderList);
  renderEmployeeModuleWidgets();
  renderModuleDashboard();
}

function moduleField(label, name, control, full = false) {
  return `<label${full ? ' class="full-width"' : ''}>${label}${control}</label>`;
}

function openDevelopmentRecordForm(kind) {
  const employee = `<select name="employee_id" required>${moduleEmployeeOptions()}</select>`;
  const assignment = (category) => {
    const options = moduleAssignmentOptions(category);
    const hasAssignments = category
      ? moduleAssignments.some((item) => moduleResources.some((resource) => resource.id === item.resource_id && resource.category === category))
      : moduleAssignments.length > 0;
    const hint = hasAssignments ? '' : `<small class="module-field-hint">${category === 'Tests' ? 'No assigned tests yet. Add a Tests resource in the Resource library, then assign it in the Training tracker.' : 'No training activities are assigned yet. Create an assignment in the Training tracker first.'}</small>`;
    return `<select name="assignment_id" required>${options}</select>${hint}`;
  };
  const date = new Date().toISOString().slice(0, 10);
  let fields = '';
  const forms = {
    plans: [
      moduleField('Employee', 'employee_id', employee),
      moduleField('Goal', 'goal', '<input name="goal" required maxlength="180" placeholder="e.g. Lead monthly safety briefings" />', true),
      moduleField('Action plan', 'action_plan', '<textarea name="action_plan" required rows="3" placeholder="Key actions and support required"></textarea>', true),
      moduleField('Target date', 'due_date', '<input name="due_date" type="date" required />'),
      moduleField('Status', 'status', '<select name="status"><option>Planned</option><option>In progress</option><option>Completed</option><option>On hold</option></select>')
    ],
    skills: [
      moduleField('Employee', 'employee_id', employee),
      moduleField('Skill or competency', 'competency', '<input name="competency" required maxlength="120" placeholder="e.g. Incident investigation" />', true),
      moduleField('Current level (1–5)', 'current_level', '<select name="current_level"><option value="1">1 · Developing</option><option value="2">2 · Basic</option><option value="3" selected>3 · Proficient</option><option value="4">4 · Advanced</option><option value="5">5 · Expert</option></select>'),
      moduleField('Required level (1–5)', 'target_level', '<select name="target_level"><option value="1">1 · Developing</option><option value="2">2 · Basic</option><option value="3">3 · Proficient</option><option value="4" selected>4 · Advanced</option><option value="5">5 · Expert</option></select>'),
      moduleField('Assessed on', 'assessed_on', `<input name="assessed_on" type="date" value="${date}" required />`)
    ],
    certificates: [
      moduleField('Employee', 'employee_id', employee),
      moduleField('Certificate', 'certificate_name', '<input name="certificate_name" required maxlength="180" />', true),
      moduleField('Issuing organization', 'issuer', '<input name="issuer" maxlength="180" />'),
      moduleField('Issued on', 'issued_on', '<input name="issued_on" type="date" />'),
      moduleField('Expires on', 'expires_on', '<input name="expires_on" type="date" />'),
      moduleField('PDF evidence (optional)', 'certificate_file', '<input name="certificate_file" type="file" accept=".pdf,application/pdf" />', true)
    ],
    assessments: [
      moduleField('Assigned test', 'assignment_id', assignment('Tests'), true),
      moduleField('Attempt date', 'attempted_on', `<input name="attempted_on" type="date" value="${date}" required />`),
      moduleField('Score (%)', 'score', '<input name="score" type="number" min="0" max="100" step="0.01" required />'),
      moduleField('Pass mark (%)', 'pass_mark', '<input name="pass_mark" type="number" min="0" max="100" step="0.01" value="70" required />'),
      moduleField('Notes', 'notes', '<textarea name="notes" rows="2" maxlength="1000"></textarea>', true)
    ],
    impact: [
      moduleField('Training assignment', 'assignment_id', assignment(null), true),
      moduleField('Measure', 'measure', '<input name="measure" required maxlength="140" placeholder="e.g. Quality audit score (%)" />', true),
      moduleField('Before training', 'before_value', '<input name="before_value" type="number" step="0.01" required />'),
      moduleField('After training', 'after_value', '<input name="after_value" type="number" step="0.01" required />'),
      moduleField('Measured on', 'measured_on', `<input name="measured_on" type="date" value="${date}" required />`),
      moduleField('Notes', 'notes', '<textarea name="notes" rows="2" maxlength="1000"></textarea>', true)
    ]
  };
  fields = forms[kind]?.join('') || '';
  if (!fields) return;
  module$('#developmentRecordForm').dataset.module = kind;
  module$('#moduleFormTitle').textContent = ({ plans: 'Add development goal', skills: 'Assess employee skill', certificates: 'Add certificate', assessments: 'Record exam result', impact: 'Record training impact' })[kind];
  module$('#moduleFormFields').innerHTML = `<div class="module-form-grid">${fields}</div>`;
  moduleReturnFocus = document.activeElement;
  module$('#moduleModal').classList.add('open');
  module$('#moduleModal').setAttribute('aria-hidden', 'false');
  module$('#moduleFormFields').querySelector('select, input, textarea')?.focus();
}

function closeDevelopmentRecordForm() {
  moduleReturnFocus?.focus();
  module$('#moduleModal').classList.remove('open');
  module$('#moduleModal').setAttribute('aria-hidden', 'true');
}

function developmentPayload(kind, values) {
  if (kind === 'plans') return { employee_id: values.get('employee_id'), goal: values.get('goal').trim(), action_plan: values.get('action_plan').trim(), due_date: values.get('due_date'), status: values.get('status') };
  if (kind === 'skills') return { employee_id: values.get('employee_id'), competency: values.get('competency').trim(), current_level: Number(values.get('current_level')), target_level: Number(values.get('target_level')), assessed_on: values.get('assessed_on') };
  if (kind === 'certificates') return { employee_id: values.get('employee_id'), certificate_name: values.get('certificate_name').trim(), issuer: values.get('issuer').trim() || null, issued_on: values.get('issued_on') || null, expires_on: values.get('expires_on') || null };
  if (kind === 'assessments') {
    const score = Number(values.get('score'));
    const passMark = Number(values.get('pass_mark'));
    return { assignment_id: values.get('assignment_id'), attempted_on: values.get('attempted_on'), score, pass_mark: passMark, passed: score >= passMark, notes: values.get('notes').trim() || null };
  }
  return { assignment_id: values.get('assignment_id'), measure: values.get('measure').trim(), before_value: Number(values.get('before_value')), after_value: Number(values.get('after_value')), measured_on: values.get('measured_on'), notes: values.get('notes').trim() || null };
}

async function saveDevelopmentRecord(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const kind = form.dataset.module;
  const client = moduleClient();
  if (!client || !moduleSessionUserId || !moduleTables[kind]) return moduleNotify('Sign in to Supabase before saving development records.');
  const values = new FormData(form);
  const payload = developmentPayload(kind, values);
  let filePath = null;
  let fileName = null;
  if (kind === 'certificates') {
    const file = values.get('certificate_file');
    if (file?.size) {
      if (!file.name.toLowerCase().endsWith('.pdf')) return moduleNotify('Certificate evidence must be a PDF.');
      if (file.size > 50 * 1024 * 1024) return moduleNotify('Certificate PDFs must be smaller than 50 MB.');
      filePath = `${crypto.randomUUID()}/${file.name.replace(/[\\/]/g, '_')}`;
      fileName = file.name;
      const { error } = await client.storage.from(moduleBucket).upload(filePath, file, { contentType: 'application/pdf' });
      if (error) return moduleNotify(`Certificate upload failed: ${error.message}`);
      payload.file_path = filePath;
      payload.file_name = fileName;
    }
  }
  const query = kind === 'skills'
    ? client.from(moduleTables[kind]).upsert(payload, { onConflict: 'employee_id,competency' }).select().single()
    : client.from(moduleTables[kind]).insert(payload).select().single();
  const { data, error } = await query;
  if (error) {
    if (filePath) await client.storage.from(moduleBucket).remove([filePath]);
    console.error('Development record save failed:', error);
    return moduleNotify(`Could not save record: ${error.message}`);
  }
  if (kind === 'skills') {
    const index = moduleRows.skills.findIndex((row) => row.employee_id === data.employee_id && row.competency.toLowerCase() === data.competency.toLowerCase());
    if (index >= 0) moduleRows.skills[index] = data;
    else moduleRows.skills.unshift(data);
  } else {
    moduleRows[kind].unshift(data);
  }
  form.reset();
  closeDevelopmentRecordForm();
  renderDevelopmentModules();
  moduleNotify(kind === 'skills' ? 'Skill assessment saved.' : 'Development record saved.');
}

async function deleteDevelopmentRecord(kind, id) {
  const client = moduleClient();
  const record = moduleRows[kind].find((row) => row.id === id);
  if (!client || !record) return;
  if (kind === 'certificates' && record.file_path) {
    const { error } = await client.storage.from(moduleBucket).remove([record.file_path]);
    if (error) return moduleNotify(`Certificate file could not be deleted: ${error.message}`);
  }
  const { error } = await client.from(moduleTables[kind]).delete().eq('id', id);
  if (error) return moduleNotify(`Could not delete record: ${error.message}`);
  moduleRows[kind] = moduleRows[kind].filter((row) => row.id !== id);
  renderDevelopmentModules();
  moduleNotify('Development record deleted.');
}

async function downloadDevelopmentCertificate(id) {
  const record = moduleRows.certificates.find((item) => item.id === id);
  if (!record?.file_path) return;
  const { data, error } = await moduleClient().storage.from(moduleBucket).download(record.file_path);
  if (error) return moduleNotify(`Certificate download failed: ${error.message}`);
  const url = URL.createObjectURL(data);
  const link = document.createElement('a');
  link.href = url;
  link.download = record.file_name || 'certificate.pdf';
  link.click();
  URL.revokeObjectURL(url);
}

function printTrainingCertificate(id) {
  const certificate = moduleRows.certificates.find((item) => item.id === id);
  if (!certificate?.training_assignment_id) return;
  const employeeName = moduleEmployeeName(certificate.employee_id);
  const issueDate = moduleDate(certificate.issued_on);
  const expiryDate = moduleDate(certificate.expires_on);
  const printWindow = window.open('', '_blank');
  if (!printWindow) return moduleNotify('Allow pop-ups to open the certificate for printing.');
  printWindow.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${moduleEscape(certificate.certificate_name)}</title><style>@page{size:A4 landscape;margin:12mm}*{box-sizing:border-box}body{margin:0;padding:28px;background:#eef2ed;color:#17372a;font:16px Georgia,serif}.certificate{position:relative;display:grid;align-content:center;justify-items:center;min-height:520px;padding:50px;border:10px double #315a43;background:#fff;text-align:center}.eyebrow{font:700 12px Arial,sans-serif;letter-spacing:3px;text-transform:uppercase;color:#58735f}.title{margin:25px 0 12px;font-size:42px;font-weight:400}.recipient{margin:8px 0 18px;font-size:34px;color:#234d36}.course{font-size:21px}.validity{margin-top:30px;color:#52685a;font:14px Arial,sans-serif}.issuer{margin-top:40px;font:700 14px Arial,sans-serif}.certificate-id{position:absolute;bottom:18px;color:#77847b;font:10px Arial,sans-serif}.print-action{position:fixed;right:20px;top:20px;padding:10px 16px;border:0;border-radius:4px;background:#17372a;color:white;font-weight:700;cursor:pointer}@media print{body{padding:0;background:#fff}.certificate{min-height:180mm}.print-action{display:none}}</style></head><body><main class="certificate"><span class="eyebrow">Certificate of Completion</span><h1 class="title">${moduleEscape(certificate.certificate_name)}</h1><p>This certificate is proudly presented to</p><strong class="recipient">${moduleEscape(employeeName)}</strong><p class="course">for successfully completing the assigned training course.</p><p class="validity">Issued ${moduleEscape(issueDate)} · Valid through ${moduleEscape(expiryDate)}</p><strong class="issuer">${moduleEscape(certificate.issuer || 'QBEL FM & Technical Services')}</strong><small class="certificate-id">Certificate ID ${moduleEscape(certificate.id)}</small></main><button class="print-action" type="button">Print / Save as PDF</button></body></html>`);
  printWindow.document.close();
  printWindow.document.querySelector('.print-action').addEventListener('click', () => printWindow.print());
}

document.querySelectorAll('[data-module-view]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-module-view]').forEach((tab) => tab.classList.toggle('active', tab === button));
  document.querySelectorAll('.module-panel').forEach((panel) => panel.classList.toggle('active', panel.id === `modulePanel-${button.dataset.moduleView}`));
}));
document.querySelectorAll('[data-add-module]').forEach((button) => button.addEventListener('click', () => openDevelopmentRecordForm(button.dataset.addModule)));
document.querySelectorAll('[data-close-module-modal]').forEach((button) => button.addEventListener('click', closeDevelopmentRecordForm));
module$('#developmentRecordForm').addEventListener('submit', saveDevelopmentRecord);
document.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('[data-delete-module]');
  if (deleteButton) void deleteDevelopmentRecord(deleteButton.dataset.deleteModule, deleteButton.dataset.recordId);
  const downloadButton = event.target.closest('[data-download-certificate]');
  if (downloadButton) void downloadDevelopmentCertificate(downloadButton.dataset.downloadCertificate);
  const printButton = event.target.closest('[data-print-certificate]');
  if (printButton) printTrainingCertificate(printButton.dataset.printCertificate);
});
module$('#learningEmployeeSelect').addEventListener('change', renderEmployeeModuleWidgets);
window.renderDevelopmentModules = renderDevelopmentModules;
window.addEventListener('development-modules-refresh', () => {
  if (!moduleSessionUserId) return;
  moduleLoadedUserId = null;
  void loadDevelopmentModulesForSession({ user: { id: moduleSessionUserId } });
});
window.openDevelopmentModule = (action) => {
  const moduleName = ({ development: 'plans', certificates: 'certificates', tests: 'assessments' })[action];
  if (!moduleName) return;
  document.querySelector('[data-view="modules"]').click();
  document.querySelector(`[data-module-view="${moduleName}"]`).click();
};
initializeDevelopmentModuleAuth();