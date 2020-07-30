const { URL } = require("url");

const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return host === "codesandbox.io" && !pathname.includes("/embed");
};

const getCodeSandboxIFrameSrc = (url) => {
  const { host, pathname, searchParams } = new URL(url);

  // Don't preload videos
  if (!searchParams.has("preload")) {
    searchParams.set("preload", false);
  }

  return `https://${host}${pathname}/embed?${searchParams.toString()}`;
};

const getHTML = (url) => {
  const iframeSrc = getCodeSandboxIFrameSrc(url);

  return `
    <div style="position: relative;">
      <div style="height: 0px; padding-bottom: 56.25%;">
        <iframe
          src="${iframeSrc}"
          style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;position:absolute;top:0 left:0; border:none; border-radius: 4px"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  `;
};

module.exports = { getHTML, shouldTransform };
