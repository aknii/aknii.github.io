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

<link rel="stylesheet" href="/assets/css/cosmetics.css">
<script src="/scripts/cosmetics.js"></script>
