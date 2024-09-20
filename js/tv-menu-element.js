// constants
var MENU_ELEMENT = 4;
var MENU_TYPE = {
  VERTICAL_SQUARE_IMAGE_MENU: "1",
  HORIZONTAL_SQUARE_IMAGE_MENU: "2",
  HORIZONTAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU: "3",
  VERTICAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU: "4",
};

// variables
var menuElement;
var menuType;
var activeMenuColor;
var menuColor;
var menuItemList = [];
var currentMenuItemIndex;

// on load web page
$(document).ready(function () {
  // Call the function to detect platform and browser
  detectPlatformAndBrowser();
  menuElement = $("[element_type='" + MENU_ELEMENT + "']");

  if (menuElement.length) {
    menuType = menuElement.attr("menu_type");
    activeMenuColor = menuElement.attr("active_menu_color");
    menuColor = menuElement.attr("menu_color");
  }

  menuItemList = menuElement.length ? menuElement.children().toArray() : [];
  currentMenuItemIndex = -1;

  if (menuItemList.length > 0) {
    var selectedItem = null;
    for (var i = 0; i < menuItemList.length; i++) {
      var link = menuItemList[i].getAttribute("navigation_link");
      if (link === window.location.pathname) {
        currentMenuItemIndex = i;
        selectedItem = menuItemList[i];
        break;
      }
    }

    if (selectedItem) {
      setActiveMenuByType(selectedItem);
    }
  }
});

function detectPlatformAndBrowser() {
  var userAgent = navigator.userAgent.toLowerCase();
  var platform = "Unknown Platform";
  var browserInfo = "Unknown Browser";

  // Detect TV platforms
  if (userAgent.indexOf("android") !== -1) {
    platform = "Android TV";
  } else if (userAgent.indexOf("amino") !== -1) {
    platform = "Amino TV";
  } else if (userAgent.indexOf("infomir") !== -1) {
    platform = "Infomir TV";
  } else if (userAgent.indexOf("samsung") !== -1) {
    platform = "Samsung Smart TV";
  } else if (userAgent.indexOf("sony") !== -1) {
    platform = "Sony Smart TV";
  } else if (userAgent.indexOf("windows") !== -1 || userAgent.indexOf("macintosh") !== -1 || userAgent.indexOf("linux") !== -1) {
    platform = "PC Browser";
  }

  // Detect browser and version
  if (userAgent.indexOf("chrome") !== -1 && userAgent.indexOf("edg") === -1) {
    var chromeMatch = userAgent.match(/chrome\/(\d+)/);
    browserInfo = chromeMatch ? "Chrome version " + chromeMatch[1] : "Chrome";
  } else if (userAgent.indexOf("firefox") !== -1) {
    var firefoxMatch = userAgent.match(/firefox\/(\d+)/);
    browserInfo = firefoxMatch ? "Firefox version " + firefoxMatch[1] : "Firefox";
  } else if (userAgent.indexOf("safari") !== -1 && userAgent.indexOf("chrome") === -1) {
    var safariMatch = userAgent.match(/version\/(\d+)/);
    browserInfo = safariMatch ? "Safari version " + safariMatch[1] : "Safari";
  } else if (userAgent.indexOf("opera") !== -1 || userAgent.indexOf("opr") !== -1) {
    var operaMatch = userAgent.match(/(opera|opr)\/(\d+)/);
    browserInfo = operaMatch ? "Opera version " + operaMatch[2] : "Opera";
  } else if (userAgent.indexOf("msie") !== -1 || userAgent.indexOf("trident") !== -1) {
    var ieMatch = userAgent.match(/(msie|rv:)(\d+)/);
    browserInfo = ieMatch ? "Internet Explorer version " + ieMatch[2] : "Internet Explorer";
  } else if (userAgent.indexOf("edg") !== -1) {
    var edgeMatch = userAgent.match(/edg\/(\d+)/);
    browserInfo = edgeMatch ? "Edge version " + edgeMatch[1] : "Edge";
  }

  // Output platform and browser information
  alert("Platform: " + platform + "\nBrowser: " + browserInfo);
}

// helpers
function setActiveMenuByType(element) {
  var itemContainer = element.children[0];
  var imageElement = itemContainer.children[0];

  switch (menuType) {
    case MENU_TYPE.VERTICAL_SQUARE_IMAGE_MENU:
    case MENU_TYPE.HORIZONTAL_SQUARE_IMAGE_MENU:
      itemContainer.style.backgroundColor = activeMenuColor;
      break;
    case MENU_TYPE.VERTICAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
    case MENU_TYPE.HORIZONTAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
      itemContainer.style.backgroundColor = activeMenuColor;
      imageElement.style.backgroundColor = menuColor;
      break;
    default:
      console.log("set menu by type");
  }
}

function resetActiveMenuByType(element) {
  var itemContainer = element.children[0];
  var imageElement = itemContainer.children[0];

  switch (menuType) {
    case MENU_TYPE.VERTICAL_SQUARE_IMAGE_MENU:
    case MENU_TYPE.HORIZONTAL_SQUARE_IMAGE_MENU:
      itemContainer.style.backgroundColor = menuColor;
      break;
    case MENU_TYPE.VERTICAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
    case MENU_TYPE.HORIZONTAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
      itemContainer.style.backgroundColor = menuColor;
      imageElement.style.backgroundColor = activeMenuColor;
      break;
    default:
      console.log("reset menu by type");
  }
}

function goToPage() {
  var navigationLink =
    menuItemList[currentMenuItemIndex].getAttribute("navigation_link");

  if (navigationLink && navigationLink !== window.location.pathname) {
    window.location.href = navigationLink;
  }
}

// EVENTS
function callbackRCLeftArrow() {
  if (menuItemList.length > 0) {
    if (currentMenuItemIndex !== -1) {
      resetActiveMenuByType(menuItemList[currentMenuItemIndex]);
    }

    currentMenuItemIndex =
      currentMenuItemIndex <= 0 ? 0 : currentMenuItemIndex - 1;

    setActiveMenuByType(menuItemList[currentMenuItemIndex]);
  }
}

function callbackRCRightArrow() {
  if (menuItemList.length > 0) {
    if (currentMenuItemIndex !== -1) {
      resetActiveMenuByType(menuItemList[currentMenuItemIndex]);
    }

    currentMenuItemIndex =
      currentMenuItemIndex === -1
        ? 0
        : (currentMenuItemIndex + 1) % menuItemList.length;

    setActiveMenuByType(menuItemList[currentMenuItemIndex]);
  }
}

function callbackRCOK() {
  if (currentMenuItemIndex !== -1) {
    goToPage();
  }
}
