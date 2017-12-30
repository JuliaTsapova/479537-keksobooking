'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var pinTemplate = document.querySelector('#advert-template').content.querySelector('.map__pin');

  var closePin = function () {
    var pin = document.querySelector('.map__pin--active');
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
  };

  var onPinClick = function (pin, cardData, action) {
    action();
    pin.classList.add('map__pin--active');
  };

  var renderPin = function (pinData, action) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.setProperty('left', pinData.location.x + 'px');
    pin.style.setProperty('top', pinData.location.y + 'px');
    pin.querySelector('img').src = pinData.author.avatar;
    pin.addEventListener('click', function () {
      onPinClick(pin, pinData, action);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        onPinClick(pin, pinData, action);
      }
    });
    return pin;
  };

  window.pin = {
    close: closePin,
    render: renderPin
  };
})();
