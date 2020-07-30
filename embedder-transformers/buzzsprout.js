const { URL } = require("url");

const shouldTransform = (url) => {
  const { host } = new URL(url);
  return host.includes("buzzsprout.com");
};

const getHTML = (url) => {
  const embedUrl = `${url}?client_source=admin&amp;iframe=true`;
  return `
  <div style="position: relative">
    <iframe src="${embedUrl}" width="100%" height="200" frameborder="0" scrolling="no"></iframe>
  </div>
  `;
};

module.exports = { getHTML, shouldTransform };
