'use strict';

/**
 * Display the returned message.
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} buttonElement - button that was clicked for sign-up
 */
 function displayMessage(data, buttonElement) {
    $.spinner().stop();
    var status;
    if (data.success) {
        status = 'alert-success';
    } else {
        status = 'alert-danger';
    }

    if ($('.back-in-stock-message').length === 0) {
        $('.modal .modal-content').append(
            '<div class="back-in-stock-message"></div>'
        );
    }
    $('.back-in-stock-message')
        .append('<div class="back-in-stock-alert text-center ' + status + '" role="alert">' + data.msg + '</div>');

    setTimeout(function () {
        $('.back-in-stock-message').remove();
        buttonElement.removeAttr('disabled');
    }, 3000);
}

/**
 * Ajax call with form data.
 */

module.exports = {
    notifyWhenInStock: function () {
        
        // ... validation rules come here,

        $('form.back-in-stock-form').submit(function (e) {
            e.preventDefault();
            var formElement = $(this);
            var buttonElement = $('.back-in-stock-submit');
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
                        $('.back-in-stock-form').trigger('reset');
                    }
                },
                error: function (err) {
                    displayMessage(err, buttonElement);
                }
            });
        });
    }
};
