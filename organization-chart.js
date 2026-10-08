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
const organizationChartPrintPages = document.querySelector('#organizationChartPrintPages');
const organizationChartCount = document.querySelector('#organizationChartCount');
const organizationNodeModal = document.querySelector('#organizationNodeModal');
const organizationNodeForm = document.querySelector('#organizationNodeForm');
const organizationNodeName = document.querySelector('#organizationNodeName');
const organizationNodeDesignation = document.querySelector('#organizationNodeDesignation');
const organizationNodeParent = document.querySelector('#organizationNodeParent');
const organizationNodeType = document.querySelector('#organizationNodeType');
let organizationChartPrintState = null;

function escapeOrganizationText(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function organizationChildren(parentId) {
  return organizationChart.filter((node) => (node.parentId || null) === parentId);
}

function isVerticalEngineeringRoster(node, children, ancestors) {
  if (verticalEngineeringReportLists.has(node.id)) return true;
  const isEngineeringBranch = ancestors.has('engineering-department') || node.id === 'engineering-department';
  const isCrewList = children.length >= 3 && children.every((child) =>
    child.type !== 'group' && (!child.designation || /technician/i.test(child.designation))
  );
  return isEngineeringBranch && isCrewList;
}

const verticalEngineeringReportLists = new Set([
  'karashath-justin',
  'mathew-samuel',
  'site-team-leader-tba',
  'azlan-pm',
  'joy-yohannan',
  'rashid-rakkaz'
]);

function renderOrganizationNode(node, ancestors) {
  if (ancestors.has(node.id)) return '';
  const nextAncestors = new Set(ancestors);
  nextAncestors.add(node.id);
  const children = organizationChildren(node.id);
  const verticalReports = isVerticalEngineeringRoster(node, children, nextAncestors);
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
    ${children.length ? `<details${ancestors.size <= 1 ? ' open' : ''}><summary class="organization-children-toggle">${children.length} direct report${children.length === 1 ? '' : 's'}</summary><ul class="organization-tree-children${verticalReports ? ' organization-tree-children-vertical' : ''}${node.type === 'group' && verticalReports ? ' organization-engineering-crew' : ''}">${children.map((child) => renderOrganizationNode(child, nextAncestors)).join('')}</ul></details>` : ''}
  </li>`;
}

function renderOrganizationChart() {
  const roots = organizationChildren(null);
  organizationChartTree.innerHTML = roots.length
    ? `<ul class="organization-tree">${roots.map((node) => renderOrganizationNode(node, new Set())).join('')}</ul>`
    : '<p class="empty-state">No positions yet. Add a position to start the chart.</p>';
  const chartContents = organizationChartTree.querySelector('.organization-tree');
  if (chartContents) chartContents.style.zoom = `${organizationChartZoom.value}%`;
  const people = organizationChart.filter((node) => node.type !== 'group').length;
  const groups = organizationChart.length - people;
  organizationChartCount.textContent = `${people} people · ${groups} teams and departments`;
}

function renderOrganizationPrintNode(node, maxDepth, depth = 0, ancestors = new Set()) {
  if (ancestors.has(node.id)) return '';
  const nextAncestors = new Set(ancestors);
  nextAncestors.add(node.id);
  const children = depth < maxDepth ? organizationChildren(node.id) : [];
  const verticalReports = isVerticalEngineeringRoster(node, children, nextAncestors);
  const designation = node.designation || (node.type === 'group' ? 'Department or team' : 'Designation not set');
  const childrenMarkup = children.length
    ? `<details open><summary></summary><ul class="organization-chart-print-children${verticalReports ? ' organization-tree-children-vertical' : ''}">${children.map((child) => renderOrganizationPrintNode(child, maxDepth, depth + 1, nextAncestors)).join('')}</ul></details>`
    : '';
  return `<li class="organization-chart-print-branch">
    <article class="organization-chart-print-node${node.type === 'group' ? ' is-group' : ''}">
      <span class="organization-node-mark" aria-hidden="true">${node.type === 'group' ? '&#9638;' : '&#9679;'}</span>
      <div class="organization-node-identity"><strong>${escapeOrganizationText(node.name)}</strong><small>${escapeOrganizationText(designation)}</small></div>
    </article>
    ${childrenMarkup}
  </li>`;
}

function renderOrganizationPrintPages() {
  const roots = organizationChildren(null);
  organizationChartPrintPages.innerHTML = `
    <section class="organization-chart-print-page">
      <header class="organization-chart-print-heading"><span>QBEL FM &amp; Technical Services</span><h1>Company Organization Chart</h1></header>
      <ul class="organization-chart-print-tree">${roots.map((node) => renderOrganizationPrintNode(node, Number.POSITIVE_INFINITY)).join('')}</ul>
    </section>`;
}

function wrapOrganizationSvgText(value, maxCharacters) {
  const words = String(value || '').trim().split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (line && nextLine.length > maxCharacters) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  });
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function buildOrganizationChartSvg() {
  const cardWidth = 260;
  const horizontalGap = 24;
  const verticalGap = 46;
  const verticalItemGap = 14;
  const sideMargin = 72;
  const topMargin = 142;
  const rootNodes = organizationChildren(null);
  const records = [];
  const links = [];

  function measureCard(node) {
    const nameLines = wrapOrganizationSvgText(node.name, 27);
    const designationLines = wrapOrganizationSvgText(node.designation || (node.type === 'group' ? 'Department or team' : 'Designation not set'), 31);
    const textHeight = nameLines.length * 17 + designationLines.length * 14;
    return { width: cardWidth, height: Math.max(72, 24 + textHeight + 12), nameLines, designationLines };
  }

  function measureSubtree(node, ancestors = new Set()) {
    const nextAncestors = new Set(ancestors);
    nextAncestors.add(node.id);
    const children = organizationChildren(node.id).filter((child) => !nextAncestors.has(child.id));
    const card = measureCard(node);
    if (!children.length) return { ...card, children: [], vertical: false };
    const childSizes = children.map((child) => measureSubtree(child, nextAncestors));
    const vertical = isVerticalEngineeringRoster(node, children, nextAncestors);
    if (vertical) {
      const childrenHeight = childSizes.reduce((total, child) => total + child.height, 0) + verticalItemGap * (childSizes.length - 1);
      return {
        ...card,
        children,
        childSizes,
        vertical,
        width: Math.max(card.width, ...childSizes.map((child) => child.width)),
        height: card.height + verticalGap + childrenHeight
      };
    }
    const childrenWidth = childSizes.reduce((total, child) => total + child.width, 0) + horizontalGap * (childSizes.length - 1);
    return {
      ...card,
      children,
      childSizes,
      vertical,
      width: Math.max(card.width, childrenWidth),
      height: card.height + verticalGap + Math.max(...childSizes.map((child) => child.height))
    };
  }

  function placeNode(node, layout, left, top) {
    const cardX = left + (layout.width - cardWidth) / 2;
    const record = { node, x: cardX, y: top, width: cardWidth, height: measureCard(node).height, layout };
    records.push(record);
    if (!layout.children.length) return record;

    const parentCenter = cardX + cardWidth / 2;
    const childrenTop = top + record.height + verticalGap;
    if (layout.vertical) {
      let childTop = childrenTop;
      layout.children.forEach((child, index) => {
        const childLayout = layout.childSizes[index];
        const childLeft = left + (layout.width - childLayout.width) / 2;
        const childRecord = placeNode(child, childLayout, childLeft, childTop);
        const childCenter = childRecord.x + cardWidth / 2;
        const branchY = childTop - verticalItemGap / 2;
        links.push(`M ${parentCenter} ${top + record.height} V ${branchY} H ${childCenter} V ${childTop}`);
        childTop += childLayout.height + verticalItemGap;
      });
      return record;
    }

    const childrenWidth = layout.childSizes.reduce((total, child) => total + child.width, 0) + horizontalGap * (layout.childSizes.length - 1);
    let childLeft = left + (layout.width - childrenWidth) / 2;
    const childCenters = [];
    layout.children.forEach((child, index) => {
      const childLayout = layout.childSizes[index];
      const childRecord = placeNode(child, childLayout, childLeft, childrenTop);
      childCenters.push(childRecord.x + cardWidth / 2);
      childLeft += childLayout.width + horizontalGap;
    });
    const branchY = top + record.height + verticalGap / 2;
    links.push(`M ${parentCenter} ${top + record.height} V ${branchY}`);
    links.push(`M ${Math.min(...childCenters)} ${branchY} H ${Math.max(...childCenters)}`);
    childCenters.forEach((center) => links.push(`M ${center} ${branchY} V ${childrenTop}`));
    return record;
  }

  const rootLayouts = rootNodes.map((node) => measureSubtree(node));
  const rootWidth = rootLayouts.reduce((total, layout) => total + layout.width, 0) + horizontalGap * Math.max(0, rootLayouts.length - 1);
  const contentWidth = Math.max(cardWidth, rootWidth);
  const contentHeight = rootLayouts.length ? Math.max(...rootLayouts.map((layout) => layout.height)) : 0;
  const width = Math.ceil(contentWidth + sideMargin * 2);
  const height = Math.ceil(topMargin + contentHeight + sideMargin);
  let rootLeft = sideMargin + (contentWidth - rootWidth) / 2;
  rootNodes.forEach((node, index) => {
    const layout = rootLayouts[index];
    placeNode(node, layout, rootLeft, topMargin);
    rootLeft += layout.width + horizontalGap;
  });

  const connectorMarkup = links.map((path) => `<path d="${path}" fill="none" stroke="#8fa99a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  const nodeMarkup = records.map(({ node, x, y, height: nodeHeight, layout }) => {
    const { nameLines, designationLines } = layout;
    const isRoot = !node.parentId;
    const isGroup = node.type === 'group';
    const fill = isRoot ? '#124d37' : isGroup ? '#fffaf1' : '#ffffff';
    const stroke = isRoot ? '#124d37' : isGroup ? '#d8bd94' : '#d0dfd7';
    const accent = isRoot ? '#124d37' : isGroup ? '#c07843' : '#287a58';
    const textColor = isRoot ? '#ffffff' : '#202b29';
    const subtitleColor = isRoot ? '#e0eee6' : '#64746d';
    const iconFill = isGroup ? '#f3e4cc' : isRoot ? '#356b53' : '#e6f2eb';
    const iconText = isGroup ? '#9b6033' : '#236d4c';
    const textX = x + 55;
    const firstNameY = y + 24 + Math.max(0, (nodeHeight - 24 - nameLines.length * 17 - designationLines.length * 14) / 2);
    const nameMarkup = nameLines.map((line, index) => `<tspan x="${textX}" dy="${index === 0 ? 0 : 17}">${escapeOrganizationText(line)}</tspan>`).join('');
    const roleStartY = firstNameY + nameLines.length * 17;
    const roleMarkup = designationLines.map((line, index) => `<tspan x="${textX}" dy="${index === 0 ? 0 : 14}">${escapeOrganizationText(line)}</tspan>`).join('');
    return `<g>
      <title>${escapeOrganizationText(node.name)}: ${escapeOrganizationText(node.designation || (isGroup ? 'Department or team' : 'Designation not set'))}</title>
      <rect x="${x}" y="${y}" width="${cardWidth}" height="${nodeHeight}" rx="7" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
      <path d="M ${x + 7} ${y + 2} H ${x + cardWidth - 7}" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
      <rect x="${x + 13}" y="${y + (nodeHeight - 30) / 2}" width="30" height="30" rx="${isGroup ? 6 : 15}" fill="${iconFill}"/>
      <text x="${x + 28}" y="${y + nodeHeight / 2 + 5}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="${iconText}">${isGroup ? '&#9638;' : '&#9679;'}</text>
      <text x="${textX}" y="${firstNameY}" font-family="'DM Sans', Arial, sans-serif" font-size="13" font-weight="700" fill="${textColor}">${nameMarkup}</text>
      <text x="${textX}" y="${roleStartY}" font-family="'DM Sans', Arial, sans-serif" font-size="11" fill="${subtitleColor}">${roleMarkup}</text>
    </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="chartTitle chartDescription">
    <title id="chartTitle">QBEL FM &amp; Technical Services Organization Chart</title>
    <desc id="chartDescription">A connected organization chart with ${records.length} positions.</desc>
    <rect width="100%" height="100%" fill="#ffffff"/>
    <text x="${sideMargin}" y="48" font-family="'DM Sans', Arial, sans-serif" font-size="11" font-weight="700" fill="#547064">QBEL FM &amp; TECHNICAL SERVICES</text>
    <text x="${sideMargin}" y="88" font-family="'Space Grotesk', Arial, sans-serif" font-size="26" font-weight="700" fill="#202b29">Company Organization Chart</text>
    <line x1="${sideMargin}" y1="108" x2="${width - sideMargin}" y2="108" stroke="#d5e1da"/>
    <g>${connectorMarkup}</g><g>${nodeMarkup}</g>
  </svg>`;
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
  organizationNodeModal.classList.add('open');
  organizationNodeModal.setAttribute('aria-hidden', 'false');
  organizationNodeName.focus();
}

function closeOrganizationNodeEditor() {
  organizationNodeModal.classList.remove('open');
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
  document.body.classList.toggle('organization-chart-view', section === 'organization-chart');
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
  const chartContents = organizationChartTree.querySelector('.organization-tree');
  if (chartContents) chartContents.style.zoom = `${zoom}%`;
}
organizationChartZoom.addEventListener('input', () => updateOrganizationChartZoom(organizationChartZoom.value));
document.querySelector('#organizationChartZoomOut').addEventListener('click', () => updateOrganizationChartZoom(Number(organizationChartZoom.value) - 5));
document.querySelector('#organizationChartZoomIn').addEventListener('click', () => updateOrganizationChartZoom(Number(organizationChartZoom.value) + 5));
document.querySelector('#organizationChartZoomReset').addEventListener('click', () => updateOrganizationChartZoom(75));
document.querySelector('#downloadOrganizationChartSvgButton').addEventListener('click', () => {
  const svgBlob = new Blob([buildOrganizationChartSvg()], { type: 'image/svg+xml;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(svgBlob);
  const downloadLink = document.createElement('a');
  downloadLink.href = downloadUrl;
  downloadLink.download = `qbel-organization-chart-${new Date().toISOString().slice(0, 10)}.svg`;
  document.body.append(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
});
document.querySelector('#printOrganizationChartButton').addEventListener('click', () => {
  if (organizationChartPrintState) return;
  renderOrganizationPrintPages();
  organizationChartPrintPages.setAttribute('aria-hidden', 'false');
  organizationChartPrintState = true;
  document.body.classList.add('organization-chart-print-mode');
  window.requestAnimationFrame(() => window.print());
});
window.addEventListener('beforeprint', () => {
  if (!organizationChartPrintState) return;
  organizationChartPrintPages.querySelectorAll('.organization-chart-print-page').forEach((page) => {
    const chart = page.querySelector('.organization-chart-print-tree');
    chart.style.zoom = '100%';
    const availableWidth = Math.max(1, page.clientWidth - 24);
    const availableHeight = Math.max(1, page.clientHeight - 100);
    const scale = Math.min(1, availableWidth / chart.scrollWidth, availableHeight / chart.scrollHeight);
    chart.style.zoom = `${Math.round(scale * 100)}%`;
  });
});
window.addEventListener('afterprint', () => {
  if (!organizationChartPrintState) return;
  organizationChartPrintPages.setAttribute('aria-hidden', 'true');
  organizationChartPrintState = null;
  document.body.classList.remove('organization-chart-print-mode');
});
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