function changeQuantity(button, change) {
    const quantitySpan = button.parentElement.querySelector('span');
    let quantity = parseInt(quantitySpan.textContent);
    const start = parseInt(quantitySpan.dataset.min);
    quantity += change;
        quantity = Math.max(start, quantity);
    quantitySpan.textContent = quantity;
}
document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('.imges').forEach(picture => {
        const images = picture.querySelectorAll('img');
        let index = 0;
        const delay = parseInt(picture.dataset.delay) || 3000;      
        if (images.length > 1) {
            setInterval(() => {
                images[index].classList.remove('active');
                index = (index + 1) % images.length;
                images[index].classList.add('active');
            }, delay);
        }
    });

    function getCurrentCart() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            return JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [];
        }
        return JSON.parse(localStorage.getItem('cart')) || [];
    }
    function saveCart(cart) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        updateCartCount();
    }
    function updateCartCount() {
        const cart = getCurrentCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            cartIcon.setAttribute('data-count', count > 0 ? count : '');
        }
    }

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.loggedIn) {
                alert('Please login first to add items to cart');
                window.location.href = 'login.html';
                return;
            }
            const productElement = this.closest('.product');
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = parseFloat(this.dataset.price);
            const quantity = parseInt(productElement.querySelector('.quantity-controls span').textContent);
            let cart = getCurrentCart();
            const existingItemIndex = cart.findIndex(item => item.id === productId);
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: quantity,
                });
            }            
            saveCart(cart);
            
            const message = this.nextElementSibling;
            if (message && message.classList.contains('message')) {
                message.textContent = `${quantity} ${productName} has been added to the shopping cart`;
                message.style.display = 'block';
                setTimeout(() => {
                    message.style.display = 'none';
                }, 3000);
            }
        });
    });

    updateCartCount();
});
function toggleMenu() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
  }