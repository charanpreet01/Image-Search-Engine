const accessKey = "mDdwg7_rHlbk1mHEuwyJFjIceWxFaJjHsk6hnVpRJns";

let searchForm = document.querySelector("#search-form");
let searchBox = document.querySelector("#search-box");
let searchResult = document.querySelector("#search-result");
let showMoreBtn = document.querySelector("#show-more-btn");

let keyword = "";
let page = 1;

async function searchImage() {
    keyword = searchBox.value;
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    let response = await fetch(url);
    let data = await response.json();

    if (page===1) {
        searchResult.innerHTML="";
    }

    const results = data.results;

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);

        showMoreBtn.style.display="block";
    })
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
})

showMoreBtn.addEventListener("click",(e)=>{
    page++;
    searchImage();
})