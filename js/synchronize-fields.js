'use strict';

(function () {
  window.synchronizeFields = function (element1, element2, params1, params2, callback) {
    element1.addEventListener('change', function () {
      callback(element1, element2, params1, params2);
    });
  };
})();
