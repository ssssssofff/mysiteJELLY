(function() {
    const products = [
        { id: 1, name: 'Дельфинчики', desc: 'мармеладные фигурки', weight: '100г', price: 150, img: 'images/delfin.jpg' },
        { id: 2, name: 'Бананчики с нутеллой', desc: 'внутри шоколадная паста', weight: '100г', price: 100, img: 'images/banan.jpg' },
        { id: 3, name: 'Мармеладный микс', desc: 'ассорти фруктов', weight: '150г', price: 120, img: 'images/miks.jpg' },
        { id: 4, name: 'Ленточка клубника', desc: 'желейные полоски', weight: '100г', price: 90, img: 'images/clubnika.jpg' },
        { id: 5, name: 'Ленточка вишня', desc: 'вишнёвый вкус', weight: '100г', price: 90, img: 'images/vishnya.jpg' },
        { id: 6, name: 'Ленточка бабл-гам', desc: 'сладкая жвачка', weight: '100г', price: 95, img: 'images/bubl-gum.jpg' }
    ];

    let cart = {};

    const mainPage = document.getElementById('mainPage');
    const catalogPage = document.getElementById('catalogPage');
    const catalogGrid = document.getElementById('catalogGrid');
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');

    const goHomeBtn = document.getElementById('goHomeBtn');
    const goCatalogBtn = document.getElementById('goCatalogBtn');
    const goCartBtn = document.getElementById('goCartBtn');
    const catalogFromMain = document.getElementById('catalogFromMain');
    const clearCartBtn = document.getElementById('clearCartBtn');

    function renderCatalog() {
        catalogGrid.innerHTML = '';
        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${p.img}" alt="${p.name}">
                <div class="product-name">${p.name}</div>
                <div class="product-desc">${p.desc} · ${p.weight}</div>
                <div class="product-price">${p.price} ₽</div>
                <button class="add-btn" data-id="${p.id}">➕ Добавить</button>
            `;
            catalogGrid.appendChild(card);
        });

        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                addToCart(parseInt(this.dataset.id));
            });
        });
    }

    function addToCart(productId) {
        if (!cart[productId]) cart[productId] = 0;
        cart[productId] += 1;
        updateCartUI();
    }

    function removeFromCart(productId) {
        if (cart[productId]) {
            cart[productId] -= 1;
            if (cart[productId] <= 0) delete cart[productId];
            updateCartUI();
        }
    }

    function clearCart() {
        cart = {};
        updateCartUI();
    }

    function updateCartUI() {
        const itemKeys = Object.keys(cart);
        cartItemsDiv.innerHTML = '';

        if (itemKeys.length === 0) {
            cartItemsDiv.innerHTML = '<div style="color: #8c5f47; padding: 0.4rem;">Корзина пуста</div>';
            cartTotalDiv.textContent = 'Итого: 0 ₽';
            return;
        }

        let total = 0;
        itemKeys.forEach(id => {
            const product = products.find(p => p.id === Number(id));
            if (!product) return;
            const qty = cart[id];
            const subtotal = product.price * qty;
            total += subtotal;

            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <span>${product.name} × ${qty}</span>
                <span>${subtotal} ₽ 
                    <button class="btn" style="padding: 0.1rem 0.8rem; font-size:0.8rem; box-shadow:0 3px 0 #a55d3a; margin-left: 0.4rem;" data-remove="${id}">−</button>
                </span>
            `;
            cartItemsDiv.appendChild(itemDiv);
        });

        document.querySelectorAll('[data-remove]').forEach(btn => {
            btn.addEventListener('click', function() {
                removeFromCart(parseInt(this.dataset.remove));
            });
        });

        cartTotalDiv.textContent = `Итого: ${total} ₽`;
    }

    function showMain() {
        mainPage.style.display = 'block';
        catalogPage.classList.remove('active');
        catalogPage.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showCatalog() {
        mainPage.style.display = 'none';
        catalogPage.style.display = 'block';
        catalogPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showCart() {
        document.getElementById('cartSection').scrollIntoView({ behavior: 'smooth' });
    }

    goHomeBtn.addEventListener('click', showMain);
    goCatalogBtn.addEventListener('click', showCatalog);
    catalogFromMain.addEventListener('click', showCatalog);
    goCartBtn.addEventListener('click', showCart);
    clearCartBtn.addEventListener('click', clearCart);

    mainPage.style.display = 'block';
    catalogPage.style.display = 'none';
    catalogPage.classList.remove('active');

    renderCatalog();
    updateCartUI();
})();