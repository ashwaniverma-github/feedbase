(function () {
    'use strict';

    // Configuration
    var config = window.feedbaseConfig || {};
    if (!config.projectKey) {
        console.error('Feedbase: Missing projectKey in configuration');
        return;
    }

    // Detect API URL from script source
    var scripts = document.getElementsByTagName('script');
    var API_URL = '';
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src && scripts[i].src.indexOf('widget.js') !== -1) {
            API_URL = scripts[i].src.replace('/widget.js', '');
            break;
        }
    }
    if (!API_URL) {
        API_URL = window.location.origin;
    }

    var POSITION = config.position || 'bottom-right';
    var PRIMARY_COLOR = config.primaryColor || '#171717';

    // Styles
    var posRight = POSITION.indexOf('right') !== -1;
    var posBottom = POSITION.indexOf('bottom') !== -1;

    var styles = '.feedbase-trigger{position:fixed;' + (posRight ? 'right:20px;' : 'left:20px;') + (posBottom ? 'bottom:20px;' : 'top:20px;') + 'width:56px;height:56px;border-radius:50%;background:' + PRIMARY_COLOR + ';border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:transform 0.2s,box-shadow 0.2s;z-index:999998}.feedbase-trigger:hover{transform:scale(1.05);box-shadow:0 6px 16px rgba(0,0,0,0.2)}.feedbase-trigger svg{width:24px;height:24px;stroke:white;fill:none}.feedbase-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999999;opacity:0;visibility:hidden;transition:opacity 0.2s,visibility 0.2s}.feedbase-overlay.open{opacity:1;visibility:visible}.feedbase-modal{position:fixed;' + (posRight ? 'right:20px;' : 'left:20px;') + (posBottom ? 'bottom:90px;' : 'top:90px;') + 'width:360px;max-width:calc(100vw - 40px);background:white;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.2);transform:translateY(10px);opacity:0;visibility:hidden;transition:transform 0.2s,opacity 0.2s,visibility 0.2s;z-index:1000000;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.feedbase-modal.open{transform:translateY(0);opacity:1;visibility:visible}.feedbase-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e5e5e5}.feedbase-title{font-size:16px;font-weight:600;color:#171717;margin:0}.feedbase-close{background:none;border:none;cursor:pointer;padding:4px;color:#737373;display:flex;align-items:center;justify-content:center;border-radius:4px}.feedbase-close:hover{background:#f5f5f5;color:#171717}.feedbase-body{padding:20px}.feedbase-form{display:flex;flex-direction:column;gap:16px}.feedbase-field{display:flex;flex-direction:column;gap:6px}.feedbase-label{font-size:14px;font-weight:500;color:#171717}.feedbase-textarea{width:100%;min-height:100px;padding:10px 12px;border:1px solid #e5e5e5;border-radius:8px;font-size:14px;font-family:inherit;resize:vertical;box-sizing:border-box}.feedbase-textarea:focus{outline:none;border-color:' + PRIMARY_COLOR + '}.feedbase-select,.feedbase-input{width:100%;padding:10px 12px;border:1px solid #e5e5e5;border-radius:8px;font-size:14px;font-family:inherit;background:white;box-sizing:border-box}.feedbase-select:focus,.feedbase-input:focus{outline:none;border-color:' + PRIMARY_COLOR + '}.feedbase-submit{width:100%;padding:12px;background:' + PRIMARY_COLOR + ';color:white;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;transition:opacity 0.2s}.feedbase-submit:hover{opacity:0.9}.feedbase-submit:disabled{opacity:0.5;cursor:not-allowed}.feedbase-footer{padding:12px 20px;border-top:1px solid #e5e5e5;text-align:center}.feedbase-footer a{font-size:12px;color:#737373;text-decoration:none}.feedbase-footer a:hover{color:#171717}.feedbase-success{text-align:center;padding:40px 20px}.feedbase-success-icon{width:48px;height:48px;background:#22c55e;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px}.feedbase-success-icon svg{width:24px;height:24px;stroke:white;fill:none}.feedbase-success-title{font-size:18px;font-weight:600;color:#171717;margin:0 0 8px}.feedbase-success-text{font-size:14px;color:#737373;margin:0}@media(prefers-color-scheme:dark){.feedbase-modal{background:#171717}.feedbase-header{border-color:#333}.feedbase-title{color:#fafafa}.feedbase-close{color:#a3a3a3}.feedbase-close:hover{background:#262626;color:#fafafa}.feedbase-label{color:#fafafa}.feedbase-textarea,.feedbase-select,.feedbase-input{background:#262626;border-color:#404040;color:#fafafa}.feedbase-footer{border-color:#333}.feedbase-success-title{color:#fafafa}}';

    // Inject styles
    var styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    // Create widget container
    var container = document.createElement('div');
    container.id = 'feedbase-widget';
    container.innerHTML = '<button class="feedbase-trigger" aria-label="Send feedback"><svg viewBox="0 0 24 24" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button><div class="feedbase-overlay"></div><div class="feedbase-modal" role="dialog" aria-modal="true"><div class="feedbase-header"><h2 class="feedbase-title">Send Feedback</h2><button class="feedbase-close" aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg></button></div><div class="feedbase-body"><form class="feedbase-form" id="feedbase-form"><div class="feedbase-field"><label class="feedbase-label" for="feedbase-message">What\'s on your mind?</label><textarea class="feedbase-textarea" id="feedbase-message" placeholder="Share your feedback..." required></textarea></div><div class="feedbase-field"><label class="feedbase-label" for="feedbase-category">Category</label><select class="feedbase-select" id="feedbase-category"><option value="general">General</option><option value="bug">Bug Report</option><option value="feature">Feature Request</option><option value="question">Question</option></select></div><div class="feedbase-field"><label class="feedbase-label" for="feedbase-email">Email (optional)</label><input type="email" class="feedbase-input" id="feedbase-email" placeholder="your@email.com"></div><button type="submit" class="feedbase-submit">Send Feedback</button></form></div><div class="feedbase-footer"><a href="https://feedbase.app" target="_blank" rel="noopener">Powered by Feedbase</a></div></div>';
    document.body.appendChild(container);

    // Elements
    var trigger = container.querySelector('.feedbase-trigger');
    var overlay = container.querySelector('.feedbase-overlay');
    var modal = container.querySelector('.feedbase-modal');
    var closeBtn = container.querySelector('.feedbase-close');
    var form = container.querySelector('#feedbase-form');
    var body = container.querySelector('.feedbase-body');

    var isOpen = false;

    function toggleModal(open) {
        isOpen = open;
        overlay.classList.toggle('open', open);
        modal.classList.toggle('open', open);
        if (open) {
            container.querySelector('#feedbase-message').focus();
        }
    }

    trigger.addEventListener('click', function () { toggleModal(!isOpen); });
    overlay.addEventListener('click', function () { toggleModal(false); });
    closeBtn.addEventListener('click', function () { toggleModal(false); });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) {
            toggleModal(false);
        }
    });

    function showSuccess() {
        body.innerHTML = '<div class="feedbase-success"><div class="feedbase-success-icon"><svg viewBox="0 0 24 24" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg></div><h3 class="feedbase-success-title">Thank you!</h3><p class="feedbase-success-text">Your feedback has been submitted.</p></div>';
    }

    function resetForm() {
        body.innerHTML = '<form class="feedbase-form" id="feedbase-form"><div class="feedbase-field"><label class="feedbase-label" for="feedbase-message">What\'s on your mind?</label><textarea class="feedbase-textarea" id="feedbase-message" placeholder="Share your feedback..." required></textarea></div><div class="feedbase-field"><label class="feedbase-label" for="feedbase-category">Category</label><select class="feedbase-select" id="feedbase-category"><option value="general">General</option><option value="bug">Bug Report</option><option value="feature">Feature Request</option><option value="question">Question</option></select></div><div class="feedbase-field"><label class="feedbase-label" for="feedbase-email">Email (optional)</label><input type="email" class="feedbase-input" id="feedbase-email" placeholder="your@email.com"></div><button type="submit" class="feedbase-submit">Send Feedback</button></form>';
        attachFormListener();
    }

    function attachFormListener() {
        var currentForm = container.querySelector('#feedbase-form');
        if (currentForm) {
            currentForm.addEventListener('submit', handleSubmit);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        var submitBtn = container.querySelector('.feedbase-submit');
        var originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        var message = document.getElementById('feedbase-message').value;
        var category = document.getElementById('feedbase-category').value;
        var email = document.getElementById('feedbase-email').value;

        fetch(API_URL + '/api/widget/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                projectKey: config.projectKey,
                message: message,
                category: category,
                userEmail: email || undefined,
                pageUrl: window.location.href
            })
        })
            .then(function (response) {
                if (!response.ok) throw new Error('Failed to submit');
                showSuccess();
                setTimeout(function () {
                    toggleModal(false);
                    setTimeout(resetForm, 300);
                }, 2000);
            })
            .catch(function (error) {
                console.error('Feedbase: Failed to submit feedback', error);
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                alert('Failed to submit feedback. Please try again.');
            });
    }

    attachFormListener();
})();
