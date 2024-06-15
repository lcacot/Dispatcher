console.log('Content script loaded');

let _previousData = "";

const readClipboardText = () => {
    navigator.clipboard.readText()
    .then(clipboardText => {
        if (clipboardText.length > 0 && clipboardText !== _previousData) {
            console.log('Clipboard text captured:', clipboardText);
            chrome.runtime.sendMessage({ type: 'SAVE_CLIPBOARD_TEXT', text: clipboardText });
            _previousData = clipboardText;
        }
    })
    .catch(err => console.log('Error reading clipboard:', err));
};

document.addEventListener('copy', readClipboardText);

window.addEventListener('focus', () => {
    readClipboardText();
    setInterval(readClipboardText, 500);  // Check clipboard every 1 second
});
