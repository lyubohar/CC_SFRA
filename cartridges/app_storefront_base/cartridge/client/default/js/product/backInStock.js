'use strict';

/**
 * Displays the returned message fron controller for success or error.
 * Disables the submit button for a duration.
 * @param {Object} data - data returned from the ajax call
 * @param {element} buttonElement - button that was clicked for signing-up
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
        $('body').append(
            '<div class="back-in-stock-message"></div>'
        );
    }
    $('.back-in-stock-message')
        .append('<div class="back-in-stock-alert ' + status + '" role="alert">' + data.msg + '</div>');

    setTimeout(function () {
        $('.back-in-stock-message').remove();
        buttonElement.removeAttr('disabled');
    }, 3000);
}

/**
 * Takes form data, validates the phone and makes an Ajax POST call to the controller with the collected data.
 * Receives back from controller the success/error states and respective messages and gives them to displayMessage function for displaying on the front-end.
 * @param {Object} data - Response from the controller
 * @param {element} buttonElement - button that was clicked for signing-up
 */

module.exports = {
    backInStock: function () {
        
        $('form.back-in-stock-form').submit(function (e) {
            e.preventDefault();
            var formElement = $(this);
            var phoneElement = $('#phone');
            var buttonElement = $('.back-in-stock-submit');
            var url = formElement.attr('action');
            var pattern = /^([359]{3})?([0-9]{9})$/;

            if (pattern.test(phoneElement.val())) {                     // Validate phone number field
                $.spinner().start();
                buttonElement.attr('disabled', true);

                $.ajax({                                                // If validated, run AJAX code
                    url: url,
                    type: 'post',
                    dataType: 'json',
                    data: formElement.serialize(),
                    success: (data) => {
                        displayMessage(data, buttonElement);
                        if (data.success) {
                            $('.back-in-stock-form').trigger('reset');
                            $('#backInStockModal').modal('hide');
                        }
                    },
                    error: (err) => {
                        displayMessage(err, buttonElement);
                    }
                });

                $('.invalid-feedback').replaceWith('<div class="invalid-feedback"></div>');
            } else {
                $(phoneElement)
                    .addClass('is-invalid')
                    .siblings('.invalid-feedback')
                    .css(display, block);
            }
        });
    }
};
