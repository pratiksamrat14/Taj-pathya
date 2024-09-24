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
var showMenuTimer = null;
var pageHistory = JSON.parse(sessionStorage.getItem("pageHistory")) || [];
var carouselSize = 0;
var carouselWrapper;

// on load web page
$(document).ready(function () {
  menuElement = $("[element_type='" + MENU_ELEMENT + "']");
  if (menuElement.length) {
    menuType = menuElement.attr("menu_type");
    activeMenuColor = menuElement.attr("active_menu_color");
    menuColor = menuElement.attr("menu_color");
    carouselSize = parseInt(menuElement.attr("carousal_step"), 10);
  }

  if (carouselSize === 0) {
    menuItemList = menuElement.length ? menuElement.children().toArray() : [];
  } else {
    carouselWrapper = $("#carousal-wrapper");
    menuItemList = carouselWrapper.length
      ? carouselWrapper.children().toArray()
      : [];
    $("#menu-left-arrow").hide();
  }

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
      if (carouselSize > 0) {
        var rotations = Math.floor((currentMenuItemIndex + 1) / carouselSize);
        while (rotations) {
          scrollMenuRightORBottom();
          rotations--;
        }
        carousalLeftArrow();
        carousalRightArrow();
      }

      setActiveMenuByType(selectedItem);
    }
    startMenuHideTimer();
  }

  if (
    pageHistory.length === 0 ||
    pageHistory[pageHistory.length - 1] !== window.location.pathname
  ) {
    pageHistory.push(window.location.pathname);
    sessionStorage.setItem("pageHistory", JSON.stringify(pageHistory));
  }
});

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
    if (pageHistory[pageHistory.length - 1] !== window.location.pathname) {
      pageHistory.push(window.location.pathname);
      sessionStorage.setItem("pageHistory", JSON.stringify(pageHistory));
    }
    window.location.href = navigationLink;
  }
}

function startMenuHideTimer() {
  menuElement.fadeIn("fast");

  showMenuTimer = setTimeout(function () {
    menuElement.fadeOut("slow");
  }, 10000);
}

function resetMenuHideTimer() {
  clearTimeout(showMenuTimer);
  startMenuHideTimer();
}

function scrollMenuLeftORTop() {
  switch (menuType) {
    case MENU_TYPE.HORIZONTAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
    case MENU_TYPE.HORIZONTAL_SQUARE_IMAGE_MENU:
      var width = carouselWrapper.width();

      carouselWrapper.animate(
        {
          scrollLeft: "-=" + width,
        },
        600
      );

      break;
    case MENU_TYPE.VERTICAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
    case MENU_TYPE.VERTICAL_SQUARE_IMAGE_MENU:
      var height = carouselWrapper.height();

      carouselWrapper.animate(
        {
          scrollTop: "-=" + height,
        },
        600
      );
      break;
    default:
      console.log("default no scroll");
  }
}

function scrollMenuRightORBottom() {
  switch (menuType) {
    case MENU_TYPE.HORIZONTAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
    case MENU_TYPE.HORIZONTAL_SQUARE_IMAGE_MENU:
      var width = carouselWrapper.width();

      carouselWrapper.animate(
        {
          scrollLeft: "+=" + width,
        },
        600
      );
      break;
    case MENU_TYPE.VERTICAL_ROUNDED_CORNER_CIRCULAR_IMAGES_MENU:
    case MENU_TYPE.VERTICAL_SQUARE_IMAGE_MENU:
      var height = carouselWrapper.height();

      carouselWrapper.animate(
        {
          scrollTop: "+=" + height,
        },
        600
      );
      break;
    default:
      console.log("default no scroll");
  }
}

function carousalLeftArrow() {
  if (currentMenuItemIndex != -1 && carouselSize !== 0) {
    var totalRounds = Math.ceil(menuItemList.length / carouselSize);
    var pendingRightOrBottomRounds =
      totalRounds -
      Math.ceil((menuItemList.length - currentMenuItemIndex) / carouselSize);

    if (pendingRightOrBottomRounds) {
      $("#menu-left-arrow").show(500);
    } else {
      $("#menu-left-arrow").hide();
    }
  }
}

function carousalRightArrow() {
  if (currentMenuItemIndex != -1 && carouselSize !== 0) {
    var totalRounds = Math.ceil(menuItemList.length / carouselSize);
    var pendingLeftOrTopRounds =
      totalRounds - Math.ceil((currentMenuItemIndex + 1) / carouselSize);

    if (pendingLeftOrTopRounds) {
      $("#menu-right-arrow").show(500);
    } else {
      $("#menu-right-arrow").hide();
    }
  }
}

// EVENTS
function callbackRCLeftArrow() {
  if (menuItemList.length > 0) {
    // show menu and reset menu hide timer
    resetMenuHideTimer();

    // scroll to hidden items
    if (
      carouselSize !== 0 &&
      (menuItemList.length - currentMenuItemIndex) % carouselSize === 0
    ) {
      scrollMenuLeftORTop();
    }

    carousalRightArrow();

    if (currentMenuItemIndex !== -1) {
      resetActiveMenuByType(menuItemList[currentMenuItemIndex]);
    }

    currentMenuItemIndex =
      currentMenuItemIndex <= 0 ? 0 : currentMenuItemIndex - 1;

    setActiveMenuByType(menuItemList[currentMenuItemIndex]);
    carousalLeftArrow();
  }
}

function callbackRCRightArrow() {
  if (menuItemList.length > 0) {
    // show menu and reset menu hide timer
    resetMenuHideTimer();

    // scroll to hidden items
    if (carouselSize !== 0 && (currentMenuItemIndex + 1) % carouselSize === 0) {
      scrollMenuRightORBottom();
    }

    carousalLeftArrow();

    if (currentMenuItemIndex !== -1) {
      resetActiveMenuByType(menuItemList[currentMenuItemIndex]);
    }

    currentMenuItemIndex =
      currentMenuItemIndex + 1 >= menuItemList.length
        ? currentMenuItemIndex
        : currentMenuItemIndex + 1;

    setActiveMenuByType(menuItemList[currentMenuItemIndex]);
    carousalRightArrow();
  }
}

function callbackRCOK() {
  if (currentMenuItemIndex !== -1) {
    resetMenuHideTimer();
    goToPage();
  }
}

function callbackRCBack() {
  if (pageHistory.length > 1) {
    pageHistory.pop();
    sessionStorage.setItem("pageHistory", JSON.stringify(pageHistory));
    var previousPage = pageHistory[pageHistory.length - 1];
    window.location.href = previousPage;
  }
}
