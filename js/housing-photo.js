'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('#images');
  var photoBox = document.querySelector('.form__photo-container');
  var photos = document.querySelectorAll('.loaded-image');
  var draggedItem = null;
  var dropZone = document.querySelector('label[for=images]');
  var draggedItem = null;

  var createElement = function (newElement, element) {
    var newElem = document.createElement(newElement);
    element.appendChild(newElem);
    return newElem;
  };

  var addElement = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var newImage = createElement('img', photoBox);
        newImage.src = reader.result;
        newImage.classList.add('loaded-image');
        newImage.draggable = 'true';
        return newImage;
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    addElement(file);
  });

  console.log(photos);

  dropZone.addEventListener('dragover', function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy';
    },
    false);

  dropZone.addEventListener('drop', function (evt) {
      evt.stopPropagation();
      evt.preventDefault();
      var files = evt.dataTransfer.files;
      var file = files[0];
      addElement(file);
    },
    false);

  for (var i = 0; i < photos.length; i++) {

    photos[i].addEventListener('dragstart', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target;
        evt.dataTransfer.setData('text/plain', evt.target.alt);
      }
    });

    photos[i].addEventListener('dragover', function (evt) {
      evt.preventDefault();
      return false;
    });

    photos[i].addEventListener('drop', function (evt) {
      evt.target.insertBefore(draggedItem);
      evt.preventDefault();
    });
  }
})();
