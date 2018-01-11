'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var pinTemplate = document.querySelector('#advert-template').content.querySelector('.map__pin');

  var openPin = function (pin) {
    pin.classList.add('map__pin--active');
  };

  var closePin = function () {
    var pin = document.querySelector('.map__pin--active');
    if (pin) {
      pin.classList.remove('map__pin--active');
    }
  };

  var renderPin = function (pinData) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.setProperty('left', pinData.location.x + 'px');
    pin.style.setProperty('top', pinData.location.y + 'px');
    pin.querySelector('img').src = pinData.author.avatar;

    pin.addEventListener('click', function () {
      window.openCard(pinData);
      openPin(pin);
    });

    return pin;
  };

  window.pin = {
    close: closePin,
    render: renderPin
  };
})();
