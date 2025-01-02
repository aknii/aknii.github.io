let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetAutoSlide(); // Reset auto-slide timer when manually navigating
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
  resetAutoSlide(); // Reset auto-slide timer when manually selecting
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let thumbnails = document.getElementsByClassName("thumbnail");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < thumbnails.length; i++) {
    thumbnails[i].className = thumbnails[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";  
  thumbnails[slideIndex - 1].className += " active";
}

// Auto-slide functionality
let autoSlideInterval = setInterval(autoSlide, 5000); // Change slide every 5 seconds

function autoSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

// Reset auto-slide timer
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(autoSlide, 5000); // Restart auto-slide
}

function addToCart(product, price) {
  alert(`${product} добавлен в корзину за ${price}₸`);
}
