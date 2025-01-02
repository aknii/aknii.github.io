const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

const TELEGRAM_BOT_TOKEN = '1527372948:AAFkM2KzVCr90LCUj8XUNQYW1IREuHTi1ls';
const TELEGRAM_CHAT_ID = '1231251707'; // Replace with your chat ID

async function sendMessage(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
    });
    return response.ok;
}

sendButton.addEventListener('click', async () => {
    const message = messageInput.value;
    if (!message) return;

    const success = await sendMessage(message);
    if (success) {
        chatBox.innerHTML += `<div>You: ${message}</div>`;
        messageInput.value = '';
    } else {
        alert('Failed to send message.');
    }
});
