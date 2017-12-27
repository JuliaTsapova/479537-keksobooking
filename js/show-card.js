'use strict';

(function () {
  var map = document.querySelector('.map');
  var filterContainer = document.querySelector('.map__filters-container');

  window.showCard = function (cardData, action) {
    map.insertBefore(window.card.render(cardData, action), filterContainer);
  };
})();
