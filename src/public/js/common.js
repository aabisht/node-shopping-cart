$(document).ready(() => {
  const toastLiveExample = document.getElementById("liveToast");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

  $(document).on("click", ".js-btn-add-to-cart", (event) => {
    event.preventDefault();

    const $this = $(event.currentTarget);
    const quantity = $this.attr("data-quantity");
    const stocks = $this.attr("data-stock");
    const productSKU = $this.attr("data-sku");

    if (quantity > stocks) {
      $(".js-toast-heading").text("Error");
      $(".js-toast-body").text(`Quantiy can not be more than ${stocks}`);
      toastBootstrap.show();
    } else {
      $.ajax({
        url: "/api/cart/add",
        type: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${usertoken}`,
        },
        data: JSON.stringify({
          productSKU,
          quantity,
        }),
        success: function (response) {
          $(".js-toast-heading").text("Success");
          $(".js-toast-body").text(
            `${$this.attr("data-product-name")} added to cart.`,
          );
          toastBootstrap.show();
        },
        error: function (xhr) {
          console.log(xhr.responseJSON.message);
        },
      });
    }
  });
});
