$(document).ready(() => {
  $(".js-load-more").on("click", (event) => {
    event.preventDefault();

    const nextPage = productsData.currentPage + 1;

    $.ajax({
      url: `/api/products?page=${nextPage}`,
      method: "GET",
      success: function (data) {
        productsData.currentPage = Number(data.page);
        productsData.totalPages = Number(data.totalPages);
        data.items.forEach((product) => {
          $(".js-product-row").append($(".js-product-col")[0].outerHTML);
          const $element = $(".js-product-row").children().last();

          $element.find(".js-product-link").attr("href", `/p/${product.sku}`);
          $element.find(".js-product-category").text(product.category);
          $element.find(".js-product-img").attr("src", product.image);
          $element.find(".js-product-img").attr("alt", product.name);
          $element.find(".js-product-title").text(product.name.split(" - ")[1]);
          $element
            .find(".js-product-subtitle")
            .text(product.name.split(" - ")[0]);
          $element.find(".js-product-price").text(product.price);

          $element.find(".js-btn-add-to-cart").attr("data-sku", product.sku);
          $element
            .find(".js-btn-add-to-cart")
            .attr("data-stock", product.stocks);
          $element
            .find(".js-btn-add-to-cart")
            .attr("data-product-name", product.name);

          $element
            .find(".js-btn-add-to-cart")
            .attr("data-product-name", product.name);

          $element
            .find(".js-btn-add-to-cart-link")
            .attr("href", `/login?redirect=/p/${product.sku}`);
        });

        if (productsData.currentPage === productsData.totalPages) {
          $(".js-load-more").remove();
        }
      },
      error: function (xhr, status, error) {
        console.error(xhr, status, error);
      },
    });
  });
});
