const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const outputDirectory = path.join(projectRoot, 'dist');
const staticFiles = ['index.html', 'app.js', 'auth.js', 'styles.css', 'logo.png', 'logo.svg', 'supabase-config.js'];

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const file of staticFiles) {
  const source = path.join(projectRoot, file);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(outputDirectory, file));
}

fs.cpSync(path.join(projectRoot, 'development-centre'), path.join(outputDirectory, 'development-centre'), { recursive: true });

process.env.SUPABASE_CONFIG_OUTPUT = path.join(outputDirectory, 'supabase-config.js');
require('./create-supabase-config');