$(document).ready(function () {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  const socket = io();

  // Listen for cart updates
  socket.on("cartUpdated", (cartData) => {
    console.log("Cart updated:", cartData);
  });

  const updateCart = (productSKU, quantity) => {
    $.ajax({
      url: `/api/cart/update/${productSKU}`,
      type: "PUT",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
      data: JSON.stringify({
        quantity,
      }),
      success: function (response) {
        $(".js-subtotal-price").text(response.totalPrice);
        $(".js-total-price").text(
          response.totalPrice + Number($(".js-shipping-charges").text().trim()),
        );
      },
      error: function (xhr) {
        $(".js-toast-heading").text("Error");
        $(".js-toast-body").text(xhr.responseJSON.message);
        toastBootstrap.show();
      },
    });
  };

  $(".js-quantity-plus").on("click", (event) => {
    event.preventDefault();
    const $this = $(event.currentTarget);
    const $qtyElement = $this.closest(".js-qty-wrapper").find(".js-input-qty");
    const quantity = parseInt($qtyElement.val());
    if (quantity < parseInt($qtyElement.attr("max"))) {
      $qtyElement.val(quantity + 1);

      updateCart($qtyElement.attr("data-product-sku"), $qtyElement.val());
    }
  });

  $(".js-quantity-minus").on("click", (event) => {
    event.preventDefault();
    const $this = $(event.currentTarget);
    const $qtyElement = $this.closest(".js-qty-wrapper").find(".js-input-qty");
    const quantity = parseInt($qtyElement.val());
    if (quantity > parseInt($qtyElement.attr("min"))) {
      $qtyElement.val(quantity - 1);
      updateCart($qtyElement.attr("data-product-sku"), $qtyElement.val());
    }
  });

  $(".js-input-qty").on("change", (event) => {
    const $this = $(event.currentTarget);
    const minVal = parseInt($this.attr("min"));
    const maxVal = parseInt($this.attr("max"));
    const currentVal = parseInt($this.val());

    if (currentVal > maxVal) {
      $this.val(maxVal);
    }

    if (currentVal < minVal) {
      $this.val(minVal);
    }

    updateCart($this.attr("data-product-sku"), $qtyElement.val());
  });

  $(".js-delete-product").on("click", (event) => {
    const $this = $(event.currentTarget);
    const productSKU = $this.attr("data-product-sku");

    $.ajax({
      url: `/api/cart/remove/${productSKU}`,
      type: "DELETE",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${usertoken}`,
      },
      success: function (response) {
        window.location.reload();
      },
      error: function (xhr) {
        $(".js-toast-heading").text("Error");
        $(".js-toast-body").text(xhr.responseJSON.message);
        toastBootstrap.show();
      },
    });
  });
});
