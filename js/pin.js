'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
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

  var isEscKeyDownListenerSet = false;

  var renderPin = function (pinData, openCard, closeCard) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.setProperty('left', pinData.location.x + 'px');
    pin.style.setProperty('top', pinData.location.y + 'px');
    pin.querySelector('img').src = pinData.author.avatar;

    var onEscKeydown = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard();
        closePin();
        document.removeEventListener('keydown', onEscKeydown);
        isEscKeyDownListenerSet = false;
      }
    };

    pin.addEventListener('click', function () {
      closeCard();
      openCard();
      openPin(pin);
      if (!isEscKeyDownListenerSet) {
        document.addEventListener('keydown', onEscKeydown);
        isEscKeyDownListenerSet = true;
      }
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closeCard();
        openCard();
        openPin(pin);
        if (!isEscKeyDownListenerSet) {
          document.addEventListener('keydown', onEscKeydown);
          isEscKeyDownListenerSet = true;
        }
      }
    });

    return pin;
  };

  window.pin = {
    close: closePin,
    render: renderPin
  };
})();
