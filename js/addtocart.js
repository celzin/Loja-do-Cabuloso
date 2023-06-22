let bagIcon = document.querySelector("#bag-icon");
let bag = document.querySelector(".bag");
let closeIcon = document.querySelector("#close-bag");

// Open Bag
bagIcon.onclick = () => {
    bag.classList.add('active');
}
// Close Bag
closeIcon.onclick = () => {
    bag.classList.remove("active");
}

// Bag Working JS
if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove items from bag
    var removeBagButtons = document.getElementsByClassName('bag-remove')
    console.log(removeBagButtons)
    for (var i = 0; i < removeBagButtons.length; i++) {
        var button = removeBagButtons[i]
        button.addEventListener('click', removeBagItem)
    }
}

// Remove Items from cart
function removeBagItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
}

// Update Total
function updatetotal() {
    var cartContent = document.getElementsByClassName("bag-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("bag-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("bag-price")[0];
        var quantityElement = cartBox.getElementsByClassName("bag-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = to
    }
}