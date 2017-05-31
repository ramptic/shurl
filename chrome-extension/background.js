function quickSave(info, tab) {
  url = info.linkUrl;
  savedFromUrl = info.pageUrl;

  w = 622;
  h = 400;

  var left = (window.screen.width/2)-(w/2);
  var top = (window.screen.height/2)-(h/2);

  var win = window.open(
    "popup.html",
    "extension_popup",
    "width=" + w + ",height=" + h + ", toolbar=no, location=no, menubar=no, status=no, status=no, scrollbars=no, resizable=no");

  win.moveTo(left, top);

    // chrome.tabs.create({
    //   url:"popup.html"
    // });

  // console.log("Save: " + url + "\n\tfrom: " + savedFromUrl);
  //
  // var views = chrome.extension.getViews({type:"popup"});
  //
  // for (var i = 0; i < views.length; i++) {
  //   var view = views[i];
  //   view.hello();
  //   break;
  // }
}

var accessToken;

function isLoggedIn() {
  return accessToken != null;
}

chrome.contextMenus.create({
    "title": "Add link to shurl!",
    "contexts": ["link"],
    "onclick": quickSave
  });

// // Create one test item for each context type.
// var contexts = ["page","selection","link","editable","image","video",
//                 "audio"];
//
// for (var i = 0; i < contexts.length; i++) {
//   var context = contexts[i];
//   var title = "Test '" + context + "' menu item";
//   var id = chrome.contextMenus.create({"title": title, "contexts":[context],
//                                        "onclick": genericOnClick});
//   console.log("'" + context + "' item:" + id);
// }

// Create a parent item and two children.
var parent = chrome.contextMenus.create({"title": "Test parent item"});

var child1 = chrome.contextMenus.create(
  {"title": "Child 1", "parentId": parent, "onclick": quickSave});
var child2 = chrome.contextMenus.create(
  {"title": "Child 2", "parentId": parent, "onclick": quickSave});

// Create some radio items.
function radioOnClick(info, tab) {
  console.log("radio item " + info.menuItemId +
              " was clicked (previous checked state was "  +
              info.wasChecked + ")");
}

var radio1 = chrome.contextMenus.create({"title": "Radio 1", "type": "radio",
                                         "onclick":radioOnClick});
var radio2 = chrome.contextMenus.create({"title": "Radio 2", "type": "radio",
                                         "onclick":radioOnClick});

// Create some checkbox items.
function checkboxOnClick(info, tab) {
  console.log(JSON.stringify(info));
  console.log("checkbox item " + info.menuItemId +
              " was clicked, state is now: " + info.checked +
              "(previous state was " + info.wasChecked + ")");
}

var checkbox1 = chrome.contextMenus.create(
  {"title": "Checkbox1", "type": "checkbox", "onclick":checkboxOnClick});
var checkbox2 = chrome.contextMenus.create(
  {"title": "Checkbox2", "type": "checkbox", "onclick":checkboxOnClick});
