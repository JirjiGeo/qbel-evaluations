const commonCriteria = [
  { section: '1.1 Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
  { section: '1.2 Professional Conduct & Ethics', weight: 10, items: [{ name: 'Respectful behavior with colleagues', weight: 4 }, { name: 'Compliance with company policies', weight: 3 }, { name: 'Demonstrates integrity & accountability', weight: 3 }] },
  { section: '1.3 Teamwork & Collaboration', weight: 10, items: [{ name: 'Works effectively with team members', weight: 4 }, { name: 'Supports cross-department coordination', weight: 3 }, { name: 'Contributes to team goals', weight: 3 }] },
  { section: '1.4 Problem Solving & Initiative', weight: 10, items: [{ name: 'Identifies issues proactively', weight: 3 }, { name: 'Suggests practical solutions', weight: 4 }, { name: 'Takes initiative without waiting for instructions', weight: 3 }] }
];

const leadershipCriteria = [{ section: '3.1 Leadership & People Management', weight: 15, items: [{ name: 'Ability to guide and mentor team', weight: 5 }, { name: 'Delegation & workload distribution', weight: 5 }, { name: 'Conflict resolution & decision-making', weight: 5 }] }];
const communicationCriteria = [{ section: '4.1 Communication Quality', weight: 10, items: [{ name: 'Clarity and professionalism', weight: 4 }, { name: 'Responsiveness & follow-up', weight: 3 }, { name: 'Written & verbal communication accuracy', weight: 3 }] }];
const systemCriteria = [{ section: '5.1 System Usage & Technical Skills', weight: 5, items: [{ name: 'Proficiency in department systems (Odoo, HRMS, CAFM, ERP, etc.)', weight: 2 }, { name: 'Accuracy of digital entries & reports', weight: 2 }, { name: 'Ability to troubleshoot basic system issues', weight: 1 }] }];

const facilityEngineerForm = {
  common: [
    { section: '1.1 Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
    { section: '1.2 Professional Conduct & Ethics', weight: 10, items: [{ name: 'Respectful behaviours with colleagues & occupants', weight: 4 }, { name: 'Compliance with company policies & safety rules', weight: 3 }, { name: 'Demonstrates integrity & accountability', weight: 3 }] },
    { section: '1.3 Teamwork & Collaboration', weight: 10, items: [{ name: 'Coordination with service providers', weight: 4 }, { name: 'Collaboration with help desk, procurement, soft services', weight: 3 }, { name: 'Contribution to team goals', weight: 3 }] }
  ],
  process: [
    { section: '2.1 Contract & Service Provider Management', weight: 10, items: [{ name: 'Contract compliance monitoring', weight: 4 }, { name: 'Timely escalation of breaches', weight: 3 }, { name: 'Quality of service provider coordination', weight: 3 }] },
    { section: '2.2 Maintenance & Asset Management', weight: 15, items: [{ name: 'PPM scheduling & completion', weight: 5 }, { name: 'Reactive maintenance resolution time', weight: 5 }, { name: 'Asset condition evaluation & reporting', weight: 5 }] },
    { section: '2.3 Incident, Emergency & Compliance Management', weight: 15, items: [{ name: 'Incident response & documentation', weight: 5 }, { name: 'Emergency preparedness & fire drill execution', weight: 5 }, { name: 'Compliance with safety regulations', weight: 5 }] }
  ],
  leadership: [{ section: '3.1 Leadership & Team Supervision', weight: 15, items: [{ name: 'Daily briefings & task delegation', weight: 5 }, { name: 'Guidance to technical team', weight: 5 }, { name: 'Decision-making & conflict resolution', weight: 5 }] }],
  communication: [{ section: '4.1 Communication Quality', weight: 10, items: [{ name: 'Clarity & professionalism', weight: 4 }, { name: 'Responsiveness to occupants & stakeholders', weight: 3 }, { name: 'Accuracy of written reports (weekly, inspection, snag)', weight: 3 }] }],
  system: [{ section: '5.1 System Usage & Technical Skills', weight: 5, items: [{ name: 'Proficiency in Odoo / CAFM', weight: 2 }, { name: 'Accuracy of digital entries & maintenance logs', weight: 2 }, { name: 'Ability to troubleshoot basic system issues', weight: 1 }] }],
  weights: { common: 30, process: 40, leadership: 15, communication: 10, system: 5 }
};

const facilityTechnicianForm = {
  common: [
    { section: '1.1 Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
    { section: '1.2 Professional Conduct & Ethics', weight: 10, items: [{ name: 'Professional behavior with colleagues & occupants', weight: 4 }, { name: 'Compliance with safety rules & company policies', weight: 3 }, { name: 'Demonstrates integrity & accountability', weight: 3 }] },
    { section: '1.3 Teamwork & Collaboration', weight: 10, items: [{ name: 'Collaboration with technicians & supervisors', weight: 4 }, { name: 'Coordination with other departments (help desk, soft services)', weight: 3 }, { name: 'Contribution to team goals', weight: 3 }] }
  ],
  process: [
    { section: '2.1 Technical Maintenance & Repairs', weight: 15, items: [{ name: 'Quality of routine maintenance', weight: 5 }, { name: 'Accuracy in diagnosing faults', weight: 5 }, { name: 'Quality of repairs & corrective actions', weight: 5 }] },
    { section: '2.2 Inspections & Preventative Maintenance', weight: 15, items: [{ name: 'Daily site inspection completion', weight: 5 }, { name: 'Accuracy of inspection reports', weight: 5 }, { name: 'Implementation of preventative maintenance', weight: 5 }] },
    { section: '2.3 Tools, PPE & Safety Compliance', weight: 10, items: [{ name: 'Proper use & care of tools', weight: 4 }, { name: 'Adherence to PPE requirements', weight: 3 }, { name: 'Compliance with safety standards', weight: 3 }] }
  ],
  leadership: [{ section: '3.1 Work Discipline & Initiative', weight: 10, items: [{ name: 'Takes initiative in resolving issues', weight: 4 }, { name: 'Follows instructions from Supervisor/Engineer', weight: 3 }, { name: 'Supports team members when needed', weight: 3 }] }],
  communication: [{ section: '4.1 Communication Quality', weight: 10, items: [{ name: 'Clarity & professionalism with occupants', weight: 4 }, { name: 'Responsiveness to Supervisor/Engineer', weight: 3 }, { name: 'Accuracy of written reports (inspection, maintenance logs)', weight: 3 }] }],
  system: [{ section: '5.1 System Usage & Reporting', weight: 10, items: [{ name: 'Proficiency in Odoo / CAFM', weight: 4 }, { name: 'Accuracy of digital entries & ticket updates', weight: 3 }, { name: 'Timely submission of reports', weight: 3 }] }],
  weights: { common: 30, process: 40, leadership: 10, communication: 10, system: 10 },
  titles: { leadership: 'Section 3 · Leadership & Work Ethic' }
};

const facilitySupervisorTeamLeaderForm = {
  common: [
    { section: '1.1 Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
    { section: '1.2 Professional Conduct & Ethics', weight: 10, items: [{ name: 'Professional behavior with colleagues & occupants', weight: 4 }, { name: 'Compliance with safety rules & company policies', weight: 3 }, { name: 'Demonstrates integrity & accountability', weight: 3 }] },
    { section: '1.3 Teamwork & Collaboration', weight: 10, items: [{ name: 'Collaboration with technicians & service providers', weight: 4 }, { name: 'Coordination with help desk, procurement, soft services', weight: 3 }, { name: 'Contribution to team goals', weight: 3 }] }
  ],
  process: [
    { section: '2.1 Technical Supervision & Team Management', weight: 15, items: [{ name: 'Daily briefings & task delegation', weight: 5 }, { name: 'Monitoring service provider schedules', weight: 5 }, { name: 'Ensuring maintenance requests meet KPIs', weight: 5 }] },
    { section: '2.2 Maintenance & Operations Oversight', weight: 15, items: [{ name: 'PPM scheduling & completion', weight: 5 }, { name: 'Reactive maintenance management', weight: 5 }, { name: 'Quality of inspections & asset management', weight: 5 }] },
    { section: '2.3 Incident, Emergency & Compliance Management', weight: 10, items: [{ name: 'Incident response & documentation', weight: 4 }, { name: 'Emergency preparedness & fire drills', weight: 3 }, { name: 'Compliance with safety regulations', weight: 3 }] }
  ],
  leadership: [{ section: '3.1 Leadership & People Management', weight: 10, items: [{ name: 'Ability to guide and mentor technicians', weight: 4 }, { name: 'Delegation & workload distribution', weight: 3 }, { name: 'Decision-making & conflict resolution', weight: 3 }] }],
  communication: [{ section: '4.1 Communication Quality', weight: 10, items: [{ name: 'Clarity & professionalism with occupants', weight: 4 }, { name: 'Responsiveness to Facility Engineer / Manager', weight: 3 }, { name: 'Accuracy of written reports (weekly, inspection, snag)', weight: 3 }] }],
  system: [{ section: '5.1 System Usage & Reporting', weight: 10, items: [{ name: 'Proficiency in Odoo / CAFM', weight: 4 }, { name: 'Accuracy of digital entries & ticket updates', weight: 3 }, { name: 'Timely submission of reports', weight: 3 }] }],
  weights: { common: 30, process: 40, leadership: 10, communication: 10, system: 10 }
};

const headOfEngineeringForm = {
  common: [
    { section: '1.1 Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
    { section: '1.2 Professional Conduct & Ethics', weight: 10, items: [{ name: 'Respectful behaviours with colleagues & occupants', weight: 4 }, { name: 'Compliance with company policies & safety rules', weight: 3 }, { name: 'Demonstrates integrity & accountability', weight: 3 }] },
    { section: '1.3 Teamwork & Collaboration', weight: 10, items: [{ name: 'Coordination with service providers', weight: 4 }, { name: 'Collaboration with help desk, procurement, soft services', weight: 3 }, { name: 'Contribution to team goals', weight: 3 }] }
  ],
  process: [
    { section: '2.1 Department Leadership & Strategy', weight: 15, items: [{ name: 'Strategic planning & direction of engineering operations', weight: 5 }, { name: 'Implementation of improvement initiatives', weight: 5 }, { name: 'Operational alignment with organizational goals', weight: 5 }] },
    { section: '2.2 Contract & Service Provider Management', weight: 10, items: [{ name: 'Compliance & SLA monitoring', weight: 4 }, { name: 'Escalation & corrective action management', weight: 3 }, { name: 'Service provider performance oversight', weight: 3 }] },
    { section: '2.3 Maintenance, PPM & Asset Management', weight: 15, items: [{ name: 'PPM planning & completion across facilities', weight: 5 }, { name: 'Reactive maintenance response & resolution', weight: 5 }, { name: 'Asset condition evaluation & improvement planning', weight: 5 }] }
  ],
  leadership: [{ section: '3.1 Leadership & People Management', weight: 10, items: [{ name: 'Leadership & guidance to engineering teams', weight: 4 }, { name: 'Delegation & workload distribution', weight: 3 }, { name: 'Decision-making & conflict resolution', weight: 3 }] }],
  communication: [{ section: '4.1 Communication Quality', weight: 10, items: [{ name: 'Clarity & professionalism with stakeholders', weight: 4 }, { name: 'Accuracy of written reports (weekly, monthly, asset)', weight: 3 }, { name: 'Responsiveness to escalations & clients', weight: 3 }] }],
  system: [{ section: '5.1 System Usage & Reporting', weight: 10, items: [{ name: 'Proficiency in Odoo / CAFM / ERP systems', weight: 4 }, { name: 'Accuracy of digital entries & engineering reports', weight: 3 }, { name: 'Use of analytics for decision-making', weight: 3 }] }],
  weights: { common: 30, process: 40, leadership: 10, communication: 10, system: 10 }
};

const procurementManagerForm = {
  common: [
    { section: 'A1. Procurement Strategy & Planning', weight: 10, items: [{ name: 'Quality of procurement strategy', weight: 4 }, { name: 'Accuracy of forecasting & planning', weight: 3 }, { name: 'Implementation of cost-saving initiatives', weight: 3 }] },
    { section: 'A2. Vendor & Contract Management', weight: 10, items: [{ name: 'Supplier evaluation & selection', weight: 4 }, { name: 'Contract negotiation & compliance', weight: 3 }, { name: 'Supplier performance monitoring', weight: 3 }] },
    { section: 'A3. Purchasing Operations & Compliance', weight: 10, items: [{ name: 'Accuracy of purchasing cycle', weight: 4 }, { name: 'Compliance with procurement policies', weight: 3 }, { name: 'Quality of documentation & audit readiness', weight: 3 }] },
    { section: 'A4. Inventory & Supply Chain Coordination', weight: 10, items: [{ name: 'Inventory control & accuracy', weight: 3 }, { name: 'Coordination with stores/warehouse', weight: 4 }, { name: 'Material availability & replenishment', weight: 3 }] }
  ],
  process: [
    { section: 'B1. Financial Oversight & Cost Control', weight: 10, items: [{ name: 'Budget adherence', weight: 4 }, { name: 'Cost-saving & value engineering', weight: 3 }, { name: 'Accuracy of PO & invoice approvals', weight: 3 }] },
    { section: 'B2. Policy Compliance & Audit Readiness', weight: 10, items: [{ name: 'Compliance with procurement policies', weight: 4 }, { name: 'Accuracy of procurement records', weight: 3 }, { name: 'Audit readiness & documentation quality', weight: 3 }] },
    { section: 'B3. Reporting & Analytics', weight: 10, items: [{ name: 'Quality of procurement reports', weight: 4 }, { name: 'Spend analysis & insights', weight: 3 }, { name: 'Use of KPIs for decision-making', weight: 3 }] }
  ],
  leadership: [{ section: 'C1. Leadership & Team Management', weight: 10, items: [{ name: 'Leadership & guidance', weight: 4 }, { name: 'Delegation & workload management', weight: 3 }, { name: 'Conflict resolution & decision-making', weight: 3 }] }],
  communication: [{ section: 'C2. Communication & Stakeholder Coordination', weight: 10, items: [{ name: 'Communication clarity & professionalism', weight: 4 }, { name: 'Responsiveness to internal stakeholders', weight: 3 }, { name: 'Supplier communication & negotiation quality', weight: 3 }] }],
  system: [{ section: 'D1. ERP / Procurement System Usage', weight: 10, items: [{ name: 'Proficiency in ERP / procurement systems', weight: 4 }, { name: 'Accuracy of digital entries', weight: 3 }, { name: 'Use of analytics for procurement decisions', weight: 3 }] }],
  weights: { common: 40, process: 30, leadership: 10, communication: 10, system: 10 },
  titles: { common: 'Section A · Core Procurement Functions', process: 'Section B · Compliance, Financial Control & Reporting', leadership: 'Section C1 · Leadership & Team Management', communication: 'Section C2 · Communication & Stakeholder Coordination', system: 'Section D · Systems & Digital Competency' }
};

const purchaseAssistantForm = {
  common: [
    { section: 'A1. Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
    { section: 'A2. Professional Conduct & Ethics', weight: 10, items: [{ name: 'Professional behavior with colleagues', weight: 4 }, { name: 'Compliance with company policies', weight: 3 }, { name: 'Integrity & accountability', weight: 3 }] },
    { section: 'A3. Teamwork & Collaboration', weight: 10, items: [{ name: 'Coordination with departments', weight: 4 }, { name: 'Support to Procurement Manager', weight: 3 }, { name: 'Contribution to team goals', weight: 3 }] },
    { section: 'A4. Initiative & Problem Solving', weight: 10, items: [{ name: 'Identifies issues proactively', weight: 3 }, { name: 'Suggests practical solutions', weight: 4 }, { name: 'Takes initiative without waiting', weight: 3 }] }
  ],
  process: [
    { section: 'B1. Purchasing Operations', weight: 10, items: [{ name: 'Accuracy in processing PRs & RFQs', weight: 4 }, { name: 'Timeliness of PO preparation', weight: 3 }, { name: 'Follow-up on deliveries & orders', weight: 3 }] },
    { section: 'B2. Supplier Coordination', weight: 10, items: [{ name: 'Quality of supplier communication', weight: 4 }, { name: 'Timely follow-up on quotations', weight: 3 }, { name: 'Accuracy in supplier information', weight: 3 }] },
    { section: 'B3. Documentation & Compliance', weight: 10, items: [{ name: 'Accuracy of procurement documentation', weight: 4 }, { name: 'Compliance with procurement procedures', weight: 3 }, { name: 'Audit readiness & record quality', weight: 3 }] }
  ],
  leadership: [{ section: 'C1. Work Discipline & Support', weight: 10, items: [{ name: 'Follows instructions from supervisor', weight: 4 }, { name: 'Supports team members', weight: 3 }, { name: 'Shows responsibility & ownership', weight: 3 }] }],
  communication: [{ section: 'D1. Communication Quality', weight: 10, items: [{ name: 'Clarity & professionalism', weight: 4 }, { name: 'Responsiveness to departments', weight: 3 }, { name: 'Accuracy of written communication', weight: 3 }] }],
  system: [{ section: 'E1. ERP / Procurement System Usage', weight: 10, items: [{ name: 'Proficiency in ERP / procurement systems', weight: 4 }, { name: 'Accuracy of digital entries', weight: 3 }, { name: 'Use of analytics for procurement decisions', weight: 3 }] }],
  weights: { common: 40, process: 30, leadership: 10, communication: 10, system: 10 },
  titles: { common: 'Section A · Common Core Competencies', process: 'Section B · Process Evaluation', leadership: 'Section C · Leadership', communication: 'Section D · Communication', system: 'Section E · System Knowledge' }
};

const itManagerForm = {
  common: [
    { section: 'A1. Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
    { section: 'A2. Professional Conduct & Ethics', weight: 10, items: [{ name: 'Professional behavior with colleagues', weight: 4 }, { name: 'Compliance with company policies', weight: 3 }, { name: 'Integrity & accountability', weight: 3 }] },
    { section: 'A3. Teamwork & Collaboration', weight: 10, items: [{ name: 'Coordination with departments', weight: 4 }, { name: 'Support to team members', weight: 3 }, { name: 'Contribution to organizational goals', weight: 3 }] },
    { section: 'A4. Initiative & Problem Solving', weight: 10, items: [{ name: 'Identifies issues proactively', weight: 3 }, { name: 'Suggests practical solutions', weight: 4 }, { name: 'Takes initiative without waiting', weight: 3 }] }
  ],
  process: [
    { section: 'B1. IT Infrastructure Management', weight: 10, items: [{ name: 'System uptime & reliability', weight: 4 }, { name: 'Quality of maintenance & upgrades', weight: 3 }, { name: 'Network & server performance management', weight: 3 }] },
    { section: 'B2. Cybersecurity & Risk Management', weight: 10, items: [{ name: 'Implementation of security controls', weight: 4 }, { name: 'Vulnerability assessment & mitigation', weight: 3 }, { name: 'Compliance with security policies', weight: 3 }] },
    { section: 'B3. IT Operations & Support', weight: 10, items: [{ name: 'Helpdesk responsiveness & resolution', weight: 4 }, { name: 'Quality of IT documentation', weight: 3 }, { name: 'User satisfaction with IT services', weight: 3 }] }
  ],
  leadership: [{ section: 'C1. Leadership & Team Management', weight: 10, items: [{ name: 'Guidance & supervision of IT team', weight: 4 }, { name: 'Delegation & workload management', weight: 3 }, { name: 'Decision-making & conflict resolution', weight: 3 }] }],
  communication: [{ section: 'D1. Communication Quality', weight: 10, items: [{ name: 'Clarity & professionalism', weight: 4 }, { name: 'Responsiveness to departments', weight: 3 }, { name: 'Accuracy of written communication', weight: 3 }] }],
  system: [{ section: 'E1. System Usage & Technical Skills', weight: 10, items: [{ name: 'Proficiency in ERP / IT systems', weight: 4 }, { name: 'Accuracy of digital entries & logs', weight: 3 }, { name: 'Use of analytics for IT decisions', weight: 3 }] }],
  weights: { common: 40, process: 30, leadership: 10, communication: 10, system: 10 },
  titles: { common: 'Section A · Common Core Competencies', process: 'Section B · Process Evaluation', leadership: 'Section C · Leadership', communication: 'Section D · Communication', system: 'Section E · System Knowledge' }
};

const operationsManagerForm = {
  common: [
    { section: 'A1. Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
    { section: 'A2. Professional Conduct & Ethics', weight: 10, items: [{ name: 'Professional behavior with colleagues', weight: 4 }, { name: 'Compliance with company policies', weight: 3 }, { name: 'Integrity & accountability', weight: 3 }] },
    { section: 'A3. Teamwork & Collaboration', weight: 10, items: [{ name: 'Coordination with all departments', weight: 4 }, { name: 'Support to department heads', weight: 3 }, { name: 'Contribution to organizational goals', weight: 3 }] },
    { section: 'A4. Initiative & Problem Solving', weight: 10, items: [{ name: 'Identifies issues proactively', weight: 3 }, { name: 'Suggests practical solutions', weight: 4 }, { name: 'Takes initiative without waiting', weight: 3 }] }
  ],
  process: [
    { section: 'B1. Multi-Department Oversight', weight: 10, items: [{ name: 'Oversight of Engineering, Procurement, IT', weight: 4 }, { name: 'Coordination across all operational units', weight: 3 }, { name: 'Ensuring departmental alignment', weight: 3 }] },
    { section: 'B2. Service Delivery & Performance', weight: 10, items: [{ name: 'Achievement of KPIs & SLAs', weight: 4 }, { name: 'Quality of operational outputs', weight: 3 }, { name: 'Timeliness of service delivery', weight: 3 }] },
    { section: 'B3. Compliance, Risk & Safety', weight: 10, items: [{ name: 'Compliance with policies & regulations', weight: 4 }, { name: 'Risk management & mitigation', weight: 3 }, { name: 'Emergency preparedness & incident handling', weight: 3 }] }
  ],
  leadership: [{ section: 'C1. Leadership & People Management', weight: 10, items: [{ name: 'Guidance & supervision of department heads', weight: 4 }, { name: 'Delegation & workload management', weight: 3 }, { name: 'Decision-making & conflict resolution', weight: 3 }] }],
  communication: [{ section: 'D1. Communication Quality', weight: 10, items: [{ name: 'Clarity & professionalism', weight: 4 }, { name: 'Responsiveness to stakeholders', weight: 3 }, { name: 'Accuracy of written communication', weight: 3 }] }],
  system: [{ section: 'E1. System Usage & Digital Competency', weight: 10, items: [{ name: 'Proficiency in ERP / CAFM / HRMS systems', weight: 4 }, { name: 'Accuracy of digital entries & reports', weight: 3 }, { name: 'Use of analytics for operational decisions', weight: 3 }] }],
  weights: { common: 40, process: 30, leadership: 10, communication: 10, system: 10 },
  titles: { common: 'Section A · Common Core Competencies', process: 'Section B · Process Evaluation', leadership: 'Section C · Leadership', communication: 'Section D · Communication', system: 'Section E · System Knowledge' }
};

const customerSupportRepresentativeForm = {
  common: [
    { section: 'A1. Attendance & Punctuality', weight: 10, items: [{ name: 'Adherence to working hours', weight: 5 }, { name: 'Timeliness in reporting to duty', weight: 5 }] },
    { section: 'A2. Professional Conduct & Ethics', weight: 10, items: [{ name: 'Professional behavior with customers', weight: 4 }, { name: 'Compliance with company policies', weight: 3 }, { name: 'Integrity & accountability', weight: 3 }] },
    { section: 'A3. Teamwork & Collaboration', weight: 10, items: [{ name: 'Coordination with internal departments', weight: 4 }, { name: 'Support to colleagues', weight: 3 }, { name: 'Contribution to team goals', weight: 3 }] },
    { section: 'A4. Initiative & Problem Solving', weight: 10, items: [{ name: 'Identifies issues proactively', weight: 3 }, { name: 'Suggests practical solutions', weight: 4 }, { name: 'Takes initiative without waiting', weight: 3 }] }
  ],
  process: [
    { section: 'B1. Customer Interaction & Support', weight: 10, items: [{ name: 'Quality of customer communication', weight: 4 }, { name: 'Accuracy of information provided', weight: 3 }, { name: 'Professional handling of inquiries', weight: 3 }] },
    { section: 'B2. Issue Resolution & Follow-Up', weight: 10, items: [{ name: 'Timeliness of issue resolution', weight: 4 }, { name: 'Quality of follow-up', weight: 3 }, { name: 'Escalation accuracy & judgment', weight: 3 }] },
    { section: 'B3. Documentation & Reporting', weight: 10, items: [{ name: 'Accuracy of customer records', weight: 4 }, { name: 'Quality of daily/weekly reports', weight: 3 }, { name: 'Proper use of CRM/ERP systems', weight: 3 }] }
  ],
  leadership: [{ section: 'C1. Work Discipline & Responsibility', weight: 10, items: [{ name: 'Responsibility in handling tasks', weight: 4 }, { name: 'Support to team members', weight: 3 }, { name: 'Ability to work independently', weight: 3 }] }],
  communication: [{ section: 'D1. Communication Quality', weight: 10, items: [{ name: 'Clarity & professionalism', weight: 4 }, { name: 'Responsiveness to customers', weight: 3 }, { name: 'Accuracy of written communication', weight: 3 }] }],
  system: [{ section: 'E1. System Usage & Digital Competency', weight: 10, items: [{ name: 'Proficiency in CRM / ERP systems', weight: 4 }, { name: 'Accuracy of digital entries', weight: 3 }, { name: 'Use of analytics for customer insights', weight: 3 }] }],
  weights: { common: 40, process: 30, leadership: 10, communication: 10, system: 10 },
  titles: { common: 'Section A · Common Core Competencies', process: 'Section B · Process Evaluation', leadership: 'Section C · Leadership', communication: 'Section D · Communication', system: 'Section E · System Knowledge' }
};

const departmentCriteria = {
  Engineering: [
    { section: '2.1 Process Knowledge & Execution', weight: 15, items: [{ name: 'Understanding of Engineering processes', weight: 5 }, { name: 'Accuracy in executing Engineering tasks', weight: 5 }, { name: 'Compliance with SOPs & SLAs', weight: 5 }] },
    { section: '2.2 Quality & Timeliness of Deliverables', weight: 15, items: [{ name: 'Quality of completed Engineering tasks', weight: 5 }, { name: 'Timely submission of work', weight: 5 }, { name: 'Error rate / rework required', weight: 5 }] }
  ],
  HR: [
    { section: '2.1 Process Knowledge & Execution', weight: 15, items: [{ name: 'Understanding of HR processes', weight: 5 }, { name: 'Accuracy in executing HR tasks', weight: 5 }, { name: 'Compliance with SOPs & SLAs', weight: 5 }] },
    { section: '2.2 Quality & Timeliness of Deliverables', weight: 15, items: [{ name: 'Quality of completed HR tasks', weight: 5 }, { name: 'Timely submission of work', weight: 5 }, { name: 'Error rate / rework required', weight: 5 }] }
  ],
  Operations: [
    { section: '2.1 Process Knowledge & Execution', weight: 15, items: [{ name: 'Understanding of Operations processes', weight: 5 }, { name: 'Accuracy in executing Operations tasks', weight: 5 }, { name: 'Compliance with SOPs & SLAs', weight: 5 }] },
    { section: '2.2 Quality & Timeliness of Deliverables', weight: 15, items: [{ name: 'Quality of completed Operations tasks', weight: 5 }, { name: 'Timely submission of work', weight: 5 }, { name: 'Error rate / rework required', weight: 5 }] }
  ],
  Procurement: [
    { section: '2.1 Process Knowledge & Execution', weight: 15, items: [{ name: 'Understanding of Procurement processes', weight: 5 }, { name: 'Accuracy in executing Procurement tasks', weight: 5 }, { name: 'Compliance with SOPs & SLAs', weight: 5 }] },
    { section: '2.2 Quality & Timeliness of Deliverables', weight: 15, items: [{ name: 'Quality of completed Procurement tasks', weight: 5 }, { name: 'Timely submission of work', weight: 5 }, { name: 'Error rate / rework required', weight: 5 }] }
  ]
};

const departmentForms = {
  HR: { common: commonCriteria, process: departmentCriteria.HR, leadership: leadershipCriteria, communication: communicationCriteria, system: systemCriteria, weights: { common: 40, process: 30, leadership: 15, communication: 10, system: 5 } },
  Operations: { common: commonCriteria, process: departmentCriteria.Operations, leadership: leadershipCriteria, communication: communicationCriteria, system: systemCriteria, weights: { common: 40, process: 30, leadership: 15, communication: 10, system: 5 } },
  Procurement: { common: commonCriteria, process: departmentCriteria.Procurement, leadership: leadershipCriteria, communication: communicationCriteria, system: systemCriteria, weights: { common: 40, process: 30, leadership: 15, communication: 10, system: 5 } },
  Engineering: { common: commonCriteria, process: departmentCriteria.Engineering, leadership: leadershipCriteria, communication: communicationCriteria, system: systemCriteria, weights: { common: 40, process: 30, leadership: 15, communication: 10, system: 5 } }
};

const departmentRoles = {
  HR: ['HR Manager'],
  'Customer Service': ['Customer Support Representative'],
  IT: ['IT Manager'],
  Engineering: ['Head of Engineer', 'Facility Manager', 'Facility Engineer', 'Team Leader/ Supervisor', 'Facility Technician'],
  Operations: ['Operation Manager'],
  Procurement: ['Procurement Manager', 'Assistance Purchase']
};

const designationFormKeys = {
  'HR Manager': 'department',
  'Customer Support Representative': 'customerSupportRepresentative',
  'IT Manager': 'itManager',
  'Head of Engineer': 'headOfEngineering',
  'Facility Manager': 'facilityEngineer',
  'Facility Engineer': 'facilityEngineer',
  'Team Leader/ Supervisor': 'facilitySupervisorTeamLeader',
  'Facility Technician': 'facilityTechnician',
  'Operation Manager': 'operationsManager',
  'Procurement Manager': 'procurementManager',
  'Assistance Purchase': 'purchaseAssistant'
};

let employees = [];
let editingEmployeeId = null;
let employeeDocumentPreviewIndex = null;
let employeeDocumentPreviewUrl = null;
let evaluationModalMode = 'new';
let editingEvaluationIndex = null;
let reportAssets = [];
let reportAssignments = [];
let reportResources = [];
let reportSkills = [];
let reportPlans = [];
let reportCertifications = [];

const deletedEvaluationIds = new Set(JSON.parse(localStorage.getItem('northstar-deleted-evaluations') || '[]'));
const cloudEmployeeIds = new Set();

const rows = document.querySelector('#evaluationRows');
const employeeRows = document.querySelector('#employeeRows');
const employeeSearchInput = document.querySelector('#employeeSearchInput');
const employeeDepartmentFilter = document.querySelector('#employeeDepartmentFilter');
const importEmployeesButton = document.querySelector('#importEmployeesButton');
const employeeCsvInput = document.querySelector('#employeeCsvInput');
const employeeModal = document.querySelector('#employeeModal');
const employeeForm = document.querySelector('#employeeForm');
const searchInput = document.querySelector('#searchInput');
const departmentFilter = document.querySelector('#departmentFilter');
const modal = document.querySelector('#evaluationModal');
const employeeSelect = document.querySelector('#employeeSelect');
const commonContainer = document.querySelector('#commonCriteria');
const departmentContainer = document.querySelector('#departmentCriteria');
const leadershipContainer = document.querySelector('#leadershipCriteria');
const communicationContainer = document.querySelector('#communicationCriteria');
const systemContainer = document.querySelector('#systemCriteria');
const totalScore = document.querySelector('#totalScore');
const departmentTitle = document.querySelector('#departmentCriteriaTitle');
const commonTitle = document.querySelector('#commonCriteriaTitle');
const commonWeight = document.querySelector('#commonWeight');
const departmentWeight = document.querySelector('#departmentWeight');
const leadershipWeight = document.querySelector('#leadershipWeight');
const communicationWeight = document.querySelector('#communicationWeight');
const systemWeight = document.querySelector('#systemWeight');
const toast = document.querySelector('#toast');
const progressCurrentQuarter = document.querySelector('#progressCurrentQuarter');
const progressPreviousQuarter = document.querySelector('#progressPreviousQuarter');
const quarterSummary = document.querySelector('#quarterSummary');
const performanceSignals = document.querySelector('#performanceSignals');
const quarterProgressRows = document.querySelector('#quarterProgressRows');
const departmentMovementChart = document.querySelector('#departmentMovementChart');
const previousMovementLabel = document.querySelector('#previousMovementLabel');
const currentMovementLabel = document.querySelector('#currentMovementLabel');
const previousQuarterControlLabel = document.querySelector('#previousQuarterControlLabel');
const currentQuarterControlLabel = document.querySelector('#currentQuarterControlLabel');
const moduleHome = document.querySelector('#moduleHome');
const evaluationsShell = document.querySelector('#evaluationsShell');
const employeesShell = document.querySelector('#employeesShell');
const developmentShell = document.querySelector('#developmentShell');
const reportsShell = document.querySelector('#reportsShell');

function showModule(moduleName) {
  const isHome = moduleName === 'home';
  const isEvaluations = moduleName === 'evaluations';
  const isEmployees = moduleName === 'employees';
  const isDevelopment = moduleName === 'development';
  const isReports = moduleName === 'reports';
  moduleHome?.classList.toggle('active', isHome);
  evaluationsShell?.classList.toggle('module-hidden', !isEvaluations);
  employeesShell?.classList.toggle('module-hidden', !isEmployees);
  developmentShell?.classList.toggle('module-hidden', !isDevelopment);
  reportsShell?.classList.toggle('module-hidden', !isReports);
  moduleHome?.setAttribute('aria-hidden', String(!isHome));
  evaluationsShell?.setAttribute('aria-hidden', String(!isEvaluations));
  employeesShell?.setAttribute('aria-hidden', String(!isEmployees));
  developmentShell?.setAttribute('aria-hidden', String(!isDevelopment));
  reportsShell?.setAttribute('aria-hidden', String(!isReports));
  if (isEvaluations) switchTab('dashboard');
  else if (isReports) switchTab('reports');
  else syncSidebarNav(moduleName, null);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function syncSidebarNav(moduleName, tabName) {
  document.querySelectorAll('.qbel-nav-link[data-module="employees"]').forEach((link) => link.classList.toggle('active', moduleName === 'employees'));
  document.querySelectorAll('.qbel-nav-link[data-module="evaluations"][data-tab]').forEach((link) => link.classList.toggle('active', moduleName === 'evaluations' && link.dataset.tab === tabName));
  document.querySelectorAll('.qbel-nav-link[data-module="reports"]').forEach((link) => link.classList.toggle('active', moduleName === 'reports'));
}

function withDevelopmentFrame(callback, attempt = 0) {
  const frame = document.querySelector('#developmentFrame');
  const frameWindow = frame?.contentWindow;
  if (frameWindow && typeof frameWindow.switchView === 'function' && frameWindow.document?.querySelector('.section-tab')) {
    callback(frameWindow);
    return;
  }
  if (attempt < 40) window.setTimeout(() => withDevelopmentFrame(callback, attempt + 1), 150);
}

function openDevelopmentView(view) {
  showModule('development');
  withDevelopmentFrame((frameWindow) => frameWindow.switchView(view));
}

function openEmployeeLearningPortal(employee) {
  showModule('development');
  withDevelopmentFrame((frameWindow) => {
    frameWindow.switchView('learning');
    const learningSelect = frameWindow.document.querySelector('#learningEmployeeSelect');
    if (learningSelect) {
      learningSelect.value = employee.id;
      learningSelect.dispatchEvent(new Event('change'));
    }
  });
}

function avatarMarkup(employee) {
  return `<span class="avatar avatar-${employee.color}">${employee.initials}</span>`;
}

function employeeEvaluations(employee) {
  if (Array.isArray(employee.evaluations) && employee.evaluations.length) return employee.evaluations;
  return employee.evaluation ? [employee.evaluation] : [];
}

function renderRows() {
  const query = searchInput.value.toLowerCase().trim();
  const department = departmentFilter.value;
  const filtered = employees.filter((employee) => !employee.deleted).flatMap((employee) => employeeEvaluations(employee).map((evaluation, evaluationIndex) => ({ employee, evaluation, evaluationIndex }))).filter(({ employee, evaluation }) => {
    const matchesQuery = `${employee.name} ${employee.department} ${employee.role || ''} ${evaluation.date || ''}`.toLowerCase().includes(query);
    return matchesQuery && (department === 'all' || employee.department === department);
  }).sort((first, second) => new Date(second.evaluation.date || 0) - new Date(first.evaluation.date || 0));

  rows.innerHTML = filtered.map(({ employee, evaluation, evaluationIndex }) => `
    <tr>
      <td><div class="employee-cell">${avatarMarkup(employee)}<div>${employee.name}<small>${employee.role || employee.department} · ${escapeHtml(evaluation.date || 'Date not recorded')}</small></div></div></td>
      <td>${employee.department}</td>
      <td>${employee.evaluator}</td>
      <td><span class="score">${evaluation.score ?? employee.score ?? 0}<small>/100</small></span></td>
      <td><span class="status complete">Completed</span></td>
      <td><div class="row-actions"><button class="table-more" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}" aria-label="More options for ${employee.name}">•••</button><div class="action-menu" data-menu-for="${employee.id}-${evaluationIndex}"><button data-action="view" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}">View form</button><button data-action="edit" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}">Edit evaluation</button><button data-action="delete-evaluation" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}">Delete evaluation</button><button data-action="print" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}">Export as PDF</button></div></div></td>
    </tr>`).join('') || '<tr><td colspan="6" class="empty-state">No evaluations match this search.</td></tr>';
  updateDashboardMetrics();
}

function quarterFromDate(dateValue) {
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return { key: `${date.getFullYear()}-Q${quarter}`, label: `Q${quarter} ${date.getFullYear()}`, year: date.getFullYear(), quarter };
}

function updateEvaluationPeriod() {
  const periodInput = document.querySelector('#evaluationPeriodInput');
  const periodHeading = document.querySelector('#evaluationPeriodHeading');
  const quarter = quarterFromDate(document.querySelector('#evaluationDateInput')?.value);
  const label = quarter?.label || 'Select an evaluation date';
  periodInput.textContent = label;
  periodHeading.textContent = quarter ? `New evaluation - ${label}` : 'New evaluation';
  updatePreviousEvaluationScore();
}

function previousQuarterFrom(quarter) {
  if (!quarter) return null;
  const previousQuarter = quarter.quarter === 1 ? 4 : quarter.quarter - 1;
  const previousYear = quarter.quarter === 1 ? quarter.year - 1 : quarter.year;
  return { key: `${previousYear}-Q${previousQuarter}`, label: `Q${previousQuarter} ${previousYear}` };
}

function updatePreviousEvaluationScore() {
  const previousScore = document.querySelector('#previousScore');
  if (!previousScore) return;
  const employee = employees.find((item) => item.id === employeeSelect.value);
  const previousQuarter = previousQuarterFrom(quarterFromDate(document.querySelector('#evaluationDateInput')?.value));
  if (!employee || !previousQuarter) {
    previousScore.textContent = 'Select an evaluation date';
    return;
  }
  const previousEvaluation = latestEvaluationInQuarter(employee, previousQuarter.key);
  previousScore.textContent = previousEvaluation
    ? `${previousEvaluation.score}/100 (${previousQuarter.label})`
    : `No ${previousQuarter.label} evaluation`;
}

function quarterSortValue(quarter) {
  return quarter.year * 10 + quarter.quarter;
}

function latestEvaluationInQuarter(employee, quarterKey) {
  return employeeEvaluations(employee).filter((evaluation) => quarterFromDate(evaluation.date)?.key === quarterKey).sort((first, second) => new Date(second.date || 0) - new Date(first.date || 0))[0] || null;
}

function renderQuarterlyProgress() {
  const activeEmployees = employees.filter((employee) => !employee.deleted);
  const quarters = [...new Map(activeEmployees.flatMap((employee) => employeeEvaluations(employee).map((evaluation) => quarterFromDate(evaluation.date))).filter(Boolean).map((quarter) => [quarter.key, quarter])).values()].sort((first, second) => quarterSortValue(second) - quarterSortValue(first));
  if (!progressCurrentQuarter || !progressPreviousQuarter || !quarterSummary || !quarterProgressRows) return;
  if (!quarters.length) {
    progressCurrentQuarter.innerHTML = '<option>No quarters yet</option>';
    progressPreviousQuarter.innerHTML = '<option>No quarters yet</option>';
    quarterSummary.innerHTML = '<div class="quarter-empty">Quarterly progress will appear after evaluations are recorded.</div>';
    if (performanceSignals) performanceSignals.innerHTML = '';
    quarterProgressRows.innerHTML = '<tr><td colspan="6" class="empty-state">No evaluation history yet.</td></tr>';
    if (departmentMovementChart) departmentMovementChart.innerHTML = '<div class="quarter-empty">Department movement will appear after two quarters are available.</div>';
    return;
  }
  const selectedCurrent = quarters.some((quarter) => quarter.key === progressCurrentQuarter.value) ? progressCurrentQuarter.value : quarters[0].key;
  const previousOptions = quarters.filter((quarter) => quarter.key !== selectedCurrent);
  const selectedPrevious = previousOptions.some((quarter) => quarter.key === progressPreviousQuarter.value) ? progressPreviousQuarter.value : previousOptions[0]?.key || '';
  progressCurrentQuarter.innerHTML = quarters.map((quarter) => `<option value="${quarter.key}">${quarter.label}</option>`).join('');
  progressPreviousQuarter.innerHTML = previousOptions.length ? previousOptions.map((quarter) => `<option value="${quarter.key}">${quarter.label}</option>`).join('') : '<option value="">No previous quarter</option>';
  progressCurrentQuarter.value = selectedCurrent;
  progressPreviousQuarter.value = selectedPrevious;
  const currentQuarter = quarters.find((quarter) => quarter.key === selectedCurrent);
  const previousQuarter = quarters.find((quarter) => quarter.key === selectedPrevious);
  if (currentMovementLabel) currentMovementLabel.textContent = currentQuarter.label;
  if (previousMovementLabel) previousMovementLabel.textContent = previousQuarter?.label || 'Previous quarter';
  if (currentQuarterControlLabel) currentQuarterControlLabel.textContent = currentQuarter.label;
  if (previousQuarterControlLabel) previousQuarterControlLabel.textContent = previousQuarter?.label || 'Previous quarter';
  const rows = activeEmployees.map((employee) => {
    const current = latestEvaluationInQuarter(employee, selectedCurrent);
    const previous = previousQuarter ? latestEvaluationInQuarter(employee, selectedPrevious) : null;
    const currentScore = current ? Number(current.score) : null;
    const previousScore = previous ? Number(previous.score) : null;
    return { employee, currentScore, previousScore, change: currentScore === null || previousScore === null ? null : currentScore - previousScore };
  }).sort((first, second) => (second.currentScore ?? -1) - (first.currentScore ?? -1));
  const currentScores = rows.filter((row) => row.currentScore !== null).map((row) => row.currentScore);
  const previousScores = rows.filter((row) => row.previousScore !== null).map((row) => row.previousScore);
  const currentAverage = currentScores.length ? currentScores.reduce((sum, score) => sum + score, 0) / currentScores.length : 0;
  const previousAverage = previousScores.length ? previousScores.reduce((sum, score) => sum + score, 0) / previousScores.length : 0;
  const changes = rows.filter((row) => row.change !== null);
  const improvedCount = changes.filter((row) => row.change > 0).length;
  const stableRows = changes.filter((row) => row.change === 0);
  const attentionRows = changes.filter((row) => row.change < 0).sort((first, second) => first.change - second.change);
  const averageChange = currentScores.length && previousScores.length ? currentAverage - previousAverage : null;
  quarterSummary.innerHTML = `<div><span>${escapeHtml(currentQuarter.label)} average</span><strong>${currentAverage.toFixed(1)}<small>/100</small></strong><small>${currentScores.length} evaluated</small></div><div><span>Average change</span><strong class="${averageChange === null ? 'neutral' : averageChange >= 0 ? 'positive' : 'negative'}">${averageChange === null ? '—' : `${averageChange >= 0 ? '+' : ''}${averageChange.toFixed(1)}`}<small>${averageChange === null ? 'Need two quarters' : 'points'}</small></strong><small>${improvedCount} staff improved</small></div><div><span>Comparison coverage</span><strong>${rows.filter((row) => row.currentScore !== null && row.previousScore !== null).length}<small>/${activeEmployees.length}</small></strong><small>${escapeHtml(previousQuarter?.label || 'Previous quarter')} comparison</small></div>`;
  if (performanceSignals) {
    performanceSignals.innerHTML = `
      <div class="signal-panel signal-attention">
        <div class="signal-heading"><span class="section-kicker">Needs attention</span><h3>Declined vs ${escapeHtml(previousQuarter?.label || 'previous quarter')}</h3></div>
        ${attentionRows.length ? attentionRows.map(({ employee, currentScore, change }) => `<div class="signal-row"><div class="employee-cell">${avatarMarkup(employee)}<div>${escapeHtml(employee.name)}<small>${escapeHtml(employee.department)}</small></div></div><strong class="quarter-change negative">${change.toFixed(1)}<small>now ${currentScore}/100</small></strong></div>`).join('') : '<div class="signal-empty">No one declined this quarter. Nice work.</div>'}
      </div>
      <div class="signal-panel signal-stable">
        <div class="signal-heading"><span class="section-kicker">Holding steady</span><h3>Stable vs ${escapeHtml(previousQuarter?.label || 'previous quarter')}</h3></div>
        ${stableRows.length ? stableRows.map(({ employee, currentScore }) => `<div class="signal-row"><div class="employee-cell">${avatarMarkup(employee)}<div>${escapeHtml(employee.name)}<small>${escapeHtml(employee.department)}</small></div></div><strong class="quarter-change neutral">0.0<small>now ${currentScore}/100</small></strong></div>`).join('') : '<div class="signal-empty">No unchanged scores this quarter.</div>'}
      </div>`;
  }
  document.querySelector('#currentQuarterHeading').textContent = currentQuarter.label;
  document.querySelector('#previousQuarterHeading').textContent = previousQuarter?.label || 'Previous';
  quarterProgressRows.innerHTML = rows.map(({ employee, currentScore, previousScore, change }) => {
    const changeClass = change === null ? 'neutral' : change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
    const progressLabel = change === null ? 'Incomplete history' : change > 0 ? 'Improved' : change < 0 ? 'Needs attention' : 'Stable';
    return `<tr><td><div class="employee-cell">${avatarMarkup(employee)}<div>${escapeHtml(employee.name)}<small>${escapeHtml(employee.role || employee.department)}</small></div></div></td><td>${escapeHtml(employee.department)}</td><td><strong class="quarter-score">${currentScore === null ? '—' : `${currentScore}`}<small>/100</small></strong></td><td>${previousScore === null ? '—' : `${previousScore}/100`}</td><td><strong class="quarter-change ${changeClass}">${change === null ? '—' : `${change >= 0 ? '+' : ''}${change.toFixed(1)}`}</strong></td><td><span class="quarter-status ${changeClass}">${progressLabel}</span></td></tr>`;
  }).join('') || '<tr><td colspan="6" class="empty-state">No active employees found.</td></tr>';
  if (departmentMovementChart) {
    const departments = [...new Set(activeEmployees.map((employee) => employee.department))].sort();
    const departmentMovementData = departments.map((department) => {
      const departmentRows = rows.filter((row) => row.employee.department === department);
      const currentScores = departmentRows.filter((row) => row.currentScore !== null).map((row) => row.currentScore);
      const previousScores = departmentRows.filter((row) => row.previousScore !== null).map((row) => row.previousScore);
      const currentAverage = currentScores.length ? currentScores.reduce((sum, score) => sum + score, 0) / currentScores.length : null;
      const previousAverage = previousScores.length ? previousScores.reduce((sum, score) => sum + score, 0) / previousScores.length : null;
      const delta = currentAverage !== null && previousAverage !== null ? currentAverage - previousAverage : null;
      const status = delta === null ? 'No data' : delta > 0 ? 'Improved' : delta < 0 ? 'Declined' : 'Stable';
      return { department, currentAverage, previousAverage, delta, status };
    }).filter((item) => item.currentAverage !== null || item.previousAverage !== null);

    if (!departmentMovementData.length) {
      departmentMovementChart.innerHTML = '<div class="quarter-empty">No departments found.</div>';
      return;
    }

    const groupedBars = `
      <div class="department-grouped-bars">
        ${departmentMovementData.map(({ department, currentAverage, previousAverage, delta }) => {
          const currentWidth = currentAverage === null ? 0 : Math.max(10, (currentAverage / 100) * 100);
          const previousWidth = previousAverage === null ? 0 : Math.max(10, (previousAverage / 100) * 100);
          return `
            <div class="grouped-row">
              <div class="grouped-label">${escapeHtml(department)}</div>
              <div class="grouped-bar-group">
                <div class="mini-bar-stack">
                  <span class="mini-label">${escapeHtml(previousQuarter?.label || 'Prev')}</span>
                  <div class="mini-track"><span class="mini-bar previous" style="width:${previousWidth}%" title="${previousAverage === null ? 'No previous score' : `${previousAverage.toFixed(1)}/100`}"></span></div>
                </div>
                <div class="mini-bar-stack">
                  <span class="mini-label">${escapeHtml(currentQuarter.label)}</span>
                  <div class="mini-track"><span class="mini-bar current" style="width:${currentWidth}%" title="${currentAverage === null ? 'No current score' : `${currentAverage.toFixed(1)}/100`}"></span></div>
                </div>
              </div>
              <div class="movement-delta ${delta === null ? 'neutral' : delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral'}">
                ${delta === null ? '—' : `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}`}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    const heatmap = `
      <div class="department-heatmap">
        <div class="heatmap-header">
          <span>Dept</span>
          <span>${escapeHtml(currentQuarter.label)}</span>
          <span>${escapeHtml(previousQuarter?.label || 'Prev')}</span>
        </div>
        ${departmentMovementData.map(({ department, currentAverage, previousAverage }) => {
          const cellColor = (score) => {
            if (score === null) return 'rgba(127, 132, 147, 0.08)';
            const alpha = 0.12 + ((score / 100) * 0.75);
            return `rgba(19, 122, 98, ${alpha})`;
          };
          return `
            <div class="heatmap-row">
              <span class="heatmap-name">${escapeHtml(department)}</span>
              <span class="heatmap-cell" style="background:${cellColor(currentAverage)}">${currentAverage === null ? '—' : currentAverage.toFixed(1)}</span>
              <span class="heatmap-cell" style="background:${cellColor(previousAverage)}">${previousAverage === null ? '—' : previousAverage.toFixed(1)}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;

    departmentMovementChart.innerHTML = `
      <div class="multi-chart-grid two-up">
        <div class="chart-card compare-card">
          <div class="chart-card-header"><span>Department progress</span></div>
          ${groupedBars}
        </div>
        <div class="chart-card heatmap-card">
          <div class="chart-card-header"><span>Performance heatmap</span></div>
          ${heatmap}
        </div>
      </div>
    `;
  }
}

function updateDashboardMetrics() {
  const activeEmployees = employees.filter((employee) => !employee.deleted);
  const completedEmployees = activeEmployees.filter((employee) => employee.status === 'Completed' || employeeEvaluations(employee).length || Number(employee.score) > 0);
  const pendingCount = Math.max(activeEmployees.length - completedEmployees.length, 0);
  const averageScore = completedEmployees.length ? completedEmployees.reduce((sum, employee) => sum + Number(latestEvaluation(employee)?.score ?? employee.score ?? 0), 0) / completedEmployees.length : 0;
  const departmentNames = [...new Set(activeEmployees.map((employee) => employee.department))];
  const totalEmployeesStat = document.querySelector('#totalEmployeesStat');
  const averageScoreStat = document.querySelector('#averageScoreStat');
  const pendingReviewsStat = document.querySelector('#pendingReviewsStat');
  const departmentsStat = document.querySelector('#departmentsStat');
  if (totalEmployeesStat) totalEmployeesStat.textContent = activeEmployees.length;
  if (averageScoreStat) averageScoreStat.textContent = averageScore.toFixed(1);
  if (pendingReviewsStat) pendingReviewsStat.textContent = pendingCount;
  if (departmentsStat) departmentsStat.textContent = departmentNames.length;
  const cycleNumber = document.querySelector('.cycle-number strong');
  const cycleTotal = document.querySelector('.cycle-number span');
  const progressBar = document.querySelector('.progress-track.large span');
  const cycleFooter = document.querySelectorAll('.cycle-footer b');
  if (cycleNumber) cycleNumber.textContent = completedEmployees.length;
  if (cycleTotal) cycleTotal.innerHTML = `of ${activeEmployees.length}<br />completed`;
  if (progressBar) progressBar.style.width = `${activeEmployees.length ? Math.round((completedEmployees.length / activeEmployees.length) * 100) : 0}%`;
  if (cycleFooter.length >= 2) { cycleFooter[0].textContent = completedEmployees.length; cycleFooter[1].textContent = pendingCount; }
  const cycleStatus = document.querySelector('.cycle-panel .status-pill');
  if (cycleStatus) cycleStatus.textContent = pendingCount ? 'In progress' : 'Complete';
  const healthList = document.querySelector('.department-list');
  const colors = ['purple', 'coral', 'yellow', 'mint'];
  if (healthList) healthList.innerHTML = departmentNames.map((department, index) => `<div class="department-row"><span class="department-color ${colors[index % colors.length]}"></span><strong>${escapeHtml(department)}</strong><span class="department-count"></span><div class="mini-track"><span></span></div><b>0%</b></div>`).join('');
  const healthRows = document.querySelectorAll('.department-list .department-row');
  healthRows.forEach((row) => {
    const department = row.querySelector('strong')?.textContent.trim();
    const departmentEmployees = activeEmployees.filter((employee) => employee.department === department);
    const departmentCompleted = departmentEmployees.filter((employee) => employee.status === 'Completed' || employeeEvaluations(employee).length || Number(employee.score) > 0);
    const percentage = departmentEmployees.length ? Math.round((departmentCompleted.length / departmentEmployees.length) * 100) : 0;
    const count = row.querySelector('.department-count');
    const bar = row.querySelector('.mini-track span');
    const value = row.querySelector('b');
    if (count) count.textContent = `${departmentEmployees.length} people`;
    if (bar) bar.style.width = `${percentage}%`;
    if (value) value.textContent = `${percentage}%`;
  });
  renderQuarterlyProgress();
}

function renderEmployeeDepartmentFilterOptions() {
  if (!employeeDepartmentFilter) return;
  const current = employeeDepartmentFilter.value || 'all';
  const departments = [...new Set(employees.filter((employee) => !employee.deleted).map((employee) => employee.department).filter(Boolean))].sort();
  employeeDepartmentFilter.innerHTML = ['<option value="all">All departments</option>', ...departments.map((department) => `<option value="${escapeHtml(department)}">${escapeHtml(department)}</option>`)].join('');
  employeeDepartmentFilter.value = departments.includes(current) || current === 'all' ? current : 'all';
}

const workforcePalette = ['var(--coral)', 'var(--blue)', 'var(--mint)', 'var(--purple)', 'var(--yellow)', 'var(--green)', 'var(--orange)'];

function renderEmployeeStats(activeEmployees) {
  const heroCount = document.querySelector('#employeeHeroCount');
  if (heroCount) heroCount.textContent = activeEmployees.length;
  renderDepartmentMixPulse(activeEmployees);
  renderManagerCoveragePulse(activeEmployees);
  renderNewFacesPulse(activeEmployees);
}

function renderDepartmentMixPulse(activeEmployees) {
  const donut = document.querySelector('#departmentMixDonut');
  const centerCount = document.querySelector('#departmentMixCenterCount');
  const legend = document.querySelector('#departmentMixLegend');
  if (!donut) return;
  const counts = new Map();
  activeEmployees.forEach((employee) => {
    const department = employee.department || 'Unassigned';
    counts.set(department, (counts.get(department) || 0) + 1);
  });
  const entries = [...counts.entries()].sort((first, second) => second[1] - first[1]);
  centerCount.textContent = entries.length;
  if (!entries.length || !activeEmployees.length) {
    donut.style.background = '#edf2ee';
    legend.innerHTML = '<div class="pulse-empty">No employees yet to chart.</div>';
    return;
  }
  let cursor = 0;
  const stops = entries.map(([department, count], index) => {
    const color = workforcePalette[index % workforcePalette.length];
    const share = (count / activeEmployees.length) * 100;
    const stop = `${color} ${cursor}% ${cursor + share}%`;
    cursor += share;
    return stop;
  });
  donut.style.background = `conic-gradient(${stops.join(',')})`;
  legend.innerHTML = entries.map(([department, count], index) => `<div class="pulse-legend-item"><span class="pulse-legend-dot" style="background:${workforcePalette[index % workforcePalette.length]}"></span>${escapeHtml(department)}<b>${count}</b></div>`).join('');
}

function renderManagerCoveragePulse(activeEmployees) {
  const ring = document.querySelector('#managerCoverageRing');
  const percentLabel = document.querySelector('#managerCoveragePercent');
  const copy = document.querySelector('#managerCoverageCopy');
  if (!ring) return;
  const withManager = activeEmployees.filter((employee) => employee.reportingTo).length;
  const percent = activeEmployees.length ? Math.round((withManager / activeEmployees.length) * 100) : 0;
  ring.style.background = `conic-gradient(var(--brand) 0% ${percent}%, #edf2ee ${percent}% 100%)`;
  percentLabel.textContent = `${percent}%`;
  copy.textContent = `${withManager} of ${activeEmployees.length} people have a reporting line on file.`;
}

function renderNewFacesPulse(activeEmployees) {
  const list = document.querySelector('#newFacesList');
  if (!list) return;
  const joiners = activeEmployees
    .filter((employee) => employee.joiningDate && !Number.isNaN(new Date(employee.joiningDate).getTime()))
    .sort((first, second) => new Date(second.joiningDate) - new Date(first.joiningDate))
    .slice(0, 3);
  list.innerHTML = joiners.length
    ? joiners.map((employee) => `<div class="pulse-newface-row">${avatarMarkup(employee)}<div><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.department || 'Unassigned')} · Joined ${escapeHtml(employee.joiningDate)}</small></div></div>`).join('')
    : '<div class="pulse-empty">No joining dates recorded yet.</div>';
}


function renderEmployeeRows() {
  const query = employeeSearchInput.value.toLowerCase().trim();
  const selectedDepartment = employeeDepartmentFilter?.value || 'all';
  const activeEmployees = employees.filter((employee) => !employee.deleted);
  renderEmployeeDepartmentFilterOptions();
  renderEmployeeStats(activeEmployees);
  const filtered = activeEmployees
    .filter((employee) => selectedDepartment === 'all' || employee.department === selectedDepartment)
    .filter((employee) => `${employee.name} ${employee.department} ${employee.role || ''} ${employee.reportingTo || ''}`.toLowerCase().includes(query));
  employeeRows.innerHTML = filtered.map((employee) => `
    <article class="employee-card">
      <div class="employee-card-top">
        ${avatarMarkup(employee)}
        <div class="employee-card-identity"><strong>${escapeHtml(employee.name)}</strong><small>${escapeHtml(employee.role || employee.designation || 'Not assigned')}</small></div>
      </div>
      <span class="employee-card-department">${escapeHtml(employee.department || 'Unassigned')}</span>
      <div class="employee-card-meta">
        <div><span>Joining date</span><strong>${escapeHtml(employee.joiningDate || 'Not provided')}</strong></div>
        <div><span>Reporting to</span><strong>${escapeHtml(employee.reportingTo || 'Not provided')}</strong></div>
      </div>
      <div class="employee-card-actions"><button type="button" data-employee-action="scores" data-employee-id="${employee.id}">Open profile</button><button type="button" data-employee-action="edit" data-employee-id="${employee.id}">Edit</button><button type="button" class="employee-card-delete" data-employee-action="delete" data-employee-id="${employee.id}">Delete</button></div>
    </article>`).join('') || '<div class="empty-state employee-grid-empty">No employees match this search.</div>';
}

function employeeById(id) {
  return employees.find((employee) => employee.id === id);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let quoted = false;
  const input = text.replace(/^\uFEFF/, '');
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const nextCharacter = input[index + 1];
    if (character === '"' && quoted && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === ',' && !quoted) {
      row.push(value.trim());
      value = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && nextCharacter === '\n') index += 1;
      row.push(value.trim());
      if (row.some((cell) => cell)) rows.push(row);
      row = [];
      value = '';
    } else {
      value += character;
    }
  }
  row.push(value.trim());
  if (row.some((cell) => cell)) rows.push(row);
  return rows;
}

async function importEmployeesFromCsv(file) {
  const rows = parseCsv(await file.text());
  if (rows.length < 2) throw new Error('The CSV must include a header row and at least one employee.');
  const headers = rows[0].map((header) => header.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const column = (...names) => names.map((name) => headers.indexOf(name)).find((index) => index >= 0);
  const nameIndex = column('name', 'fullname', 'employeename');
  const departmentIndex = column('department');
  const designationIndex = column('designation', 'role', 'jobtitle');
  const joiningDateIndex = column('joiningdate', 'dateofjoining');
  const reportingToIndex = column('reportingto', 'manager', 'managername');
  if ([nameIndex, departmentIndex, designationIndex].some((index) => index === undefined)) {
    throw new Error('CSV headers must include name, department, and designation.');
  }
  const existingEmployees = new Set(employees.map((employee) => `${employee.name}|${employee.department}`.toLowerCase()));
  const importedEmployees = [];
  rows.slice(1).forEach((row, rowIndex) => {
    const name = row[nameIndex] || '';
    const department = row[departmentIndex] || '';
    const role = row[designationIndex] || '';
    if (!name || !department || !role) return;
    const duplicateKey = `${name}|${department}`.toLowerCase();
    if (existingEmployees.has(duplicateKey)) return;
    existingEmployees.add(duplicateKey);
    importedEmployees.push({
      id: `employee-import-${Date.now()}-${rowIndex}`,
      name,
      initials: name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      department,
      role,
      designation: role,
      joiningDate: joiningDateIndex === undefined ? '' : row[joiningDateIndex] || '',
      reportingTo: reportingToIndex === undefined ? '' : row[reportingToIndex] || '',
      evaluator: reportingToIndex === undefined ? '' : row[reportingToIndex] || '',
      documents: [],
      evaluations: [],
      evaluation: null,
      score: 0,
      status: 'Pending',
      color: ['blue', 'coral', 'mint', 'purple', 'yellow'][(employees.length + importedEmployees.length) % 5]
    });
  });
  if (!importedEmployees.length) throw new Error('No new employees were found in the CSV.');
  employees.push(...importedEmployees);
  persistSavedEmployees();
  renderEmployeeRows();
  renderRows();
  updateEmployeeOptions();
  await syncCloudData();
  return importedEmployees.length;
}

function persistSavedEmployees() {
  try { localStorage.setItem('northstar-employees', JSON.stringify(employees)); } catch (error) { localStorage.setItem('northstar-employees', JSON.stringify(employees.map((employee) => ({ ...employee, documents: (employee.documents || []).map(({ name, type, size }) => ({ name, type, size })) })))); }
}

function isCloudId(id) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(id || ''));
}

function evaluationFromCloud(record) {
  return {
    cloudId: record.id,
    score: Number(record.score),
    date: record.evaluation_date,
    criteria: record.ratings || [],
    development: record.employee_area_of_development || '',
    improvement: record.employee_improvement || '',
    strength: record.employee_strength || '',
    managerComments: record.direct_manager_comments || '',
    evaluatorComment: record.evaluator_comment || '',
    signatures: {
      employeeSignature: record.employee_signature || '',
      managerSignature: record.manager_signature || '',
      evaluatorSignature: record.evaluator_signature || ''
    }
  };
}

async function loadCloudData() {
  if (!window.supabaseClient) return;
  const [{ data: employeeRowsFromCloud, error: employeeError }, { data: evaluationRowsFromCloud, error: evaluationError }] = await Promise.all([
    window.supabaseClient.from('employees').select('*').order('created_at', { ascending: true }),
    window.supabaseClient.from('evaluations').select('*').order('evaluation_date', { ascending: true })
  ]);
  if (employeeError || evaluationError) {
    console.error('Could not load Supabase data', employeeError || evaluationError);
    toast.textContent = 'Could not load shared data from Supabase.';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3500);
    return;
  }
  const evaluationsByEmployee = new Map();
  (evaluationRowsFromCloud || []).forEach((record) => {
    const list = evaluationsByEmployee.get(record.employee_id) || [];
    list.push(evaluationFromCloud(record));
    evaluationsByEmployee.set(record.employee_id, list);
  });
  cloudEmployeeIds.clear();
  employees = (employeeRowsFromCloud || []).map((record, index) => {
    const evaluations = evaluationsByEmployee.get(record.id) || [];
    const latest = evaluations[evaluations.length - 1];
    cloudEmployeeIds.add(record.id);
    return {
      id: record.id,
      name: record.full_name,
      initials: record.full_name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      department: record.department,
      role: record.designation,
      designation: record.designation,
      joiningDate: record.joining_date || '',
      reportingTo: record.reporting_to || '',
      evaluator: record.reporting_to || '',
      documents: record.job_description_name ? [{ name: record.job_description_name, dataUrl: record.job_description_url }] : [],
      evaluations,
      evaluation: latest || null,
      score: latest?.score || 0,
      status: latest ? 'Completed' : 'Pending',
      color: ['blue', 'coral', 'mint', 'purple', 'yellow'][index % 5]
    };
  });
  persistSavedEmployees();
  renderEmployeeRows();
  renderRows();
  updateEmployeeOptions();
  if (document.querySelector('#reportsTab')?.classList.contains('active')) renderReports();
}

async function syncCloudData() {
  if (!window.supabaseClient) return;
  try {
    const currentCloudIds = new Set();
    for (const employee of employees.filter((item) => !item.deleted)) {
      let cloudEmployee;
      const employeePayload = {
        full_name: employee.name,
        department: employee.department,
        designation: employee.role || employee.designation || 'Not assigned',
        joining_date: employee.joiningDate || null,
        reporting_to: employee.reportingTo || employee.evaluator || null,
        job_description_name: employee.documents?.[0]?.name || null,
        job_description_url: employee.documents?.[0]?.dataUrl || null,
        updated_at: new Date().toISOString()
      };
      if (isCloudId(employee.id)) {
        const result = await window.supabaseClient.from('employees').update(employeePayload).eq('id', employee.id).select().single();
        if (result.error) throw result.error;
        cloudEmployee = result.data;
      } else {
        const result = await window.supabaseClient.from('employees').insert(employeePayload).select().single();
        if (result.error) throw result.error;
        cloudEmployee = result.data;
        employee.id = cloudEmployee.id;
      }
      currentCloudIds.add(cloudEmployee.id);
      const deleteEvaluations = await window.supabaseClient.from('evaluations').delete().eq('employee_id', cloudEmployee.id);
      if (deleteEvaluations.error) throw deleteEvaluations.error;
      const evaluations = employeeEvaluations(employee).map((evaluation) => ({
        employee_id: cloudEmployee.id,
        evaluation_date: evaluation.date || new Date().toISOString().slice(0, 10),
        score: Number(evaluation.score || 0),
        previous_score: null,
        ratings: evaluation.criteria || [],
        employee_area_of_development: evaluation.development || null,
        employee_improvement: evaluation.improvement || null,
        employee_strength: evaluation.strength || null,
        direct_manager_comments: evaluation.managerComments || null,
        evaluator_comment: evaluation.evaluatorComment || null,
        employee_signature: evaluation.signatures?.employeeSignature || null,
        manager_signature: evaluation.signatures?.managerSignature || null,
        evaluator_signature: evaluation.signatures?.evaluatorSignature || null
      }));
      if (evaluations.length) {
        const inserted = await window.supabaseClient.from('evaluations').insert(evaluations);
        if (inserted.error) throw inserted.error;
      }
    }
    const removedIds = [...cloudEmployeeIds].filter((id) => !currentCloudIds.has(id));
    if (removedIds.length) {
      const removed = await window.supabaseClient.from('employees').delete().in('id', removedIds);
      if (removed.error) throw removed.error;
      removedIds.forEach((id) => cloudEmployeeIds.delete(id));
    }
    currentCloudIds.forEach((id) => cloudEmployeeIds.add(id));
    persistSavedEmployees();
  } catch (error) {
    console.error('Could not save Supabase data', error);
    toast.textContent = 'Could not save shared data to Supabase.';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3500);
  }
}

function getEvaluationForm(department, role) {
  const formKey = designationFormKeys[role];
  const formByKey = { customerSupportRepresentative: customerSupportRepresentativeForm, itManager: itManagerForm, headOfEngineering: headOfEngineeringForm, facilityEngineer: facilityEngineerForm, facilityTechnician: facilityTechnicianForm, facilitySupervisorTeamLeader: facilitySupervisorTeamLeaderForm, operationsManager: operationsManagerForm, procurementManager: procurementManagerForm, purchaseAssistant: purchaseAssistantForm };
  return formByKey[formKey] || departmentForms[department] || departmentForms.Engineering;
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]));
}

function exportEvaluationPdf(employee, evaluation = latestEvaluation(employee)) {
  const form = getEvaluationForm(employee.department, employee.role);
  evaluation = evaluation || {};
  const sections = [
    { title: form.titles?.common || 'Section A · Common Core Competencies', criteria: form.common || commonCriteria },
    { title: form.titles?.process || `Section B · ${employee.department} Process Evaluation`, criteria: form.process },
    { title: form.titles?.leadership || 'Section C · Leadership', criteria: form.leadership },
    { title: form.titles?.communication || 'Section D · Communication', criteria: form.communication },
    { title: form.titles?.system || 'Section E · System Knowledge', criteria: form.system }
  ];
  const criteriaIndex = evaluation.criteria || [];
  let criterionIndex = 0;
  const sectionsHtml = sections.map((section) => {
    const groups = section.criteria.map((group) => {
      const rows = group.items.map((criterion) => {
        const score = criteriaIndex[criterionIndex++] ?? '';
        const weighted = score === '' ? 0 : (Number(score) / 5) * criterion.weight;
        return { criterion, score, weighted };
      });
      const groupWeight = group.weight || rows.reduce((sum, row) => sum + Number(row.criterion.weight || 0), 0);
      const groupObtained = rows.reduce((sum, row) => sum + row.weighted, 0);
      const rowsHtml = rows.map((row) => `<tr><td>${escapeHtml(row.criterion.name)}</td><td>${row.criterion.weight}</td><td>${row.score === '' ? '—' : `${row.score}/5`}</td><td>${row.score === '' ? '—' : row.weighted.toFixed(1)}</td></tr>`).join('');
      return { html: `<h3>${escapeHtml(group.section)} <span>Obtained ${groupObtained.toFixed(1)} / ${groupWeight} points</span></h3><table><thead><tr><th>Criterion</th><th>Weight</th><th>Score</th><th>Weighted score</th></tr></thead><tbody>${rowsHtml}</tbody><tfoot><tr><td colspan="3">Subsection total</td><td>${groupObtained.toFixed(1)} / ${groupWeight}</td></tr></tfoot></table>`, obtained: groupObtained, weight: groupWeight };
    });
    const sectionObtained = groups.reduce((sum, group) => sum + group.obtained, 0);
    const sectionWeight = groups.reduce((sum, group) => sum + group.weight, 0);
    return `<section><h2>${escapeHtml(section.title)} <span>Obtained ${sectionObtained.toFixed(1)} / ${sectionWeight} points</span></h2>${groups.map((group) => group.html).join('')}</section>`;
  }).join('');
  const signatureLabels = [
    ['employeeSignature', 'Employee Signature'],
    ['managerSignature', 'Manager Signature'],
    ['evaluatorSignature', 'Evaluator Signature']
  ];
  const signatureHtml = `<div class="signatures">${signatureLabels.map(([id, label]) => {
    const signature = evaluation.signatures?.[id];
    return `<div class="signature">${signature ? `<img src="${signature}" alt="${label}" style="display:block;width:100%;height:70px;object-fit:contain;margin-bottom:8px" />` : '<div style="height:70px"></div>'}<span>${label}</span></div>`;
  }).join('')}</div>`;
  const reportHtml = `<!doctype html><html><head><title>Evaluation - ${escapeHtml(employee.name)}</title><style>body{font-family:Arial,sans-serif;color:#202331;margin:36px}h1{color:#013220;margin-bottom:4px}h2{border-bottom:2px solid #013220;padding-bottom:8px;margin-top:28px}h3{font-size:14px;color:#013220;margin:18px 0 6px}h3 span{float:right;font-size:11px;color:#66756e}.meta{display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#f4f7f5;padding:18px}.meta strong{display:block;font-size:11px;color:#64736c;text-transform:uppercase;margin-bottom:4px}.score{font-size:28px;color:#013220;font-weight:700}table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:11px}th,td{border:1px solid #d9e2dd;padding:7px;text-align:left}th{background:#edf4f0;color:#365449}.comments{white-space:pre-wrap;border:1px solid #d9e2dd;padding:12px;min-height:45px;margin-bottom:12px}.signatures{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:20px}.signature{border-top:1px solid #555;padding-top:7px;font-size:11px}@media print{button{display:none}section{break-inside:avoid}}</style></head><body><h1>Qbel FM &amp; Technical Services</h1><p>Employee Evaluation</p><div class="meta"><div><strong>Employee</strong>${escapeHtml(employee.name)}</div><div><strong>Department</strong>${escapeHtml(employee.department)}</div><div><strong>Designation</strong>${escapeHtml(employee.role || 'Not provided')}</div><div><strong>Joining date</strong>${escapeHtml(employee.joiningDate || 'Not provided')}</div><div><strong>Reporting to</strong>${escapeHtml(employee.reportingTo || 'Not provided')}</div><div><strong>Previous score</strong>${Number(employee.score) > 0 ? `${employee.score}/100` : 'No previous evaluation'}</div></div><h2>Evaluation Summary</h2><p class="score">${evaluation.score ?? employee.score ?? 0}/100</p><p>Evaluation date: ${escapeHtml(evaluation.date || new Date().toLocaleDateString())}</p>${sectionsHtml}<h2>Comments</h2><div class="comments"><strong>Employee Area of Development</strong><br>${escapeHtml(evaluation.development)}</div><div class="comments"><strong>Employee Improvement</strong><br>${escapeHtml(evaluation.improvement)}</div><div class="comments"><strong>Employee Strength</strong><br>${escapeHtml(evaluation.strength)}</div><div class="comments"><strong>Direct Manager Comments</strong><br>${escapeHtml(evaluation.managerComments)}</div><div class="comments"><strong>Evaluator Comment</strong><br>${escapeHtml(evaluation.evaluatorComment)}</div><div class="signatures"><div class="signature">Employee Signature</div><div class="signature">Manager Signature</div><div class="signature">Evaluator Signature</div></div><p>Use the print dialog to select “Save as PDF” or print this evaluation.</p></body></html>`;
  showPrintPreview(reportHtml.replace('<div class="signatures"><div class="signature">Employee Signature</div><div class="signature">Manager Signature</div><div class="signature">Evaluator Signature</div></div>', signatureHtml));
}

function showPrintPreview(reportHtml) {
  let preview = document.querySelector('#printPreview');
  if (!preview) {
    preview = document.createElement('div');
    preview.id = 'printPreview';
    preview.className = 'modal-backdrop open';
    preview.innerHTML = '<section class="print-preview" role="dialog" aria-modal="true"><div class="print-preview-toolbar"><strong>Evaluation preview</strong><div><button class="outline-button" id="closePrintPreview">Close</button><button class="primary-button" id="printPreviewButton">Print / Save PDF</button></div></div><iframe title="Evaluation print preview"></iframe></section>';
    document.body.appendChild(preview);
    const style = document.createElement('style');
    style.textContent = '#printPreview{padding:18px;z-index:30}.print-preview{display:flex;flex-direction:column;width:min(1000px,100%);height:min(92vh,900px);background:#fff;border-radius:12px;overflow:hidden}.print-preview-toolbar{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--line);color:var(--brand)}.print-preview-toolbar button{margin-left:8px}.print-preview iframe{flex:1;width:100%;border:0;background:#fff}@media(max-width:760px){.print-preview-toolbar{align-items:flex-start;gap:10px;flex-direction:column}.print-preview-toolbar button{margin-left:0;margin-right:6px}}';
    document.head.appendChild(style);
    const profileStyle = document.createElement('style');
    profileStyle.textContent = '.employee-profile-tabs{display:flex;gap:7px;margin:20px 0 16px;border-bottom:1px solid var(--line)}.employee-profile-tab{padding:9px 11px;background:transparent;color:var(--muted);font-size:11px;font-weight:700;border-bottom:2px solid transparent}.employee-profile-tab.active{color:var(--brand);border-color:var(--brand)}.employee-profile-panel{display:none}.employee-profile-panel.active{display:block}.employee-learning-profile,.employee-assets-profile,.employee-documents-profile{display:grid;gap:8px}.profile-record{display:grid;grid-template-columns:1fr auto;gap:5px 12px;align-items:center;padding:13px;background:#f7faf8;border:1px solid #e3ece7;border-radius:8px}.profile-record strong{font-size:12px}.profile-record small{color:var(--muted);font-size:10px}.profile-status{grid-row:1/3;grid-column:2;padding:5px 8px;border-radius:999px;background:#fff1df;color:#a76c21;font-size:10px;font-weight:700}.profile-status.complete{background:#e3f3e8;color:#26804c}.profile-document-actions{display:flex;gap:6px}.row-actions-button{padding:7px 9px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--brand);font-size:10px;font-weight:700;text-decoration:none}.profile-document-preview{width:100%;margin-top:8px;border:1px solid #dbe7e0;border-radius:7px;overflow:hidden;background:#fff}.profile-document-preview>div{display:flex;justify-content:space-between;align-items:center;padding:9px 11px;font-size:10px}.profile-document-pdf{display:block;width:100%;height:800px;border:0}.document-preview-close{border:0;background:transparent;color:#b85c52;font-size:10px;font-weight:700}@media(max-width:760px){.employee-profile-tabs{overflow:auto}.employee-profile-tab{white-space:nowrap}.profile-record{grid-template-columns:1fr}.profile-status{grid-row:auto;grid-column:auto;width:max-content}.profile-document-actions{justify-content:flex-start}.profile-document-pdf{height:560px}}';
    document.head.appendChild(profileStyle);
    document.querySelector('#closePrintPreview').addEventListener('click', () => preview.remove());
    document.querySelector('#printPreviewButton').addEventListener('click', () => preview.querySelector('iframe').contentWindow.print());
  }
  preview.querySelector('iframe').srcdoc = reportHtml;
}

function deleteEvaluation(employee, evaluationIndex = null) {
  if (!window.confirm(`Delete the evaluation for ${employee.name}? The employee profile will be kept.`)) return;
  const evaluations = [...employeeEvaluations(employee)];
  const targetIndex = Number.isInteger(evaluationIndex) ? evaluationIndex : evaluations.length - 1;
  evaluations.splice(targetIndex, 1);
  employee.evaluations = evaluations;
  employee.evaluation = evaluations[evaluations.length - 1] || null;
  employee.score = employee.evaluation?.score || 0;
  employee.status = employee.evaluation ? 'Completed' : 'Pending';
  persistSavedEmployees();
  void syncCloudData();
  renderEmployeeRows();
  renderRows();
  updateDashboardMetrics();
}

function criteriaMarkup(criteria, group) {
  return criteria.map((section) => `
    <div class="criteria-section-label"><strong>${section.section}</strong><small>${section.weight} points total</small></div>
    ${section.items.map((criterion) => `
      <div class="criteria-item">
        <div><strong>${criterion.name}</strong><small>Weight: ${criterion.weight} points</small></div>
        <div class="score-buttons" data-group="${group}">
          ${[0, 1, 2, 3, 4, 5].map((score) => `<button type="button" class="score-button" data-score="${score}" data-weight="${criterion.weight}" aria-label="${criterion.name}: ${score} out of 5">${score}</button>`).join('')}
        </div>
      </div>`).join('')}`).join('');
}

function updateTotal() {
  const selected = [...document.querySelectorAll('.score-button.selected')];
  const points = selected.reduce((sum, button) => sum + (Number(button.dataset.score) / 5) * Number(button.dataset.weight), 0);
  totalScore.textContent = Math.round(points);
}

function renderCriteria(department, role) {
  const formKey = designationFormKeys[role];
  const formByKey = { customerSupportRepresentative: customerSupportRepresentativeForm, itManager: itManagerForm, headOfEngineering: headOfEngineeringForm, facilityEngineer: facilityEngineerForm, facilityTechnician: facilityTechnicianForm, facilitySupervisorTeamLeader: facilitySupervisorTeamLeaderForm, operationsManager: operationsManagerForm, procurementManager: procurementManagerForm, purchaseAssistant: purchaseAssistantForm };
  const form = formByKey[formKey] || departmentForms[department] || departmentForms.Engineering;
  commonContainer.innerHTML = criteriaMarkup(form.common || commonCriteria, 'common');
  departmentContainer.innerHTML = criteriaMarkup(form.process, 'department');
  leadershipContainer.innerHTML = criteriaMarkup(form.leadership, 'leadership');
  communicationContainer.innerHTML = criteriaMarkup(form.communication, 'communication');
  systemContainer.innerHTML = criteriaMarkup(form.system, 'system');
  commonTitle.textContent = form.titles?.common || 'Section 1 · Common Core Competencies';
  commonWeight.textContent = `${form.weights.common} points total`;
  departmentTitle.textContent = form.titles?.process || `Section 2 · ${department} Process Evaluation`;
  departmentWeight.textContent = `${form.weights.process} points total`;
  leadershipWeight.textContent = `${form.weights.leadership} points total`;
  communicationWeight.textContent = `${form.weights.communication} points total`;
  systemWeight.textContent = `${form.weights.system} points total`;
  const sectionHeaders = document.querySelectorAll('.evaluation-modal .criteria-header span');
  sectionHeaders[2].textContent = form.titles?.leadership || 'Section 3 · Leadership Competencies';
  sectionHeaders[3].textContent = form.titles?.communication || 'Section 4 · Communication Skills';
  sectionHeaders[4].textContent = form.titles?.system || 'Section 5 · System Knowledge & Digital Competency';
  document.querySelectorAll('.score-button').forEach((button) => button.addEventListener('click', () => {
    button.parentElement.querySelectorAll('.score-button').forEach((sibling) => sibling.classList.remove('selected'));
    button.classList.add('selected');
    updateTotal();
  }));
}

function latestEvaluation(employee, evaluationIndex = null) {
  const evaluations = employeeEvaluations(employee);
  if (Number.isInteger(evaluationIndex)) return evaluations[evaluationIndex] || null;
  return employee.evaluation || evaluations[evaluations.length - 1] || null;
}

function applyEvaluationToModal(evaluation) {
  if (!evaluation) return;
  const scores = evaluation.criteria || [];
  document.querySelectorAll('.score-buttons').forEach((group, index) => {
    const savedScore = scores[index];
    if (savedScore === undefined || savedScore === null || savedScore === '') return;
    const selectedButton = group.querySelector(`[data-score="${savedScore}"]`);
    if (selectedButton) selectedButton.classList.add('selected');
  });
  document.querySelector('#evaluationDateInput').value = evaluation.date || new Date().toISOString().slice(0, 10);
  updateEvaluationPeriod();
  document.querySelector('#developmentComments').value = evaluation.development || '';
  document.querySelector('#improvementComments').value = evaluation.improvement || '';
  document.querySelector('#strengthComments').value = evaluation.strength || '';
  document.querySelector('#managerComments').value = evaluation.managerComments || '';
  document.querySelector('#evaluatorComments').value = evaluation.evaluatorComment || '';
  applySignaturesToModal(evaluation.signatures || {});
  updateTotal();
  if (!scores.length && Number(evaluation.score) > 0) totalScore.textContent = evaluation.score;
}

function signatureIds() {
  return ['employeeSignature', 'managerSignature', 'evaluatorSignature'];
}

function getSignatureData() {
  return signatureIds().reduce((signatures, id) => {
    const canvas = document.querySelector(`#${id}`);
    signatures[id] = canvas?.dataset.signed === 'true' ? canvas.toDataURL('image/png') : '';
    return signatures;
  }, {});
}

function applySignaturesToModal(signatures) {
  signatureIds().forEach((id) => {
    const canvas = document.querySelector(`#${id}`);
    const dataUrl = signatures[id];
    if (!canvas || !dataUrl) return;
    const image = new Image();
    image.onload = () => {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.dataset.signed = 'true';
    };
    image.src = dataUrl;
  });
}

function setEvaluationModalMode(mode) {
  evaluationModalMode = mode;
  const isViewMode = mode === 'view';
  const isExistingEvaluation = mode === 'view' || mode === 'edit';
  const saveButton = document.querySelector('#saveEvaluation');
  document.querySelector('#modalTitle').textContent = isViewMode ? 'View evaluation form' : mode === 'edit' ? 'Edit evaluation' : 'Evaluate an employee';
  if (saveButton) {
    saveButton.hidden = isViewMode;
    saveButton.textContent = mode === 'edit' ? 'Update evaluation' : 'Save evaluation';
  }
  document.querySelectorAll('#evaluationModal input, #evaluationModal select, #evaluationModal textarea, #evaluationModal .score-button, #evaluationModal .clear-signature').forEach((field) => {
    field.disabled = isViewMode;
  });
  employeeSelect.disabled = isExistingEvaluation;
  document.querySelectorAll('#evaluationModal canvas').forEach((canvas) => {
    canvas.style.pointerEvents = isViewMode ? 'none' : '';
  });
}

function openModal(employee = employees[0], options = {}) {
  ensureEvaluationFields();
  editingEvaluationIndex = Number.isInteger(options.evaluationIndex) ? options.evaluationIndex : null;
  employeeSelect.value = employee.id;
  renderCriteria(employee.department, employee.role);
  updateEvaluationMetadata(employee);
  if (options.loadEvaluation) applyEvaluationToModal(latestEvaluation(employee, editingEvaluationIndex));
  setEvaluationModalMode(options.mode || 'new');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function ensureEvaluationFields() {
  if (document.querySelector('#evaluationDateInput')) return;
  const formRow = document.querySelector('#evaluationModal .form-row');
  formRow.insertAdjacentHTML('beforeend', '<label>Evaluation date<input id="evaluationDateInput" type="date" required /></label><label>Previous evaluation score<div class="previous-score" id="previousScore">No previous evaluation</div></label>');
  document.querySelector('#evaluationDateInput').addEventListener('change', updateEvaluationPeriod);
  const footer = document.querySelector('#evaluationModal .modal-footer');
  footer.insertAdjacentHTML('beforebegin', '<div class="evaluation-comments"><label>Employee Area of Development<textarea id="developmentComments" rows="3" placeholder="Add development areas..."></textarea></label><label>Employee Improvement<textarea id="improvementComments" rows="3" placeholder="Add improvement actions..."></textarea></label><label>Employee Strength<textarea id="strengthComments" rows="3" placeholder="Add employee strengths..."></textarea></label><label>Direct Manager Comments<textarea id="managerComments" rows="3" placeholder="Add direct manager comments..."></textarea></label><label>Evaluator Comment<textarea id="evaluatorComments" rows="3" placeholder="Add evaluator comments..."></textarea></label><div class="signature-grid"><label>Employee Signature<div class="signature-pad-wrap"><canvas id="employeeSignature" width="560" height="150"></canvas><button type="button" class="clear-signature" data-pad="employeeSignature">Clear</button></div></label><label>Manager Signature<div class="signature-pad-wrap"><canvas id="managerSignature" width="560" height="150"></canvas><button type="button" class="clear-signature" data-pad="managerSignature">Clear</button></div></label><label>Evaluator Signature<div class="signature-pad-wrap"><canvas id="evaluatorSignature" width="560" height="150"></canvas><button type="button" class="clear-signature" data-pad="evaluatorSignature">Clear</button></div></label></div></div>');
  document.querySelectorAll('.signature-pad-wrap canvas').forEach((canvas) => setupSignaturePad(canvas));
  document.querySelectorAll('.clear-signature').forEach((button) => button.addEventListener('click', () => clearSignaturePad(document.querySelector(`#${button.dataset.pad}`))));
  const style = document.createElement('style');
  style.textContent = '.evaluation-comments{display:grid;gap:10px;margin-top:24px}.evaluation-comments label{color:#777983;font-size:11px;font-weight:700}.evaluation-comments textarea{display:block;width:100%;margin-top:7px;resize:vertical;min-height:64px;border:1px solid var(--line);border-radius:7px;padding:10px;background:#fff;color:var(--ink);font:12px "DM Sans",sans-serif}.signature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:10px}.signature-pad-wrap{margin-top:7px}.signature-pad-wrap canvas{display:block;width:100%;height:100px;touch-action:none;background:#fff;border:1px solid var(--line);border-radius:7px}.clear-signature{margin-top:5px;background:transparent;color:var(--coral-dark);font-size:10px;font-weight:700;padding:0}.previous-score{display:flex;align-items:center;min-height:38px;margin-top:7px;padding:0 10px;border:1px solid var(--line);border-radius:7px;background:#fafafa;color:var(--ink);font:600 12px "Space Grotesk",sans-serif}@media(max-width:760px){.signature-grid{grid-template-columns:1fr}}';
  document.head.appendChild(style);
}

function setupSignaturePad(canvas) {
  const context = canvas.getContext('2d');
  context.strokeStyle = '#202331';
  context.lineWidth = 2.5;
  context.lineCap = 'round';
  canvas.addEventListener('pointerdown', (event) => {
    canvas.dataset.signed = 'true';
    try { canvas.setPointerCapture(event.pointerId); } catch (error) { }
    const point = signaturePoint(canvas, event);
    context.beginPath();
    context.moveTo(point.x, point.y);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (event.buttons !== 1) return;
    const point = signaturePoint(canvas, event);
    context.lineTo(point.x, point.y);
    context.stroke();
  });
}

function signaturePoint(canvas, event) {
  const bounds = canvas.getBoundingClientRect();
  return { x: (event.clientX - bounds.left) * (canvas.width / bounds.width), y: (event.clientY - bounds.top) * (canvas.height / bounds.height) };
}

function clearSignaturePad(canvas) {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  canvas.dataset.signed = 'false';
}

function updateEvaluationMetadata(employee) {
  document.querySelector('#evaluationDateInput').value = new Date().toISOString().slice(0, 10);
  updateEvaluationPeriod();
  ['developmentComments', 'improvementComments', 'strengthComments', 'managerComments', 'evaluatorComments'].forEach((id) => { document.querySelector(`#${id}`).value = ''; });
  ['employeeSignature', 'managerSignature', 'evaluatorSignature'].forEach((id) => clearSignaturePad(document.querySelector(`#${id}`)));
}

function updateEmployeeOptions() {
  employeeSelect.innerHTML = employees.filter((employee) => !employee.deleted).sort((first, second) => String(first.name || '').localeCompare(String(second.name || ''), undefined, { sensitivity: 'base', numeric: true })).map((employee) => `<option value="${employee.id}">${employee.name} · ${employee.role || employee.department}</option>`).join('');
}

function updateDesignationOptions() {
  const department = document.querySelector('#employeeDepartmentInput').value;
  let designationInput = document.querySelector('#designationInput');
  if (designationInput.tagName === 'INPUT') {
    const designationSelect = document.createElement('select');
    designationSelect.id = designationInput.id;
    designationSelect.required = true;
    designationInput.replaceWith(designationSelect);
    designationInput = designationSelect;
  }
  designationInput.innerHTML = `<option value="">Select designation</option>${(departmentRoles[department] || []).map((role) => `<option value="${role}">${role}</option>`).join('')}`;
}

function ensureEmployeeModalStyles() {
  const style = document.createElement('style');
  style.textContent = '#employeeModal .employee-modal{width:min(760px,100%);max-width:760px;padding:34px}.employee-modal .modal-header{padding-bottom:26px}.employee-modal .form-row{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 18px;padding:26px 0}.employee-modal .form-row label{display:block;min-width:0}.employee-modal .form-row input,.employee-modal .form-row select{display:block;width:100%;height:42px;margin-top:8px;padding:0 12px;border:1px solid var(--line);border-radius:8px;background:#fff;color:var(--ink);font-size:12px}.employee-modal .modal-footer{margin-top:6px;padding-top:22px}.employee-modal .primary-button,.employee-modal .outline-button{min-height:42px}@media(max-width:760px){#employeeModal .employee-modal{padding:24px 18px}.employee-modal .form-row{grid-template-columns:1fr;gap:14px;padding:20px 0}}';
  document.head.appendChild(style);
}

function ensureBrandStyles() {
  const style = document.createElement('style');
  style.textContent = ':root{--brand:#013220}.brand{align-items:flex-start;color:var(--brand);line-height:1}.brand-mark{background:var(--brand);font-size:18px}.brand-name{display:flex;flex-direction:column;gap:5px;font-size:18px;letter-spacing:-.7px}.brand-name small{color:#58706a;font:600 8px "DM Sans",sans-serif;letter-spacing:.2px;white-space:nowrap}.primary-button{background:var(--brand)}.primary-button:hover{background:#024b31}.dark-button{background:var(--brand)}.row-actions{position:relative;display:inline-block}.action-menu{display:none;position:absolute;right:0;top:30px;z-index:5;width:155px;padding:5px;background:#fff;border:1px solid var(--line);border-radius:8px;box-shadow:0 10px 25px #20233122}.action-menu.open{display:grid}.action-menu button{padding:9px 10px;background:#fff;color:#5f6470;text-align:left;font-size:11px;border-radius:5px}.action-menu button:hover{background:#f3f7f4;color:var(--brand)}.action-menu button[data-action="delete"]{color:#b85c52}';
  document.head.appendChild(style);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  editingEvaluationIndex = null;
}

function deleteEmployee(employee) {
  if (!window.confirm(`Delete ${employee.name} and all of their evaluations?`)) return;
  employees = employees.filter((item) => item.id !== employee.id);
  persistSavedEmployees();
  renderEmployeeRows();
  renderRows();
  updateEmployeeOptions();
  updateDashboardMetrics();
  toast.textContent = 'Employee deleted successfully.';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
}

function ensureEmployeeProfileFields() {
  if (document.querySelector('#employeeDocumentsInput')) return;
  const formRow = document.querySelector('#employeeForm .form-row');
  formRow.insertAdjacentHTML('afterend', '<div class="employee-documents"><label>Job description / supporting PDF<input id="employeeDocumentsInput" type="file" accept="application/pdf,.pdf" multiple /></label><div id="employeeDocumentsList" class="employee-documents-list">No documents attached.</div></div>');
  const style = document.createElement('style');
  style.textContent = '.employee-row-actions{display:flex;gap:6px}.employee-row-actions button{border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--brand);font-size:10px;font-weight:700;padding:7px 9px}.employee-row-actions button:hover{background:#f3f7f4}.employee-documents{border-top:1px solid var(--line);padding-top:18px}.employee-documents label{display:block;color:#777983;font-size:11px;font-weight:700}.employee-documents input{display:block;width:100%;margin-top:8px;font-size:11px}.employee-documents-list{margin-top:9px;color:#7d808b;font-size:11px}.employee-document{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:7px 9px;background:#f7faf8;border:1px solid #e3ece7;border-radius:6px;margin-top:5px}.employee-document a,.document-view-button{color:var(--brand);font-weight:700}.employee-document-actions{display:flex;align-items:center;gap:8px}.document-view-button{background:transparent;border:0;padding:0;font-size:10px;cursor:pointer}.document-remove-button{background:transparent;color:#b85c52;border:0;padding:0;font-size:10px;font-weight:700;cursor:pointer}.employee-document-preview{margin-top:10px;border:1px solid #dbe7e0;border-radius:6px;overflow:hidden;background:#fff}.employee-document-preview-header{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;color:#4f5b56;font-size:10px}.document-preview-close{background:transparent;border:0;color:#b85c52;font-size:10px;font-weight:700;cursor:pointer}.employee-document-pdf{display:block;width:100%;height:420px;border:0}';
  document.head.appendChild(style);
}

function openEmployeeModal() {
  ensureEmployeeProfileFields();
  editingEmployeeId = null;
  employeeDocumentsDraft = [];
  employeeDocumentPreviewIndex = null;
  if (employeeDocumentPreviewUrl) URL.revokeObjectURL(employeeDocumentPreviewUrl);
  employeeDocumentPreviewUrl = null;
  employeeForm.reset();
  renderEmployeeDocumentsDraft();
  employeeModal.classList.add('open');
  employeeModal.setAttribute('aria-hidden', 'false');
}

function openEmployeeEditor(employee) {
  ensureEmployeeProfileFields();
  editingEmployeeId = employee.id;
  employeeDocumentsDraft = [...(employee.documents || [])];
  employeeDocumentPreviewIndex = null;
  if (employeeDocumentPreviewUrl) URL.revokeObjectURL(employeeDocumentPreviewUrl);
  employeeDocumentPreviewUrl = null;
  employeeForm.reset();
  document.querySelector('#fullNameInput').value = employee.name;
  document.querySelector('#employeeDepartmentInput').value = employee.department;
  updateDesignationOptions();
  document.querySelector('#designationInput').value = employee.role || '';
  document.querySelector('#joiningDateInput').value = employee.joiningDate || '';
  document.querySelector('#reportingToInput').value = employee.reportingTo || '';
  renderEmployeeDocumentsDraft();
  employeeModal.classList.add('open');
  employeeModal.setAttribute('aria-hidden', 'false');
}

function renderEmployeeDocumentsDraft(documents = employeeDocumentsDraft) {
  const list = document.querySelector('#employeeDocumentsList');
  if (!list) return;
  list.innerHTML = documents.length ? documents.map((document, index) => {
    const canView = Boolean(document.dataUrl);
    const isPdf = (document.type || '').toLowerCase().includes('pdf') || (document.name || '').toLowerCase().endsWith('.pdf');
    const viewMarkup = canView && isPdf ? `<button type="button" class="document-view-button" data-doc-action="preview" data-doc-index="${index}">View PDF</button>` : '<span>PDF preview unavailable</span>';
    return `<div class="employee-document"><span>${escapeHtml(document.name)}</span><div class="employee-document-actions">${viewMarkup}<button type="button" class="document-remove-button" data-doc-action="remove" data-doc-index="${index}">Delete</button></div></div>`;
  }).join('') : 'No documents attached.';
  if (employeeDocumentPreviewIndex !== null && documents[employeeDocumentPreviewIndex]?.dataUrl) {
    const document = documents[employeeDocumentPreviewIndex];
    if (employeeDocumentPreviewUrl) URL.revokeObjectURL(employeeDocumentPreviewUrl);
    employeeDocumentPreviewUrl = createPdfPreviewUrl(document.dataUrl);
    list.insertAdjacentHTML('beforeend', `<div class="employee-document-preview"><div class="employee-document-preview-header"><strong>${escapeHtml(document.name)}</strong><button type="button" class="document-preview-close" data-doc-action="close-preview">Close</button></div><object class="employee-document-pdf" data="${employeeDocumentPreviewUrl}" type="application/pdf" aria-label="${escapeHtml(document.name)}"><p>PDF preview is unavailable in this browser.</p></object></div>`);
  }
}

function createPdfPreviewUrl(dataUrl) {
  const base64Data = dataUrl.split(',')[1] || '';
  const binaryData = atob(base64Data);
  const bytes = Uint8Array.from(binaryData, (character) => character.charCodeAt(0));
  return URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
}

function renderEmployeeDocuments(employee) {
  employeeDocumentsDraft = [...(employee.documents || [])];
  renderEmployeeDocumentsDraft();
}

function readAttachment(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, dataUrl: reader.result });
    reader.onerror = () => resolve({ name: file.name, type: file.type, size: file.size });
    reader.readAsDataURL(file);
  });
}

