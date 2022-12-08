const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let quotes = [];

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function getNewQuote(){
    loading();
    let quote = quotes[Math.floor(Math.random() * quotes.length)]
    if(!quote.author){
        authorText.textContent = "Unknown Author";
    }else{
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotesByAPI(){
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const quoteList = await fetch(apiUrl);
        quotes = await quoteList.json();
        getNewQuote();
    }catch (err){
        alert("Nothing found");
    }
}

function tweetQuote(){
    const twitterPreTweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterPreTweetUrl, '_blank');
}

//Event Listeners
twitterButton.addEventListener("click", tweetQuote);
newQuoteButton.addEventListener("click", getNewQuote);

getQuotesByAPI();