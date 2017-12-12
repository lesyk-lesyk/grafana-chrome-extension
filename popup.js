$(document).ready(function () {

  $("#refresh-btn").click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
  });

  getCurrentTabURL()
    .then(url => {
      const origin = getCurrentTabOrigin(url);

      getFromStorage(GRAFANA_TIMEOUT_KEY, origin)
        .then((timeoutValue) => {
          console.log('timeoutValue', timeoutValue);
          var timeoutInput = document.getElementById('timeout-input');
          timeoutInput.value = timeoutValue;
        });

      getFromStorage(GRAFANA_ENABLE_KEY, origin)
        .then((isEnabled) => {
          console.log('isEnabled', isEnabled);
          $('#enabled-checkbox').prop('checked', isEnabled);
        });

      $("#save").click(function () {
        var timeoutInput = document.getElementById('timeout-input');
        saveToStorage(GRAFANA_TIMEOUT_KEY, origin, timeoutInput.value);
      });

      $('#enabled-checkbox').change(function () {
        console.log('checkbox update', this.checked);
        saveToStorage(GRAFANA_ENABLE_KEY, origin, this.checked);
      });
    });
});
