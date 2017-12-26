'use strict';

(function () {
  var ADS_COUNT = 8;
  var ESC_KEYCODE = 27;
  var pinTranslateX = 20;
  var pinTranslateY = 40;

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
      adverts.push(window.advert(i, pinTranslateX, pinTranslateY));
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

})();