function closeEmployeeModal() {
  employeeModal.classList.remove('open');
  employeeModal.setAttribute('aria-hidden', 'true');
}

document.querySelector('#newEvaluationButton').addEventListener('click', () => openModal());
document.querySelector('#heroStartButton').addEventListener('click', () => openModal());
document.querySelector('#addEmployeeButton').addEventListener('click', openEmployeeModal);
importEmployeesButton.addEventListener('click', () => employeeCsvInput.click());
employeeCsvInput.addEventListener('change', async () => {
  const file = employeeCsvInput.files?.[0];
  employeeCsvInput.value = '';
  if (!file) return;
  try {
    const count = await importEmployeesFromCsv(file);
    toast.textContent = `${count} employee${count === 1 ? '' : 's'} imported successfully.`;
  } catch (error) {
    toast.textContent = error.message;
  }
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3500);
});
document.querySelector('#closeEmployeeModal').addEventListener('click', closeEmployeeModal);
document.querySelector('#cancelEmployeeModal').addEventListener('click', closeEmployeeModal);
employeeModal.addEventListener('click', (event) => { if (event.target === employeeModal) closeEmployeeModal(); });
employeeSearchInput.addEventListener('input', renderEmployeeRows);
employeeDepartmentFilter?.addEventListener('change', renderEmployeeRows);
document.querySelector('#employeeDepartmentInput').addEventListener('change', updateDesignationOptions);
employeeModal.addEventListener('change', async (event) => {
  if (event.target.id !== 'employeeDocumentsInput') return;
  const selectedFiles = [...event.target.files || []];
  if (!selectedFiles.length) return;
  const pdfFiles = selectedFiles.filter((file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));
  if (pdfFiles.length !== selectedFiles.length) {
    toast.textContent = 'Only PDF files can be previewed. Please select a PDF.';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 3000);
  }
  if (!pdfFiles.length) {
    event.target.value = '';
    return;
  }
  const attachments = await Promise.all(pdfFiles.map(readAttachment));
  employeeDocumentsDraft = [...employeeDocumentsDraft, ...attachments];
  renderEmployeeDocumentsDraft();
  event.target.value = '';
});
employeeModal.addEventListener('click', (event) => {
  const previewAction = event.target.closest('[data-doc-action="preview"]');
  if (previewAction) {
    employeeDocumentPreviewIndex = Number(previewAction.dataset.docIndex);
    renderEmployeeDocumentsDraft();
    return;
  }
  const closePreviewAction = event.target.closest('[data-doc-action="close-preview"]');
  if (closePreviewAction) {
    employeeDocumentPreviewIndex = null;
    renderEmployeeDocumentsDraft();
    return;
  }
  const action = event.target.closest('[data-doc-action="remove"]');
  if (!action) return;
  const index = Number(action.dataset.docIndex);
  if (Number.isNaN(index)) return;
  employeeDocumentsDraft.splice(index, 1);
  employeeDocumentPreviewIndex = null;
  renderEmployeeDocumentsDraft();
});
employeeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('#fullNameInput').value.trim();
  const department = document.querySelector('#employeeDepartmentInput').value;
  const designation = document.querySelector('#designationInput').value.trim();
  const joiningDate = document.querySelector('#joiningDateInput').value;
  const reportingTo = document.querySelector('#reportingToInput').value.trim();
  const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const existing = employeeById(editingEmployeeId);
  const employee = existing || { id: `employee-${Date.now()}`, initials, evaluator: reportingTo, score: 0, status: 'Pending', color: 'blue' };
  Object.assign(employee, { name, initials, department, role: designation, designation, joiningDate, reportingTo, evaluator: reportingTo });
  employee.documents = [...employeeDocumentsDraft];
  if (!existing) employees.push(employee);
  persistSavedEmployees();
  await syncCloudData();
  renderEmployeeRows();
  renderRows();
  updateEmployeeOptions();
  closeEmployeeModal();
  toast.textContent = existing ? 'Employee updated successfully.' : 'Employee added successfully.';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
});
employeeRows.addEventListener('click', (event) => {
  const action = event.target.closest('[data-employee-action]');
  if (!action) return;
  const employee = employeeById(action.dataset.employeeId);
  if (!employee) return;
  if (action.dataset.employeeAction === 'edit') openEmployeeEditor(employee);
  if (action.dataset.employeeAction === 'scores') showEmployeeScores(employee);
  if (action.dataset.employeeAction === 'delete') deleteEmployee(employee);
});

