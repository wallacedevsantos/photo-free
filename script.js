let searchParam = location.search.split("=").pop().toLowerCase();

let pagen = 1;

const access_key = "xetK5V9k_ZwWC5DEuWoCqiuZul_dgf1EEVfn6vuN5oY";

const access_key2 = "jAeYzmbebPXJ22yShxX4uijWiBn4WxBc7VycVMm4yig";

const random_photo_url = `https://api.unsplash.com/photos/random?client_id=${access_key2}&page=${pagen}&count=15`;

const search_photo_url = `https://api.unsplash.com/search/photos?&query=${searchParam.toLowerCase()}&page=1&per_page=15&client_id=${access_key2}`;

const galley = document.querySelector(".container");

const next = document.querySelector(".next-page");

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
    let div = document.createElement("div");
    // let img = document.createElement("img");
    // img.src = item.urls.regular;
    // img.className = "imagens";
    div.className = "imagens";
    div.innerHTML = `<img src=${item.urls.raw + "&w=600"} loading="lazy"/>
    <p>Foto: ${item.user.name}</p>
    <a rel="preload" href=${
      item.links.download + "&force=true"
    } target="_blank"><i class="fa-solid fa-download"></i></a>`;

    // img.setAttribute("href", item.urls.full);
    // img.setAttribute("target", "_blank");
    // img.addEventListener("click", function () {
    //   console.log("clicked");
    //   window.open(item.urls.full, "_blank");
    // });
    galley.appendChild(div);
  });
};

if (searchParam == "") {
  getImages();
} else {
  searchImages();
}

const gerarMaisImgs = (index) => {
  let search_photo_url = `https://api.unsplash.com/search/photos?&query=${searchParam.toLowerCase()}&page=${index}&per_page=30&client_id=${access_key2}`;
  fetch(search_photo_url)
    .then((res) => res.json())
    .then((data) => {
      allImages = data.results;
      makeImages(allImages);
    });
};

next.addEventListener("click", (e) => {
  this.maisImagens(e);
});

function maisImagens(e) {
  let index = (pagen += 1);
  if (searchParam == "") {
    getImages(index);
  } else {
    gerarMaisImgs(index);
  }
}
