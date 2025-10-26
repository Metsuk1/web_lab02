(function () {
    'use strict';

    const daySelect = document.getElementById('day');
    if (daySelect) {
        // Generate day options from 1 to 31
        for (let day = 1; day <= 31; day++) {
            const opt = document.createElement('option');
            opt.value = day;
            opt.textContent = day;
            daySelect.appendChild(opt);
        }
    }

    const form = document.getElementById('bookingForm');
    const mainContainer = document.querySelector('.container.mt-4.mb-4');
    const footer = document.querySelector('.foot');

    // Validate basic email format
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // --- Field error helpers (unchanged behavior) ---

    // Show validation error on a field
    function showFieldError(el, message) {
        el.classList.add('is-invalid');
        const fb = el.parentElement.querySelector('.invalid-feedback');
        if (fb) {
            fb.textContent = message;
        }
    }

    // Clear validation error from a field
    function clearFieldError(el) {
        el.classList.remove('is-invalid');
        const fb = el.parentElement.querySelector('.invalid-feedback');
        if (fb) {
            fb.textContent = '';
        }
    }

    // Show a group-level error message (e.g., for radio groups)
    function showGroupError(selectorId, message) {
        const el = document.getElementById(selectorId);
        if (el) {
            el.textContent = message;
            el.classList.add('show');
        }
    }

    // Clear a group-level error message
    function clearGroupError(selectorId) {
        const el = document.getElementById(selectorId);
        if (el) {
            el.textContent = '';
            el.classList.remove('show');
        }
    }

    // --- Form validation function (unchanged behavior) ---

    // Validate the whole form and show relevant errors
    function validate() {
        let valid = true;
        if (!form) return false;

        // Clear old errors
        const invalids = form.querySelectorAll('.is-invalid');
        invalids.forEach(i => i.classList.remove('is-invalid'));
        clearGroupError('durationError');
        clearGroupError('roomError');

        const day = form.day;
        if (!day.value) {
            showFieldError(day, 'Please, select a day');
            valid = false;
        } else {
            clearFieldError(day);
        }

        const month = form.month;
        if (!month.value) {
            showFieldError(month, 'Please, select a month');
            valid = false;
        } else {
            clearFieldError(month);
        }

        const people = form.people;
        if (!people.value || Number(people.value) < 1) {
            showFieldError(people, 'Please, enter the correct number of people (minimum 1)');
            valid = false;
        } else {
            clearFieldError(people);
        }

        const name = form.client_name;
        if (!name.value.trim()) {
            showFieldError(name, 'Please, write youre name');
            valid = false;
        } else {
            clearFieldError(name);
        }

        const from = form.from;
        if (!from.value.trim()) {
            showFieldError(from, 'Please, indicate the departure city');
            valid = false;
        } else {
            clearFieldError(from);
        }

        const email = form.client_email;
        if (!email.value.trim()) {
            showFieldError(email, 'Email is required');
            valid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showFieldError(email, 'Incorrect email format');
            valid = false;
        } else {
            clearFieldError(email);
        }

        const password = form.client_password;
        const confirmPassword = form.confirm_password;
        const MIN_PASSWORD_LENGTH = 8;
        if (!password.value) {
            showFieldError(password, 'Password is required');
            valid = false;
        } else if (password.value.length < MIN_PASSWORD_LENGTH) {
            showFieldError(password, `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
            valid = false;
        } else {
            clearFieldError(password);
        }

        if (!confirmPassword.value) {
            showFieldError(confirmPassword, 'Confirm password');
            valid = false;
        } else if (password.value !== confirmPassword.value) {
            showFieldError(confirmPassword, 'Passwords dont match');
            valid = false;
        } else {
            clearFieldError(confirmPassword);
        }

        const durationChecked = form.querySelector('input[name="duration"]:checked');
        if (!durationChecked) {
            showGroupError('durationError', 'Please, select duration');
            valid = false;
        } else {
            clearGroupError('durationError');
        }

        const roomChecked = form.querySelector('input[name="room"]:checked');
        if (!roomChecked) {
            showGroupError('roomError', 'Please, select room type');
            valid = false;
        } else {
            clearGroupError('roomError');
        }

        return valid;
    }

    if (form) {
        form.addEventListener('submit', function (e) {
    e.preventDefault();
    const ok = validate();
    if (!ok) return;

    const btn = document.getElementById('submitBtn');
    const text = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.btn-spinner');

    // Show spinner effect
    spinner.style.display = "inline-block";
    text.textContent = "Please wait...";
    btn.disabled = true;

    // Simulate sending request (2 sec)
    setTimeout(() => {
        spinner.style.display = "none";
        text.textContent = "Save";
        btn.disabled = false;

        alert("Reservation successfully saved ");
    }, 2000);
});

        form.addEventListener('input', function (e) {
            const target = e.target;
            if (target && target.classList.contains('form-control')) {
                clearFieldError(target);
            }
            if (target && target.type === 'radio' && target.name === 'duration') {
                clearGroupError('durationError');
            }
            if (target && target.type === 'radio' && target.name === 'room') {
                clearGroupError('roomError');
            }
        });

        form.addEventListener('change', function (e) {
            const target = e.target;
            if (target && target.classList.contains('form-select')) {
                clearFieldError(target);
            }
        });
    }

    // Reset button behavior and focus reset
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            form.reset();
            document.querySelectorAll('input').forEach(input => {
                input.value = '';
                input.classList.remove('is-invalid');
            });
            document.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
                select.classList.remove('is-invalid');
            });
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });
            document.querySelectorAll('.invalid-feedback').forEach(fb => {
                fb.textContent = '';
            });
            clearGroupError('durationError');
            clearGroupError('roomError');

            showToast('Form is reset', 3500, 'neutral')

            // Reset focus to the first focusable element
            const firstFocusable = getFocusableElements()[0];
            if (firstFocusable) {
                focusElement(firstFocusable);
            }
        });
    }

    // --- Keyboard navigation logic (Roving Tabindex) ---

    // Initialize keyboard navigation for the page scope
    function initKeyboardNavigation() {
        if (!mainContainer) return;

        const focusableSelector = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex^="-"])'
        ].join(',');

        // Get focusable elements from main container and footer, sorted by position
        function getFocusableElements() {
            const orderBlock = document.querySelector('.order-confirmation');
            const elements = [
                ...Array.from(mainContainer.querySelectorAll(focusableSelector)),
                ...(orderBlock ? Array.from(orderBlock.querySelectorAll(focusableSelector)) : []),
                ...Array.from(footer.querySelectorAll(focusableSelector))
            ];

            return elements
                .filter(el => isVisible(el))
                .sort((a, b) => {
                    const rectA = a.getBoundingClientRect();
                    const rectB = b.getBoundingClientRect();
                    return (rectA.top - rectB.top) || (rectA.left - rectB.left);
                });
        }

        // Check if element is visible
        function isVisible(el) {
            if (!el) return false;
            const style = window.getComputedStyle(el);
            return style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                style.opacity !== '0' &&
                el.offsetWidth > 0 &&
                el.offsetHeight > 0;
        }

        // Check if element is a text-editable control
        function isTextEditable(el) {
            if (!el) return false;
            const tag = el.tagName;
            const type = el.type?.toLowerCase();
            return (tag === 'INPUT' &&
                ['text', 'email', 'search', 'password', 'tel', 'url', 'number', 'textarea'].includes(type))
                || tag === 'TEXTAREA'
                || el.isContentEditable;
        }

        // Set roving tabindex: only target has tabindex=0
        function setRovingTabindex(target) {
            const list = getFocusableElements();
            list.forEach(el => el.setAttribute('tabindex', '-1'));
            if (target) {
                target.setAttribute('tabindex', '0');
                document.body.setAttribute('data-last-focused', target.id || '');
            }
        }

        // Focus element and scroll into view
        function focusElement(el) {
            if (!el) return;
            setRovingTabindex(el);
            el.focus();
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Return index of element in list
        function indexOfElement(el, list) {
            return list.indexOf(el);
        }

        // Radio group navigation with wrapping
        function handleRadioNavigation(groupName, direction) {
            if (!groupName) return;
            const radios = Array.from(document.querySelectorAll(`input[type="radio"][name="${groupName}"]`))
                .filter(r => !r.disabled && isVisible(r))
                .sort((a, b) => {
                    const rectA = a.getBoundingClientRect();
                    const rectB = b.getBoundingClientRect();
                    return (rectA.top - rectB.top) || (rectA.left - rectB.left);
                });

            if (!radios.length) return;

            const active = document.activeElement;
            let i = radios.indexOf(active);

            if (i === -1) {
                i = radios.findIndex(r => r.checked);
                if (i === -1) i = 0;
            }

            let nextIndex = i + direction;
            if (nextIndex < 0) nextIndex = radios.length - 1;
            if (nextIndex >= radios.length) nextIndex = 0;

            radios[nextIndex].checked = true;
            radios[nextIndex].dispatchEvent(new Event('change', { bubbles: true }));
            radios[nextIndex].dispatchEvent(new Event('input', { bubbles: true }));

            focusElement(radios[nextIndex]);
        }

        // --- Main keydown handler (captures keyboard navigation) ---
        // Listen on document to cover focus outside the form as well
        document.addEventListener('keydown', function (ev) {
            // Only handle keys when focus is inside the main scope or footer (or body)
            const isInsideScope = document.activeElement && (mainContainer.contains(document.activeElement) || footer.contains(document.activeElement) || document.activeElement === document.body);
            if (!isInsideScope && ev.key !== 'Tab') return;

            const key = ev.key;

            if (ev.altKey || ev.ctrlKey || ev.metaKey) return;

            const active = document.activeElement;
            const list = getFocusableElements();

            // Handle Tab for focus wrapping between scope elements
            if (key === 'Tab') {
                ev.preventDefault();

                if (!list.length) return;

                let i = indexOfElement(active, list);
                let nextIndex;

                if (i === -1) {
                    nextIndex = ev.shiftKey ? list.length - 1 : 0;
                } else if (ev.shiftKey) {
                    nextIndex = (i === 0) ? list.length - 1 : i - 1;
                } else {
                    nextIndex = (i === list.length - 1) ? 0 : i + 1;
                }

                focusElement(list[nextIndex]);
                return;
            }

            // Do not intercept native select behavior for arrow keys and space
            if (active && active.tagName === 'SELECT' &&
                (key === 'ArrowUp' || key === 'ArrowDown' || key === ' ')) {
                return;
            }

            // If focus is in an editable text control, allow normal editing
            if (isTextEditable(active)) {
                if (key === 'Escape') {
                    active.blur();
                    ev.preventDefault();
                } else if (key === 'Enter') {
                    ev.preventDefault();
                }
                return;
            }

            // Radio keyboard handling
            if (active && active.type === 'radio') {
                if (key === 'ArrowRight' || key === 'ArrowDown') {
                    ev.preventDefault();
                    handleRadioNavigation(active.name, +1);
                    return;
                }
                if (key === 'ArrowLeft' || key === 'ArrowUp') {
                    ev.preventDefault();
                    handleRadioNavigation(active.name, -1);
                    return;
                }
                if (key === 'Enter' || key === ' ') {
                    ev.preventDefault();
                    active.checked = true;
                    active.dispatchEvent(new Event('change', { bubbles: true }));
                    return;
                }
            }

            // Arrow, Home, End, Enter, Space, Escape behavior
            switch (key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    ev.preventDefault();
                    let i = indexOfElement(active, list);
                    if (i !== -1) focusElement(list[(i + 1) % list.length]);
                    break;

                case 'ArrowLeft':
                case 'ArrowUp':
                    ev.preventDefault();
                    let j = indexOfElement(active, list);
                    if (j !== -1) focusElement(list[(j - 1 + list.length) % list.length]);
                    break;

                case 'Home':
                case 'End':
                    ev.preventDefault();
                    if (key === 'Home') focusElement(list[0]);
                    else if (key === 'End') focusElement(list[list.length - 1]);
                    break;

                case 'Enter':
                case ' ':
                    if (active) {
                        const tag = active.tagName.toLowerCase();
                        if (tag === 'button' || (tag === 'input' &&
                            (active.type === 'submit' || active.type === 'button'))) {
                            ev.preventDefault();
                            active.click();
                        } else if (tag === 'input' && active.type === 'checkbox') {
                            ev.preventDefault();
                            active.checked = !active.checked;
                            active.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }
                    break;

                case 'Escape':
                    if (active) {
                        active.blur();
                        ev.preventDefault();
                    }
                    break;
            }
        }, true);

        // Initialize tabindex values so the first element is reachable by Tab
        const initialList = getFocusableElements();
        if (initialList.length) {
            initialList.forEach((el, index) => {
                if (index === 0) {
                    el.setAttribute('tabindex', '0');
                } else {
                    el.setAttribute('tabindex', '-1');
                }
            });
        }
    }

    // Start keyboard navigation initialization
    initKeyboardNavigation();

    // Simple toast
    function showToast(message, timeoutMs, type) {
        // search or create container
        let $area = $('.toast-area');
        if ($area.length === 0) {
            $area = $('<div class="toast-area"></div>').appendTo('body');
        }

        // create tost
        const $toast = $('<div class="custom-toast"></div>')
            .text(message)
            .addClass(type);

        $area.append($toast);

        // show toast
        setTimeout(() => {
            $toast.addClass('show');
        }, 50);

        // delete after timeOut
        setTimeout(() => {
            $toast.removeClass('show');

            // wait css transition and delete
            $toast.one('transitionend', function () {
                $toast.remove();

                if ($area.children().length === 0) {
                    $area.remove();
                }
            });
        }, timeoutMs);
    }

    // Order confirmation + copy button logic

    // Format: YYYYMMDD-XXXXXX
    function generateOrderCode() {
        const now = new Date();
        // jQuery не используется для этой логики, так как это чистая работа с JS Date
        const yyyy = now.getFullYear().toString();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        // 6 random digits
        const rand = String(Math.floor(Math.random() * 900000) + 100000);
        return `${yyyy}${mm}${dd}-${rand}`;
    }

    /**
     * Copies text to clipboard uses navigator.clipboard, otherwise fallback
     * Changes icon/shows tooltip on the button, then resets
     */
    function copyTextToClipboard(text, btnElement) {
        const $btn = $(btnElement);

        // Resets the 'copied' state of a button, clears timer, reverts icon
        function resetCopiedUI($btn) {
            if (!$btn || !$btn.hasClass('copied')) {
                return;
            }

            clearTimeout($btn.data('_copyTimeout'));

            const $icon = $btn.find('.icon');
            const $tip = $btn.find('.copied-tooltip');

            const origIcon = $icon.data('orig') || '📋';

            $icon.text(origIcon);
            $tip.attr('aria-hidden', 'true');
            $btn.removeClass('copied');
        }

        // Shows the "Copied!" UI state on the button
        function showCopiedUI($btn) {
            if (!$btn.length) return;
            const $icon = $btn.find('.icon');
            const $tip = $btn.find('.copied-tooltip');

            if (!$icon.data('orig')) {
                $icon.data('orig', $icon.text() || '📋');
            }

            const resetTimer = () => {
                clearTimeout($btn.data('_copyTimeout'));
                const timeout = setTimeout(() => {
                    resetCopiedUI($btn);
                }, 1800);
                $btn.data('_copyTimeout', timeout);
            };

            // if already copied
            if ($btn.hasClass('copied')) {
                $tip.attr('aria-hidden', 'false');
                resetTimer();
                return;
            }

            $btn.addClass('copied');
            $icon.text('✅');
            $tip.attr('aria-hidden', 'false');

            resetTimer();
        }

        function fallbackCopy() {
            try {
                // create textarea
                const $ta = $('<textarea>')
                    .val(text)
                    .css({ position: 'absolute', left: '-9999px' })
                    .appendTo('body');

                $ta.trigger('select');
                document.execCommand('copy');
                $ta.remove();

                showCopiedUI($btn);
            } catch (err) {
                console.warn('Copy failed', err);
                // last resort: show toast
                if (typeof showToast === 'function') {
                    showToast('Could not copy to clipboard', 3000, 'error');
                }
            }
        }

        // Use Clipboard API when available
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                showCopiedUI($btn);
            }, function (err) {
                fallbackCopy();
            });
        } else {
            fallbackCopy();
        }
    }

    // Creates/updates the order confirmation block and scrolls to it
    function renderOrderConfirmation(orderCode, humanMessage) {
        // remove old block
        $('.order-confirmation').remove();

        // search footer
        const $footer = $('footer.foot, footer').first();
        const $target = $footer.length ? $footer : $('body');

        // creating block
        const blockHTML = `
        <div class="order-confirmation">
            <div class="order-info">
                <div class="order-title">${humanMessage}</div>
                <div>
                    <span class="order-code" id="latest-order-code">${orderCode}</span>
                </div>
            </div>
            <div class="order-actions">
                <button class="copy-order-btn" type="button" aria-label="Copy order code" data-code="${orderCode}">
                    <span class="icon">📋</span>
                    <span class="copied-tooltip" aria-hidden="true">Copied!</span>
                </button>
            </div>
        </div>
        `;

        const $block = $(blockHTML);

        if ($footer.length) {
            // before footer
            $block.insertBefore($footer);
        } else {
            $block.appendTo($target);
        }

        // scroll to block
        $('html, body').animate({
            scrollTop: $block.offset().top - ($(window).height() / 2) + ($block.height() / 2)
        }, 500); // 500ms duration

        // focus to button
        const $copyBtn = $block.find('.copy-order-btn');

        if ($copyBtn.length) {
            $copyBtn.focus();

            $copyBtn.on('click', function () {
                const $self = $(this);
                const code = $self.data('code') || $('#latest-order-code').text();

                if (!code) return;

                copyTextToClipboard(code, this);
            });
        }

        return $block;
    }

})();
