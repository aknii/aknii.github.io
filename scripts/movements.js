// Check if the current page is the index page
if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
  // Define topics (ideas)
  const ideas = ['Корей гранты - GKS','Корей емтиханы - TOPIK','Косметика','Пікірлер','CEO', 'Курстар', 'Ой-жазбалар', 'Жобалар',];
  const links = ['gks','topik','cosmetology','feedbacks','author', 'courses', 'posts','jobalar',];

  // Create the center user
  const centerUser = document.querySelector('.center-user');

  // Define oval parameters
  const ovalWidth = 600; // Width of the oval
  const ovalHeight = 400; // Height of the oval
  const angleOffset = Math.PI / 8; // Offset for starting angle

  // Array to store rotation intervals
  const rotationIntervals = [];

  // Function to remove all rotation intervals
  function removeRotationIntervals() {
    rotationIntervals.forEach(interval => clearInterval(interval));
  }

  // Function to calculate idea position
  function calculateIdeaPosition(index, time) {
    const centerX = centerUser.offsetLeft + centerUser.offsetWidth / 2 - 70;
    const centerY = centerUser.offsetTop + centerUser.offsetHeight / 2 - 50;
    const angle = angleOffset + (index / ideas.length) * (2 * Math.PI - angleOffset * 2);
    // Adjust radius for distance from center
    let radius = ovalWidth / 2 + 250; //250 pixels further from the center

    // Gradually reduce radius if close to the center
    radius -= Math.min(time / 1000, 5) * 40; // Reduce radius by up to 40 pixels per second
    if (radius < 250) {
      // Start rotation around the center
      radius = 250; // Maintain a minimum distance from the center
    }
    
    // Calculate x and y positions
    const x = centerX + radius * Math.cos(angle + time / 1000 + index * 0.1);
    const y = centerY + (ovalHeight / 2) * Math.sin(angle + time / 1000 + index * 0.1);

    return { x, y };
  }

  /// Create ideas clouds rotating around the user in an oval shape
ideas.forEach((idea, index) => {
  const cloud = document.createElement('div');
  cloud.classList.add('idea');
  cloud.textContent = idea;
  cloud.setAttribute('data-link', links[index]); // Store the corresponding link as a data attribute
  document.body.appendChild(cloud);

  // Set initial position of ideas randomly
  const randomX = Math.random() * window.innerWidth;
  const randomY = Math.random() * window.innerHeight;
  cloud.style.left = randomX + 'px';
  cloud.style.top = randomY + 'px';

  // Rotate clouds around the user
  const rotateCloud = () => {
    const time = Date.now();
    const { x, y } = calculateIdeaPosition(index, time);
    cloud.style.left = x + 'px';
    cloud.style.top = y + 'px';
  };

  let rotationInterval = setInterval(rotateCloud, 50); // Rotate the cloud
  rotationIntervals.push(rotationInterval); // Push rotation interval to the array

  // Handle click event to navigate to the corresponding link
  cloud.addEventListener('click', () => {
    const link = cloud.getAttribute('data-link');
    window.location.href = link; // Redirect to the specified link
  });

  // Stop rotation when mouse is over this idea
  cloud.addEventListener('mouseenter', () => {
    clearInterval(rotationInterval);
  });

  // Resume rotation when mouse leaves this idea
  cloud.addEventListener('mouseleave', () => {
    rotationInterval = setInterval(rotateCloud, 50);
    rotationIntervals.push(rotationInterval); // Push rotation interval to the array
  });
});

centerUser.addEventListener('click', () => {
  location.reload(); // Refresh the current page
});

  // Stop rotation when mouse is over the center user
  centerUser.addEventListener('mouseenter', () => {
    rotationIntervals.forEach(interval => clearInterval(interval));
  });

centerUser.addEventListener('mouseleave', () => {
  rotationIntervals.forEach((interval, index) => {
    const cloud = document.querySelector('.idea:nth-child(' + (index + 1) + ')');
    rotationInterval = setInterval(() => {
      const time = Date.now();
      const { x, y } = calculateIdeaPosition(index, time);
      cloud.style.left = x + 'px';
      cloud.style.top = y + 'px';
    }, 50);
    rotationIntervals[index] = rotationInterval; // Update the rotation interval in the array
  });
});

  // Remove rotation intervals before unloading the page
  window.addEventListener('beforeunload', removeRotationIntervals);
}
