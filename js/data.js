'use strict';

(function () {
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

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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

  var getAdvert = function (x, translateX, translateY) {
    var locationX = getRandom(300, 900) + translateX;
    var locationY = getRandom(100, 500) + translateY;
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

  window.advert = getAdvert;

})();
