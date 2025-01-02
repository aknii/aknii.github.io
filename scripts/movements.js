if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  const ideas = ['Корей гранты', 'TOPIK емтиханы', 'Косметика', 'Пікірлер', 'Мен туралы', 'Курстар', 'Посттар', 'Жобалар'];
  const links = ['gks', 'topik', 'cosmetology', 'feedbacks', 'author', 'courses', 'posts', 'jobalar'];

  const centerUser = document.querySelector('.center-user');

  const ovalWidth = 500;
  const ovalHeight = 500;
  const angleOffset = Math.PI / 8;

  let rotationIntervals = []; // Store intervals for each idea

  function removeRotationIntervals() {
    rotationIntervals.forEach(interval => clearInterval(interval));
    rotationIntervals = []; // Clear the array
  }

  function calculateIdeaPosition(index, time) {
    const centerX = window.innerWidth / 2; // Use window center
    const centerY = window.innerHeight / 2; // Use window center
    const angle = angleOffset + (index / ideas.length) * (2 * Math.PI - angleOffset * 2);
    let radius = ovalWidth / 2 + 250;

    radius -= Math.min(time / 1000, 5) * 40; // Gradual radius adjustment
    radius = Math.max(radius, 250); // Minimum radius

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

    const rotationInterval = setInterval(rotateCloud, 50);
    rotationIntervals[index] = rotationInterval;
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
      clearInterval(rotationIntervals[index]);
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
    ideas.forEach((_, index) => {
      const cloud = document.querySelector(`.idea:nth-child(${index + 1})`);
      startRotation(cloud, index); // Restart rotation for each cloud
    });
  });

  window.addEventListener('beforeunload', removeRotationIntervals);
}
