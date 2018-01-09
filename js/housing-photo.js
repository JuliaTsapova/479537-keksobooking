'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#images');
  var photoBox = document.querySelector('.form__photo-container');

  var addElement = function (newElement, element) {
    var newElem = document.createElement(newElement);
    element.appendChild(newElem);
    return newElem;
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var newImage = addElement('img', photoBox);
        newImage.src = reader.result;
        newImage.classList.add('loaded-image');
      });
      reader.readAsDataURL(file);
    }
  });
})();
