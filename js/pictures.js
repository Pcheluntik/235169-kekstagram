'use strict';

var ESC_KEY = 27;
var i = 0;
var commentArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var descArray = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var generatePhotoArray = function() {
  var photoArray = [];

  for (i = 0; i < 25; i++) {
    var commentsArr = [];
    for (var j = 0; j < randomInteger(1, 5); j++) {
      commentsArr[j] = generateComments(commentArray);
    }
    var photoNumber = i + 1;
    photoArray[i] = {
      url: 'photos/' + photoNumber + '.jpg',
      likes: randomInteger(15, 200),
      comments: commentsArr,
      description: descArray[randomInteger(0, descArray.length - 1)]
    };
  }
  return photoArray;
};

function generateComments(array) {
  var comment = '';
  for (var k = 0; k < randomInteger(1, 2); k++) {
    comment += array[randomInteger(0, array.length - 1)] + ' ';
  }
  return comment;
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

var picTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPhotos = function(photo) {
  var picElement = picTemplate.cloneNode(true);

  picElement.querySelector('.picture__img').setAttribute('src', photo.url);
  picElement.querySelector('.picture__comments').textContent = photo.comments.length;
  picElement.querySelector('.picture__likes').textContent = photo.likes;

  return picElement;
};

var drawPictures = function(photoArray) {
  var picturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (i = 0; i < photoArray.length; i++) {
    fragment.appendChild(renderPhotos(photoArray[i]));
  }
  picturesList.appendChild(fragment);
};

var bigPicture = document.querySelector('.big-picture');

var showMainPicture = function() {
  bigPicture.classList.remove('hidden');
};

var closeMainPicture = function() {
  bigPicture.classList.add('hidden');
};
var closeMainBtn = document.querySelector('.big-picture__cancel');
closeMainBtn.addEventListener('click', closeMainPicture);


var generateMainPicture = function(photo) {
  bigPicture.querySelector('.likes-count').textContent = photo.querySelector('.picture__comments').textContent;
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', photo.querySelector('.picture__img').src);
  bigPicture.querySelector('.comments-count').textContent = photo.querySelector('.picture__likes').textContent;
  var commentListArray = [];
  var commentsArr = [];
  for (var j = 0; j < photo.querySelector('.picture__likes').textContent; j++) {
    commentsArr[j] = generateComments(commentArray);
  }
  for (i = 0; i < photo.querySelector('.picture__comments').textContent; i++) {
    commentListArray[i] = '<li class="social__comment">' +
      '<img class="social__picture" src="img/avatar-' + randomInteger(1, 6) + '.svg"' +
      'alt="Аватар комментатора фотографии"' +
      'width="35" height="35">' +
      '<p class="social__text">' + commentsArr[i] + '</p>' +
      '</li>';
  }
  bigPicture.querySelector('.social__comments').innerHTML = commentListArray;
  bigPicture.querySelector('.social__caption').textContent = descArray[randomInteger(0, descArray.length - 1)];
  showMainPicture();
};

var hideElement = function() {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};

var photoArray = generatePhotoArray();
drawPictures(photoArray);
hideElement();




var uploadInput = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.img-upload__overlay');
var uploadClose = document.querySelector('.img-upload__cancel');
var uploadPin = document.querySelector('.effect-level__pin');
var closeChangeImage = function() {
  uploadForm.classList.add('hidden');
  uploadClose.removeEventListener('click', closeChangeImage);
  uploadForm.removeEventListener('keydown', closeChangeImageKey);
}

var closeChangeImageKey = function(evt) {
  if (evt.keyCode === ESC_KEY) {
    closeChangeImage();
  }
};

var openChangeImage = function() {
  uploadForm.classList.remove('hidden');
  uploadClose.addEventListener('click', closeChangeImage);
  document.addEventListener('keydown', closeChangeImageKey);
  addEffects();
}



uploadInput.addEventListener('change', openChangeImage);

/*На изображение может накладываться только один эффект.
При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio,
добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту.
Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin.
Уровень эффекта записывается в поле .scale__value. При изменении уровня интенсивности эффекта,
CSS-стили элемента .img-upload__preview обновляются следующим образом:

Для эффекта «Хром» — filter: grayscale(0..1);
Для эффекта «Сепия» — filter: sepia(0..1);
Для эффекта «Марвин» — filter: invert(0..100%);
Для эффекта «Фобос» — filter: blur(0..3px);
Для эффекта «Зной» — filter: brightness(1..3).
При выборе эффекта «Оригинал» слайдер скрывается.
При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
слайдер, CSS-стиль изображения и значение поля должны обновляться.*/
var addEffects = function() {
  var effectRadioBtns = document.querySelectorAll('.effects__radio');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var changeEffect = function(item) {
    item.addEventListener('change', changeEffectCheck);
  }
  var changeEffectCheck = function(evt) {
    if (evt.target.checked) {
      var effectText = evt.target.value;
      imgUploadPreview.classList = "";
      imgUploadPreview.classList.add('img-upload__preview');
      imgUploadPreview.classList.add('effects__preview--' + effectText);
    }
  }

  for (let i = 0; i < effectRadioBtns.length; i++) {
    changeEffect(effectRadioBtns[i])
  };
}


//Показ изображения в полноэкранном режиме
var openBigImage = function(evt) {
  evt.preventDefault();
  var pictureElem = evt.target.parentNode;
  if (pictureElem.classList.contains('picture')) {
    generateMainPicture(pictureElem);
  }
}

document.addEventListener('click', openBigImage);
