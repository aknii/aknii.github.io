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
        <div class="text">{{ product.title }}: {{ product.description }}</div>
      </div>
    {% endif %}
  {% endfor %}
</div>
<br>
<div style="text-align:center">
  {% for product in site.cosmetics %}
    {% if product.slider %}
      <span class="dot" onclick="currentSlide({{ forloop.index }})"></span>
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
