'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  window.load = function (onLoad, onError) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 30000;
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.open('GET', LOAD_URL);
      xhr.send();
    } catch (error) {
      onError(error.message);
    }
  };
  window.upload = function (data, onLoad, onError) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.timeout = 30000;
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    } catch (error) {
      onError(error.message);
    }
  };
})();
