'use strict';

(function () {
  var ERROR_TIMEOUT = 3000;

  var errorPopup = document.querySelector('.error-popup');
  var errorText = errorPopup.querySelector('.error-message');

  var TranslateYParams = {
    PIN: 40,
    MAIN_PIN: 49
  };

  var MainPinLimits = {
    TOP: 100,
    BOTTOM: 500,
    LEFT: 0,
    RIGHT: 1200
  };

  var loadedAdverts = [];

  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var addressValue = document.querySelector('#address');

  var filterForm = document.querySelector('.map__filters');

  var addPin = function (fragment, pinData) {
    fragment.appendChild(window.pin.render(pinData));
  };

  var createFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    arr.forEach(function (data) {
      addPin(fragment, data);
    });
    return fragment;
  };

  var onAdvertsLoad = function (data) {
    loadedAdverts = data;
    mapPins.appendChild(createFragment(window.filterData(loadedAdverts)));
  };

  var onAdvertsLoadError = function (errorMessage) {
    errorText.textContent = errorMessage;
    errorPopup.classList.remove('hidden');
    setTimeout(function () {
      errorPopup.classList.add('hidden');
    }, ERROR_TIMEOUT);
  };

  var onFilterChange = function () {
    window.debounce(function () {
      var pins = mapPins.querySelectorAll('button[class^="map__pin"]');
      Array.from(pins).forEach(function (pin) {
        mapPins.removeChild(pin);
      });
      mapPins.appendChild(createFragment(window.filterData(loadedAdverts)));
    });
  };

  var initMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    var formItems = noticeForm.querySelectorAll('fieldset');
    Array.from(formItems).forEach(function (items) {
      items.removeAttribute('disabled');
    });
    window.backend.load(onAdvertsLoad, onAdvertsLoadError);
    addressValue.value = 'x: ' + mapPinMain.offsetLeft + ', y:' + (mapPinMain.offsetTop + TranslateYParams.MAIN_PIN);
    mapPinMain.removeEventListener('mouseup', initMap);
    filterForm.addEventListener('change', onFilterChange);
  };

  mapPinMain.addEventListener('mouseup', initMap);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if (currentCoords.y < MainPinLimits.TOP - TranslateYParams.MAIN_PIN) {
        currentCoords.y = MainPinLimits.TOP - TranslateYParams.MAIN_PIN;
      }
      if (currentCoords.y > MainPinLimits.BOTTOM - TranslateYParams.MAIN_PIN) {
        currentCoords.y = MainPinLimits.BOTTOM - TranslateYParams.MAIN_PIN;
      }
      if (currentCoords.x < MainPinLimits.LEFT) {
        currentCoords.x = MainPinLimits.LEFT;
      }
      if (currentCoords.x > MainPinLimits.RIGHT) {
        currentCoords.x = MainPinLimits.RIGHT;
      }

      mapPinMain.style.top = currentCoords.y + 'px';
      mapPinMain.style.left = currentCoords.x + 'px';

      window.setAddress(currentCoords.x, currentCoords.y + TranslateYParams.MAIN_PIN);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
