let cart = [];

function updateCart() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.textContent = `${item.name} - R$ ${item.price}`;
    cartContainer.appendChild(cartItem);
  });
}

function generateQRCode() {
  const pixKey = '21 99663 2428'; // Chave PIX
  const qrCodeSection = document.getElementById('qr-code-section');
  const qrCodeElement = document.getElementById('qr-code');
  qrCodeSection.style.display = 'block';

  QRCode.toCanvas(qrCodeElement, pixKey, function (error) {
    if (error) console.error(error);
  });

  return pixKey;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-product');
    const productPrice = button.getAttribute('data-price');
    cart.push({ name: productName, price: productPrice });
    updateCart();
  });
});

document.getElementById('checkout-button').addEventListener('click', () => {
  const pixKey = generateQRCode();
  const cartDetails = cart.map(item => `${item.name} - R$ ${item.price}`).join('\n');

  // Simulando o envio de e-mail
  const customerEmail = prompt("Digite seu e-mail para envio da confirmação:");

  alert(`Detalhes enviados para o e-mail: ${customerEmail}\n\nCarrinho: ${cartDetails}\nChave PIX: ${pixKey}`);
});
