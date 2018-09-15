'use strict';

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

var generatePhotoArray = function () {
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

var renderPhotos = function (photo) {
  var picElement = picTemplate.cloneNode(true);

  picElement.querySelector('.picture__img').setAttribute('src', photo.url);
  picElement.querySelector('.picture__comments').textContent = photo.comments.length;
  picElement.querySelector('.picture__likes').textContent = photo.likes;

  return picElement;
};

var drawPictures = function (photoArray) {
  var picturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (i = 0; i < photoArray.length; i++) {
    fragment.appendChild(renderPhotos(photoArray[i]));
  }
  picturesList.appendChild(fragment);
};

var bigPicture = document.querySelector('.big-picture');

var showMainPicture = function () {
  bigPicture.classList.remove('hidden');
};

var generateMainPicture = function (photoArray) {
  bigPicture.querySelector('.likes-count').textContent = photoArray[0].likes;
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', photoArray[0].url);
  bigPicture.querySelector('.comments-count').textContent = photoArray[0].comments.length;
  var commentListArray = [];
  for (i = 0; i < photoArray[0].comments.length; i++) {
    commentListArray[i] = '<li class="social__comment">' +
      '<img class="social__picture" src="img/avatar-' + randomInteger(1, 6) + '.svg"' +
      'alt="Аватар комментатора фотографии"' +
      'width="35" height="35">' +
      '<p class="social__text">' + photoArray[0].comments[i] + '</p>' +
    '</li>';
  }
  bigPicture.querySelector('.social__comments').innerHTML = commentListArray;
  bigPicture.querySelector('.social__caption').textContent = photoArray[0].description;
};

var hideElement = function () {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};

var photoArray = generatePhotoArray();
drawPictures(photoArray);
showMainPicture();
generateMainPicture(photoArray);
hideElement();
