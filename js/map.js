'use strict';

(function() {

  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var closeBoth = function() {
    window.card.closeCard();
    window.pin.closePin();
  };

  var renderPin = function(fragment, pinData) {
    fragment.appendChild(window.pin.renderPin(pinData, function() {
      closeBoth();
      window.card.openCard(pinData, closeBoth);
    }));
  };

  var createFragment = function(arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      renderPin(fragment, arr[i]);
    }
    return fragment;
  };

  var initMap = function() {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    var items = noticeForm.querySelectorAll('fieldset');
    for (var i = 0; i < items.length; i++) {
      items[i].removeAttribute('disabled');
    }
    mapPins.appendChild(createFragment(window.adverts));
    mapPinMain.removeEventListener('mouseup', initMap);
    document.documentElement.addEventListener('keydown', function(evt) {
      if (evt.keyCode === ESC_KEYCODE && evt.target.className.indexOf('popup__close') === -1) {
        closeBoth();
      }
    });
  };

  mapPinMain.addEventListener('mouseup', initMap);

})();
