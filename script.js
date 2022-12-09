const authorText = document.getElementById('author');
const quoteText = document.getElementById('quote');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');

let quote = [];

function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

async function getQuoteFromApi(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try{
        const quotes = await fetch(apiUrl);
        quote = await quotes.json();
        getQuote();
    }catch (err){
        alert("nothing found");
    }
}

function getQuote(){
    loading();
    const randomQuote = quote[Math.floor(Math.random() * quote.length)];
    if(!randomQuote.author){
        authorText.textContent = "Unknown Author";
    }else {
        authorText.textContent = randomQuote.author;
    }

    if (randomQuote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = randomQuote.text;
    complete();
}

function tweetQuote(){
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(tweetUrl, "_blank");
}

twitterButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', getQuote);

getQuoteFromApi();