$(document).ready(() => {
  const $username = $(".js-form-control-username");
  const $password = $(".js-form-control-password");
  const $form = $(".js-login-form");

  $username.on("change", () => {
    $username.val().length > 0 &&
      $username
        .removeClass("is-invalid")
        .siblings(".invalid-feedback")
        .text("");
  });

  $password.on("change", () => {
    $password.val().length > 0 &&
      $password
        .removeClass("is-invalid")
        .siblings(".invalid-feedback")
        .text("");
  });

  $form.on("submit", (event) => {
    event.preventDefault();

    $username.val().length <= 0 &&
      $username
        .addClass("is-invalid")
        .siblings(".invalid-feedback")
        .text("Please enter your username");

    $password.val().length <= 0 &&
      $password
        .addClass("is-invalid")
        .siblings(".invalid-feedback")
        .text("Please enter your password");

    if ($username.val().length > 0 && $password.val().length > 0) {
      $.ajax({
        url: $form.attr("action"),
        type: $form.attr("method"),
        contentType: "application/json",
        data: JSON.stringify({
          username: $username.val(),
          password: $password.val(),
        }),
        success: function (response) {
          window.location.href =
            new URLSearchParams(window.location.search).get("redirect") || "/";
        },
        error: function (xhr) {
          if ($form.next(".js-error-alert").length > 0) {
            $form
              .siblings("alert")
              .find("js-error-msg")
              .text(xhr.responseJSON.message);
          } else {
            $form.after(`
              <div class="alert alert-danger mt-4 mb-0 d-flex justify-content-start align-items-center js-error-alert" role="alert">
                  <span class="material-symbols-outlined me-2">
                      error
                  </span>
                  <span class="js-error-msg">${xhr.responseJSON.message}</span>
              </div>`);
          }
        },
      });
    }
  });
});
