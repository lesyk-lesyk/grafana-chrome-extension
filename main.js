$(document).ready(function () {
  const origin = getCurrentTabOrigin(location.href);

  Promise.all([
    getFromStorage(GRAFANA_TIMEOUT_KEY, origin),
    getFromStorage(GRAFANA_ENABLE_KEY, origin)
  ]).then(([timeoutValue, isEnable]) => {
    console.log('promise all', timeoutValue, isEnable);

    let timeout;
    if (isNaN(timeoutValue)) {
      saveToStorage(GRAFANA_TIMEOUT_KEY, origin, DEFAULT_TIMEOUT);
      timeout = DEFAULT_TIMEOUT;
    } else {
      timeout = timeoutValue;
    }

    if (isEnable) {
      applyStylesWithTimeout(timeout);
    }
  });
});

function applyStylesWithTimeout(timeout) {
  console.log('applyStylesWithTimeout call', timeout);
  setTimeout(() => {
    // $('.table-panel-wrapper').attr('style', 'user-select:text');
    $('.table-panel-wrapper').each(function (i, obj) { obj.setAttribute("draggable", "false"); });
    console.log('applyStylesWithTimeout run', timeout);
  }, timeout);
}

// src: 
// https://github.com/grafana/grafana/issues/2083
