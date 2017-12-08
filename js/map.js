'use strict';
var COUNT = 8;
var offerParams = {
  TITLE: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  ADDRESS: ["{{location.x}}, {{location.y}}"],
  TYPE: ['flat', 'house', 'bungalo'],
  CHECKIN: ['12:00', '13:00', '14:00'],
  CHECKOUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};
//.querySelector('.map__card')
var mapPins = document.querySelector('.map__pins');
var AdvertTemplate = document.querySelector('#advert-template').content;

var getRandom = function (min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
};

var getRandomNumber = function (number) {
  return Math.floor(Math.random() * number);
};

var renderAdvert = function (data) {

  var advert = AdvertTemplate.cloneNode(true);
  advert.querySelector('.popup__avatar').src = data.author.avatar;
  advert.querySelector('h3').innerText = data.offer.title;
  advert.querySelector('.popup__price').innerText = data.offer.price + ' &#x20bd; /ночь';
  advert.querySelector('h4').innerText = data.offer.type;
  advert.querySelector('.rooms-and-guests').innerText = data.offer.rooms + ' комнат для ' + data.offer.guests + ' гостей';
  advert.querySelector('.checkin-and-checkout').innerText = 'Заезд после ' + data.offer.checkin + ' , выезд до ' + data.offer.checkout;
  var features = advert.querySelector('.popup__features');
  for (var i = 0; i < data.offer.features.length; i++) {
    var li = document.createElement('LI');
    li.classList.add('feature');
    li.classList.add('feature--' + data.offer.features[i]);
    features.appendChild(li);
  }

  var button = advert.querySelector('button.map__pin');
  button.style.removeProperty('left');
  button.style.setProperty('left',data.location.x + 'px');
  button.style.removeProperty('top');
  button.style.setProperty('top',data.location.y + 'px');

  button.querySelector('img').src = data.author.avatar;

  return advert;
};

var getFeatures = function () {
  var features = [];
  var length = getRandomNumber(offerParams.FEATURES.length) + 1;
  for (var i = 0; i < length; i++) {
    features.push(offerParams.FEATURES[i]);
  }
  return features;
};

var getAdvert = function (x) {
  var locationX = getRandom(300, 900) + 20;
  var locationY = getRandom(100, 500) + 40;
  var avatar = x + 1;

  return {
    author: {
      avatar: 'img/avatars/user0' + avatar + '.png'
    },
    offer: {
      title: offerParams.TITLE[x],
      address: locationX + ', ' + locationY,
      price: Math.floor(getRandom(1000, 1000000)),
      type: offerParams.TYPE[getRandomNumber(offerParams.TYPE.length)],
      rooms: Math.floor(getRandom(1, 5)),
      guests: Math.floor(getRandom(1, 20)),
      checkin: offerParams.CHECKIN[getRandomNumber(offerParams.CHECKIN.length)],
      checkout: offerParams.CHECKOUT[getRandomNumber(offerParams.CHECKOUT.length)],
      features: getFeatures(),
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
    fragment.appendChild(renderAdvert(arr[i]));
  }

  console.log(fragment);
  return fragment;
};

var elems = getAdvertsArray(COUNT);
mapPins.appendChild(createFragment(elems));

var fe = elems.shift();

var insertedElement = document.querySelector('.map').insertBefore(renderAdvert(fe), document.querySelector('.map__filters-container'));

document.querySelector('.map').classList.remove('map--faded');
