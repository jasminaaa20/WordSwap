// Predetermined word replacements
const wordReplacements = {
  "IDK": "I don't know",
  "BTW": "By the way",
  "FYI": "For your information"
};

// Function to replace words in a string based on the dictionary
function replaceWords(inputText) {
  const words = inputText.split(/\s+/);
  return words
    .map(word => wordReplacements[word.toUpperCase()] || word)
    .join(" ");
}

// Observe input fields on Twitter's platform
function observeInputs() {
  const postBoxSelector = 'div[role="textbox"]';
  const postBoxes = document.querySelectorAll(postBoxSelector);

  postBoxes.forEach(box => {
    // Listen for input changes
    box.addEventListener('input', event => {
      const originalText = box.innerText;
      const replacedText = replaceWords(originalText);

      if (replacedText !== originalText) {
        box.innerText = replacedText;
        placeCaretAtEnd(box); // Keep the caret at the end
      }
    });
  });
}

// Keep the caret at the end of the input
function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

// Initial observer setup
const observer = new MutationObserver(() => {
  observeInputs();
});
observer.observe(document.body, { childList: true, subtree: true });

observeInputs();
