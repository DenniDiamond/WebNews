const API_KEY = '892b793efffd475e9d49af090d600599'
const newsList = document.querySelector('.news-list');
const choiceElem = document.querySelector('.js-choice');
const formSearch = document.querySelector('form-search');

const choices = new Choices(choiceElem, {
    searchEnabled: false,
    itemSelectText: '',
})

const getData = async (url) => {
    const response = await fetch(url, {
        headers: {
            'X-Api-Key': API_KEY ,
        }
    });

    const data = await response.json();

    return data
};

const renderCard = (data) => {
    newsList.textContent = '';
    data.forEach(news => {
        const card = document.createElement('li');
        card.className= 'news-item';

        card.innerHTML = `
            <img src="${news.urlToImage}" alt="${news.title}" class="news-img" width="270" height="200">
            
            <h3 class="news-title">
                <a href="${news.url}" class="news-link" target="_blank">${news.title}</a>
            </h3>

            <p class="news-description">${news.description}</p>
        
            <div class="news-footer">
                <time class="news-datetime" datetime="${news.publishedAt}">
                    <span class="news-date">${news.publishedAt}</span> 11:06
                </time>
                <div class="news-author">${news.author}</div>
            </div>
        `;

        newsList.append(card);
    });
};

const loadNews = async ()=> {
    newsList.innerHTML = '<li class="preload"></li>'
    const country = localStorage.getItem('country') || 'ua';
    choices.setChoiceByValue(country)
    
    const data = await getData(`https://newsapi.org/v2/top-headlines?country=${country}`);
    renderCard(data.articles);
};

choiceElem.addEventListener('change', (e) => {
const value = e.detail.value;
localStorage.setItem('country',value); 
loadNews();
})

loadNews();