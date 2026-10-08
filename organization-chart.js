const organizationChartKey = 'northstar-organization-chart';
const organizationNode = (id, parentId, name, designation, type = 'person') => ({ id, parentId, name, designation, type });

const defaultOrganizationChart = [
  organizationNode('andrew-mansour', null, 'Andrew Mansour', 'CEO'),
  organizationNode('fadi-mansour', 'andrew-mansour', 'Fadi Mansour', 'Head of Sales'),
  organizationNode('ajib-mohamed', 'andrew-mansour', 'Ajib Mohamed', 'Head of Finance'),
  organizationNode('marketing-head', 'andrew-mansour', 'TBA', 'Head of Marketing'),
  organizationNode('georges-quality', 'andrew-mansour', 'Georges Mansour', 'Quality & Compliance Manager'),
  organizationNode('georges-operations', 'andrew-mansour', 'Georges Mansour', 'Head of Operations'),
  organizationNode('human-resources', 'georges-operations', 'Human Resources', '', 'group'),
  organizationNode('jacqueline-hr', 'human-resources', 'Jacqueline Kirumagho', 'HR Manager'),
  organizationNode('hr-representative', 'jacqueline-hr', 'TBA', 'HR Representative'),
  organizationNode('information-technology', 'georges-operations', 'Information Technology', '', 'group'),
  organizationNode('it-manager', 'information-technology', 'TBA', 'IT Manager'),
  organizationNode('datavivex', 'it-manager', 'Datavivex', 'IT Support Specialist (Contracted)'),
  organizationNode('customer-support', 'georges-operations', 'Customer Support', '', 'group'),
  organizationNode('jacqueline-support', 'customer-support', 'Jacqueline Kirumagho', 'Customer Support Manager'),
  organizationNode('mayla-montenegro', 'jacqueline-support', 'Mayla Montenegro', 'Customer Support Representative'),
  organizationNode('faith-chersolich', 'jacqueline-support', 'Faith Chersolich', 'Customer Support Representative'),
  organizationNode('procurement-stores', 'georges-operations', 'Procurement & Stores', '', 'group'),
  organizationNode('ruben-alzerr', 'procurement-stores', 'Ruben Alzerr', 'Procurement & Stores Manager'),
  organizationNode('procurement-representative', 'ruben-alzerr', 'TBA', 'Procurement Representative'),
  organizationNode('storekeeper', 'ruben-alzerr', 'TBA', 'Storekeeper'),
  organizationNode('operations-support', 'georges-operations', 'Operations Support', '', 'group'),
  organizationNode('shartan-balai', 'operations-support', 'Shartan Balai', 'Operations Executive'),
  organizationNode('engineering-department', 'andrew-mansour', 'Engineering & Technical Department', '', 'group'),
  organizationNode('azlan-engineering', 'engineering-department', 'Azlan Ahmed', 'Head of Engineering & Technical'),
  organizationNode('site-teams', 'azlan-engineering', 'Site Teams', '', 'group'),
  organizationNode('karashath-justin', 'site-teams', 'Karashath Justin', 'Facility Engineering Site Team Leader'),
  organizationNode('robil-beepary', 'karashath-justin', 'Robil Beepary', ''),
  organizationNode('jobby-georges', 'karashath-justin', 'Jobby Georges', ''),
  organizationNode('pruthapthy-ragavan', 'karashath-justin', 'Pruthapthy Ragavan', ''),
  organizationNode('sunil-soman', 'karashath-justin', 'Sunil Soman', ''),
  organizationNode('mohammed-helal', 'karashath-justin', 'Mohammed Helal', ''),
  organizationNode('chandrawan-dash', 'karashath-justin', 'Chandrawan Dash', ''),
  organizationNode('harish', 'karashath-justin', 'Harish', ''),
  organizationNode('syed-al-rahmatullah', 'karashath-justin', 'Syed Al Rahmatullah', ''),
  organizationNode('mohamed-umar-farooq', 'karashath-justin', 'Mohamed Umar Farooq', ''),
  organizationNode('upendra-kumar', 'karashath-justin', 'Upendra Kumar', ''),
  organizationNode('ponnusamy-madasamy', 'karashath-justin', 'Ponnusamy Madasamy', ''),
  organizationNode('mathew-samuel', 'site-teams', 'Mathew Samuel', 'Facility Engineering Site Team Leader'),
  organizationNode('vishal-sharma', 'mathew-samuel', 'Vishal Sharma', ''),
  organizationNode('mohamed-abdalla', 'mathew-samuel', 'Mohamed Abdalla', ''),
  organizationNode('mohamed-saifullah', 'mathew-samuel', 'Mohamed Saifullah', ''),
  organizationNode('mohamed-bilal', 'mathew-samuel', 'Mohamed Bilal', ''),
  organizationNode('site-team-leader-tba', 'site-teams', 'TBA', 'Facility Engineering Site Team Leader'),
  organizationNode('deepan-jayapal', 'site-team-leader-tba', 'Deepan Jayapal', ''),
  organizationNode('sohail-nader', 'site-team-leader-tba', 'Sohail Nader', ''),
  organizationNode('sujon-ahmed', 'site-team-leader-tba', 'Sujon Ahmed', ''),
  organizationNode('gurdit-singh', 'site-team-leader-tba', 'Gurdit Singh', ''),
  organizationNode('mohamed-fayas', 'site-team-leader-tba', 'Mohamed Fayas', ''),
  organizationNode('anis-sharma', 'site-team-leader-tba', 'Anis Sharma', ''),
  organizationNode('thalapathi-rethinavelu', 'site-team-leader-tba', 'Thalapathi Rethinavelu', ''),
  organizationNode('mohamed-raheel', 'site-team-leader-tba', 'Mohamed Raheel', ''),
  organizationNode('mobile-teams', 'engineering-department', 'Mobile Teams', '', 'group'),
  organizationNode('azlan-pm', 'mobile-teams', 'Azlan Ahmed', 'PM Team Leader'),
  organizationNode('vikash-madhesya', 'azlan-pm', 'Vikash Madhesya', ''),
  organizationNode('anil-singh', 'azlan-pm', 'Anil Singh', ''),
  organizationNode('ravendra-sitarampalam', 'azlan-pm', 'Ravendra Sitarampalam', ''),
  organizationNode('joy-yohannan', 'mobile-teams', 'Joy Yohannan', 'Call-Out Team Leader'),
  organizationNode('salikh-khalel', 'joy-yohannan', 'Salikh Khalel', ''),
  organizationNode('vasudevan-mariyappan', 'joy-yohannan', 'Vasudevan Mariyappan', ''),
  organizationNode('ranjit-prasad', 'joy-yohannan', 'Ranjit Prasad', ''),
  organizationNode('fredrick-mwidime', 'joy-yohannan', 'Fredrick Mwidime', ''),
  organizationNode('mohamed-rasel', 'joy-yohannan', 'Mohamed Rasel', ''),
  organizationNode('elv-division', 'engineering-department', 'ELV Division', '', 'group'),
  organizationNode('ella-mansour', 'elv-division', 'Ella Mansour', 'Head of Technical'),
  organizationNode('jenta-perie-alwaz', 'ella-mansour', 'Jenta Perie Alwaz', 'Technical Support'),
  organizationNode('rashid-rakkaz', 'ella-mansour', 'Rashid KP Rakkaz', 'ELV Manager'),
  organizationNode('antony-sujin', 'rashid-rakkaz', 'Antony Sujin', ''),
  organizationNode('baber-khan', 'rashid-rakkaz', 'Baber Khan', ''),
  organizationNode('sakkeer-hussain', 'rashid-rakkaz', 'Sakkeer Hussain', ''),
  organizationNode('ajith-ashokan', 'ella-mansour', 'Ajith Ashokan', 'ELV Coordinator')
];

