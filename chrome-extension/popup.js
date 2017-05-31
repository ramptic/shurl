/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    var title = tab.title;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url, title);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

function setUrl(url) {
  document.getElementById('url').value = url;
}

function setTitle(title) {
  document.getElementById('title').value = title;
}

function popupLogin() {
  w = 622;
  h = 400;

  var left = (window.screen.width/2)-(w/2);
  var top = (window.screen.height/2)-(h/2);

  var win = window.open(
    "login.html",
    "extension_login",
    "width=" + w + ",height=" + h + ", toolbar=no, location=no, menubar=no, status=no, status=no, scrollbars=no, resizable=no");

  win.moveTo(left, top);
}

document.addEventListener('DOMContentLoaded', function() {
  bg = chrome.extension.getBackgroundPage();
  loggedIn = bg.isLoggedIn();

  if (!loggedIn) {
    popupLogin();
  }

  getCurrentTabUrl(function(url, title) {
    setUrl(url);
    setTitle(title);
  });
});
