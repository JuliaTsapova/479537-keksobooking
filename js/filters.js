'use strict';

(function () {
  var ADVERTS_LIMIT = 5;

  var HousingPriceValue = {
    LOW: 10000,
    HIGH: 50000
  };

  var filterForm = document.querySelector('.map__filters');

  var housingType = filterForm.querySelector('select[name="housing-type"]');
  var housingPrice = filterForm.querySelector('select[name="housing-price"]');
  var housingRooms = filterForm.querySelector('select[name="housing-rooms"]');
  var housingGuests = filterForm.querySelector('select[name="housing-guests"]');

  var compareValues = function (value, filterValue) {
    if (filterValue === 'any') {
      return true;
    }
    return value === +filterValue;
  };

  var filterType = function (value, filterValue) {
    return filterValue === 'any' || value === filterValue;
  };

  var filterPrice = function (value, filterValue) {
    switch (filterValue) {
      case 'middle':
        return (HousingPriceValue.LOW <= value && value < HousingPriceValue.HIGH);
      case 'low':
        return (value < HousingPriceValue.LOW);
      case 'high':
        return (value >= HousingPriceValue.HIGH);
      default:
        return true;
    }
  };

  var filterFeatures = function (offerFeatures) {
    var features = filterForm.querySelectorAll('fieldset input[type="checkbox"]:checked');
    return Array.from(features).every(function (element) {
      return offerFeatures.includes(element.value);
    });
  };

  window.filterData = function (pins) {
    var result = pins.filter(function (element) {
      return filterType(element.offer.type, housingType.value) &&
        filterPrice(element.offer.price, housingPrice.value) &&
        compareValues(element.offer.rooms, housingRooms.value) &&
        compareValues(element.offer.guests, housingGuests.value) &&
        filterFeatures(element.offer.features);
    });

    if (result.length > ADVERTS_LIMIT) {
      return result.slice(0, ADVERTS_LIMIT);
    }
    return result;
  };

})();
