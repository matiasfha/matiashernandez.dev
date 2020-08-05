const { URL } = require("url");

const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return host === "egghead.io" && pathname.includes("/lessons/");
};

const getHTML = (url) => {
  const lessonId = new URL(url).pathname.replace(/\/lessons\//, "");
  return `
    <div style="position: relative;">
      <EggheadLesson lessonId="${lessonId}?af=4cexzz" />
    </div>
  `;
};

module.exports = { getHTML, shouldTransform };
