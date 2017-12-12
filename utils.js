// https://developer.chrome.com/apps/storage#type-StorageArea

function getFromStorage(key, origin, callback) {
  const originKey = createOriginKey(key, origin);

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(originKey, function (values) {
      chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(values[originKey]);
    });
  });
}

function saveToStorage(key, origin, value) {
  const originKey = createOriginKey(key, origin);

  const items = {};
  items[originKey] = value;
  chrome.storage.sync.set(items);
}

function createOriginKey(key, origin) {
  return `${key}__${origin}`;
}

function getCurrentTabURL() {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  return new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, (tabs) => {
      var tab = tabs[0];
      var url = tab.url;

      if (typeof url == 'string') {
        resolve(url);
      } else {
        reject('tab.url should be a string');
      }
    });
  });
}

function getCurrentTabOrigin(tabUrl) {
  var url = new URL(tabUrl);
  return url.origin;
}


// chrome.storage.sync.get(null, function (data) { console.info(data) });
