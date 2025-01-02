---
layout: page
title: "Косметика"
permalink: /cosmetics/
---

<div class="slideshow-container">
  <div class="slide fade">
    <img src="/assets/images/cosmetics1.jpg" alt="Product 1">
    <div class="text">Product 1 Description</div>
  </div>
  <div class="slide fade">
    <img src="/assets/images/cosmetics2.jpg" alt="Product 2">
    <div class="text">Product 2 Description</div>
  </div>
  <div class="slide fade">
    <img src="/assets/images/cosmetics3.jpg" alt="Product 3">
    <div class="text">Product 3 Description</div>
  </div>
</div>
<br>
<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span> 
</div>

<h2>Наши товары</h2>
<div class="product-grid">
  <div class="product-card">
    <img src="/assets/images/lipstick.jpg" alt="Lipstick">
    <h3>Губная Помада</h3>
    <p>Цена: 1,000₸</p>
    <button class="add-to-cart" onclick="addToCart('Губная Помада', 1000)">Добавить в корзину</button>
  </div>
  <div class="product-card">
    <img src="/assets/images/cream.jpg" alt="Face Cream">
    <h3>Крем для лица</h3>
    <p>Цена: 2,000₸</p>
    <button class="add-to-cart" onclick="addToCart('Крем для лица', 2000)">Добавить в корзину</button>
  </div>
  <!-- Add more products here -->
</div>

<script>
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function addToCart(product, price) {
  alert(`${product} добавлен в корзину за ${price}₸`);
}
</script>

<style>
.slideshow-container {
  position: relative;
  max-width: 100%;
  margin: auto;
}

.slide {
  display: none;
}

img {
  width: 100%;
  height: auto;
}

.text {
  color: #fff;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}

.dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.dot.active {
  background-color: #717171;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
}

.product-card {
  flex: 1 1 calc(33.333% - 16px);
  box-sizing: border-box;
  padding: 16px;
  border: 1px solid #ddd;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
}

.add-to-cart {
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #218838;
}
</style>
