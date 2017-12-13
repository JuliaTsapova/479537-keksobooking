'use strict';
var ADS_COUNT = 8;
var pinTranslateX = 20;
var pinTranslateY = 40;

var offerParams = {
  TITLE: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  TYPE: ['flat', 'house', 'bungalo'],
  CHECKIN: ['12:00', '13:00', '14:00'],
  CHECKOUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};

var advertParams = {
  PRICE: {
    MIN: 1000,
    MAX: 1000000
  },
  ROOMS: {
    MIN: 1,
    MAX: 5
  },
  GUESTS: {
    MIN: 1,
    MAX: 20
  },
  FEATURES: {
    MIN: 1,
    MAX: offerParams.FEATURES.length + 1
  }
};

var typeMap = new Map();
typeMap.set(offerParams.TYPE[0], 'Квартира');
typeMap.set(offerParams.TYPE[1], 'Дом');
typeMap.set(offerParams.TYPE[2], 'Бунгало');

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var filterContainer = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#advert-template').content.querySelector('.map__card');
var pinTemplate = document.querySelector('#advert-template').content.querySelector('.map__pin');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var createLi = function (feature) {
  var li = document.createElement('LI');
  li.classList.add('feature');
  li.classList.add('feature--' + feature);
  return li;
};

var renderPin = function (pinData) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.setProperty('left', pinData.location.x + 'px');
  pin.style.setProperty('top', pinData.location.y + 'px');
  pin.querySelector('img').src = pinData.author.avatar;
  return pin;
};

var renderCard = function (cardData) {
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
  return card;
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

var getAvatar = function (number) {
  var avatar = 'img/avatars/user' + (number < 10 ? '0' : '') + (number + 1) + '.png';
  return avatar;
};

var getAdvert = function (x) {
  var locationX = getRandom(300, 900) + pinTranslateX;
  var locationY = getRandom(100, 500) + pinTranslateY;
  return {
    author: {
      avatar: getAvatar(x)
    },
    offer: {
      title: offerParams.TITLE[x],
      address: locationX + ', ' + locationY,
      price: getRandom(advertParams.PRICE.MIN, advertParams.PRICE.MAX),
      type: typeMap.get(offerParams.TYPE[getRandom(0, offerParams.TYPE.length)]),
      rooms: getRandom(advertParams.ROOMS.MIN, advertParams.ROOMS.MAX),
      guests: getRandom(advertParams.GUESTS.MIN, advertParams.GUESTS.MAX),
      checkin: offerParams.CHECKIN[getRandom(0, offerParams.CHECKIN.length)],
      checkout: offerParams.CHECKOUT[getRandom(0, offerParams.CHECKOUT.length)],
      features: getRandomArray(offerParams.FEATURES, getRandom(advertParams.FEATURES.MIN, advertParams.FEATURES.MAX), true),
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

var getAdvertsArray = function (arrLength) {
  var adverts = [];
  for (var i = 0; i < arrLength; i++) {
    adverts.push(getAdvert(i));
  }
  return adverts;
};

var createFragment = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  return fragment;
};

var adverts = getAdvertsArray(ADS_COUNT);

mapPins.appendChild(createFragment(adverts));

var firstElement = adverts[0];
map.insertBefore(renderCard(firstElement), filterContainer);

map.classList.remove('map--faded');
