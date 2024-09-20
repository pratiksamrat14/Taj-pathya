$(document).ready(function () {
  detectPlatformAndBrowser();
});

function detectPlatformAndBrowser() {
  var userAgent = navigator.userAgent.toLowerCase();
  var platform = "Unknown Platform";
  var browserInfo = "Unknown Browser";

  // Detect TV platforms
  if (userAgent.indexOf("android") !== -1) {
    platform = "android";
  } else if (userAgent.indexOf("amino") !== -1) {
    platform = "amino";
  } else if (userAgent.indexOf("infomir") !== -1) {
    platform = "infomir";
  } else if (userAgent.indexOf("samsung") !== -1) {
    platform = "samsung_smart";
  } else if (userAgent.indexOf("sony") !== -1) {
    platform = "sony_smart";
  } else if (
    userAgent.indexOf("windows") !== -1 ||
    userAgent.indexOf("macintosh") !== -1 ||
    userAgent.indexOf("linux") !== -1
  ) {
    platform = "pc-browser";
  } else {
    platform = "";
  }

  // Detect browser and version
  if (userAgent.indexOf("chrome") !== -1 && userAgent.indexOf("edg") === -1) {
    var chromeMatch = userAgent.match(/chrome\/(\d+)/);
    browserInfo = chromeMatch ? "" + chromeMatch[1] : "";
  } else if (userAgent.indexOf("firefox") !== -1) {
    var firefoxMatch = userAgent.match(/firefox\/(\d+)/);
    browserInfo = firefoxMatch ? "" + firefoxMatch[1] : "";
  } else if (
    userAgent.indexOf("safari") !== -1 &&
    userAgent.indexOf("chrome") === -1
  ) {
    var safariMatch = userAgent.match(/version\/(\d+)/);
    browserInfo = safariMatch ? "" + safariMatch[1] : "";
  } else if (
    userAgent.indexOf("opera") !== -1 ||
    userAgent.indexOf("opr") !== -1
  ) {
    var operaMatch = userAgent.match(/(opera|opr)\/(\d+)/);
    browserInfo = operaMatch ? "" + operaMatch[2] : "";
  } else if (
    userAgent.indexOf("msie") !== -1 ||
    userAgent.indexOf("trident") !== -1
  ) {
    var ieMatch = userAgent.match(/(msie|rv:)(\d+)/);
    browserInfo = ieMatch ? "" + ieMatch[2] : "";
  } else if (userAgent.indexOf("edg") !== -1) {
    var edgeMatch = userAgent.match(/edg\/(\d+)/);
    browserInfo = edgeMatch ? "" + edgeMatch[1] : "";
  }

  // Output platform and browser information
  alert("Platform: " + platform + "\nBrowser: " + browserInfo);
  
  var keyCode =
    platform !== "" ? "js/" + platform + "/key_code.js" : "js/key_code.js";

  $("<script>")
    .attr("type", "text/javascript")
    .attr("src", keyCode)
    .attr("defer", true)
    .appendTo("head");

  var keyEvent =
    platform !== "" ? "js/" + platform + "/key_event.js" : "js/key_event.js";
  $("<script>")
    .attr("type", "text/javascript")
    .attr("src", keyEvent)
    .attr("defer", true)
    .appendTo("head");

  $("<script>")
    .attr("type", "text/javascript")
    .attr("src", "js/tv-menu-element.js")
    .attr("defer", true)
    .appendTo("head");
}
