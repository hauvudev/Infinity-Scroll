const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];
let initialLoad = true;

// Unsplash API
const count = 5;
const apiKey = "L9TduvXc3pWdg30MeGDVyyQPGRuPtbpM1musLtBd8f4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    count = 30;
  }
}

// Helper Funcion to Set Attribute on DOM Elements
function setAttribute(Element, attributes) {
  for (const key in attributes) {
    Element.setAttribute(key, attributes[key]);
  }
}

// Creat Elements for links and photos, Add to DOM*/
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;

  // Run fucion for each object in photoArray
  photoArray.forEach((photo) => {
    // Creat <a> to link to Unsplash
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Creat <img. for photo
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finish
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a> then put both inside in image container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from API */
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch error here
  }
}

// Check to see if scrolling near bottom, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 10007 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
