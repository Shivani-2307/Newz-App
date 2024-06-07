// this my
const url="https://newsapi.org/v2/everything?q=";
const API_KEY="3c3deef533d5406fbeca793fe8f3accc";

let query;
window.addEventListener("load",()=> fetchNewz("India"));

function reload(){
    window.location.reload();
}



async function fetchNewz(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
      
}

function bindData(articles){
const cardContainer=document.getElementById('cards-container');
const newzCardTemplate= document.getElementById('template-newz-card');

cardContainer.innerHTML='';

articles.forEach(article => {
    if(!article.urlToImage)
        return;
    const cardClone=newzCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone,article);
    cardContainer.appendChild(cardClone);
});
}

function fillDataInCard(cardClone,article){
    const newzImg=cardClone.querySelector('#newz-img');
    const newzTitle=cardClone.querySelector('#newz-title');
    const newzSource=cardClone.querySelector('#newz-source');
    const newzDesc=cardClone.querySelector('#newz-desc');

    newzImg.src=article.urlToImage;
    newzTitle.innerHTML=article.title;
    newzDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US" ,{ timeZone: "Asia/Jakarta",
    });

    newzSource.innerHTML= `${article.source.name}. ${date}`;

    cardClone.firstElementChild.addEventListener("click" , () =>{
        window.open(article.url, "_blank");
    });
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNewz(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navItem;
    curSelectedNav.classList.add("active");
}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener('click', () => {
    const query=searchText.value;
    if(!query) return;
    fetchNewz(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
});
