'use strict';
var i, j, k = 0;
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
]


var generatePhotoArray = function() {
  var photoArray = [];

  for (i = 0; i < 25; i++) {
      var commentsArr = [];
    for (j = 0; j < randomInteger(1, 5); j++) {
      commentsArr[j] = generateComments(commentArray);
    }
      var photoNumber = i + 1;
    photoArray[i] = {
      url: 'photos/' + photoNumber + '.jpg',
      likes: randomInteger(15, 200),
      comments: commentsArr,
      description: descArray[randomInteger(0, descArray.length - 1)]
    }
  }
  return photoArray;
}

function generateComments(commentArray) {
  var comment = [];
  for (k = 0; k < randomInteger(1, 2); k++) {
    comment[k] = commentArray[randomInteger(0, commentArray.length - 1)];
  }
  return comment;
}

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}





/*На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива:

Адрес изображения url подставьте как src изображения.
Количество лайков likes подставьте как текстовое содержание элемента .picture__likes.
Количество комментариев comments подставьте как текстовое содержание элемента .picture__stat--comments.
*/

var picTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');;

var renderPhotos = function(photo) {
  var picElement = picTemplate.cloneNode(true);
  console.log(picElement.querySelector('.picture__img'));
  picElement.querySelector('.picture__img').setAttribute('src', photo.url);
  picElement.querySelector('.picture__comments').textContent = photo.comments.length;
  picElement.querySelector('.picture__likes').textContent = photo.likes;

  return picElement;
}

/*Отрисуйте сгенерированные DOM-элементы в блок .pictures.
Для вставки элементов используйте DocumentFragment.*/

var drawPictures = function(photoArray) {
  var picturesList = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoArray.length; i++) {
    fragment.appendChild(renderPhotos(photoArray[i]));
  };
  picturesList.appendChild(fragment);
}

drawPictures(generatePhotoArray());
