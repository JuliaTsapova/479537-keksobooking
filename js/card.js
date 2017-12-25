'use strict';

(function() {

  var ENTER_KEYCODE = 13;
  var cardTemplate = document.querySelector('#advert-template').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');

  var createLi = function (feature) {
    var li = document.createElement('LI');
    li.classList.add('feature');
    li.classList.add('feature--' + feature);
    return li;
  };

  var closeCard = function () {
    var card = document.querySelector('.popup');
    if (card) {
      card.parentNode.removeChild(card);
    }
  };

  var renderCard = function (cardData, action) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__avatar').src = cardData.author.avatar;
    card.querySelector('h3').innerText = cardData.offer.title;
    card.querySelector('.popup__price').innerText = cardData.offer.price + ' \t\u20BD /ночь';
    card.querySelector('h4').innerText = cardData.offer.type;
    card.querySelector('.rooms-and-guests').innerText = cardData.offer.rooms + ' комнат для ' + cardData.offer.guests + ' гостей';
    card.querySelector('.checkin-and-checkout').innerText = 'Заезд после ' + cardData.offer.checkin + ' , выезд до ' + cardData.offer.checkout;
    card.querySelector('.popup__description').innerText = cardData.offer.description;
    card.querySelector('.popup__address').innerText = cardData.offer.address;
    var features = card.querySelector('.popup__features');
    for (var i = 0; i < cardData.offer.features.length; i++) {
      features.appendChild(createLi(cardData.offer.features[i]));
    }
    var closeButton = card.querySelector('.popup__close');
    closeButton.addEventListener('click', action);
    closeButton.addEventListener('keydown', function(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    });
    return card;
  };

  var openCard = function(cardData, action) {
    map.insertBefore(renderCard(cardData, action), filterContainer);
  };

  window.card = {
    openCard: openCard,
    closeCard: closeCard,
  };

})();
