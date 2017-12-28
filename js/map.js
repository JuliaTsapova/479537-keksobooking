'use strict';

(function () {
  var ADS_COUNT = 8;
  var ESC_KEYCODE = 27;

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
      adverts.push(window.advert(i, TranslateYParams.PIN));
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
