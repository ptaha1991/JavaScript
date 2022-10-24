"use strict";

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const basket = {};

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice();
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    let count = 0;
    const productsArr = Object.values(basket);
    for (const product of productsArr) {
        count += product.count;
    }
    return count;
}

function getTotalBasketPrice() {
    return Object
        .values(basket)
        .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProductInBasket(id) {
    const basketRowEl = basketEl
        .querySelector(`.basketRow[data-id="${id}"]`);
    if (!basketRowEl) {
        renderNewProductInBasket(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow')
        .textContent = basket[id].price * basket[id].count;
}

function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
