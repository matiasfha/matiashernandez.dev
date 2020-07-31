const { URL } = require("url");

const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return host === "egghead.io" && pathname.includes("/lessons/");
};

//http://egghead.io/lessons/gatsby-crear-un-plugin-de-gatsby-para-consumir-datos-de-una-api-externa
const getHTML = (url) => {
  const lessonId = new URL(url).pathname.replace(/\/lessons\//, "");
  return `
    <div style="position: relative;">
      <EggheadLesson lessonId={${lessonId}} />
    </div>
  `;
};

module.exports = { getHTML, shouldTransform };
/*
      <div style="height: 0px; padding-bottom: 56.25%;">
        <iframe
          src="${iframeSrc}"
          style="position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; border: none; border-radius: 4px;"
          allowfullscreen
        >
        </iframe>
      </div>
      */
