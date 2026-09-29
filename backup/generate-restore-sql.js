const fs = require('fs');

const backup = JSON.parse(fs.readFileSync('qbel-evaluations-backup-20260921.json', 'utf8'));

function quote(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function json(value) {
  return `${quote(JSON.stringify(value || []))}::jsonb`;
}

const employeeSql = backup.employees.map((row) => `insert into public.employees (id, full_name, department, designation, joining_date, reporting_to, job_description_name, job_description_url, created_at, updated_at) values (${[
  quote(row.id),
  quote(row.full_name),
  quote(row.department),
  quote(row.designation),
  quote(row.joining_date),
  quote(row.reporting_to),
  quote(row.job_description_name),
  'NULL',
  quote(row.created_at),
  quote(row.updated_at)
].join(', ')});`).join('\n');

const evaluationSql = backup.evaluations.map((row) => `insert into public.evaluations (id, employee_id, evaluation_date, score, previous_score, ratings, employee_area_of_development, employee_improvement, employee_strength, direct_manager_comments, evaluator_comment, employee_signature, manager_signature, evaluator_signature, created_at) values (${[
  quote(row.id),
  quote(row.employee_id),
  quote(row.evaluation_date),
  quote(row.score),
  quote(row.previous_score),
  json(row.ratings),
  quote(row.employee_area_of_development),
  quote(row.employee_improvement),
  quote(row.employee_strength),
  quote(row.direct_manager_comments),
  quote(row.evaluator_comment),
  'NULL',
  'NULL',
  'NULL',
  quote(row.created_at)
].join(', ')});`).join('\n');

const restoreSql = `begin;\n${employeeSql}\n${evaluationSql}\ncommit;\n`;
fs.writeFileSync('restore-evaluations.sql', restoreSql);
console.log(JSON.stringify({
  employees: backup.employees.length,
  evaluations: backup.evaluations.length,
  bytes: Buffer.byteLength(restoreSql)
}));
