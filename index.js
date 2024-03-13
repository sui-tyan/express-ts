#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const [, , projectName] = process.argv;

if (!projectName) {
  console.error('Please provide a project name!');
  process.exit(1);
}

const projectDir = path.join(process.cwd(), projectName);

if (fs.existsSync(projectDir)) {
  console.error(`Directory '${projectDir}' already exists!`);
  process.exit(1);
}

fs.mkdirSync(projectDir);

const templateDir = path.join(__dirname, 'template');

fs.promises
  .readdir(templateDir)
  .then((files) =>
    Promise.all(files.map((file) => copyFile(templateDir, projectDir, file)))
  )
  .then(() => console.log(`Project '${projectName}' created successfully!`))
  .catch((err) => console.error(err));

function copyFile(sourceDir, destDir, file) {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  return fs.promises.copyFile(sourcePath, destPath);
}
