---
layout: page
title: "Косметика"
permalink: /cosmetics/
---

<div class="slideshow-container">
  {% for product in site.cosmetics %}
    {% if product.slider %}
      <div class="slide fade">
        <img src="{{ product.image }}" alt="{{ product.title }}">
        <div class="slide-overlay">
          <h2>{{ product.title }}</h2>
          <p class="price">{{ product.price }}₸</p>
          <p>{{ product.description }}</p>
        </div>
      </div>
    {% endif %}
  {% endfor %}
  
  <!-- Navigation Arrows -->
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>

<div class="thumbnail-carousel">
  {% for product in site.cosmetics %}
    {% if product.slider %}
      <img class="thumbnail" src="{{ product.image }}" alt="{{ product.title }}" onclick="currentSlide({{ forloop.index }})">
    {% endif %}
  {% endfor %}
</div>

<h2>Наши товары</h2>
<div class="product-grid">
  {% for product in site.cosmetics %}
    <div class="product-card">
      <img src="{{ product.image }}" alt="{{ product.title }}">
      <h3>{{ product.title }}</h3>
      <p>Цена: {{ product.price }}₸</p>
      <p>{{ product.description }}</p>
      <button class="add-to-cart" onclick="addToCart('{{ product.title }}', {{ product.price }})">Добавить в корзину</button>
    </div>
  {% endfor %}
</div>

<script>
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let thumbnails = document.getElementsByClassName("thumbnail");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < thumbnails.length; i++) {
    thumbnails[i].className = thumbnails[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  thumbnails[slideIndex-1].className += " active";
}

function addToCart(product, price) {
  alert(`${product} добавлен в корзину за ${price}₸`);
}
</script>

<style>
/* Slideshow Styling */
.slideshow-container {
  position: relative;
  max-width: 100%;
  margin: auto;
  overflow: hidden;
}

.slide {
  display: none;
  position: relative;
}

.slide img {
  width: 100%;
  height: auto;
}

.slide-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 15px;
  border-radius: 8px;
}

.slide-overlay h2 {
  margin: 0;
  font-size: 24px;
}

.slide-overlay .price {
  color: #ffdd57;
  font-size: 18px;
  margin: 5px 0;
}

/* Navigation Arrows */
.prev, .next {
  position: absolute;
  top: 50%;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  transform: translateY(-50%);
}

.prev { left: 10px; }
.next { right: 10px; }

/* Thumbnail Carousel */
.thumbnail-carousel {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  gap: 10px;
}

.thumbnail {
  width: 100px;
  height: auto;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: border 0.3s;
}

.thumbnail:hover, .thumbnail.active {
  border-color: #ffdd57;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
}

.product-card img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.add-to-cart {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.add-to-cart:hover {
  background-color: #218838;
}
</style>

