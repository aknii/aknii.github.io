if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  const ideas = ['Корей гранты', 'TOPIK exams', 'Косметика', 'Кері байланыс', 'Мен туралы', 'Курстар', 'Посттар', 'Жобалар'];
  const links = ['gks', 'topik', 'cosmetology', 'feedbacks', 'author', 'courses', 'posts', 'jobalar'];

  const centerUser = document.querySelector('.center-user');

  const ovalWidth = 500;
  const ovalHeight = 500;
  const angleOffset = Math.PI / 8;

  const rotationIntervals = new Map(); // Map to store intervals for each cloud

  function removeRotationIntervals() {
    rotationIntervals.forEach(interval => clearInterval(interval));
    rotationIntervals.clear(); // Reset the map
  }

  function calculateIdeaPosition(index, time) {
    const centerX = window.innerWidth / 2; // Use window center
    const centerY = window.innerHeight / 2; // Use window center
    const angle = angleOffset + (index / ideas.length) * (2 * Math.PI - angleOffset * 2);
    let radius = ovalWidth / 2 + 350;

    radius -= Math.min(time / 1000, 5) * 40; // Gradual radius adjustment
    radius = Math.max(radius, 350); // Minimum radius

    const x = centerX + radius * Math.cos(angle + time / 1000 + index * 0.1);
    const y = centerY + (ovalHeight / 2) * Math.sin(angle + time / 1000 + index * 0.1);

    return { x, y };
  }

  function startRotation(cloud, index) {
    const rotateCloud = () => {
      const time = Date.now();
      const { x, y } = calculateIdeaPosition(index, time);
      cloud.style.left = `${x}px`;
      cloud.style.top = `${y}px`;
    };

    if (rotationIntervals.has(cloud)) {
      clearInterval(rotationIntervals.get(cloud)); // Clear any existing interval
    }

    const interval = setInterval(rotateCloud, 50);
    rotationIntervals.set(cloud, interval); // Store the interval in the map
  }

  ideas.forEach((idea, index) => {
    const cloud = document.createElement('div');
    cloud.classList.add('idea');
    cloud.textContent = idea;
    cloud.setAttribute('data-link', links[index]);
    document.body.appendChild(cloud);

    // Random initial position
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    cloud.style.left = `${randomX}px`;
    cloud.style.top = `${randomY}px`;

    // Start rotation
    startRotation(cloud, index);

    cloud.addEventListener('click', () => {
      const link = cloud.getAttribute('data-link');
      window.location.href = link;
    });

    cloud.addEventListener('mouseenter', () => {
      clearInterval(rotationIntervals.get(cloud));
    });

    cloud.addEventListener('mouseleave', () => {
      startRotation(cloud, index);
    });
  });

  centerUser.addEventListener('click', () => {
    location.reload();
  });

  centerUser.addEventListener('mouseenter', removeRotationIntervals);

  centerUser.addEventListener('mouseleave', () => {
    document.querySelectorAll('.idea').forEach((cloud, index) => {
      startRotation(cloud, index); // Restart rotation for each cloud
    });
  });

  window.addEventListener('beforeunload', removeRotationIntervals);
}






function getDeviceID() {
    let deviceID = localStorage.getItem('deviceID');
    
    if (!deviceID) {
        deviceID = generateUUID();
        localStorage.setItem('deviceID', deviceID);
    }
    
    return deviceID;
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const popupHeader = document.getElementById('telegram-header');
    const popupBody = document.getElementById('telegram-body');
    const chatThreads = document.getElementById('chat-threads');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('telegram-message');
    const sendButton = document.getElementById('telegram-send');

    const TELEGRAM_BOT_TOKEN = '1527372948:AAFkM2KzVCr90LCUj8XUNQYW1IREuHTi1ls'; // Your bot token
    const TELEGRAM_CHAT_ID = '-1002463115933'; // Your chat ID

    const deviceID = getDeviceID();
    let chatsByDeviceID = {}; // Structure: { chatId: { deviceID: messages } }
    let currentChatId = null;
    let currentDeviceID = deviceID; // Set initial deviceID
    let lastUpdateId = 0;

    // Toggle popup visibility
    popupHeader.addEventListener('click', () => {
        popupBody.style.display = popupBody.style.display === 'none' ? 'flex' : 'none';
    });

    // Send a message to Telegram
    async function sendMessage(chatId, message, deviceID) {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: `${deviceID}: ${message}`, // Include deviceID in the message
            }),
        });
        return response.ok;
    }

    // When sending a message
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (!message || !currentChatId) return;

        // Store the message under the specific deviceID
        if (!chatsByDeviceID[currentChatId]) {
            chatsByDeviceID[currentChatId] = {};
        }
        if (!chatsByDeviceID[currentChatId][currentDeviceID]) {
            chatsByDeviceID[currentChatId][currentDeviceID] = [];
        }
        chatsByDeviceID[currentChatId][currentDeviceID].push({ sender: currentDeviceID, text: message });

        updateChatDisplay(currentChatId, currentDeviceID);
        messageInput.value = '';

        const success = await sendMessage(currentChatId, message, currentDeviceID); // Pass deviceID to sendMessage
        if (!success) {
            alert('Failed to send message.');
        }
    });

    // Fetch new messages from Telegram
    async function fetchMessages() {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=${lastUpdateId + 1}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            const data = await response.json();

            if (data.ok) {
                data.result.forEach((update) => {
                    const chatId = update.message.chat.id;
                    const text = update.message.text;
                    const senderDeviceID = extractDeviceID(text); // Function to extract deviceID from message

                    if (!chatsByDeviceID[chatId]) {
                        chatsByDeviceID[chatId] = {};
                    }

                    if (!chatsByDeviceID[chatId][senderDeviceID]) {
                        chatsByDeviceID[chatId][senderDeviceID] = [];
                    }

                    // Store the received message under the deviceID
                    chatsByDeviceID[chatId][senderDeviceID].push({ sender: senderDeviceID, text });

                    if (currentChatId === chatId && currentDeviceID === senderDeviceID) {
                        updateChatDisplay(chatId, senderDeviceID);
                    }

                    lastUpdateId = update.update_id;
                });
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    // Extract deviceID from message (assuming deviceID is at the beginning)
    function extractDeviceID(text) {
        const match = text.match(/^(\S+):/); // Assuming deviceID is the first word in the message
        return match ? match[1] : 'unknown';  // Return 'unknown' if deviceID is not found
    }

    // Add a new chat to the chat list for a specific deviceID
    function addChatThread(chatId, deviceID) {
        if (!chatsByDeviceID[chatId]) {
            chatsByDeviceID[chatId] = {};
        }
        if (!chatsByDeviceID[chatId][deviceID]) {
            chatsByDeviceID[chatId][deviceID] = [];
        }

        const thread = document.createElement('li');
        thread.textContent = `Chat with ${deviceID}`;
        thread.dataset.chatId = chatId;
        thread.dataset.deviceID = deviceID;
        thread.addEventListener('click', () => {
            currentChatId = chatId;
            currentDeviceID = deviceID;
            updateChatDisplay(chatId, deviceID);
        });
        chatThreads.appendChild(thread);
    }

    // Update the chat display for a specific chatId and deviceID
    function updateChatDisplay(chatId, deviceID) {
        chatMessages.innerHTML = '';
        const messages = chatsByDeviceID[chatId] ? chatsByDeviceID[chatId][deviceID] || [] : [];
        messages.forEach((msg) => {
            chatMessages.innerHTML += `<div>${msg.sender}: ${msg.text}</div>`;
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Poll for new messages every 2 seconds
    setInterval(fetchMessages, 2000);
});
