const fs = require('fs');
const path = require('path');
// https://medium.com/front-end-hacking/server-side-rendering-with-react-and-express-382591bfc77c
// to increase SEO

const template = (url) => {

  var templateFile = null;
  var content = null;
  var pwd = (process.env.PWD) ? process.env.PWD : process.env.INIT_CWD;

  if (url == "/") {
    templateFile = path.join(pwd, './public/index.html');
  } else {
    // to load assets
    templateFile = path.join(pwd, `./public${url}`);
  }

  try {
    content = fs.readFileSync(templateFile, 'utf8');
  } catch (err) {
    templateFile = path.join(pwd, './public/not-found.html');
    content = fs.readFileSync(templateFile, 'utf8');
  }

  // ###################################
  // CREATE META - To increase SEO
  // create title and description based on url
  var title = "Seeds Job Fair - App";
  var description = "Virtual Career Fair - Powered by Seeds Job Fair - Innovaseeds Solutions";

  if (url.indexOf('vacancy') >= 0) {
    var id = getIdFromUrl(url);
    title = "Vacancy ID " + id;
  }

  // inject custom title and description
  content = content.replace("{{title}}", title);
  content = content.replace("{{description}}", description);

  return content;
};

function getIdFromUrl(url) {
  url = url.split("/");
  var id = url[url.length - 1];
  try {
    return Number.parseInt(id);
  } catch (err) {
    return false;
  }
}

module.exports = {
  template
};
