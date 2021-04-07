/**
 * Setup Hubspot chat
 */
window.hsConversationsSettings = {
    loadImmediately: false, // Delay the load of the chat widget
    inlineEmbedSelector: '#chat-window',
};

/**
 * Submit Google Analytics event
 */
window.trackLink = function(name, category) {
    gtag('event', 'click', {
        'event_category': category,
        'event_label': name
    });
}

$(function() {
    var _feedbackCsrf;

    function submitFeedback(email, text) {
        $.post({
            url: '/api/1/feedback',
            data: JSON.stringify({
                Email: email,
                Text: text
            }),
            headers: {
                'X-CSRF-Token': _feedbackCsrf
            },
            contentType: 'application/json',
            success: function () {
                $('.js-feedback-thanks').removeClass('hidden');
                $('.js-feedback-email').val('');
                $('.js-feedback-text').val('');
            },
            error: function () {
                $('.js-feedback-error').removeClass('hidden');
            }
        });
    }

    function getFeedbackCSRF() {
        $.get('/api/1/feedback/csrf', function (csrf) {
            _feedbackCsrf = csrf
        });
    }

    $('.js-submit-feedback-btn').on('click', function () {
        $('.js-feedback-error').addClass('hidden');
        $('.js-feedback-thanks').addClass('hidden');

        var emailEl = $('.js-feedback-email');
        var email = emailEl.val();
        var textEl = $('.js-feedback-text');
        var text = textEl.val();

        if (emailEl.is(':valid') && textEl.is(':valid') && text) {
            submitFeedback(email, text);
        }
    });

    getFeedbackCSRF();

    $('.js-mobile-menu-button').on('click', function () {
        $('.mobile-menu').fadeIn();
    });

    $('.js-mobile-menu-close').on('click', function () {
        $('.mobile-menu').fadeOut();
    });

    $('#chat-window').hide();
    $('.js-chat').on('click', function() {
        if (!window.HubSpotConversations.widget.status().loaded) {
            window.HubSpotConversations.widget.load();
        }
        $('#chat-window').toggle();
    });
});
