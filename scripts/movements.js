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





document.addEventListener('DOMContentLoaded', () => {
    const popupHeader = document.getElementById('telegram-header');
    const popupBody = document.getElementById('telegram-body');
    const userInfo = document.getElementById('user-info');
    const chatArea = document.getElementById('chat-area');
    const userNameInput = document.getElementById('user-name');
    const userPhoneInput = document.getElementById('user-phone');
    const userSubmitButton = document.getElementById('user-submit');
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('telegram-message');
    const sendButton = document.getElementById('telegram-send');

    const TELEGRAM_BOT_TOKEN = '1527372948:AAFkM2KzVCr90LCUj8XUNQYW1IREuHTi1ls';
    const TELEGRAM_CHAT_ID = '-1002463115933';

    let userName = '';
    let userPhone = '';
    let chatsByDeviceID = {};
    let currentChatId = TELEGRAM_CHAT_ID;
    let lastUpdateId = 0;

    // Toggle popup body
    popupHeader.addEventListener('click', () => {
        if (popupBody.style.display === 'none') {
            popupBody.style.display = 'flex';
            document.getElementById('telegram-popup').style.height = 'auto';
        } else {
            popupBody.style.display = 'none';
            document.getElementById('telegram-popup').style.height = '40px';
        }
    });

    // Handle user info submission
    userSubmitButton.addEventListener('click', () => {
        userName = userNameInput.value.trim();
        userPhone = userPhoneInput.value.trim();

        if (!userName || !userPhone) {
            alert('Есім мен телефон нөмірін толтырыңыз.');
            return;
        }

        userInfo.style.display = 'none'; // Hide user info
        chatArea.style.display = 'flex'; // Show chat area

        // Send user info to Telegram
        sendMessage(currentChatId, `Жаңа пайдаланушы: ${userName}, Телефон: ${userPhone}`);
    });

    // Send a message
    sendButton.addEventListener('click', async () => {
        const message = messageInput.value.trim();
        if (!message) return;

        chatsByDeviceID[currentChatId] = chatsByDeviceID[currentChatId] || [];
        chatsByDeviceID[currentChatId].push({ sender: 'Сіз', text: message });
        updateChatDisplay(currentChatId);
        messageInput.value = '';

        const success = await sendMessage(
            currentChatId,
            `Есім: ${userName}, Телефон: ${userPhone}\nХабарлама: ${message}`
        );
        if (!success) alert('Failed to send message.');
    });

    // Send a message to Telegram
    async function sendMessage(chatId, message) {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message }),
        });
        return response.ok;
    }

    // Update the chat display
    function updateChatDisplay(chatId) {
        chatMessages.innerHTML = '';
        (chatsByDeviceID[chatId] || []).forEach((msg) => {
            chatMessages.innerHTML += `<div><strong>${msg.sender}:</strong> ${msg.text}</div>`;
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});

