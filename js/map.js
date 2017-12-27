'use strict';

(function () {
  var ADS_COUNT = 8;
  var ESC_KEYCODE = 27;
  var PIN_TRANSLATE_X = 23;
  var PIN_TRANSLATE_Y = 50;
  var MAIN_PIN_TRANSLATE_X = 20;
  var MAIN_PIN_TRANSLATE_Y = 57;
  var mainPinTopLimit = 100;
  var mainPinBottomLimit = 500;
  var mainPinLeftLimit = 0;
  var mainPinRightLimit = 1200;

  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

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

  var getAdvertsArray = function (arrLength) {
    var adverts = [];
    for (var i = 0; i < arrLength; i++) {
      adverts.push(window.advert(i, PIN_TRANSLATE_X, PIN_TRANSLATE_Y));
    }
    return adverts;
  };

  var initMap = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    var items = noticeForm.querySelectorAll('fieldset');
    for (var i = 0; i < items.length; i++) {
      items[i].removeAttribute('disabled');
    }
    mapPins.appendChild(createFragment(getAdvertsArray(ADS_COUNT)));
    mapPinMain.removeEventListener('mouseup', initMap);
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

      if (currentCoords.y < mainPinTopLimit) {
        currentCoords.y = mainPinTopLimit;
      }
      if (currentCoords.y > mainPinBottomLimit) {
        currentCoords.y = mainPinBottomLimit;
      }
      if (currentCoords.x < mainPinLeftLimit) {
        currentCoords.x = mainPinLeftLimit;
      }
      if (currentCoords.x > mainPinRightLimit) {
        currentCoords.x = mainPinRightLimit;
      }

      mapPinMain.style.top = currentCoords.y + 'px';
      mapPinMain.style.left = currentCoords.x + 'px';

      window.setAddress(currentCoords.x, currentCoords.y, MAIN_PIN_TRANSLATE_X, MAIN_PIN_TRANSLATE_Y);
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
