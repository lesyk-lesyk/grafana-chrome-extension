$(document).ready(function () {
  const origin = getCurrentTabOrigin(location.href);

  Promise.all([
    getFromStorage(GRAFANA_TIMEOUT_KEY, origin),
    getFromStorage(GRAFANA_ENABLE_KEY, origin)
  ]).then(([timeoutValue, isEnable]) => {
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
  setTimeout(() => {
    // issue URL: https://github.com/grafana/grafana/issues/2083

    // Solution 1:
    $('.table-panel-wrapper').each(function (i, obj) { obj.setAttribute("draggable", "false"); });

    // Solution 2:
    // $('.table-panel-wrapper').attr('style', 'user-select:text');
  }, timeout);
}
