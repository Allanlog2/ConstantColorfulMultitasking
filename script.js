document.addEventListener("DOMContentLoaded", () => {
  const cart = [];

  // Função para atualizar o carrinho na tela
  function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Carrinho vazio.</p>";
    } else {
      cart.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        const itemDetails = document.createElement("span");
        itemDetails.textContent = `${item.product} - R$ ${item.price.toFixed(2)}`;
        cartItemDiv.appendChild(itemDetails);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remover";
        removeButton.addEventListener("click", () => removeFromCart(index));
        cartItemDiv.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItemDiv);
      });
    }
  }

  // Função para adicionar item ao carrinho
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (e) => {
      const product = e.target.getAttribute("data-product");
      const price = parseFloat(e.target.getAttribute("data-price"));

      cart.push({ product, price });
      updateCart();
    });
  });

  // Função para remover item do carrinho
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  // Função de checkout (exibe o QR Code)
  document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length > 0) {
      document.getElementById("checkout").style.display = "block";
      const qrCodeContainer = document.getElementById("qr-code");
      qrCodeContainer.innerHTML = "";
      QRCode.toCanvas(document.createElement("canvas"), "21 99663 2428", (error) => {
        if (error) console.error(error);
        qrCodeContainer.appendChild(document.createElement("canvas"));
      });
    } else {
      alert("Adicione itens ao carrinho antes de finalizar a compra.");
    }
  });
});
