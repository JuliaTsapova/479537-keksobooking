'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var TYPE_TRANSLATION = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var cardTemplate = document.querySelector('#advert-template').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');

  var createLi = function (feature) {
    var li = document.createElement('LI');
    li.classList.add('feature');
    li.classList.add('feature--' + feature);
    return li;
  };

  var onEscKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  var closeCard = function () {
    var card = document.querySelector('.popup');
    if (card) {
      card.parentNode.removeChild(card);
      document.removeEventListener('keydown', onEscKeydown);
      window.pin.close();
    }
  };

  var renderCard = function (cardData) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').src = cardData.author.avatar;
    card.querySelector('h3').textContent = cardData.offer.title;
    card.querySelector('.popup__price').textContent = cardData.offer.price + ' \t\u20BD /ночь';
    card.querySelector('h4').textContent = TYPE_TRANSLATION[cardData.offer.type];
    card.querySelector('.rooms-and-guests').textContent = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостей';
    card.querySelector('.checkin-and-checkout').textContent = 'Заезд после ' + cardData.offer.checkin + ' , выезд до ' + cardData.offer.checkout;
    card.querySelector('.popup__description').textContent = cardData.offer.description;
    card.querySelector('.popup__address').textContent = cardData.offer.address;
    var features = card.querySelector('.popup__features');

    cardData.offer.features.forEach(function (value) {
      features.appendChild(createLi(value));
    });

    var closeButton = card.querySelector('.popup__close');

    var onCloseButtonClick = function (evt) {
      evt.target.removeEventListener('click', onCloseButtonClick);
      closeCard();
    };
    closeButton.addEventListener('click', onCloseButtonClick);

    document.addEventListener('keydown', onEscKeydown);

    return card;
  };

  var openCard = function (cardData) {
    closeCard();
    map.insertBefore(renderCard(cardData), filterContainer);
  };

  window.card = {
    open: openCard,
    close: closeCard
  };
})();
