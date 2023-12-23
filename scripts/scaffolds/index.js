#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const serviceConfig = require('./service/index.js');


function camelcase(aString, isVariable = false) {
  aString = aString.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 && isVariable ? word.toLowerCase() : word.toUpperCase();
}).replace(/\s+/g, '')
  aString = aString.split('-').join('');;
  return aString;
}

handlebars.registerHelper('camelcase', camelcase);

const scaffolds = {
    'service': {
        config: serviceConfig.config,
    }
};


function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createFile(filePath, content = '') {
  // check if directory exists
  const dirPath = path.dirname(filePath);
  createDirectory(dirPath);

  fs.writeFileSync(filePath, content);
}

function copyTemplate(templatePath, targetPath, variables) {
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const template = handlebars.compile(templateContent);
  const result = template(variables);
  createFile(targetPath, result);
}

function scaffoldService(serviceName) {
  const projectDir = path.join(process.cwd(), 'src');

  const config = scaffolds['service'].config;

  config.files.forEach((fileBucket) => {
    const bucketName = fileBucket.name;
    // TODO: add a check to ignore files in the bucket as per user args
    const bucketPath = path.join(projectDir, fileBucket.path, serviceName + (fileBucket.extn ?? ''));
    createDirectory(bucketPath);

    fileBucket.files.forEach((file) => {
      const filePath = path.join(bucketPath, file ) + '.ts';
      const templatePath = path.join(process.cwd(), config.templatesRoot, bucketName, file) + '.hbs';
      const variables = { name: serviceName };
      copyTemplate(templatePath, filePath, variables);
    });
  });
  console.log(`Scaffolding for ${serviceName} completed successfully.`);
}

// Get project name from command line arguments
const srvcName = process.argv[2];

if (!srvcName) {
  console.error('Please provide a service name.');
  process.exit(1);
}

scaffoldService(srvcName);
