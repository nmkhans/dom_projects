/**
 * Date - 26/03/2025
 * Author: Moin Khan
 * Description: Quote generator app
 */

// onload handler
window.onload = function () {
  main();
};

// main function
function main() {
  const quoteGenerateBtn = document.getElementById("new-quote-btn");
  const quoteBody = document.getElementById("quote-body");

  quoteGenerateBtn.addEventListener("click", () => {
    const index = Math.floor(
      Math.random() * meaningfulQuotes.length - 1
    );
    const quote = meaningfulQuotes[index];
    quoteBody.innerHTML = quote.quote;
  });
}