function moveSiteTeamsUnderAzlan(chart) {
  const siteTeams = chart.find((node) => node.id === 'site-teams');
  const azlan = chart.find((node) => node.id === 'azlan-engineering');
  if (!siteTeams || !azlan || siteTeams.parentId !== 'engineering-department') return false;
  siteTeams.parentId = azlan.id;
  return true;
}

function readOrganizationChart() {
  try {
    const saved = JSON.parse(localStorage.getItem(organizationChartKey) || 'null');
    if (Array.isArray(saved)) {
      if (moveSiteTeamsUnderAzlan(saved)) localStorage.setItem(organizationChartKey, JSON.stringify(saved));
      return saved;
    }
    return defaultOrganizationChart.map((node) => ({ ...node }));
  } catch (error) {
    return defaultOrganizationChart.map((node) => ({ ...node }));
  }
}

let organizationChart = readOrganizationChart();
let editingOrganizationNodeId = null;

const organizationChartTree = document.querySelector('#organizationChartTree');
const organizationChartCount = document.querySelector('#organizationChartCount');
const organizationNodeModal = document.querySelector('#organizationNodeModal');
const organizationNodeForm = document.querySelector('#organizationNodeForm');
const organizationNodeName = document.querySelector('#organizationNodeName');
const organizationNodeDesignation = document.querySelector('#organizationNodeDesignation');
const organizationNodeParent = document.querySelector('#organizationNodeParent');
const organizationNodeType = document.querySelector('#organizationNodeType');

