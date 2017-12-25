'use strict';

(function() {

  var typeAndPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '1000000'
  };

  var roomsAndGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var checkinValue = document.querySelector('#timein');
  var checkoutValue = document.querySelector('#timeout');
  var roomsValue = document.querySelector('#room_number');
  var guestsValue = document.querySelector('#capacity');
  var typeValue = document.querySelector('#type');
  var priceValue = document.querySelector('#price');

  checkinValue.addEventListener('change', function() {
    checkoutValue.value = checkinValue.value;
  });

  checkoutValue.addEventListener('change', function() {
    checkinValue.value = checkoutValue.value;
  });

  var check = function(value) {
    var options = guestsValue.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = false;
      options[i].disabled = !roomsAndGuests[value].includes(options[i].value);
    }
  };

  check(roomsValue.value);
  roomsValue.addEventListener('change', function() {
    check(roomsValue.value);
  });

  typeValue.addEventListener('change', function() {
    priceValue.min = typeAndPrice[typeValue.value];
  });

})();