function showEmployeeScores(employee) {
  const evaluations = employeeEvaluations(employee);
  let modalElement = document.querySelector('#scoreHistoryModal');
  if (!modalElement) {
    modalElement = document.createElement('div');
    modalElement.id = 'scoreHistoryModal';
    modalElement.className = 'modal-backdrop open';
    modalElement.innerHTML = '<section class="evaluation-modal score-history-modal" role="dialog" aria-modal="true" aria-labelledby="scoreHistoryTitle"><button class="close-button" id="closeScoreHistory" aria-label="Close employee profile">×</button><span class="section-kicker">Employee profile</span><h2 id="scoreHistoryTitle"></h2><p class="score-history-subtitle"></p><div class="employee-profile-tabs"><button type="button" class="employee-profile-tab active" data-profile-tab="evaluations">Evaluations</button><button type="button" class="employee-profile-tab" data-profile-tab="learning">Learning journey</button><button type="button" class="employee-profile-tab" data-profile-tab="assets">Assigned assets</button><button type="button" class="employee-profile-tab" data-profile-tab="documents">Documents</button></div><div class="employee-profile-panel active" data-profile-panel="evaluations"><div class="score-history-list"></div></div><div class="employee-profile-panel" data-profile-panel="learning"><div class="profile-panel-header"><span class="profile-panel-title">Assigned training</span><button type="button" class="profile-open-portal-button" data-open-learning-portal>Open learning path in Development Centre →</button></div><div class="employee-learning-profile"></div></div><div class="employee-profile-panel" data-profile-panel="assets"><div class="employee-assets-profile"></div></div><div class="employee-profile-panel" data-profile-panel="documents"><div class="employee-documents-profile"></div></div></section>';
    document.body.appendChild(modalElement);
    const style = document.createElement('style');
    style.textContent = '.score-history-modal{width:min(920px,100%);max-height:92vh;overflow:auto}.score-history-subtitle{color:var(--muted);font-size:12px}.score-history-list{display:grid;gap:10px;margin-top:20px}.score-history-row{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;padding:14px;background:#f7faf8;border:1px solid #e3ece7;border-radius:8px}.score-history-row strong{font:600 18px "Space Grotesk";color:var(--brand)}.score-history-row small{display:block;color:var(--muted);margin-top:4px}.score-history-score{font:700 22px "Space Grotesk";color:var(--brand);white-space:nowrap}.score-history-actions{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}.score-history-actions button{border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--brand);font-size:10px;font-weight:700;padding:7px 9px}.score-history-actions button:hover{background:#f3f7f4}.score-history-actions button[data-history-action="delete"]{color:#b85c52}.score-history-empty{padding:20px;text-align:center;background:#fafafa;color:var(--muted)}@media(max-width:760px){.score-history-row{grid-template-columns:1fr}.score-history-actions{justify-content:flex-start}}';
    document.head.appendChild(style);
    const profileStyle = document.createElement('style');
    profileStyle.textContent = '.employee-profile-tabs{display:flex;gap:7px;margin:20px 0 16px;border-bottom:1px solid var(--line)}.employee-profile-tab{padding:9px 11px;background:transparent;color:var(--muted);font-size:11px;font-weight:700;border-bottom:2px solid transparent}.employee-profile-tab.active{color:var(--brand);border-color:var(--brand)}.employee-profile-panel{display:none}.employee-profile-panel.active{display:block}.employee-learning-profile,.employee-assets-profile{display:grid;gap:8px}.profile-record{display:grid;grid-template-columns:1fr auto;gap:5px 12px;align-items:center;padding:13px;background:#f7faf8;border:1px solid #e3ece7;border-radius:8px}.profile-record strong{font-size:12px}.profile-record small{color:var(--muted);font-size:10px}.profile-status{grid-row:1/3;grid-column:2;padding:5px 8px;border-radius:999px;background:#fff1df;color:#a76c21;font-size:10px;font-weight:700}.profile-status.complete{background:#e3f3e8;color:#26804c}.assets-toolbar,.asset-form-actions,.asset-actions,.handover-actions{display:flex;align-items:center;justify-content:space-between;gap:8px}.asset-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:15px;background:#f7faf8;border:1px solid #e3ece7;border-radius:8px}.asset-form-grid label{display:grid;gap:6px;color:var(--muted);font-size:10px;font-weight:700}.asset-form-grid input,.asset-form-grid select{width:100%;height:36px;padding:0 9px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--ink);font-size:11px}.asset-form-actions{justify-content:flex-end;margin:2px 0 4px}.asset-detail{padding:15px;background:#f7faf8;border:1px solid #e3ece7;border-radius:8px}.asset-detail>div:first-child{display:flex;justify-content:space-between;align-items:center}.asset-detail p{color:var(--muted);font-size:11px;line-height:1.6}.asset-detail .profile-document-pdf{display:block;width:100%;height:600px;border:0;margin-top:10px}.asset-form-grid+.asset-form-actions{display:flex}.profile-status.complete{background:#e3f3e8;color:#26804c}@media(max-width:760px){.employee-profile-tabs{overflow:auto}.employee-profile-tab{white-space:nowrap}.profile-record{grid-template-columns:1fr}.profile-status{grid-row:auto;grid-column:auto;width:max-content}.asset-form-grid{grid-template-columns:1fr}.asset-actions{justify-content:flex-start;flex-wrap:wrap}}';
    document.head.appendChild(profileStyle);
    document.querySelector('#closeScoreHistory').addEventListener('click', () => modalElement.remove());
    modalElement.querySelectorAll('[data-profile-tab]').forEach((tab) => tab.addEventListener('click', () => {
      modalElement.querySelectorAll('[data-profile-tab]').forEach((item) => item.classList.toggle('active', item === tab));
      modalElement.querySelectorAll('[data-profile-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.profilePanel === tab.dataset.profileTab));
    }));
    modalElement.addEventListener('click', (event) => {
      const closeDocumentButton = event.target.closest('[data-close-profile-document]');
      if (closeDocumentButton) {
        modalElement.querySelector('.profile-document-preview')?.remove();
        return;
      }
      const documentButton = event.target.closest('[data-profile-document]');
      if (!documentButton) return;
      const employeeDocument = modalElement._profileDocuments?.[Number(documentButton.dataset.profileDocument)];
      if (!employeeDocument?.dataUrl) return;
      const documentPanel = modalElement.querySelector('.employee-documents-profile');
      const previewUrl = createPdfPreviewUrl(employeeDocument.dataUrl);
      documentPanel.querySelector('.profile-document-preview')?.remove();
      documentPanel.insertAdjacentHTML('beforeend', `<div class="profile-document-preview"><div><strong>${escapeHtml(employeeDocument.name)}</strong><button type="button" class="document-preview-close" data-close-profile-document>Close</button></div><iframe class="profile-document-pdf" title="${escapeHtml(employeeDocument.name)}" src="${previewUrl}"></iframe></div>`);
    });
    modalElement.addEventListener('click', (event) => {
      const openPortalButton = event.target.closest('[data-open-learning-portal]');
      if (!openPortalButton) return;
      const profileEmployee = modalElement._profileEmployee;
      if (!profileEmployee) return;
      modalElement.remove();
      openEmployeeLearningPortal(profileEmployee);
    });
    modalElement.addEventListener('click', async (event) => {
      const assetButton = event.target.closest('[data-asset-action]');
      if (!assetButton) return;
      const profileEmployee = modalElement._profileEmployee;
      if (!profileEmployee) return;
      if (assetButton.dataset.assetAction === 'add' || assetButton.dataset.assetAction === 'edit') modalElement._editingAssetId = assetButton.dataset.assetId || 'new';
      if (assetButton.dataset.assetAction === 'cancel') modalElement._editingAssetId = null;
      if (assetButton.dataset.assetAction === 'delete') {
        if (!window.confirm('Delete this assigned asset record?')) return;
        if (window.supabaseClient && isCloudId(assetButton.dataset.assetId)) {
          const result = await window.supabaseClient.from('employee_assets').delete().eq('id', assetButton.dataset.assetId);
          if (result.error) { notifyAssetError('Asset could not be deleted from Supabase.'); return; }
        }
        const assets = loadEmployeeAssets().filter((asset) => asset.id !== assetButton.dataset.assetId);
        localStorage.setItem('qbel-operations-assets', JSON.stringify(assets));
        modalElement._editingAssetId = null;
      }
      if (assetButton.dataset.assetAction === 'view') modalElement._viewAssetId = assetButton.dataset.assetId;
      if (assetButton.dataset.assetAction === 'close-view') modalElement._viewAssetId = null;
      renderEmployeeAssetsProfile(modalElement, profileEmployee);
    });
    modalElement.addEventListener('submit', async (event) => {
      if (event.target.id !== 'employeeAssetForm') return;
      event.preventDefault();
      const form = event.target;
      const assets = loadEmployeeAssets();
      const existing = assets.find((asset) => asset.id === form.dataset.assetId);
      const handoverFile = form.querySelector('[name="handover"]')?.files[0];
      const handover = handoverFile ? await readAttachment(handoverFile) : existing?.handover;
      if (!handover) { notifyAssetError('Please attach the signed handover form.'); return; }
      const record = { id: existing?.id || `asset-${Date.now()}`, employeeId: modalElement._profileEmployee.id, assetType: form.assetType.value, description: form.description.value.trim(), serialNumber: form.serialNumber.value.trim(), dateIssued: form.dateIssued.value, dateReturned: form.dateReturned.value, handover };
          if (window.supabaseClient && isCloudId(modalElement._profileEmployee.id)) {
            const payload = { employee_id: modalElement._profileEmployee.id, asset_type: record.assetType, description: record.description, serial_asset_no: record.serialNumber, date_issued: record.dateIssued, date_returned: record.dateReturned || null, handover_form_name: record.handover.name, handover_form_data: record.handover.dataUrl, updated_at: new Date().toISOString() };
            const result = existing && isCloudId(existing.id) ? await window.supabaseClient.from('employee_assets').update(payload).eq('id', existing.id).select().single() : await window.supabaseClient.from('employee_assets').insert(payload).select().single();
            if (result.error) { notifyAssetError('Asset could not be saved to Supabase.'); return; }
            record.id = result.data.id;
          }
          const nextAssets = existing ? assets.map((asset) => asset.id === existing.id ? record : asset) : [...assets, record];
      localStorage.setItem('qbel-operations-assets', JSON.stringify(nextAssets));
      modalElement._editingAssetId = null;
      modalElement._viewAssetId = record.id;
      renderEmployeeAssetsProfile(modalElement, modalElement._profileEmployee);
    });
    modalElement.addEventListener('click', (event) => {
      if (event.target === modalElement) modalElement.remove();
      const action = event.target.closest('[data-history-action]');
      if (!action) return;
      const selectedEmployee = employeeById(action.dataset.employeeId);
      const evaluationIndex = Number(action.dataset.evaluationIndex);
      if (!selectedEmployee) return;
      const selectedEvaluation = latestEvaluation(selectedEmployee, evaluationIndex);
      if (action.dataset.historyAction === 'view' || action.dataset.historyAction === 'edit') {
        modalElement.remove();
        openModal(selectedEmployee, { loadEvaluation: true, mode: action.dataset.historyAction, evaluationIndex });
      }
      if (action.dataset.historyAction === 'delete') {
        deleteEvaluation(selectedEmployee, evaluationIndex);
        if (document.body.contains(modalElement)) showEmployeeScores(selectedEmployee);
      }
      if (action.dataset.historyAction === 'print') exportEvaluationPdf(selectedEmployee, selectedEvaluation);
    });
  }
  modalElement.querySelector('#scoreHistoryTitle').textContent = `${employee.name} · Evaluation forms`;
  modalElement.querySelector('.score-history-subtitle').textContent = `${employee.department} · ${employee.role || 'Designation not provided'}`;
  modalElement.querySelector('.score-history-list').innerHTML = evaluations.length ? evaluations.map((evaluation, evaluationIndex) => ({ evaluation, evaluationIndex })).reverse().map(({ evaluation, evaluationIndex }) => `<div class="score-history-row"><div><strong>Evaluation ${evaluationIndex + 1}</strong><small>${escapeHtml(evaluation.date || 'Date not recorded')}</small></div><div><div class="score-history-score">${evaluation.score}/100</div><div class="score-history-actions"><button type="button" data-history-action="view" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}">View form</button><button type="button" data-history-action="edit" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}">Edit form</button><button type="button" data-history-action="delete" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}">Delete form</button><button type="button" data-history-action="print" data-employee-id="${employee.id}" data-evaluation-index="${evaluationIndex}">Export PDF</button></div></div></div>`).join('') : '<div class="score-history-empty">No completed evaluation forms yet.</div>';
  renderEmployeeProfileSections(modalElement, employee);
  modalElement.classList.add('open');
}

function renderEmployeeProfileSections(modalElement, employee) {
  const resources = JSON.parse(localStorage.getItem('qbel-development-library') || '[]');
  const assignments = JSON.parse(localStorage.getItem('qbel-development-training') || '[]').filter((assignment) => assignment.employeeId === employee.id);
  const resourcesById = new Map(resources.map((resource) => [resource.id, resource]));
  const learningItems = assignments.map((assignment) => { const resource = resourcesById.get(assignment.resourceId); return `<article class="profile-record"><strong>${escapeHtml(resource?.title || 'Deleted course')}</strong><small>${escapeHtml(resource?.category || 'Training')} · Due ${escapeHtml(assignment.dueDate || 'Not set')}</small><span class="profile-status ${assignment.status === 'Completed' ? 'complete' : ''}">${escapeHtml(assignment.status)}</span></article>`; }).join('');
  modalElement.querySelector('.employee-learning-profile').innerHTML = learningItems || '<div class="score-history-empty">No training has been assigned to this employee yet.</div>';
  renderEmployeeAssetsProfile(modalElement, employee);
  const employeeDocuments = employee.documents || [];
  modalElement._profileDocuments = employeeDocuments;
  modalElement.querySelector('.employee-documents-profile').innerHTML = employeeDocuments.length ? employeeDocuments.map((document, index) => `<article class="profile-record"><div><strong>${escapeHtml(document.name)}</strong><small>Attached employee document</small></div><div class="profile-document-actions"><button type="button" class="row-actions-button" data-profile-document="${index}">View PDF</button><a class="row-actions-button" href="${document.dataUrl || '#'}" download="${escapeHtml(document.name)}">Download</a></div></article>`).join('') : '<div class="score-history-empty">No attached documents for this employee.</div>';
}
function loadEmployeeAssets() { try { return JSON.parse(localStorage.getItem('qbel-operations-assets') || '[]'); } catch (error) { return []; } }
const assetCloudLoads = new Set();
const assetCloudLoaded = new Set();
async function loadEmployeeAssetsFromCloud(modalElement, employee) {
  if (!window.supabaseClient || !isCloudId(employee.id) || assetCloudLoads.has(employee.id) || assetCloudLoaded.has(employee.id)) return;
  assetCloudLoads.add(employee.id);
  const { data, error } = await window.supabaseClient.from('employee_assets').select('*').eq('employee_id', employee.id).order('created_at', { ascending: true });
  assetCloudLoads.delete(employee.id);
  if (error) { console.error('Could not load employee assets', error); return; }
  assetCloudLoaded.add(employee.id);
  if (!data?.length) return;
  const otherAssets = loadEmployeeAssets().filter((asset) => asset.employeeId !== employee.id);
  const cloudAssets = (data || []).map((asset) => ({ id: asset.id, employeeId: asset.employee_id, assetType: asset.asset_type, description: asset.description, serialNumber: asset.serial_asset_no, dateIssued: asset.date_issued, dateReturned: asset.date_returned || '', handover: asset.handover_form_name ? { name: asset.handover_form_name, dataUrl: asset.handover_form_data } : null }));
  localStorage.setItem('qbel-operations-assets', JSON.stringify([...otherAssets, ...cloudAssets]));
  renderEmployeeAssetsProfile(modalElement, employee);
}
function notifyAssetError(message) { const messageElement = document.querySelector('#toast'); messageElement.textContent = message; messageElement.classList.add('show'); window.setTimeout(() => messageElement.classList.remove('show'), 2800); }
function assetFormMarkup(asset = {}) {
  const assetTypes = ['Laptop or desktop computer', 'Company mobile phone', 'Corporate SIM card', 'Tablet/iPad', 'Laptop bag or backpack', 'Access card/facility badge', 'Office keys', 'Parking access card', 'Company Vehicle', 'Company email account', 'Software licences and user accounts', 'Company uniforms', 'Safety shoes', 'Safety helmet', 'Reflective vest', 'Protective gloves', 'Safety goggles', 'Other role-specific PPE', 'Engineering tools', 'Maintenance equipment', 'Measuring instruments', 'Specialised technical devices', 'Industry-specific equipment'];
  return `<form id="employeeAssetForm" class="employee-asset-form" data-asset-id="${escapeHtml(asset.id || '')}"><div class="asset-form-grid"><label>Asset type<select name="assetType" required>${assetTypes.map((type) => `<option ${asset.assetType === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Asset description<input name="description" required value="${escapeHtml(asset.description || '')}" placeholder="Describe the asset" /></label><label>Serial / asset No.<input name="serialNumber" required value="${escapeHtml(asset.serialNumber || '')}" /></label><label>Date issued<input name="dateIssued" type="date" required value="${escapeHtml(asset.dateIssued || '')}" /></label><label>Date returned<input name="dateReturned" type="date" value="${escapeHtml(asset.dateReturned || '')}" /></label><label>Signed handover form<input name="handover" type="file" accept="application/pdf,.pdf" ${asset.handover ? '' : 'required'} /></label></div><div class="asset-form-actions"><button type="button" class="row-actions-button" data-asset-action="cancel">Cancel</button><button type="submit" class="primary-button">Save asset</button></div></form>`;
}
function renderEmployeeAssetsProfile(modalElement, employee) {
  modalElement._profileEmployee = employee;
  const allAssets = loadEmployeeAssets();
  const assets = allAssets.filter((asset) => asset.employeeId === employee.id || asset.assignedTo === employee.id || asset.assignedTo === employee.name);
  const editingAsset = modalElement._editingAssetId && modalElement._editingAssetId !== 'new' ? assets.find((asset) => asset.id === modalElement._editingAssetId) : {};
  const records = assets.map((asset) => `<article class="profile-record asset-record"><div><strong>${escapeHtml(asset.assetType || asset.name || asset.assetName || 'Company asset')}</strong><small>${escapeHtml(asset.description || 'No description')} · Serial/Asset No. ${escapeHtml(asset.serialNumber || asset.reference || 'Not recorded')}</small><small>Issued: ${escapeHtml(asset.dateIssued || 'Not recorded')} · Returned: ${escapeHtml(asset.dateReturned || 'Not returned')}</small></div><div class="asset-actions"><button type="button" class="row-actions-button" data-asset-action="view" data-asset-id="${asset.id}">View</button><button type="button" class="row-actions-button" data-asset-action="edit" data-asset-id="${asset.id}">Edit</button><button type="button" class="row-actions-button" data-asset-action="delete" data-asset-id="${asset.id}">Delete</button></div></article>`).join('');
  let viewMarkup = '';
  const viewedAsset = assets.find((asset) => asset.id === modalElement._viewAssetId);
  if (viewedAsset) viewMarkup = `<div class="asset-detail"><div><strong>${escapeHtml(viewedAsset.assetType || 'Asset')}</strong><button type="button" class="document-preview-close" data-asset-action="close-view">Close</button></div><p>${escapeHtml(viewedAsset.description || 'No description')}</p><p>Serial/Asset No.: ${escapeHtml(viewedAsset.serialNumber || 'Not recorded')}<br />Date issued: ${escapeHtml(viewedAsset.dateIssued || 'Not recorded')}<br />Date returned: ${escapeHtml(viewedAsset.dateReturned || 'Not returned')}</p>${viewedAsset.handover?.dataUrl ? `<div class="handover-actions"><strong>Signed handover form</strong><a class="row-actions-button" href="${viewedAsset.handover.dataUrl}" download="${escapeHtml(viewedAsset.handover.name)}">Download form</a></div><iframe class="profile-document-pdf" title="Signed handover form" src="${createPdfPreviewUrl(viewedAsset.handover.dataUrl)}"></iframe>` : '<p>No handover form attached.</p>'}</div>`;
  if (modalElement._viewAssetId === 'close') modalElement._viewAssetId = null;
  modalElement.querySelector('.employee-assets-profile').innerHTML = `<div class="assets-toolbar"><span>Assigned assets</span><button type="button" class="primary-button" data-asset-action="add">+ Add asset</button></div>${modalElement._editingAssetId ? assetFormMarkup(editingAsset) : ''}${records || '<div class="score-history-empty">No assets are assigned to this employee yet.</div>'}${viewMarkup}`;
  void loadEmployeeAssetsFromCloud(modalElement, employee);
}
document.querySelector('#closeModal').addEventListener('click', closeModal);
document.querySelector('#cancelModal').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
searchInput.addEventListener('input', renderRows);
departmentFilter.addEventListener('change', renderRows);
progressCurrentQuarter.addEventListener('change', renderQuarterlyProgress);
progressPreviousQuarter.addEventListener('change', renderQuarterlyProgress);
rows.addEventListener('click', (event) => {
  const menuButton = event.target.closest('.table-more');
  if (menuButton) {
    event.stopPropagation();
    document.querySelectorAll('.action-menu').forEach((menu) => menu.classList.remove('open'));
    document.querySelector(`[data-menu-for="${menuButton.dataset.employeeId}-${menuButton.dataset.evaluationIndex}"]`).classList.toggle('open');
    return;
  }
  const actionButton = event.target.closest('.action-menu button');
  if (!actionButton) return;
  const employee = employeeById(actionButton.dataset.employeeId);
  const evaluationIndex = Number(actionButton.dataset.evaluationIndex);
  document.querySelectorAll('.action-menu').forEach((menu) => menu.classList.remove('open'));
  if (!employee) return;
  const evaluation = latestEvaluation(employee, evaluationIndex);
  if (actionButton.dataset.action === 'delete-evaluation') deleteEvaluation(employee, evaluationIndex);
  if (actionButton.dataset.action === 'print') exportEvaluationPdf(employee, evaluation);
  if (actionButton.dataset.action === 'view' || actionButton.dataset.action === 'edit') openModal(employee, { loadEvaluation: true, mode: actionButton.dataset.action, evaluationIndex });
});
employeeSelect.addEventListener('change', () => {
  const employee = employees.find((item) => item.id === employeeSelect.value);
  renderCriteria(employee.department, employee.role);
  updateEvaluationMetadata(employee);
  updateTotal();
});
document.querySelector('#saveEvaluation').addEventListener('click', () => {
  const signaturesComplete = ['employeeSignature', 'managerSignature', 'evaluatorSignature'].every((id) => document.querySelector(`#${id}`).dataset.signed === 'true');
  if (!signaturesComplete) {
    toast.textContent = 'Please add all three signatures before saving.';
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 2800);
    return;
  }
  const employee = employees.find((item) => item.id === employeeSelect.value);
  const score = Number(totalScore.textContent);
  if (employee && score > 0) {
    const evaluation = {
      score,
      date: document.querySelector('#evaluationDateInput').value,
      criteria: [...document.querySelectorAll('.score-buttons')].map((group) => group.querySelector('.selected')?.dataset.score ?? ''),
      development: document.querySelector('#developmentComments').value,
      improvement: document.querySelector('#improvementComments').value,
      strength: document.querySelector('#strengthComments').value,
      managerComments: document.querySelector('#managerComments').value,
      evaluatorComment: document.querySelector('#evaluatorComments').value,
      signatures: getSignatureData()
    };
    if (evaluationModalMode === 'edit' && (employee.evaluations?.length || employee.evaluation)) {
      employee.evaluations = [...(employee.evaluations || (employee.evaluation ? [employee.evaluation] : []))];
      const targetIndex = Number.isInteger(editingEvaluationIndex) ? editingEvaluationIndex : employee.evaluations.length - 1;
      employee.evaluations[targetIndex] = evaluation;
    } else {
      employee.evaluations = [...(employee.evaluations || []), evaluation];
    }
    employee.evaluation = employee.evaluations[employee.evaluations.length - 1];
    employee.score = employee.evaluation?.score || score;
    employee.status = 'Completed';
    employee.evaluationDeleted = false;
    deletedEvaluationIds.delete(employee.id);
    localStorage.setItem('northstar-deleted-evaluations', JSON.stringify([...deletedEvaluationIds]));
    persistSavedEmployees();
    void syncCloudData();
    renderRows();
    updateDashboardMetrics();
  }
  closeModal();
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2800);
});
function switchTab(tabName) {
  document.querySelectorAll('[data-tab-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.tabPanel === tabName));
  syncSidebarNav(tabName === 'reports' ? 'reports' : 'evaluations', tabName);
  if (tabName === 'reports') void refreshReportData();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function readReportStorage(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (error) { return []; }
}

async function refreshReportData() {
  reportAssets = readReportStorage('qbel-operations-assets');
  reportAssignments = readReportStorage('qbel-development-training');
  reportResources = readReportStorage('qbel-development-library');
  reportSkills = [];
  reportPlans = [];
  reportCertifications = [];
  if (window.supabaseClient) {
    const [assetResult, assignmentResult, resourceResult, skillResult, planResult, certificationResult] = await Promise.all([
      window.supabaseClient.from('employee_assets').select('id, employee_id, asset_type, description, serial_asset_no, date_issued, date_returned, handover_form_name').order('created_at', { ascending: true }),
      window.supabaseClient.from('training_assignments').select('id, employee_id, resource_id, quarter, assigned_date, due_date, status, completed_date, result_status, result_source, passed_date, training_valid_until, skills_to_develop').order('created_at', { ascending: true }),
      window.supabaseClient.from('development_resources').select('id, title, category'),
      window.supabaseClient.from('development_skills').select('id, employee_id, competency, current_level, target_level, assessed_on').order('assessed_on', { ascending: false }),
      window.supabaseClient.from('development_plans').select('id, employee_id, goal, action_plan, due_date, status').order('due_date', { ascending: true }),
      window.supabaseClient.from('employee_certifications').select('id, employee_id, certificate_name, issuer, issued_on, expires_on').order('issued_on', { ascending: false })
    ]);
    if (!assetResult.error) {
      const localAssets = reportAssets.filter((asset) => !isCloudId(asset.id));
      const cloudAssets = (assetResult.data || []).map((asset) => ({ id: asset.id, employeeId: asset.employee_id, assetType: asset.asset_type, description: asset.description, serialNumber: asset.serial_asset_no, dateIssued: asset.date_issued, dateReturned: asset.date_returned || '', handover: asset.handover_form_name ? { name: asset.handover_form_name, dataUrl: asset.handover_form_data } : null }));
      reportAssets = [...localAssets, ...cloudAssets];
    } else console.error('Could not refresh report assets', assetResult.error);
    if (!assignmentResult.error) {
      const localAssignments = reportAssignments.filter((assignment) => !isCloudId(assignment.id));
      const cloudAssignments = (assignmentResult.data || []).map((assignment) => ({ id: assignment.id, employeeId: assignment.employee_id, resourceId: assignment.resource_id, quarter: assignment.quarter, assignedDate: assignment.assigned_date, dueDate: assignment.due_date, status: assignment.status, completedDate: assignment.completed_date, resultStatus: assignment.result_status || 'Pending', resultSource: assignment.result_source || 'manual', passedDate: assignment.passed_date, trainingValidUntil: assignment.training_valid_until, skillsToDevelop: assignment.skills_to_develop || [] }));
      reportAssignments = [...localAssignments, ...cloudAssignments];
    } else console.error('Could not refresh report training assignments', assignmentResult.error);
    if (!resourceResult.error && resourceResult.data) {
      const resourcesById = new Map(reportResources.map((resource) => [resource.id, resource]));
      (resourceResult.data || []).forEach((resource) => resourcesById.set(resource.id, { id: resource.id, title: resource.title, category: resource.category }));
      reportResources = [...resourcesById.values()];
    } else console.error('Could not refresh report learning resources', resourceResult.error);
    if (!skillResult.error) reportSkills = (skillResult.data || []).map((skill) => ({ id: skill.id, employeeId: skill.employee_id, competency: skill.competency, currentLevel: skill.current_level, targetLevel: skill.target_level, assessedOn: skill.assessed_on }));
    else console.error('Could not refresh report skills', skillResult.error);
    if (!planResult.error) reportPlans = (planResult.data || []).map((plan) => ({ id: plan.id, employeeId: plan.employee_id, goal: plan.goal, actionPlan: plan.action_plan, dueDate: plan.due_date, status: plan.status }));
    else console.error('Could not refresh report development plans', planResult.error);
    if (!certificationResult.error) reportCertifications = (certificationResult.data || []).map((certificate) => ({ id: certificate.id, employeeId: certificate.employee_id, name: certificate.certificate_name, issuer: certificate.issuer, issuedOn: certificate.issued_on, expiresOn: certificate.expires_on }));
    else console.error('Could not refresh report certifications', certificationResult.error);
    localStorage.setItem('qbel-development-training', JSON.stringify(reportAssignments));
    localStorage.setItem('qbel-development-library', JSON.stringify(reportResources));
  }
  renderReports();
}

function reportDepartments() {
  return [...new Set(employees.filter((employee) => !employee.deleted).map((employee) => employee.department).filter(Boolean))].sort();
}

function setReportOptions(select, options, allLabel, defaultValue) {
  const previousValue = select.value;
  const firstOption = allLabel ? `<option value="all">${escapeHtml(allLabel)}</option>` : '<option value="">Select an employee</option>';
  select.innerHTML = firstOption + options.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join('');
  const fallback = options.some((option) => option.value === defaultValue) ? defaultValue : (allLabel ? 'all' : '');
  select.value = options.some((option) => option.value === previousValue) ? previousValue : fallback;
}

function reportEvaluationRecords() {
  const quarter = document.querySelector('#reportEvaluationQuarter').value;
  const department = document.querySelector('#reportEvaluationDepartment').value;
  return employees.filter((employee) => !employee.deleted && (department === 'all' || employee.department === department))
    .flatMap((employee) => employeeEvaluations(employee).map((evaluation) => ({ employee, evaluation })))
    .filter(({ evaluation }) => quarter === 'all' || quarterFromDate(evaluation.date)?.key === quarter)
    .sort((first, second) => String(second.evaluation.date || '').localeCompare(String(first.evaluation.date || '')) || first.employee.name.localeCompare(second.employee.name));
}

function renderEvaluationReport() {
  const records = reportEvaluationRecords();
  const scores = records.map(({ evaluation }) => Number(evaluation.score) || 0);
  const average = scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;
  document.querySelector('#evaluationReportMetrics').innerHTML = `<div><span>Evaluations</span><strong>${records.length}</strong></div><div><span>Average score</span><strong>${average.toFixed(1)}<small>/100</small></strong></div><div><span>Departments</span><strong>${new Set(records.map(({ employee }) => employee.department)).size}</strong></div>`;
  document.querySelector('#evaluationReportRows').innerHTML = records.map(({ employee, evaluation }) => {
    const feedback = [evaluation.strength, evaluation.improvement, evaluation.development, evaluation.evaluatorComment].filter(Boolean).join(' | ') || 'No written feedback';
    return `<tr><td>${escapeHtml(employee.name)}</td><td>${escapeHtml(employee.department)}</td><td>${escapeHtml(evaluation.date || 'Not recorded')}</td><td>${escapeHtml(evaluation.evaluator || employee.evaluator || employee.reportingTo || 'Not recorded')}</td><td><strong class="quarter-score">${Number(evaluation.score) || 0}<small>/100</small></strong></td><td>${escapeHtml(feedback)}</td></tr>`;
  }).join('') || '<tr><td colspan="6" class="empty-state">No evaluation results match these filters.</td></tr>';
}

function selectedReportAssets() {
  const department = document.querySelector('#reportAssetDepartment').value;
  const employeeId = document.querySelector('#reportAssetEmployee').value;
  const employeeByAssetId = new Map(employees.map((employee) => [employee.id, employee]));
  return reportAssets.map((asset) => ({ asset, employee: employeeByAssetId.get(asset.employeeId) || employees.find((item) => item.name === asset.assignedTo || item.id === asset.assignedTo) }))
    .filter(({ asset, employee }) => employee && !employee.deleted && (department === 'all' || employee.department === department) && (employeeId === 'all' || employee.id === employeeId) || !employee && department === 'all' && employeeId === 'all')
    .sort((first, second) => String(first.employee?.name || '').localeCompare(String(second.employee?.name || '')));
}

function renderAssetReport() {
  const records = selectedReportAssets();
  const activeCount = records.filter(({ asset }) => !asset.dateReturned).length;
  document.querySelector('#assetReportMetrics').innerHTML = `<div><span>Asset records</span><strong>${records.length}</strong></div><div><span>Currently assigned</span><strong>${activeCount}</strong></div><div><span>Employees covered</span><strong>${new Set(records.map(({ employee }) => employee?.id).filter(Boolean)).size}</strong></div>`;
  document.querySelector('#assetReportRows').innerHTML = records.map(({ asset, employee }) => `<tr><td>${escapeHtml(employee?.name || asset.assignedTo || 'Unknown employee')}</td><td>${escapeHtml(employee?.department || 'Not recorded')}</td><td>${escapeHtml(asset.assetType || asset.name || asset.assetName || 'Company asset')}</td><td>${escapeHtml(asset.description || '')}</td><td>${escapeHtml(asset.serialNumber || asset.reference || 'Not recorded')}</td><td>${escapeHtml(asset.dateIssued || 'Not recorded')}</td><td>${escapeHtml(asset.dateReturned || 'Not returned')}</td><td>${escapeHtml(asset.handover?.name || 'Not attached')}</td></tr>`).join('') || '<tr><td colspan="8" class="empty-state">No asset records match these filters.</td></tr>';
}

function resourceAssignmentGroups() {
  const department = document.querySelector('#reportResourceDepartment').value;
  const employeeById = new Map(employees.filter((employee) => !employee.deleted).map((employee) => [employee.id, employee]));
  const resourcesById = new Map(reportResources.map((resource) => [resource.id, resource]));
  reportAssignments.forEach((assignment) => {
    if (!resourcesById.has(assignment.resourceId)) resourcesById.set(assignment.resourceId, { id: assignment.resourceId, title: 'Deleted resource', category: 'Unknown' });
  });
  const assignmentsByResource = new Map();
  reportAssignments.forEach((assignment) => {
    const employee = employeeById.get(assignment.employeeId);
    if (!employee || (department !== 'all' && employee.department !== department)) return;
    const records = assignmentsByResource.get(assignment.resourceId) || [];
    records.push({ assignment, employee });
    assignmentsByResource.set(assignment.resourceId, records);
  });
  return [...resourcesById.values()].map((resource) => {
    const assignments = assignmentsByResource.get(resource.id) || [];
    const recipientCounts = new Map();
    assignments.forEach(({ employee }) => recipientCounts.set(employee.id, { employee, count: (recipientCounts.get(employee.id)?.count || 0) + 1 }));
    const recipients = [...recipientCounts.values()].sort((first, second) => first.employee.name.localeCompare(second.employee.name));
    const latest = assignments.slice().sort((first, second) => String(second.assignment.assignedDate || '').localeCompare(String(first.assignment.assignedDate || '')))[0] || null;
    return { resource, assignments, recipients, latest };
  }).filter((group) => department === 'all' || group.assignments.length)
    .sort((first, second) => String(first.resource.title || '').localeCompare(String(second.resource.title || '')));
}

function renderResourceAssignmentReport() {
  const groups = resourceAssignmentGroups();
  const assignmentCount = groups.reduce((total, group) => total + group.assignments.length, 0);
  const recipientIds = new Set(groups.flatMap((group) => group.assignments.map(({ employee }) => employee.id)));
  document.querySelector('#resourceReportMetrics').innerHTML = `<div><span>Resources</span><strong>${groups.length}</strong></div><div><span>Assignments</span><strong>${assignmentCount}</strong></div><div><span>Employees assigned</span><strong>${recipientIds.size}</strong></div>`;
  document.querySelector('#resourceReportRows').innerHTML = groups.map(({ resource, assignments, recipients, latest }) => {
    const recipientText = recipients.map(({ employee, count }) => `${employee.name}${count > 1 ? ` (${count})` : ''}`).join(', ') || 'Not assigned';
    return `<tr><td>${escapeHtml(resource.title || 'Untitled resource')}</td><td>${escapeHtml(resource.category || 'Not recorded')}</td><td><strong>${assignments.length}</strong></td><td>${escapeHtml(recipientText)}</td><td>${escapeHtml(latest?.assignment.assignedDate || '—')}</td><td>${escapeHtml(latest?.assignment.status || 'Not assigned')}</td></tr>`;
  }).join('') || '<tr><td colspan="6" class="empty-state">No resources or assignments match this department.</td></tr>';
}

function selectedReportEmployee() {
  return employees.find((employee) => employee.id === document.querySelector('#reportEmployeeSelect').value && !employee.deleted);
}

function employeeReportRecords(employee) {
  const evaluations = employeeEvaluations(employee).slice().sort((first, second) => String(second.date || '').localeCompare(String(first.date || '')));
  const assignments = reportAssignments.filter((assignment) => assignment.employeeId === employee.id).slice().sort((first, second) => String(second.assignedDate || '').localeCompare(String(first.assignedDate || '')));
  const assets = reportAssets.filter((asset) => asset.employeeId === employee.id || asset.assignedTo === employee.id || asset.assignedTo === employee.name);
  const resources = new Map(reportResources.map((resource) => [resource.id, resource]));
  const skills = reportSkills.filter((skill) => skill.employeeId === employee.id);
  const plans = reportPlans.filter((plan) => plan.employeeId === employee.id);
  const certifications = reportCertifications.filter((certificate) => certificate.employeeId === employee.id);
  return { evaluations, assignments, assets, resources, skills, plans, certifications };
}

function isMissedTraining(assignment) {
  return assignment.status !== 'Completed' && assignment.dueDate && assignment.dueDate < new Date().toISOString().slice(0, 10);
}

function evaluationQuarterProgress(employee, evaluation) {
  const quarter = quarterFromDate(evaluation.date);
  const previousQuarter = previousQuarterFrom(quarter);
  const previousEvaluation = previousQuarter ? latestEvaluationInQuarter(employee, previousQuarter.key) : null;
  const change = previousEvaluation ? Number(evaluation.score) - Number(previousEvaluation.score) : null;
  return { quarter, previousQuarter, previousEvaluation, change };
}

function renderEmployeeReport() {
  const employee = selectedReportEmployee();
  const content = document.querySelector('#employeeReportContent');
  const exportButton = document.querySelector('#exportEmployeeReport');
  exportButton.disabled = !employee;
  if (!employee) {
    content.innerHTML = '<div class="report-empty">Choose an employee to generate their progress summary.</div>';
    return;
  }
  const { evaluations, assignments, assets, resources, skills, plans, certifications } = employeeReportRecords(employee);
  const latestEvaluation = evaluations[0];
  const passedCount = assignments.filter((assignment) => assignment.resultStatus === 'Passed').length;
  const failedCount = assignments.filter((assignment) => assignment.resultStatus === 'Failed').length;
  const missedAssignments = assignments.filter(isMissedTraining);
  const latestProgress = latestEvaluation ? evaluationQuarterProgress(employee, latestEvaluation) : null;
  const documents = [...new Set([
    ...(employee.documents || []).map((document) => document.name).filter(Boolean),
    ...assets.map((asset) => asset.handover?.name).filter(Boolean)
  ])];
  const evaluationRows = evaluations.map((evaluation) => {
    const { quarter, previousQuarter, previousEvaluation, change } = evaluationQuarterProgress(employee, evaluation);
    const changeLabel = change === null ? 'No prior quarter result' : `${change >= 0 ? '+' : ''}${change.toFixed(1)}`;
    return `<tr><td>${escapeHtml(quarter?.label || evaluation.date || 'Not recorded')}</td><td>${escapeHtml(evaluation.date || 'Not recorded')}</td><td><strong class="quarter-score">${Number(evaluation.score) || 0}<small>/100</small></strong></td><td>${escapeHtml(previousQuarter?.label || '—')}</td><td>${previousEvaluation ? `${Number(previousEvaluation.score) || 0}/100` : '—'}</td><td><strong class="quarter-change ${change === null ? 'neutral' : change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral'}">${escapeHtml(changeLabel)}</strong></td></tr>`;
  }).join('');
  const trainingRows = assignments.map((assignment) => `<tr><td>${escapeHtml(resources.get(assignment.resourceId)?.title || 'Deleted course')}</td><td>${escapeHtml(assignment.assignedDate || 'Not recorded')}</td><td>${escapeHtml(assignment.dueDate || 'Not set')}</td><td>${isMissedTraining(assignment) ? 'Missed' : escapeHtml(assignment.status || 'Assigned')}</td><td>${escapeHtml(assignment.resultStatus || 'Pending')}</td><td>${escapeHtml(assignment.passedDate || '—')}</td></tr>`).join('');
  const assetRows = assets.map((asset) => `<tr><td>${escapeHtml(asset.assetType || asset.name || asset.assetName || 'Company asset')}</td><td>${escapeHtml(asset.dateIssued || 'Not recorded')}</td><td>${escapeHtml(asset.dateReturned || 'Not returned')}</td></tr>`).join('');
  const skillRows = skills.map((skill) => `<tr><td>${escapeHtml(skill.competency)}</td><td>${escapeHtml(skill.currentLevel)}</td><td>${escapeHtml(skill.targetLevel)}</td><td>${Number(skill.currentLevel) >= Number(skill.targetLevel) ? 'Target achieved' : 'In progress'}</td><td>${escapeHtml(skill.assessedOn || 'Not recorded')}</td></tr>`).join('');
  const certificateRows = certifications.map((certificate) => `<tr><td>${escapeHtml(certificate.name)}</td><td>${escapeHtml(certificate.issuer || 'Not recorded')}</td><td>${escapeHtml(certificate.issuedOn || 'Not recorded')}</td><td>${escapeHtml(certificate.expiresOn || 'No expiry recorded')}</td></tr>`).join('');
  const planRows = plans.map((plan) => `<tr><td>${escapeHtml(plan.goal)}</td><td>${escapeHtml(plan.actionPlan)}</td><td>${escapeHtml(plan.dueDate || 'Not set')}</td><td>${escapeHtml(plan.status || 'Planned')}</td></tr>`).join('');
  content.innerHTML = `
    <section class="employee-report-section"><div class="employee-report-section-heading"><span>01</span><h4>Employee details</h4></div><div class="employee-report-details"><div><span>Employee</span><strong>${escapeHtml(employee.name)}</strong></div><div><span>Department</span><strong>${escapeHtml(employee.department || 'Not recorded')}</strong></div><div><span>Joining date</span><strong>${escapeHtml(employee.joiningDate || 'Not recorded')}</strong></div><div><span>Designation</span><strong>${escapeHtml(employee.role || employee.designation || 'Not recorded')}</strong></div><div><span>Reporting to</span><strong>${escapeHtml(employee.reportingTo || 'Not recorded')}</strong></div></div></section>
    <section class="employee-report-section"><div class="employee-report-section-heading"><span>02</span><h4>Evaluation results</h4></div><div class="report-metrics"><div><span>Latest result</span><strong>${latestEvaluation ? `${Number(latestEvaluation.score) || 0}<small>/100</small>` : '—'}</strong><small>${escapeHtml(latestEvaluation?.date || 'No evaluation yet')}</small></div><div><span>Previous quarter</span><strong>${latestProgress?.previousEvaluation ? `${Number(latestProgress.previousEvaluation.score) || 0}<small>/100</small>` : '—'}</strong><small>${escapeHtml(latestProgress?.previousQuarter?.label || 'No previous quarter')}</small></div><div><span>Quarter progress</span><strong class="${latestProgress?.change === null || latestProgress?.change === undefined ? 'neutral' : latestProgress.change > 0 ? 'positive' : latestProgress.change < 0 ? 'negative' : 'neutral'}">${latestProgress?.change === null || latestProgress?.change === undefined ? '—' : `${latestProgress.change >= 0 ? '+' : ''}${latestProgress.change.toFixed(1)}`}</strong><small>${latestProgress?.change === null || latestProgress?.change === undefined ? 'No comparison available' : 'points vs previous quarter'}</small></div></div><div class="table-wrap"><table><thead><tr><th>Quarter</th><th>Evaluation date</th><th>Result</th><th>Previous quarter</th><th>Previous result</th><th>Progress</th></tr></thead><tbody>${evaluationRows || '<tr><td colspan="6" class="empty-state">No evaluation results recorded.</td></tr>'}</tbody></table></div></section>
    <section class="employee-report-section"><div class="employee-report-section-heading"><span>03</span><h4>Assigned assets and documents</h4></div><div class="report-subsection"><h5>Assets</h5><div class="table-wrap"><table><thead><tr><th>Asset name</th><th>Date issued</th><th>Date returned</th></tr></thead><tbody>${assetRows || '<tr><td colspan="3" class="empty-state">No assets assigned.</td></tr>'}</tbody></table></div></div><div class="report-subsection"><h5>Documents</h5>${documents.length ? `<ul class="report-name-list">${documents.map((name) => `<li>${escapeHtml(name)}</li>`).join('')}</ul>` : '<div class="report-empty">No documents recorded.</div>'}</div></section>
    <section class="employee-report-section"><div class="employee-report-section-heading"><span>04</span><h4>Training and course results</h4></div><div class="report-metrics report-metrics-four"><div><span>Passed</span><strong>${passedCount}</strong></div><div><span>Failed</span><strong>${failedCount}</strong></div><div><span>Missed</span><strong>${missedAssignments.length}</strong></div><div><span>Total courses</span><strong>${assignments.length}</strong></div></div><div class="table-wrap"><table><thead><tr><th>Training</th><th>Assigned</th><th>Due date</th><th>Status</th><th>Result</th><th>Passed date</th></tr></thead><tbody>${trainingRows || '<tr><td colspan="6" class="empty-state">No training assignments recorded.</td></tr>'}</tbody></table></div></section>
    <section class="employee-report-section"><div class="employee-report-section-heading"><span>05</span><h4>Acquired skills and growth</h4></div><div class="report-subsection"><h5>Skills and proficiency</h5><div class="table-wrap"><table><thead><tr><th>Skill</th><th>Current level</th><th>Target level</th><th>Progress</th><th>Assessed</th></tr></thead><tbody>${skillRows || '<tr><td colspan="5" class="empty-state">No skills assessed.</td></tr>'}</tbody></table></div></div><div class="report-subsection"><h5>Certifications</h5><div class="table-wrap"><table><thead><tr><th>Certificate</th><th>Issuer</th><th>Issued</th><th>Expires</th></tr></thead><tbody>${certificateRows || '<tr><td colspan="4" class="empty-state">No certifications recorded.</td></tr>'}</tbody></table></div></div><div class="report-subsection"><h5>Development plans</h5><div class="table-wrap"><table><thead><tr><th>Goal</th><th>Action plan</th><th>Due date</th><th>Status</th></tr></thead><tbody>${planRows || '<tr><td colspan="4" class="empty-state">No development plans recorded.</td></tr>'}</tbody></table></div></div></section>`;
}

function renderReports() {
  const activeEmployees = employees.filter((employee) => !employee.deleted).sort((first, second) => first.name.localeCompare(second.name));
  const departments = reportDepartments().map((department) => ({ value: department, label: department }));
  setReportOptions(document.querySelector('#reportEvaluationDepartment'), departments, 'All departments');
  setReportOptions(document.querySelector('#reportAssetDepartment'), departments, 'All departments');
  setReportOptions(document.querySelector('#reportResourceDepartment'), departments, 'All departments');
  const employeeOptions = activeEmployees.map((employee) => ({ value: employee.id, label: employee.name }));
  setReportOptions(document.querySelector('#reportAssetEmployee'), employeeOptions, 'All employees');
  setReportOptions(document.querySelector('#reportEmployeeSelect'), employeeOptions, null);
  const quarterKeys = [...new Set(activeEmployees.flatMap((employee) => employeeEvaluations(employee).map((evaluation) => quarterFromDate(evaluation.date)?.key).filter(Boolean)))].sort().reverse();
  const currentQuarter = quarterFromDate(new Date().toISOString().slice(0, 10))?.key;
  const quarters = [...new Set([currentQuarter, ...quarterKeys])].filter(Boolean);
  setReportOptions(document.querySelector('#reportEvaluationQuarter'), quarters.map((key) => ({ value: key, label: quarterFromDate(`${key.slice(0, 4)}-${(Number(key.slice(-1)) - 1) * 3 + 1}-01`)?.label || key })), 'All quarters', currentQuarter);
  renderEvaluationReport();
  renderAssetReport();
  renderResourceAssignmentReport();
  renderEmployeeReport();
}

function csvValue(value) {
  const rawText = String(value ?? '');
  const text = /^[\s]*[=+@-]/.test(rawText) ? `'${rawText}` : rawText;
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadReportCsv(filename, headers, rows) {
  const csv = [headers, ...rows].map((row) => row.map(csvValue).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function reportFilename(label) {
  return `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${new Date().toISOString().slice(0, 10)}.csv`;
}

document.querySelectorAll('[data-report-view]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-report-view]').forEach((item) => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[data-report-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.reportPanel === button.dataset.reportView));
}));
document.querySelector('#reportEvaluationQuarter').addEventListener('change', renderEvaluationReport);
document.querySelector('#reportEvaluationDepartment').addEventListener('change', renderEvaluationReport);
document.querySelector('#reportAssetDepartment').addEventListener('change', renderAssetReport);
document.querySelector('#reportAssetEmployee').addEventListener('change', renderAssetReport);
document.querySelector('#reportResourceDepartment').addEventListener('change', renderResourceAssignmentReport);
document.querySelector('#reportEmployeeSelect').addEventListener('change', renderEmployeeReport);
document.querySelector('#exportEvaluationReport').addEventListener('click', () => {
  const rows = reportEvaluationRecords().map(({ employee, evaluation }) => [employee.name, employee.department, evaluation.date || '', evaluation.evaluator || employee.evaluator || employee.reportingTo || '', evaluation.score ?? '', evaluation.strength || '', evaluation.improvement || '', evaluation.development || '', evaluation.evaluatorComment || evaluation.managerComments || '']);
  downloadReportCsv(reportFilename('evaluation-results'), ['Employee', 'Department', 'Evaluation date', 'Evaluator', 'Score', 'Strengths', 'Improvement', 'Development focus', 'Comments'], rows);
});
document.querySelector('#exportAssetReport').addEventListener('click', () => {
  const rows = selectedReportAssets().map(({ asset, employee }) => [employee?.name || asset.assignedTo || 'Unknown employee', employee?.department || '', asset.assetType || asset.name || asset.assetName || 'Company asset', asset.description || '', asset.serialNumber || asset.reference || '', asset.dateIssued || '', asset.dateReturned || '', asset.handover?.name || '']);
  downloadReportCsv(reportFilename('company-assets'), ['Employee', 'Department', 'Asset', 'Description', 'Serial / asset No.', 'Date issued', 'Date returned', 'Handover file'], rows);
});
document.querySelector('#exportResourceReport').addEventListener('click', () => {
  const rows = resourceAssignmentGroups().flatMap(({ resource, assignments }) => assignments.length
    ? assignments.map(({ assignment, employee }) => [resource.title || 'Untitled resource', resource.category || '', assignments.length, employee.name, employee.department, assignment.assignedDate || '', assignment.status || 'Assigned', assignment.resultStatus || 'Pending', assignment.dueDate || '', assignment.passedDate || ''])
    : [[resource.title || 'Untitled resource', resource.category || '', 0, '', '', '', 'Not assigned', '', '', '']]);
  downloadReportCsv(reportFilename('resource-assignments'), ['Resource', 'Category', 'Times assigned', 'Assigned to', 'Department', 'Assigned date', 'Status', 'Result', 'Due date', 'Passed date'], rows);
});
document.querySelector('#exportEmployeeReport').addEventListener('click', () => {
  const employee = selectedReportEmployee();
  if (!employee) return;
  const { evaluations, assignments, assets, resources, skills, plans, certifications } = employeeReportRecords(employee);
  const passedCount = assignments.filter((assignment) => assignment.resultStatus === 'Passed').length;
  const failedCount = assignments.filter((assignment) => assignment.resultStatus === 'Failed').length;
  const missedCount = assignments.filter(isMissedTraining).length;
  const documents = [...new Set([
    ...(employee.documents || []).map((document) => document.name).filter(Boolean),
    ...assets.map((asset) => asset.handover?.name).filter(Boolean)
  ])];
  const rows = [
    ['Profile', 'Employee details', employee.joiningDate || '', employee.name, employee.department || '', employee.role || employee.designation || '', employee.reportingTo || '', '', '', ''],
    ...evaluations.map((evaluation) => {
      const { quarter, previousQuarter, previousEvaluation, change } = evaluationQuarterProgress(employee, evaluation);
      return ['Evaluation', 'Results', evaluation.date || '', quarter?.label || '', Number(evaluation.score) || 0, previousEvaluation?.score ?? '', change === null ? '' : `${change >= 0 ? '+' : ''}${change.toFixed(1)}`, previousQuarter?.label || '', '', ''];
    }),
    ...assets.map((asset) => ['Asset', 'Assigned assets', asset.dateIssued || '', asset.assetType || asset.name || asset.assetName || 'Company asset', asset.dateReturned ? 'Returned' : 'Assigned', '', '', '', '', '']),
    ...documents.map((name) => ['Document', 'Document names', '', name, '', '', '', '', '', '']),
    ['Training summary', 'Training results', '', `${assignments.length} courses`, '', `${passedCount} passed`, `${failedCount} failed`, `${missedCount} missed`, '', ''],
    ...assignments.map((assignment) => ['Training', 'Training results', assignment.assignedDate || '', resources.get(assignment.resourceId)?.title || 'Deleted course', isMissedTraining(assignment) ? 'Missed' : assignment.status || 'Assigned', assignment.resultStatus || 'Pending', '', '', assignment.dueDate || '', assignment.passedDate || '']),
    ...skills.map((skill) => ['Skill', 'Acquired skills', skill.assessedOn || '', skill.competency, Number(skill.currentLevel) >= Number(skill.targetLevel) ? 'Target achieved' : 'In progress', skill.currentLevel, skill.targetLevel, '', '', '']),
    ...certifications.map((certificate) => ['Certification', 'Acquired skills', certificate.issuedOn || '', certificate.name, certificate.issuer || '', '', '', '', certificate.expiresOn || '', '']),
    ...plans.map((plan) => ['Growth plan', 'Growth', plan.dueDate || '', plan.goal, plan.status || 'Planned', '', '', '', '', plan.actionPlan || ''])
  ];
  downloadReportCsv(reportFilename(`employee-${employee.name}`), ['Record type', 'Section', 'Date', 'Name / quarter', 'Status / result', 'Score / level', 'Previous result / target', 'Progress / previous quarter', 'Due date / expiry', 'Details'], rows);
});

document.querySelectorAll('[data-module]:not(.qbel-nav-link)').forEach((button) => button.addEventListener('click', () => showModule(button.dataset.module)));
document.querySelectorAll('.qbel-nav-link').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  const developmentView = link.dataset.developmentView;
  if (developmentView) { openDevelopmentView(developmentView); return; }
  showModule(link.dataset.module);
  if (link.dataset.module === 'evaluations' && link.dataset.tab) switchTab(link.dataset.tab);
}));
document.querySelector('#viewAllButton').addEventListener('click', () => {
  searchInput.value = '';
  departmentFilter.value = 'all';
  renderRows();
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
document.addEventListener('click', (event) => { if (!event.target.closest('.row-actions')) document.querySelectorAll('.action-menu').forEach((menu) => menu.classList.remove('open')); });

function updateHeaderDate() {
  const dateElement = document.querySelector('#todayDate');
  const reportsDateElement = document.querySelector('#reportsTodayDate');
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  if (dateElement) dateElement.textContent = formattedDate;
  if (reportsDateElement) reportsDateElement.textContent = formattedDate;
}

updateHeaderDate();
renderRows();
renderEmployeeRows();
updateEmployeeOptions();
const departmentInput = document.querySelector('#employeeDepartmentInput');
['IT', 'Customer Service'].forEach((department) => {
  if (![...departmentInput.options].some((option) => option.value === department)) departmentInput.insertAdjacentHTML('beforeend', `<option>${department}</option>`);
});
if (![...departmentFilter.options].some((option) => option.value === 'Customer Service')) departmentFilter.insertAdjacentHTML('beforeend', '<option value="Customer Service">Customer Service</option>');
updateDesignationOptions();
ensureEmployeeModalStyles();
ensureBrandStyles();

window.addEventListener('qbel-auth-ready', () => { void loadCloudData(); showModule('home'); });
if (typeof Auth !== 'undefined' && Auth.currentUser) {
  showModule('home');
  void loadCloudData();
}

document.querySelectorAll('[data-action="sign-out"]').forEach((button) => {
  button.addEventListener('click', async () => {
    if (typeof Auth === 'undefined') return;
    await Auth.logout();
    window.location.reload();
  });
});
