let searchParam = location.search.split("=").pop();

const access_key = "xetK5V9k_ZwWC5DEuWoCqiuZul_dgf1EEVfn6vuN5oY";

const access_key2 = "jAeYzmbebPXJ22yShxX4uijWiBn4WxBc7VycVMm4yig";

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key2}&count=30`;

const search_photo_url = `https://api.unsplash.com/search/photos?client_id=${access_key2}&query=${searchParam}&per_page=50`;

const galley = document.querySelector(".container");

let allImages;

const getImages = () => {
  fetch(random_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data;
      makeImages(allImages);
    });
};

const searchImages = () => {
  fetch(search_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data.results;
      makeImages(allImages);
    });
};

const makeImages = (data) => {
  data.forEach((item, index) => {
    let img = document.createElement("img");
    img.src = item.urls.regular;
    img.className = "imagens";

    galley.appendChild(img);
  });
};

if (searchParam == "") {
  getImages();
} else {
  searchImages();
}
