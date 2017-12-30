'use strict';

(function () {
  var ESC_KEYCODE = 27;
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

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArray = function (array, length, unique) {
    var randomArray = [];
    while (randomArray.length < length) {
      var value = array[getRandom(0, array.length)];
      if (unique && randomArray.indexOf(value) !== -1) {
        continue;
      } else {
        randomArray.push(value);
      }
    }
    return randomArray;
  };

  var closeAdvert = function () {
    window.card.close();
    window.pin.close();
  };

  var addPin = function (fragment, pinData) {
    fragment.appendChild(window.pin.render(pinData, function () {
      closeAdvert();
      window.card.open(pinData, closeAdvert);
    }));
  };

  var createFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      addPin(fragment, arr[i]);
    }
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
    }, 3000);
  };

  var initMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    var items = noticeForm.querySelectorAll('fieldset');
    for (var i = 0; i < items.length; i++) {
      items[i].removeAttribute('disabled');
    }
    window.load(onAdvertsLoad, onAdvertsLoadError);
    addressValue.value = 'x: ' + mapPinMain.offsetLeft + ', y:' + (mapPinMain.offsetTop + TranslateYParams.MAIN_PIN);
    mapPinMain.removeEventListener('mouseup', initMap);
    filterForm.addEventListener('change', function () {
      window.debounce(function () {
        var pins = mapPins.querySelectorAll('button[class="map__pin"]');
        for (var i = 0; i < pins.length; i++) {
          mapPins.removeChild(pins[i]);
        }
        mapPins.appendChild(createFragment(window.filterData(loadedAdverts)));
      });
    });
    document.documentElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE && evt.target.className.indexOf('popup__close') === -1) {
        closeAdvert();
      }
    });
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
