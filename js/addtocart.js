let bagIcon = document.querySelector('#bag-icon');
let bag = document.querySelector('.bag');
let closeBag = document.querySelector('#close-bag');

// Open Bag
bagIcon.onclick = () => {
    bag.classList.add('active');
}
// Close Bag
closeBag.onclick = () => {
    bag.classList.remove("active");
}

// Bag Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove items from bag
    var removeBagButtons = document.getElementsByClassName('bag-remove')
    console.log(removeBagButtons);
    for (var i = 0; i < removeBagButtons.length; i++) {
        var button = removeBagButtons[i];
        button.addEventListener('click', removeBagItem);
    }
    // Quantity Changes 
    var quantityInputs = document.getElementsByClassName('bag-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    // Add to Cart
    var addCart = document.getElementsByClassName('add-bag');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
    loadCartItems();

    // Buy Button Work
    document
        .getElementsByClassName('btn-bag-buy')[0]
        .addEventListener('click', buyButtonCLicked);
}

// Buy Button
function buyButtonCLicked() {
    alert('Your Order is placed');
    var cartContent = document.getElementsByClassName('bag-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

// Remove Items from cart
function removeBagItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    saveCartItems();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
    updateCartIcon();
}

// Add to Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    console.log(title, price, productImg);
    addProductToCart(title, price, productImg);
    updatetotal();
    saveCartItems();
    updateCartIcon();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('bag-box');
    var cartItems = document.getElementsByClassName('bag-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('bag-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }
    }
    var cartBoxContent = `
            <img src="${productImg}" alt="" class="bag-img">
            <div class="detail-bag-box">
                <div class="bag-product-title">${title}</div>
                <div class="bag-price">${price}</div>
                <input type="number" value="1" class="bag-quantity">
            </div>
            <!-- Remove Cart -->
            <i class='bx bxs-trash-alt bag-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
        .getElementsByClassName('bag-remove')[0]
        .addEventListener('click', removeBagItem);
    cartShopBox
        .getElementsByClassName('bag-quantity')[0]
        .addEventListener('change', quantityChanged);
    saveCartItems();
    updateCartIcon();
}

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName('bag-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('bag-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('bag-price')[0];
        var quantityElement = cartBox.getElementsByClassName('bag-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // If price contain some Cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-bag-price')[0].innerText = '$' + total;
    // Save Total to LocalStorage
    localStorage.setItem("cartTotal", total);

}

// Keep Item in cart when page refresh with LocalStorage
function saveCartItems() {
    var cartContent = document.getElementsByClassName('bag-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('bag-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName('bag-product-title')[0];
        var priceElement = cartBox.getElementsByClassName('bag-price')[0];
        var quantityElement = cartBox.getElementsByClassName('bag-quantity')[0];
        var productImg = cartBox.getElementsByClassName('bag-img')[0].src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Loads in Cart
function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');

    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName('bag-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName('bag-quantity')[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem('cartTotal');

    if (cartTotal) {
        document.getElementsByClassName('total-bag-price')[0].innerText =
            "$" + cartTotal;
    }
    updateCartIcon();
}

// Quantity in Cart Icon
function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName('bag-box');
    var quantity = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('bag-quantity')[0];
        quantity += parseInt(quantityElement.value);
    }
    var cartIcon = document.querySelector('#bag-icon');
    cartIcon.setAttribute('data-quantity', quantity);
}