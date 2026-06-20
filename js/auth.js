(function () {
  "use strict";

  var AUTH_KEY = "esm-auth";

  function siteRoot() {
    var path = location.pathname;
    var slidesIdx = path.indexOf("/slides/");
    if (slidesIdx !== -1) return path.slice(0, slidesIdx + 1);
    var lastSlash = path.lastIndexOf("/");
    return lastSlash === -1 ? "/" : path.slice(0, lastSlash + 1);
  }

  async function hashPassword(password) {
    var buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(password)
    );
    return Array.from(new Uint8Array(buf))
      .map(function (b) {
        return b.toString(16).padStart(2, "0");
      })
      .join("");
  }

  function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  }

  function setAuthenticated() {
    sessionStorage.setItem(AUTH_KEY, "1");
  }

  function clearAuthenticated() {
    sessionStorage.removeItem(AUTH_KEY);
  }

  async function verifyPassword(password) {
    var expected =
      (window.AUTH_CONFIG && window.AUTH_CONFIG.passwordHash) || "";
    if (!expected) return false;
    return (await hashPassword(password)) === expected;
  }

  function requireAuth() {
    if (!isAuthenticated()) {
      location.replace(siteRoot());
      return false;
    }
    return true;
  }

  window.SiteAuth = {
    AUTH_KEY: AUTH_KEY,
    siteRoot: siteRoot,
    hashPassword: hashPassword,
    isAuthenticated: isAuthenticated,
    setAuthenticated: setAuthenticated,
    clearAuthenticated: clearAuthenticated,
    verifyPassword: verifyPassword,
    requireAuth: requireAuth,
  };
})();
