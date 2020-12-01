const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote() {
  loading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    let response = await fetch(proxyUrl + apiURL);
    let data = await response.json();
    console.log(data);
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    quoteText.innerText = data.quoteText;
    complete();
  } catch (err) {
    getQuote();
    //  console.log("Whoops, no quote ", err);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);

//On Load
//loading();
getQuote();
