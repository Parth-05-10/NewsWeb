// const API_KEY = "a0e037812f6d4ca398d61e370758fd7b"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', ()=> fetchNews('India'));

function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json();
    bindData(data.articles)

}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container')
    const newscardtemplate = document.getElementById('template-news-card')
    cardsContainer.innerHTML = "";
    
    articles.forEach(article => {
        if(!article.urlToImage)return;
        const cardClone = newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article)
        cardsContainer.appendChild(cardClone);
    });

    function fillDataInCard(cardClone, article){
        const newsImg = cardClone.querySelector('#new-img');
        const newsTitle = cardClone.querySelector('#new-title');
        const newsSource = cardClone.querySelector('#new-source');
        const newsDesc = cardClone.querySelector('#new-desc');

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta"
        });

        newsSource.innerHTML =`${article.source.name} - ${date}`;
         
        cardClone.firstElementChild.addEventListener('click', ()=>{
            window.open(article.url, "_blank");
        })
    }
}

let curSelItem = null;
function onNavClickItem(id){
    fetchNews(id);   
    const navItem  = document.getElementById(id);
    curSelItem?.classList.remove('active')
    curSelItem = navItem;
    curSelItem.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchtext = document.getElementById('search-text');

searchButton.addEventListener('click', ()=>{
    const query = searchtext.value;
    if(!query)return;
    fetchNews(query);
    curSelItem?.classList.remove('active')
    curSelItem = null;

})
