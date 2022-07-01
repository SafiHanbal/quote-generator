const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Show new quote
const showNewQuote = () => {
  showLoadingSpinner();
  // Select random quote from apiQuotes
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  hideLoadingSpinner();
};

// Get quotes from API
const getQuotes = async () => {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    showNewQuote();
  } catch (err) {
    alert(err);
  }
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// Event Listner
twitterBtn.addEventListener("click", tweetQuote);

newQuoteBtn.addEventListener("click", showNewQuote);

// Function call on window load
getQuotes();
