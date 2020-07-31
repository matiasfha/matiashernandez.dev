const { URL } = require("url");

const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);
  return host.includes("buzzsprout.com") && pathname.includes("player");
};

const getHTML = (url) => {
  const { pathname } = new URL(url);
  const [, podcastId, episodeId] = pathname.split("/");
  const embedUrl = `https://www.buzzsprout.com/${podcastId}/${episodeId}?client_source=admin&amp;iframe=true`;
  return `
    <div style="position:relative; width:100">
        <iframe
          src="${embedUrl}"
          width="100%"
          height="200"
          frameBorder="0"
          scrolling="no"
          title="Podcast Episode"
        />
    </div>
  `;
};

module.exports = { getHTML, shouldTransform };
