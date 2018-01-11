'use strict';

(function () {
  var TIME_VALUES = ['12:00', '13:00', '14:00'];
  var ERROR_TIMEOUT = 3000;

  var TranslateYParams = {
    PIN: 40,
    MAIN_PIN: 49
  };

  var typeAndPrice = {
    flat: '1000',
    bungalo: '0',
    house: '5000',
    palace: '10000'
  };

  var RoomsAndGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var noticeForm = document.querySelector('.notice__form');
  var checkinValue = document.querySelector('#timein');
  var checkoutValue = document.querySelector('#timeout');
  var roomsValue = document.querySelector('#room_number');
  var guestsValue = document.querySelector('#capacity');
  var typeValue = document.querySelector('#type');
  var priceValue = document.querySelector('#price');
  var addressValue = document.querySelector('#address');
  var errorPopup = document.querySelector('.error-popup');
  var errorText = errorPopup.querySelector('.error-message');
  var mapPinMain = document.querySelector('.map__pin--main');
  var avatarPreview = document.querySelector('.notice__preview > img');
  var photoBox = document.querySelector('.form__photo-container');

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

  window.synchronizeFields(checkinValue, checkoutValue, TIME_VALUES, TIME_VALUES, syncValues);
  window.synchronizeFields(checkoutValue, checkinValue, TIME_VALUES, TIME_VALUES, syncValues);
  window.synchronizeFields(typeValue, priceValue, Object.keys(typeAndPrice), Object.values(typeAndPrice), syncValueWithMin);

  var checkRoomsAndGuests = function (value) {
    var options = guestsValue.querySelectorAll('option');
    Array.from(options).forEach(function (element) {
      element.disabled = !RoomsAndGuests[value].includes(element.value);
    });
    guestsValue.value = RoomsAndGuests[value][0];
  };

  checkRoomsAndGuests(roomsValue.value);
  roomsValue.addEventListener('change', function () {
    checkRoomsAndGuests(roomsValue.value);
  });

  var resetForm = function () {
    noticeForm.reset();
    checkRoomsAndGuests(roomsValue.value);
    typeValue.querySelectorAll('option')[0].selected = true;
    addressValue.value = 'x: ' + mapPinMain.offsetLeft + ', y:' + (mapPinMain.offsetTop + TranslateYParams.MAIN_PIN);
    avatarPreview.src = 'img/muffin.png';
    syncValueWithMin(typeValue, priceValue, Object.keys(typeAndPrice), Object.values(typeAndPrice));
    var images = photoBox.querySelectorAll('.loaded-image');
    Array.from(images).forEach(function (img) {
      photoBox.removeChild(img);
    });
  };

  var onSuccess = function () {
    resetForm();
  };

  var onError = function (errorMessage) {
    resetForm();
    errorText.textContent = errorMessage;
    errorPopup.classList.remove('hidden');
    setTimeout(function () {
      errorPopup.classList.add('hidden');
    }, ERROR_TIMEOUT);
  };

  noticeForm.addEventListener('submit', function (evt) {

    window.backend.upload(new FormData(noticeForm), onSuccess, onError);
    evt.preventDefault();
  });

})();
