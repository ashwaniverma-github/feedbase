(function () {
    'use strict';

    if (window.feedinbox) return; // Prevent duplicate injection

    function init(config) {
        if (!config || !config.projectKey) {
            console.error('Feedinbox: Missing projectKey in configuration');
            return;
        }

        // Prevent duplicate widget
        if (document.getElementById('feedinbox-widget')) return;

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
        var hideBranding = false; // Will be updated if project owner is Pro

        // Fetch project info to check if branding should be hidden
        fetch(API_URL + '/api/widget/project?key=' + encodeURIComponent(config.projectKey))
            .then(function (response) { return response.json(); })
            .then(function (data) {
                if (data.hideBranding) {
                    hideBranding = true;
                    // Hide branding footer if already rendered
                    var footer = document.querySelector('.feedinbox-footer');
                    if (footer) {
                        footer.style.display = 'none';
                    }
                }
            })
            .catch(function (error) {
                console.warn('Feedinbox: Could not fetch project info', error);
            });

        // Styles
        var posRight = POSITION.indexOf('right') !== -1;
        var posBottom = POSITION.indexOf('bottom') !== -1;

        var styles = '.feedinbox-trigger{position:fixed;' + (posRight ? 'right:20px;' : 'left:20px;') + (posBottom ? 'bottom:20px;' : 'top:20px;') + 'width:48px;height:48px;border-radius:50%;background:' + PRIMARY_COLOR + ';border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(0,0,0,0.12);transition:transform 0.2s,box-shadow 0.2s;z-index:999998}.feedinbox-trigger:hover{transform:scale(1.05);box-shadow:0 6px 16px rgba(0,0,0,0.2)}.feedinbox-trigger svg{width:20px;height:20px;stroke:white;fill:none}.feedinbox-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:999999;opacity:0;visibility:hidden;transition:opacity 0.2s,visibility 0.2s}.feedinbox-overlay.open{opacity:1;visibility:visible}.feedinbox-modal{position:fixed;' + (posRight ? 'right:20px;' : 'left:20px;') + (posBottom ? 'bottom:90px;' : 'top:90px;') + 'width:360px;max-width:calc(100vw - 40px);background:white;border-radius:16px;box-shadow:0 12px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08);transform:translateY(10px);opacity:0;visibility:hidden;transition:transform 0.2s,opacity 0.2s,visibility 0.2s;z-index:1000000;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.feedinbox-modal.open{transform:translateY(0);opacity:1;visibility:visible}.feedinbox-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e5e5e5}.feedinbox-title{font-size:16px;font-weight:600;color:#171717;margin:0}.feedinbox-close{background:none;border:none;cursor:pointer;padding:4px;color:#737373;display:flex;align-items:center;justify-content:center;border-radius:4px}.feedinbox-close:hover{background:#f5f5f5;color:#171717}.feedinbox-body{padding:20px}.feedinbox-form{display:flex;flex-direction:column;gap:16px}.feedinbox-field{display:flex;flex-direction:column;gap:6px}.feedinbox-label{font-size:14px;font-weight:500;color:#171717}.feedinbox-textarea{width:100%;min-height:100px;padding:10px 12px;border:1px solid #e2e8f0;border-radius:10px;font-size:14px;font-family:inherit;resize:vertical;box-sizing:border-box;box-shadow:0 1px 2px rgba(0,0,0,0.05)}.feedinbox-textarea:focus{outline:none;border-color:' + PRIMARY_COLOR + '}.feedinbox-select,.feedinbox-input{width:100%;padding:10px 12px;border:1px solid #e2e8f0;border-radius:10px;font-size:14px;font-family:inherit;background:white;box-sizing:border-box;box-shadow:0 1px 2px rgba(0,0,0,0.05)}.feedinbox-select:focus,.feedinbox-input:focus{outline:none;border-color:' + PRIMARY_COLOR + '}.feedinbox-submit{width:100%;padding:12px;background:' + PRIMARY_COLOR + ';color:white;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;transition:opacity 0.2s}.feedinbox-submit:hover{opacity:0.9}.feedinbox-submit:disabled{opacity:0.5;cursor:not-allowed}.feedinbox-footer{padding:12px 20px;border-top:1px solid #e5e5e5;text-align:center}.feedinbox-footer a{font-size:12px;color:#737373;text-decoration:none}.feedinbox-footer a:hover{color:#171717}.feedinbox-success{text-align:center;padding:40px 20px}.feedinbox-success-icon{width:48px;height:48px;background:#22c55e;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px}.feedinbox-success-icon svg{width:24px;height:24px;stroke:white;fill:none}.feedinbox-success-title{font-size:18px;font-weight:600;color:#171717;margin:0 0 8px}.feedinbox-success-text{font-size:14px;color:#737373;margin:0}@media(prefers-color-scheme:dark){.feedinbox-modal{background:#171717}.feedinbox-header{border-color:#333}.feedinbox-title{color:#fafafa}.feedinbox-close{color:#a3a3a3}.feedinbox-close:hover{background:#262626;color:#fafafa}.feedinbox-label{color:#fafafa}.feedinbox-textarea,.feedinbox-select,.feedinbox-input{background:#262626;border-color:#404040;color:#fafafa}.feedinbox-footer{border-color:#333}.feedinbox-success-title{color:#fafafa}.feedinbox-footer a:hover{color:#fafafa}}';

        // Inject styles
        var styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);

        // Create widget container
        var container = document.createElement('div');
        container.id = 'feedinbox-widget';
        container.innerHTML = '<button class="feedinbox-trigger" aria-label="Send feedback"><svg viewBox="0 0 24 24" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></button><div class="feedinbox-overlay"></div><div class="feedinbox-modal" role="dialog" aria-modal="true"><div class="feedinbox-header"><h2 class="feedinbox-title">Send Feedback</h2><button class="feedinbox-close" aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"></path></svg></button></div><div class="feedinbox-body"><form class="feedinbox-form" id="feedinbox-form"><div class="feedinbox-field"><label class="feedinbox-label" for="feedinbox-message">What\'s on your mind?</label><textarea class="feedinbox-textarea" id="feedinbox-message" placeholder="Share your feedback..." required></textarea></div><div class="feedinbox-field"><label class="feedinbox-label" for="feedinbox-category">Category</label><select class="feedinbox-select" id="feedinbox-category"><option value="general">General</option><option value="bug">Bug Report</option><option value="feature">Feature Request</option><option value="question">Question</option></select></div><div class="feedinbox-field"><label class="feedinbox-label" for="feedinbox-email">Email (optional)</label><input type="email" class="feedinbox-input" id="feedinbox-email" placeholder="your@email.com"></div><button type="submit" class="feedinbox-submit">Send Feedback</button></form></div><div class="feedinbox-footer"><a href="https://feedinbox.com" target="_blank" rel="noopener">Powered by Feedinbox</a></div></div>';
        document.body.appendChild(container);

        // Elements
        var trigger = container.querySelector('.feedinbox-trigger');
        var overlay = container.querySelector('.feedinbox-overlay');
        var modal = container.querySelector('.feedinbox-modal');
        var closeBtn = container.querySelector('.feedinbox-close');
        var form = container.querySelector('#feedinbox-form');
        var body = container.querySelector('.feedinbox-body');
        var footer = container.querySelector('.feedinbox-footer');

        var isOpen = false;

        function toggleModal(open) {
            isOpen = open;
            overlay.classList.toggle('open', open);
            modal.classList.toggle('open', open);
            if (open) {
                container.querySelector('#feedinbox-message').focus();
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
            body.innerHTML = '<div class="feedinbox-success"><div class="feedinbox-success-icon"><svg viewBox="0 0 24 24" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg></div><h3 class="feedinbox-success-title">Thank you!</h3><p class="feedinbox-success-text">Your feedback has been submitted.</p></div>';
        }

        function resetForm() {
            body.innerHTML = '<form class="feedinbox-form" id="feedinbox-form"><div class="feedinbox-field"><label class="feedinbox-label" for="feedinbox-message">What\'s on your mind?</label><textarea class="feedinbox-textarea" id="feedinbox-message" placeholder="Share your feedback..." required></textarea></div><div class="feedinbox-field"><label class="feedinbox-label" for="feedinbox-category">Category</label><select class="feedinbox-select" id="feedinbox-category"><option value="general">General</option><option value="bug">Bug Report</option><option value="feature">Feature Request</option><option value="question">Question</option></select></div><div class="feedinbox-field"><label class="feedinbox-label" for="feedinbox-email">Email (optional)</label><input type="email" class="feedinbox-input" id="feedinbox-email" placeholder="your@email.com"></div><button type="submit" class="feedinbox-submit">Send Feedback</button></form>';
            attachFormListener();
        }

        function attachFormListener() {
            var currentForm = container.querySelector('#feedinbox-form');
            if (currentForm) {
                currentForm.addEventListener('submit', handleSubmit);
            }
        }

        function handleSubmit(e) {
            e.preventDefault();
            var submitBtn = container.querySelector('.feedinbox-submit');
            var originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            var message = document.getElementById('feedinbox-message').value;
            var category = document.getElementById('feedinbox-category').value;
            var email = document.getElementById('feedinbox-email').value;

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
                    console.error('Feedinbox: Failed to submit feedback', error);
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    alert('Failed to submit feedback. Please try again.');
                });
        }

        attachFormListener();
    }

    // Expose init function
    window.feedinbox = { init: init };

    // Auto-init for existing config
    var autoConfig = window.feedinboxConfig;
    if (autoConfig) {
        init(autoConfig);
    }
})();
