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
