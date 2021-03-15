const fs = require('fs'); // pull in the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);
/*
const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};
*/
// displaying the index
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// displaying the css
const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

//displaying the documentation
const getDocumentation = (request, response) =>{
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(documentation);
  response.end();
}

// exporting methods
module.exports = {
  getCSS,
  getIndex,
  getDocumentation,
};
