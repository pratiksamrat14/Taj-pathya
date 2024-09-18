alert("alert in tv-menu-element.js");
/*
// constants
const MENU_ELEMENT = 4;
const MENU_TYPE = {
  VERTICAL_SQUARE_IMAGE_MENU: "1",
  HORIZONTAL_SQUARE_IMAGE_MENU: "2",
  HORIZONTAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU: "3",
  VERTICAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU: "4",
};

// variables
let menuElement;
let menuType;
let activeMenuColor;
let menuColor;
let menuItemList = [];
let currentMenuItemIndex;

// on load web page
$(document).ready(function () {
  menuElement = $(`[element_type = '${MENU_ELEMENT}']`);
  if (menuElement) {
    menuType = menuElement.attr("menu_type");
    activeMenuColor = menuElement.attr("active_menu_color");
    menuColor = menuElement.attr("menu_color");
  }

  menuItemList = menuElement ? menuElement.children().toArray() : [];
  currentMenuItemIndex = -1;

  if (menuItemList.length > 0) {
    const selectedItem = menuItemList.find((it, index) => {
      const link = it.getAttribute("navigation_link");
      const flag = link === window.location.pathname;
      if (flag) {
        currentMenuItemIndex = index;
      }
      return flag;
    });

    if (selectedItem) {
      setActiveMenuByType(selectedItem);
    }
  }
});

// helpers
function setActiveMenuByType(element) {
  const itemContainer = element.children[0];
  const imageElement = itemContainer.children[0];

  switch (menuType) {
    case MENU_TYPE.VERTICAL_SQUARE_IMAGE_MENU:
    case MENU_TYPE.HORIZONTAL_SQUARE_IMAGE_MENU: {
      itemContainer.style.backgroundColor = activeMenuColor;
      break;
    }
    case MENU_TYPE.VERTICAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
    case MENU_TYPE.HORIZONTAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU: {
      itemContainer.style.backgroundColor = activeMenuColor;
      imageElement.style.backgroundColor = menuColor;
      break;
    }
    default:
      console.log("set menu by type");
  }
}
function resetActiveMenuByType(element) {
  const itemContainer = element.children[0];
  const imageElement = itemContainer.children[0];

  switch (menuType) {
    case MENU_TYPE.VERTICAL_SQUARE_IMAGE_MENU:
    case MENU_TYPE.HORIZONTAL_SQUARE_IMAGE_MENU: {
      itemContainer.style.backgroundColor = menuColor;
      break;
    }
    case MENU_TYPE.VERTICAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
    case MENU_TYPE.HORIZONTAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU: {
      itemContainer.style.backgroundColor = menuColor;
      imageElement.style.backgroundColor = activeMenuColor;
      break;
    }
    default:
      console.log("reset menu by type");
  }
}

function goToPage() {
  const navigationLink =
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
 */