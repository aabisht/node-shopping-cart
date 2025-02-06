$(document).ready(() => {
  const $firstName = $(".js-form-control-firstName");
  const $lastName = $(".js-form-control-lastName");
  const $username = $(".js-form-control-username");
  const $email = $(".js-form-control-email");
  const $password = $(".js-form-control-password");
  const $form = $(".js-register-form");

  $username.on("change", () => {
    $username.val().length > 0 &&
      $username
        .removeClass("is-invalid")
        .siblings(".invalid-feedback")
        .text("");
  });

  $email.on("change", () => {
    $email.val().length > 0 &&
      $email.removeClass("is-invalid").siblings(".invalid-feedback").text("");
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

    $email.val().length <= 0 &&
      $email
        .addClass("is-invalid")
        .siblings(".invalid-feedback")
        .text("Please enter your email");

    $password.val().length <= 0 &&
      $password
        .addClass("is-invalid")
        .siblings(".invalid-feedback")
        .text("Please enter your password");

    if (
      $username.val().length > 0 &&
      $email.val().length > 0 &&
      $password.val().length
    ) {
      $.ajax({
        url: $form.attr("action"),
        type: $form.attr("method"),
        contentType: "application/json",
        data: JSON.stringify({
          firstName: $firstName.val(),
          lastName: $lastName.val(),
          username: $username.val(),
          email: $email.val(),
          password: $password.val(),
        }),
        success: function (response) {
          $form.addClass("d-none");
          $(".js-registration-success-alert")
            .children(".js-text")
            .text(response.message)
            .parent()
            .removeClass("d-none");
        },
        error: function (xhr) {
          $form.after(`
            <div class="alert alert-danger mt-4 mb-0 d-flex justify-content-start align-items-center" role="alert">
                <span class="material-symbols-outlined me-2">
                    error
                </span>
                <span>${xhr.responseJSON.message}</span>
            </div>`);
        },
      });
    }
  });
});
