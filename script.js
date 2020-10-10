const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//unplash api
let count = 5;
const apiKey = 'SQbB6iocx_egCkv5fPOxaMYQYy1R9UninkUtuxW9V4c';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//image loaded count
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count= 20;
  }
}
////////////////////////////////
//helper function to set attribut on elements
function setAttributes(element, attributes) {
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
}
/////////////////////////////////////

//Create elelemnt for links and photos, add to dom
function displayPhotos() {
  totalImages = photosArray.length;
  imagesLoaded = 0;
  //run function for each object in photoArray
  photosArray.forEach((photo) => {
    //create <a> to link single photo to unplash
    const photoLink = document.createElement('a');
    // photoLink.setAttribute('href', photo.links.html);
    // photoLink.setAttribute('target', '_blank');

    setAttributes(photoLink, {
      href: photo.links.html,
      target: '_blank'
    })

    //create <img> for image
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //event listener. check when each photo is finished loading
    img.addEventListener('load', imageLoaded);

    //put img inside <a>. then put <a> inside imageCintainer
    photoLink.appendChild(img);
    imageContainer.appendChild(photoLink);
  });
}

//get photos from unplasg api

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {

  }
}


//check the scroll is reached the bottom of the page and load more images
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    getPhotos();
    ready = false;

  }
})

//on load

getPhotos();