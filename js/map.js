'use strict';
var ADS_COUNT = 8;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var pinTranslateX = 20;
var pinTranslateY = 40;

var OfferParams = {
  TITLE: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  TYPE: ['flat', 'house', 'bungalo'],
  CHECKIN: ['12:00', '13:00', '14:00'],
  CHECKOUT: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};

var AdvertParams = {
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
    MAX: OfferParams.FEATURES.length + 1
  }
};

var typeTranslation = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var typeAndPrice = {
  bungalo: '0',
  flat: '1000',
  house: '5000',
  palace: '1000000'
};

var mapPins = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var filterContainer = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#advert-template').content.querySelector('.map__card');
var pinTemplate = document.querySelector('#advert-template').content.querySelector('.map__pin');
var noticeForm = document.querySelector('.notice__form');
var mapPinMain = document.querySelector('.map__pin--main');
var checkinValue = document.querySelector('#timein');
var checkoutValue = document.querySelector('#timeout');
var roomsValue = document.querySelector('#room_number');
var guestsValue = document.querySelector('#capacity');
var typeValue = document.querySelector('#type');
var priceValue = document.querySelector('#price');


var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

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

var openCard = function (cardData) {
  closeCard();
  map.insertBefore(renderCard(cardData), filterContainer);
};

var closePin = function () {
  var pin = document.querySelector('.map__pin--active');
  if (pin) {
    pin.classList.remove('map__pin--active');
  }
};

var openPin = function (pin, cardData) {
  closePin();
  pin.classList.add('map__pin--active');
  openCard(cardData);
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
  var closeButton = card.querySelector('.popup__close');
  closeButton.addEventListener('click', function () {
    closeCard();
    closePin();
  });
  closeButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeCard();
      closePin();
    }
  });
  return card;
};

var renderPin = function (pinData) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.setProperty('left', pinData.location.x + 'px');
  pin.style.setProperty('top', pinData.location.y + 'px');
  pin.querySelector('img').src = pinData.author.avatar;
  pin.addEventListener('click', function () {
    openPin(pin, pinData);
  });
  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPin(pin, pinData);
    }
  });
  return pin;
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
      title: OfferParams.TITLE[x],
      address: locationX + ', ' + locationY,
      price: getRandom(AdvertParams.PRICE.MIN, AdvertParams.PRICE.MAX),
      type: typeTranslation[OfferParams.TYPE[getRandom(0, OfferParams.TYPE.length)]],
      rooms: getRandom(AdvertParams.ROOMS.MIN, AdvertParams.ROOMS.MAX),
      guests: getRandom(AdvertParams.GUESTS.MIN, AdvertParams.GUESTS.MAX),
      checkin: OfferParams.CHECKIN[getRandom(0, OfferParams.CHECKIN.length)],
      checkout: OfferParams.CHECKOUT[getRandom(0, OfferParams.CHECKOUT.length)],
      features: getRandomArray(OfferParams.FEATURES, getRandom(AdvertParams.FEATURES.MIN, AdvertParams.FEATURES.MAX), true),
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

checkinValue.addEventListener('click', function () {
  checkoutValue.value = checkinValue.value;
});

checkoutValue.addEventListener('click', function () {
  checkinValue.value = checkoutValue.value;
});

roomsValue.addEventListener('click', function () {
  if (roomsValue.value === '100') {
    guestsValue.value = 0;
  } else {
    guestsValue.value = roomsValue.value;
  }
});

typeValue.addEventListener('click', function () {
  priceValue.min = typeAndPrice[typeValue.value];
});

//  ======================================== start block
var adverts = getAdvertsArray(ADS_COUNT);

var initMap = function () {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  var items = noticeForm.querySelectorAll('fieldset');
  for (var i = 0; i < items.length; i++) {
    items[i].removeAttribute('disabled');
  }
  mapPins.appendChild(createFragment(adverts));
  mapPinMain.removeEventListener('mouseup', initMap);
  document.documentElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target.className.indexOf('popup__close') === -1) {
      closeCard();
      closePin();
    }
  });
};
//  =======================================

mapPinMain.addEventListener('mouseup', initMap);
