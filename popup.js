$(document).ready(function () {
  getCurrentTabURL()
    .then(url => {
      const origin = getCurrentTabOrigin(url);

      getFromStorage(GRAFANA_TIMEOUT_KEY, origin)
        .then((timeoutValue) => {
          $('#timeout-input').val(timeoutValue / 1000);
        });

      getFromStorage(GRAFANA_ENABLE_KEY, origin)
        .then((isEnabled) => {
          console.log('isEnabled', isEnabled);
          $('#enabled-checkbox').prop('checked', isEnabled);
        });

      $("#save").click(function () {
        var timeoutInputValue = $('#timeout-input').val();
        saveToStorage(GRAFANA_TIMEOUT_KEY, origin, timeoutInputValue * 1000);
      });

      $('#enabled-checkbox').change(function () {
        console.log('checkbox update', this.checked);
        saveToStorage(GRAFANA_ENABLE_KEY, origin, this.checked);
      });

      $("#refresh-btn").click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
          window.close();
        });
      });
    });
});
