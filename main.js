const auth = "563492ad6f917000010000017dd3797c50e740778b397f42a5c3ebd2";
const next = document.querySelector(".next");
const input = document.querySelector("input");
const searchbutton = document.querySelector(".searchbutton");

let pagenr = 1;
let search = false;
let query = "";

input.addEventListener("input", (e) => {
    e.preventDefault();
    query = e.target.value;
});


// Curated

async function CuratedPhotos(pagenr) {
    const data = await fetch (
        `https://api.pexels.com/v1/curated?per_page=20&page=${pagenr}`,
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    });

    const result = await data.json();
    result.photos.forEach(photo => {
        const pic = document.createElement("div");
        pic.innerHTML = `
        <img src=${photo.src.large} id="myImg">
        <a target="_blank" href=${photo.src.large}><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}


// Search

async function SearchPhotos(query, pagenr) {
    const data = await fetch (
        `https://api.pexels.com/v1/search?query=${query}&per_page=20&page=${pagenr}`,
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: auth,
        },
    });

    const result = await data.json();
    result.photos.forEach(photo => {
        const pic = document.createElement("div");
        pic.innerHTML = `
        <img src=${photo.src.large}>
        <a target="_blank" href=${photo.src.large}><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}

searchbutton.addEventListener("click", () => {
    if (input.value === "") 
    return;
    clear();
    search = true;
    SearchPhotos(query, pagenr);
    pagenr++;
});

function clear() {
    input.value = "";
    document.querySelector(".gallery").innerHTML = "";
    pagenr = 1;
};

// Next button

next.addEventListener("click", () => {
    if (!search) {
        pagenr++;
        CuratedPhotos(pagenr);
    } else {
        if (query.value === "") return;
        pagenr++;
        SearchPhotos(query, pagenr);
    }
});

