'use strict';

module.exports = {
    notifyWhenInStock: function () {
        
        // ... validation rules come here,

        $('form.notify-me').submit(function (e) {
            e.preventDefault();
            var formElement = $(this);
            var buttonElement = $('.submit-notify-me');
            var url = formElement.attr('action');

            $.spinner().start();
            buttonElement.attr('disabled', true);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: formElement.serialize(),
                success: function (data) {
                    displayMessage(data, buttonElement);
                    if (data.success) {
                        $('.notify-me').trigger('reset');
                    }
                },
                error: function (err) {
                    displayMessage(err, buttonElement);
                }
            });
        });
    }
};

/**
 * Display the returned message.
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} buttonElement - button that was clicked for contact us sign-up
 */
 function displayMessage(data, buttonElement) {
    $.spinner().stop();
    var status;
    if (data.success) {
        status = 'alert-success';
    } else {
        status = 'alert-danger';
    }

    if ($('.contact-us-signup-message').length === 0) {
        $('body').append(
            '<div class="contact-us-signup-message"></div>'
        );
    }
    $('.contact-us-signup-message')
        .append('<div class="contact-us-signup-alert text-center ' + status + '" role="alert">' + data.msg + '</div>');

    setTimeout(function () {
        $('.contact-us-signup-message').remove();
        buttonElement.removeAttr('disabled');
    }, 3000);
}
