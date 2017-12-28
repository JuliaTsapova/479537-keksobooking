'use strict';

(function () {
  var typeAndPrice = {
    flat: '1000',
    bungalo: '0',
    house: '5000',
    palace: '1000000'
  };

  var roomsAndGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var timeInTimeOut = ['12:00', '13:00', '14:00'];

  var checkinValue = document.querySelector('#timein');
  var checkoutValue = document.querySelector('#timeout');
  var roomsValue = document.querySelector('#room_number');
  var guestsValue = document.querySelector('#capacity');
  var typeValue = document.querySelector('#type');
  var priceValue = document.querySelector('#price');
  var addressValue = document.querySelector('#address');

  window.setAddress = function (x, y) {
    addressValue.value = 'x: ' + x + ', y: ' + y;
  };

  var syncValues = function (element1, element2, arrayValues1, arrayValues2) {
    if (arrayValues1.includes(element1.value)) {
      element2.value = arrayValues2[element1.selectedIndex];
    }
  };

  var syncValueWithMin = function (element1, element2, arrayValues1, arrayValues2) {
    if (arrayValues1.includes(element1.value)) {
      element2.min = arrayValues2[element1.selectedIndex];
    }
  };

  window.synchronizeFields(checkinValue, checkoutValue, timeInTimeOut, timeInTimeOut, syncValues);
  window.synchronizeFields(checkoutValue, checkinValue, timeInTimeOut, timeInTimeOut, syncValues);
  window.synchronizeFields(typeValue, priceValue, Object.keys(typeAndPrice), Object.values(typeAndPrice), syncValueWithMin);

  var check = function (value) {
    var options = guestsValue.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = false;
      options[i].disabled = !roomsAndGuests[value].includes(options[i].value);
    }
  };
  check(roomsValue.value);
  roomsValue.addEventListener('change', function () {
    check(roomsValue.value);
  });

})();