function escapeOrganizationText(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function organizationChildren(parentId) {
  return organizationChart.filter((node) => (node.parentId || null) === parentId);
}

function renderOrganizationNode(node, ancestors) {
  if (ancestors.has(node.id)) return '';
  const nextAncestors = new Set(ancestors);
  nextAncestors.add(node.id);
  const children = organizationChildren(node.id);
  const designation = node.designation || (node.type === 'group' ? 'Department or team' : 'Designation not set');
  return `<li class="organization-chart-branch">
    <article class="organization-node${node.type === 'group' ? ' is-group' : ''}">
      <span class="organization-node-mark" aria-hidden="true">${node.type === 'group' ? '&#9638;' : '&#9679;'}</span>
      <div class="organization-node-identity"><strong>${escapeOrganizationText(node.name)}</strong><small>${escapeOrganizationText(designation)}</small></div>
      <div class="organization-node-actions">
        <button type="button" data-org-action="add" data-node-id="${escapeOrganizationText(node.id)}" aria-label="Add a report to ${escapeOrganizationText(node.name)}">Add report</button>
        <button type="button" data-org-action="edit" data-node-id="${escapeOrganizationText(node.id)}">Edit</button>
        <button type="button" class="organization-remove" data-org-action="remove" data-node-id="${escapeOrganizationText(node.id)}">Remove</button>
      </div>
    </article>
    ${children.length ? `<details${ancestors.size === 0 ? ' open' : ''}><summary class="organization-children-toggle">${children.length} direct report${children.length === 1 ? '' : 's'}</summary><ul class="organization-tree-children">${children.map((child) => renderOrganizationNode(child, nextAncestors)).join('')}</ul></details>` : ''}
  </li>`;
}

function renderOrganizationChart() {
  const roots = organizationChildren(null);
  organizationChartTree.innerHTML = roots.length
    ? `<ul class="organization-tree">${roots.map((node) => renderOrganizationNode(node, new Set())).join('')}</ul>`
    : '<p class="empty-state">No positions yet. Add a position to start the chart.</p>';
  const people = organizationChart.filter((node) => node.type !== 'group').length;
  const groups = organizationChart.length - people;
  organizationChartCount.textContent = `${people} people · ${groups} teams and departments`;
}

function centerOrganizationChartRoot() {
  const rootCard = organizationChartTree.querySelector('.organization-tree > .organization-chart-branch > .organization-node');
  if (!rootCard) return;
  const canvasBounds = organizationChartTree.getBoundingClientRect();
  const rootBounds = rootCard.getBoundingClientRect();
  const targetScroll = organizationChartTree.scrollLeft + rootBounds.left + rootBounds.width / 2 - (canvasBounds.left + organizationChartTree.clientWidth / 2);
  organizationChartTree.scrollLeft = Math.max(0, Math.min(organizationChartTree.scrollWidth - organizationChartTree.clientWidth, targetScroll));
}

function persistOrganizationChart() {
  localStorage.setItem(organizationChartKey, JSON.stringify(organizationChart));
  renderOrganizationChart();
}

function showOrganizationToast(message) {
  const toastElement = document.querySelector('#toast');
  if (!toastElement) return;
  toastElement.textContent = message;
  toastElement.classList.add('show');
  window.setTimeout(() => toastElement.classList.remove('show'), 3200);
}

async function syncOrganizationChart() {
  if (!window.supabaseClient) return true;
  const { error } = await window.supabaseClient.from('organization_chart').upsert({
    id: 'company',
    chart: organizationChart,
    updated_at: new Date().toISOString()
  }, { onConflict: 'id' });
  return !error;
}

function descendantsOf(nodeId) {
  const descendants = new Set([nodeId]);
  let foundChild = true;
  while (foundChild) {
    foundChild = false;
    organizationChart.forEach((node) => {
      if (descendants.has(node.parentId) && !descendants.has(node.id)) {
        descendants.add(node.id);
        foundChild = true;
      }
    });
  }
  return descendants;
}

function updateOrganizationParentOptions(selectedParent = '', excludedIds = new Set()) {
  const choices = organizationChart.filter((node) => !excludedIds.has(node.id));
  organizationNodeParent.innerHTML = '<option value="">Company leadership / top level</option>' + choices.map((node) => {
    const title = node.designation ? ` · ${node.designation}` : '';
    return `<option value="${escapeOrganizationText(node.id)}">${escapeOrganizationText(node.name + title)}</option>`;
  }).join('');
  organizationNodeParent.value = selectedParent || '';
}

function openOrganizationNodeEditor(node = null, parentId = '') {
  editingOrganizationNodeId = node?.id || null;
  const excludedIds = node ? descendantsOf(node.id) : new Set();
  updateOrganizationParentOptions(node?.parentId || parentId, excludedIds);
  organizationNodeName.value = node?.name || '';
  organizationNodeDesignation.value = node?.designation || '';
  organizationNodeType.value = node?.type || 'person';
  document.querySelector('#organizationNodeModalTitle').textContent = node ? 'Edit position' : 'Add position';
  organizationNodeModal.classList.add('active');
  organizationNodeModal.setAttribute('aria-hidden', 'false');
  organizationNodeName.focus();
}

function closeOrganizationNodeEditor() {
  organizationNodeModal.classList.remove('active');
  organizationNodeModal.setAttribute('aria-hidden', 'true');
  organizationNodeForm.reset();
  editingOrganizationNodeId = null;
}

async function finishOrganizationChange(successMessage) {
  persistOrganizationChart();
  const synced = await syncOrganizationChart().catch(() => false);
  showOrganizationToast(synced ? successMessage : `${successMessage} Saved on this device; cloud sync failed.`);
}

document.querySelector('#directoryTab').addEventListener('click', () => selectEmployeeSection('directory'));
document.querySelector('#organizationChartTab').addEventListener('click', () => selectEmployeeSection('organization-chart'));

function selectEmployeeSection(section) {
  document.querySelectorAll('[data-employee-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.employeePanel !== section;
  });
  document.querySelectorAll('[role="tab"][aria-controls="employees"], [role="tab"][aria-controls="organizationChartSection"]').forEach((tab) => {
    const selected = tab.id === (section === 'directory' ? 'directoryTab' : 'organizationChartTab');
    tab.classList.toggle('active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });
  if (section === 'organization-chart') {
    renderOrganizationChart();
    window.requestAnimationFrame(centerOrganizationChartRoot);
  }
}

document.querySelector('#addOrganizationPositionButton').addEventListener('click', () => openOrganizationNodeEditor());
const organizationChartZoom = document.querySelector('#organizationChartZoom');
function updateOrganizationChartZoom(value) {
  const zoom = Math.max(50, Math.min(125, Number(value)));
  organizationChartZoom.value = String(zoom);
  organizationChartTree.style.zoom = `${zoom}%`;
}
organizationChartZoom.addEventListener('input', () => updateOrganizationChartZoom(organizationChartZoom.value));
document.querySelector('#organizationChartZoomOut').addEventListener('click', () => updateOrganizationChartZoom(Number(organizationChartZoom.value) - 5));
document.querySelector('#organizationChartZoomIn').addEventListener('click', () => updateOrganizationChartZoom(Number(organizationChartZoom.value) + 5));
document.querySelector('#organizationChartZoomReset').addEventListener('click', () => updateOrganizationChartZoom(75));
document.querySelector('#closeOrganizationNodeModal').addEventListener('click', closeOrganizationNodeEditor);
document.querySelector('#cancelOrganizationNodeModal').addEventListener('click', closeOrganizationNodeEditor);
organizationNodeModal.addEventListener('click', (event) => {
  if (event.target === organizationNodeModal) closeOrganizationNodeEditor();
});

organizationNodeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const wasEditing = Boolean(editingOrganizationNodeId);
  const details = {
    name: organizationNodeName.value.trim(),
    designation: organizationNodeDesignation.value.trim(),
    parentId: organizationNodeParent.value || null,
    type: organizationNodeType.value
  };
  if (!details.name) return;
  if (editingOrganizationNodeId) {
    Object.assign(organizationChart.find((node) => node.id === editingOrganizationNodeId), details);
  } else {
    organizationChart.push({ id: `position-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...details });
  }
  closeOrganizationNodeEditor();
  await finishOrganizationChange(wasEditing ? 'Position updated.' : 'Position added.');
});

organizationChartTree.addEventListener('click', async (event) => {
  const action = event.target.closest('[data-org-action]');
  if (!action) return;
  const node = organizationChart.find((item) => item.id === action.dataset.nodeId);
  if (!node) return;
  if (action.dataset.orgAction === 'edit') {
    openOrganizationNodeEditor(node);
    return;
  }
  if (action.dataset.orgAction === 'add') {
    openOrganizationNodeEditor(null, node.id);
    return;
  }
  const removeIds = descendantsOf(node.id);
  const childCount = removeIds.size - 1;
  const message = childCount
    ? `Remove ${node.name} and ${childCount} reporting position${childCount === 1 ? '' : 's'}?`
    : `Remove ${node.name} from the organization chart?`;
  if (!window.confirm(message)) return;
  organizationChart = organizationChart.filter((item) => !removeIds.has(item.id));
  await finishOrganizationChange('Position removed.');
});

async function loadOrganizationChartFromCloud() {
  if (!window.supabaseClient) return;
  const { data, error } = await window.supabaseClient.from('organization_chart').select('chart').eq('id', 'company').maybeSingle();
  if (error) {
    console.warn('Organization chart cloud sync is unavailable.', error);
    return;
  }
  if (Array.isArray(data?.chart)) {
    organizationChart = data.chart;
    const migrated = moveSiteTeamsUnderAzlan(organizationChart);
    persistOrganizationChart();
    if (migrated) await syncOrganizationChart().catch((syncError) => console.warn('Could not save the updated Site Teams reporting line.', syncError));
    return;
  }
  await syncOrganizationChart().catch((syncError) => console.warn('Could not initialize the shared organization chart.', syncError));
}

window.addEventListener('qbel-auth-ready', () => { void loadOrganizationChartFromCloud(); });
window.addEventListener('resize', () => {
  if (!document.querySelector('#organizationChartSection').hidden) centerOrganizationChartRoot();
});
updateOrganizationChartZoom(75);
renderOrganizationChart();