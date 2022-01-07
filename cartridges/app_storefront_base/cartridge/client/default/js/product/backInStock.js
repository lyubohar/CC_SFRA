'use strict';

/**
 * Display the returned message.
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} buttonElement - button that was clicked for signing-up
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
 * Does Ajax call to take URL from form element, collect data as JSON and pass to controller.
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
                    success: function (data) {
                        displayMessage(data, buttonElement);
                        if (data.success) {
                            $('.back-in-stock-form').trigger('reset');  
                            $('#backInStockModal').modal('hide');                    
                        }
                    },
                    error: function (err) {
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
