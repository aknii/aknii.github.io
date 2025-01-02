document.addEventListener('DOMContentLoaded', () => {
    const popupHeader = document.getElementById('telegram-header');
    const popupBody = document.getElementById('telegram-body');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('telegram-message');
    const sendButton = document.getElementById('telegram-send');

    const TELEGRAM_BOT_TOKEN = '1527372948:AAFkM2KzVCr90LCUj8XUNQYW1IREuHTi1ls';
    const TELEGRAM_CHAT_ID = '1231251707'; // Replace with your chat ID

    // Toggle popup visibility
    popupHeader.addEventListener('click', () => {
        popupBody.style.display = popupBody.style.display === 'none' ? 'block' : 'none';
    });

    // Send message to Telegram
    async function sendMessage(message) {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
        });
        return response.ok;
    }

    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (!message) return;

        chatMessages.innerHTML += `<div>You: ${message}</div>`;
        messageInput.value = '';

        const success = await sendMessage(message);
        if (!success) {
            chatMessages.innerHTML += `<div style="color: red;">Failed to send message.</div>`;
        }
    });
});

