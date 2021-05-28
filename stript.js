// Unsplash API
const count = 10;
const apiKey = "L9TduvXc3pWdg30MeGDVyyQPGRuPtbpM1musLtBd8f4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/* Get photos from API */
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    //Catch error here
  }
}

//on load
getPhotos();
