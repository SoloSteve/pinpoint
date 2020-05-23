export function getCookie(key) {
  let c = document.cookie, v = 0, cookies = {};
  if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
    c = RegExp.$1;
    v = 1;
  }
  if (v === 0) {
    c.split(/[,;]/).map(function (cookie) {
      let parts = cookie.split(/=/, 2),
        name = decodeURIComponent(parts[0].replace(/^\s+/, ""));
      cookies[name] = parts.length > 1 ? decodeURIComponent(parts[1].replace(/\s+$/, "")) : null;
    });
  } else {
    c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function ($0, $1) {
      cookies[$0] = $1.charAt(0) === '"'
        ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
        : $1;
    });
  }
  return cookies[key] || null;
}