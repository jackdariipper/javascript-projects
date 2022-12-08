let apiQuotes = [];

function getNewQuote(){
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
}

async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const getApi = await fetch(apiUrl);
        apiQuotes = await getApi.json();
        getNewQuote();
    }catch (err){
        alert("can't find anything")
    }
}

getQuotes();