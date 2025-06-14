/**
 * Enhanced Keyboard Shortcuts Module for Moodle - Phase 4 UX
 * 
 * This enhanced version includes improved user experience features.
 * 
 * @module     local_moodle_plugin_keybord_shortcut_command/keyboard_shortcuts_enhanced
 * @copyright  2025 Your Name
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/log', 'core/str', 'core/notification'], function($, Log, Str, Notification) {
    'use strict';

    /**
     * Enhanced Keyboard Shortcuts class with UX improvements
     */
    var KeyboardShortcuts = function() {
        this.isEnabled = true;
        this.isHelpVisible = false;
        this.showVisualFeedback = true;
        this.shortcuts = {
            // Navigation shortcuts
            'KeyH': { action: 'goHome', alt: true, description: 'Go to Home', icon: '🏠' },
            'KeyD': { action: 'goDashboard', alt: true, description: 'Go to Dashboard', icon: '📊' },
            'KeyC': { action: 'goCourses', alt: true, description: 'Go to Courses', icon: '📚' },
            'KeyP': { action: 'goProfile', alt: true, description: 'Go to Profile', icon: '👤' },
            'KeyS': { action: 'openSearch', alt: true, description: 'Open Search', icon: '🔍' },
            
            // Admin and Settings shortcuts
            'KeyA': { action: 'goAdmin', alt: true, description: 'Site Administration', icon: '⚙️' },
            'KeyG': { action: 'goGrades', alt: true, description: 'Go to Grades', icon: '📈' },
            'KeyN': { action: 'goNotifications', alt: true, description: 'View Notifications', icon: '🔔' },
            'KeyM': { action: 'goMessages', alt: true, description: 'View Messages', icon: '💬' },
            'KeyF': { action: 'goFiles', alt: true, description: 'My Files', icon: '📁' },
            
            // Calendar and Activity shortcuts
            'KeyT': { action: 'goCalendar', alt: true, description: 'View Calendar', icon: '📅' },
            'KeyB': { action: 'goBookmarks', alt: true, description: 'Bookmarks/Badges', icon: '⭐' },
            'KeyR': { action: 'goReports', alt: true, description: 'View Reports', icon: '📊' },
            
            // Navigation aids
            'Escape': { action: 'goBack', description: 'Go Back (Browser)', icon: '⬅️' },
            'KeyU': { action: 'scrollToTop', alt: true, description: 'Scroll to Top', icon: '⬆️' },
            'KeyJ': { action: 'scrollDown', alt: true, description: 'Scroll Down', icon: '⬇️' },
            'KeyK': { action: 'scrollUp', alt: true, description: 'Scroll Up', icon: '⬆️' },
            
            // System shortcuts
            'KeyL': { action: 'logout', alt: true, description: 'Logout', icon: '🚪' },
            'KeyE': { action: 'toggleEditMode', alt: true, description: 'Toggle Edit Mode', icon: '✏️' },
            'KeyQ': { action: 'quickEnroll', alt: true, description: 'Quick Enroll', icon: '➕' },
            
            // Help and documentation
            'Slash': { action: 'showHelp', alt: true, shift: true, description: 'Show Help', icon: '❓' },
            'KeyI': { action: 'showInfo', alt: true, description: 'Page Info', icon: 'ℹ️' },
            
            // Accessibility shortcuts
            'KeyZ': { action: 'toggleHighContrast', alt: true, description: 'Toggle High Contrast', icon: '🎨' },
            'KeyX': { action: 'increaseFontSize', alt: true, description: 'Increase Font Size', icon: '🔍' },
            'KeyV': { action: 'decreaseFontSize', alt: true, description: 'Decrease Font Size', icon: '🔍' }
        };
        this.urlMappings = {
            'goHome': '',
            'goDashboard': '/my',
            'goCourses': '/course',
            'goProfile': '/user/profile.php',
            'openSearch': '/course/search.php',
            'goAdmin': '/admin/search.php',
            'goGrades': '/grade/report/overview/index.php',
            'goNotifications': '/message/output/popup/notifications.php',
            'goMessages': '/message/index.php',
            'goFiles': '/user/files.php',
            'goCalendar': '/calendar/view.php',
            'goBookmarks': '/badges/mybadges.php',
            'goReports': '/report/index.php',
            'logout': '/login/logout.php?sesskey='
        };
        this.init();
    };

    /**
     * Initialize with enhanced features
     */
    KeyboardShortcuts.prototype.init = function() {
        var self = this;
        Log.debug('Enhanced Keyboard Shortcuts: Initializing...');

        // Bind keyboard events with improved handling
        $(document).on('keydown', function(e) {
            self.handleKeydown(e);
        });

        // Enhanced escape key handling
        $(document).on('keyup', function(e) {
            if (e.key === 'Escape') {
                if (self.isHelpVisible) {
                    self.hideHelp();
                }
                self.hideAllFeedback();
            }
        });

        // Add enhanced styles
        this.addEnhancedStyles();
        
        // Show initialization notification
        this.showToast('Keyboard shortcuts activated! Press Alt+? for help', 'info', 3000);

        Log.debug('Enhanced Keyboard Shortcuts: Initialized successfully');
    };

    /**
     * Enhanced keydown handler with better UX
     */
    KeyboardShortcuts.prototype.handleKeydown = function(e) {
        if (!this.isEnabled) return;

        // Enhanced form field detection
        if (this.isTypingInField(e.target)) {
            return;
        }

        var shortcut = this.shortcuts[e.code];
        if (shortcut && this.matchesModifiers(e, shortcut)) {
            e.preventDefault();
            e.stopPropagation();
            
            // Show immediate visual feedback
            this.showShortcutActivation(shortcut);
            
            // Execute action with delay for UX
            setTimeout(() => {
                this.executeAction(shortcut.action);
            }, 200);
        }
    };

    /**
     * Enhanced form field detection
     */
    KeyboardShortcuts.prototype.isTypingInField = function(target) {
        var tagName = target.tagName.toLowerCase();
        var inputTypes = ['input', 'textarea', 'select'];
        var contentEditable = target.contentEditable === 'true';
        var role = target.getAttribute('role');
        
        // Additional checks for Moodle-specific elements
        var hasEditableRole = role && (role.includes('textbox') || role.includes('input'));
        var isInEditor = $(target).closest('.editor_atto, .editor_tinymce, .editor_textarea').length > 0;
        
        return inputTypes.includes(tagName) || contentEditable || hasEditableRole || isInEditor;
    };

    /**
     * Enhanced shortcut activation feedback
     */
    KeyboardShortcuts.prototype.showShortcutActivation = function(shortcut) {
        if (!this.showVisualFeedback) return;
        
        // Create enhanced activation indicator
        var indicator = $('<div class="keyboard-shortcut-activation">')
            .html(`
                <div class="activation-content">
                    <span class="activation-icon">${shortcut.icon}</span>
                    <span class="activation-text">${shortcut.description}</span>
                </div>
            `)
            .appendTo('body');
        
        // Animate in
        indicator.addClass('show');
        
        // Remove after animation
        setTimeout(() => {
            indicator.removeClass('show');
            setTimeout(() => {
                indicator.remove();
            }, 300);
        }, 1000);
    };

    /**
     * Enhanced action execution with better error handling
     */
    KeyboardShortcuts.prototype.executeAction = function(action) {
        Log.debug('Enhanced Keyboard Shortcuts: Executing action - ' + action);
        
        try {
            switch (action) {
                // Navigation shortcuts
                case 'goHome':
                case 'goDashboard':
                case 'goCourses':
                case 'goProfile':
                case 'openSearch':
                case 'goAdmin':
                case 'goGrades':
                case 'goNotifications':
                case 'goMessages':
                case 'goFiles':
                case 'goCalendar':
                case 'goBookmarks':
                case 'goReports':
                    this.navigateToPage(action);
                    break;
                    
                // System actions
                case 'logout':
                    this.confirmLogout();
                    break;
                case 'showHelp':
                    this.toggleHelp();
                    break;
                case 'showInfo':
                    this.showPageInfo();
                    break;
                    
                // Scrolling actions
                case 'scrollToTop':
                    this.scrollToTop();
                    break;
                case 'scrollDown':
                    this.smoothScroll(300);
                    break;
                case 'scrollUp':
                    this.smoothScroll(-300);
                    break;
                    
                // Browser navigation
                case 'goBack':
                    this.goBack();
                    break;
                    
                // Accessibility actions
                case 'toggleHighContrast':
                    this.toggleHighContrast();
                    break;
                case 'increaseFontSize':
                    this.adjustFontSize(1.1);
                    break;
                case 'decreaseFontSize':
                    this.adjustFontSize(0.9);
                    break;
                    
                // Edit mode and course actions
                case 'toggleEditMode':
                    this.toggleEditMode();
                    break;
                case 'quickEnroll':
                    this.showQuickEnroll();
                    break;
                    
                default:
                    Log.warn('Enhanced Keyboard Shortcuts: Unknown action - ' + action);
                    this.showToast('Unknown shortcut action', 'error');
            }
        } catch (error) {
            Log.error('Enhanced Keyboard Shortcuts: Error executing action - ' + action, error);
            this.showToast('Error executing shortcut', 'error');
        }
    };

    /**
     * Scroll to top of page with smooth animation
     */
    KeyboardShortcuts.prototype.scrollToTop = function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
        this.showToast('Scrolled to top', 'info', 1000);
    };

    /**
     * Smooth scroll functionality
     */
    KeyboardShortcuts.prototype.smoothScroll = function(distance) {
        var currentScroll = $(window).scrollTop();
        var newPosition = Math.max(0, currentScroll + distance);
        $('html, body').animate({ scrollTop: newPosition }, 300);
        
        var direction = distance > 0 ? 'down' : 'up';
        this.showToast(`Scrolled ${direction}`, 'info', 800);
    };

    /**
     * Go back in browser history
     */
    KeyboardShortcuts.prototype.goBack = function() {
        if (window.history.length > 1) {
            this.showToast('Going back...', 'info', 1000);
            setTimeout(function() {
                window.history.back();
            }, 200);
        } else {
            this.showToast('No previous page in history', 'warning');
        }
    };

    /**
     * Show page information modal
     */
    KeyboardShortcuts.prototype.showPageInfo = function() {
        var pageTitle = document.title || 'Unknown Page';
        var pageUrl = window.location.href;
        var userAgent = navigator.userAgent;
        var lastModified = document.lastModified || 'Unknown';
        
        var infoContent = `
            <div class="page-info-modal">
                <h3>📄 Page Information</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <strong>Title:</strong> ${pageTitle}
                    </div>
                    <div class="info-item">
                        <strong>URL:</strong> <small>${pageUrl}</small>
                    </div>
                    <div class="info-item">
                        <strong>Last Modified:</strong> ${lastModified}
                    </div>
                    <div class="info-item">
                        <strong>User Agent:</strong> <small>${userAgent}</small>
                    </div>
                </div>
            </div>
        `;
        
        var modal = this.createInfoModal('Page Information', infoContent);
        $('body').append(modal);
        modal.fadeIn(300);
    };

    /**
     * Toggle high contrast mode
     */
    KeyboardShortcuts.prototype.toggleHighContrast = function() {
        var body = $('body');
        var isHighContrast = body.hasClass('keyboard-shortcuts-high-contrast');
        
        if (isHighContrast) {
            body.removeClass('keyboard-shortcuts-high-contrast');
            this.showToast('High contrast disabled', 'info');
        } else {
            body.addClass('keyboard-shortcuts-high-contrast');
            this.showToast('High contrast enabled', 'success');
        }
        
        // Store preference
        localStorage.setItem('keyboard-shortcuts-high-contrast', !isHighContrast);
    };

    /**
     * Adjust font size for accessibility
     */
    KeyboardShortcuts.prototype.adjustFontSize = function(multiplier) {
        var currentSize = parseFloat(localStorage.getItem('keyboard-shortcuts-font-size')) || 1.0;
        var newSize = Math.max(0.8, Math.min(1.5, currentSize * multiplier));
        
        // Apply font size
        $('body').css('font-size', (newSize * 100) + '%');
        
        // Store preference
        localStorage.setItem('keyboard-shortcuts-font-size', newSize);
        
        var action = multiplier > 1 ? 'increased' : 'decreased';
        this.showToast(`Font size ${action} (${Math.round(newSize * 100)}%)`, 'info');
    };

    /**
     * Toggle edit mode if available
     */
    KeyboardShortcuts.prototype.toggleEditMode = function() {
        // Look for edit mode toggle button
        var editToggle = $('a[href*="edit="], input[name="edit"], .editing-toggle, #page-header .singlebutton input[value*="edit"]').first();
        
        if (editToggle.length) {
            this.showToast('Toggling edit mode...', 'info');
            setTimeout(function() {
                editToggle.click();
            }, 200);
        } else {
            // Try to construct edit URL
            var currentUrl = window.location.href;
            var editUrl = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'edit=1';
            
            this.showToast('Attempting to enable edit mode...', 'warning');
            setTimeout(function() {
                window.location.href = editUrl;
            }, 500);
        }
    };

    /**
     * Show quick enroll modal or navigate to enrollment
     */
    KeyboardShortcuts.prototype.showQuickEnroll = function() {
        // Look for enroll buttons or links
        var enrollElements = $('a[href*="enrol"], .enrol-button, .enrollment-link, a:contains("Enrol")').first();
        
        if (enrollElements.length) {
            this.showToast('Opening enrollment...', 'info');
            setTimeout(function() {
                enrollElements.click();
            }, 200);
        } else {
            // Show course browser
            this.showToast('Opening course browser...', 'info');
            this.navigateToPage('goCourses');
        }
    };

    /**
     * Create information modal
     */
    KeyboardShortcuts.prototype.createInfoModal = function(title, content) {
        var modal = $(`
            <div class="keyboard-shortcuts-modal-overlay">
                <div class="keyboard-shortcuts-modal info-modal">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close" aria-label="Close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary close-btn">Close</button>
                    </div>
                </div>
            </div>
        `);
        
        // Bind events
        modal.find('.close-btn, .modal-close').on('click', function() {
            modal.fadeOut(300, function() { modal.remove(); });
        });
        
        // Close on overlay click
        modal.on('click', function(e) {
            if (e.target === modal[0]) {
                modal.fadeOut(300, function() { modal.remove(); });
            }
        });
        
        return modal;
    };

    /**
     * Enhanced navigation with role-based URL detection
     */
    KeyboardShortcuts.prototype.navigateToPage = function(action) {
        if (typeof M === 'undefined' || !M.cfg || !M.cfg.wwwroot) {
            this.showToast('Navigation unavailable (Moodle config missing)', 'error');
            return;
        }

        var url = M.cfg.wwwroot + this.urlMappings[action];
        
        // Special handling for admin page - check if user has admin access
        if (action === 'goAdmin') {
            // Try to find admin links in the page to verify access
            var hasAdminAccess = $('a[href*="/admin/"], .block_adminblock, #page-navbar a[href*="admin"]').length > 0;
            if (!hasAdminAccess) {
                this.showToast('Admin access may not be available', 'warning');
                url = M.cfg.wwwroot + '/admin/search.php'; // Fallback to admin search
            }
        }
        
        if (action === 'logout') {
            url += M.cfg.sesskey;
        }

        // Show loading indicator
        this.showToast('Navigating...', 'info', 1000);
        
        // Navigate with small delay for UX
        setTimeout(() => {
            window.location.href = url;
        }, 300);
    };

    /**
     * Enhanced logout with confirmation
     */
    KeyboardShortcuts.prototype.confirmLogout = function() {
        var self = this;
        
        // Create custom confirmation modal
        var modal = this.createConfirmationModal(
            'Confirm Logout',
            'Are you sure you want to logout?',
            function() {
                // Confirmed
                self.navigateToPage('logout');
            },
            function() {
                // Cancelled
                self.showToast('Logout cancelled', 'info');
            }
        );
        
        $('body').append(modal);
        modal.fadeIn(300);
    };

    /**
     * Create confirmation modal
     */
    KeyboardShortcuts.prototype.createConfirmationModal = function(title, message, onConfirm, onCancel) {
        var modal = $(`
            <div class="keyboard-shortcuts-modal-overlay">
                <div class="keyboard-shortcuts-modal">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close" aria-label="Close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary confirm-btn">Yes, Logout</button>
                        <button class="btn btn-secondary cancel-btn">Cancel</button>
                    </div>
                </div>
            </div>
        `);
        
        // Bind events
        modal.find('.confirm-btn').on('click', function() {
            modal.fadeOut(300, function() { modal.remove(); });
            onConfirm();
        });
        
        modal.find('.cancel-btn, .modal-close').on('click', function() {
            modal.fadeOut(300, function() { modal.remove(); });
            onCancel();
        });
        
        // Close on overlay click
        modal.on('click', function(e) {
            if (e.target === modal[0]) {
                modal.fadeOut(300, function() { modal.remove(); });
                onCancel();
            }
        });
        
        return modal;
    };

    /**
     * Enhanced help overlay with better design
     */
    KeyboardShortcuts.prototype.showHelp = function() {
        if (this.isHelpVisible) return;

        var helpContent = this.buildEnhancedHelpContent();
        var overlay = $('<div class="keyboard-shortcuts-overlay enhanced">')
            .html(helpContent)
            .appendTo('body')
            .fadeIn(300);

        // Enhanced event bindings
        overlay.find('.close-help').on('click', () => this.hideHelp());
        overlay.on('click', (e) => {
            if (e.target === overlay[0]) this.hideHelp();
        });

        // Tab functionality
        var self = this;
        overlay.find('.tab-btn').on('click', function() {
            var tabName = $(this).data('tab');
            
            // Update tab buttons
            overlay.find('.tab-btn').removeClass('active');
            $(this).addClass('active');
            
            // Update content
            overlay.find('.shortcut-category').removeClass('active');
            overlay.find(`.shortcut-category[data-category="${tabName}"]`).addClass('active');
            
            self.showToast(`Switched to ${tabName} shortcuts`, 'info', 1000);
        });

        this.isHelpVisible = true;
    };

    /**
     * Build enhanced help content
     */
    KeyboardShortcuts.prototype.buildEnhancedHelpContent = function() {
        var content = `
            <div class="keyboard-shortcuts-help enhanced">
                <div class="help-header">
                    <h3>⌨️ Keyboard Shortcuts</h3>
                    <button class="close-help" aria-label="Close help">&times;</button>
                </div>
                <div class="help-body">
                    <p class="help-intro">Navigate Moodle quickly with these keyboard shortcuts:</p>
                    <div class="shortcuts-tabs">
                        <button class="tab-btn active" data-tab="navigation">Navigation</button>
                        <button class="tab-btn" data-tab="admin">Admin & Settings</button>
                        <button class="tab-btn" data-tab="accessibility">Accessibility</button>
                        <button class="tab-btn" data-tab="system">System</button>
                    </div>
                    <div class="shortcuts-grid">
        `;
        
        // Organize shortcuts by category
        var categories = {
            navigation: ['KeyH', 'KeyD', 'KeyC', 'KeyP', 'KeyS', 'KeyT', 'KeyF'],
            admin: ['KeyA', 'KeyG', 'KeyN', 'KeyM', 'KeyB', 'KeyR'],
            accessibility: ['KeyZ', 'KeyX', 'KeyV', 'KeyU', 'KeyJ', 'KeyK'],
            system: ['KeyL', 'KeyE', 'KeyQ', 'KeyI', 'Escape', 'Slash']
        };
        
        // Add navigation shortcuts
        content += '<div class="shortcut-category active" data-category="navigation">';
        content += '<h4>🧭 Navigation Shortcuts</h4>';
        for (var i = 0; i < categories.navigation.length; i++) {
            var key = categories.navigation[i];
            if (this.shortcuts[key]) {
                var shortcut = this.shortcuts[key];
                var keyCombo = this.getKeyDisplayName(key, shortcut);
                content += `
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>${keyCombo}</kbd>
                        </div>
                        <div class="shortcut-description">
                            <span class="shortcut-icon">${shortcut.icon}</span>
                            ${shortcut.description}
                        </div>
                    </div>
                `;
            }
        }
        content += '</div>';
        
        // Add admin shortcuts
        content += '<div class="shortcut-category" data-category="admin">';
        content += '<h4>⚙️ Admin & Settings</h4>';
        for (var i = 0; i < categories.admin.length; i++) {
            var key = categories.admin[i];
            if (this.shortcuts[key]) {
                var shortcut = this.shortcuts[key];
                var keyCombo = this.getKeyDisplayName(key, shortcut);
                content += `
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>${keyCombo}</kbd>
                        </div>
                        <div class="shortcut-description">
                            <span class="shortcut-icon">${shortcut.icon}</span>
                            ${shortcut.description}
                        </div>
                    </div>
                `;
            }
        }
        content += '</div>';
        
        // Add accessibility shortcuts
        content += '<div class="shortcut-category" data-category="accessibility">';
        content += '<h4>♿ Accessibility & Navigation</h4>';
        for (var i = 0; i < categories.accessibility.length; i++) {
            var key = categories.accessibility[i];
            if (this.shortcuts[key]) {
                var shortcut = this.shortcuts[key];
                var keyCombo = this.getKeyDisplayName(key, shortcut);
                content += `
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>${keyCombo}</kbd>
                        </div>
                        <div class="shortcut-description">
                            <span class="shortcut-icon">${shortcut.icon}</span>
                            ${shortcut.description}
                        </div>
                    </div>
                `;
            }
        }
        content += '</div>';
        
        // Add system shortcuts
        content += '<div class="shortcut-category" data-category="system">';
        content += '<h4>🔧 System & Tools</h4>';
        for (var i = 0; i < categories.system.length; i++) {
            var key = categories.system[i];
            if (this.shortcuts[key]) {
                var shortcut = this.shortcuts[key];
                var keyCombo = this.getKeyDisplayName(key, shortcut);
                content += `
                    <div class="shortcut-item">
                        <div class="shortcut-keys">
                            <kbd>${keyCombo}</kbd>
                        </div>
                        <div class="shortcut-description">
                            <span class="shortcut-icon">${shortcut.icon}</span>
                            ${shortcut.description}
                        </div>
                    </div>
                `;
            }
        }
        content += '</div>';
        
        content += `
                    </div>
                    <div class="help-footer">
                        <p class="help-tip">💡 <strong>Tip:</strong> Shortcuts are disabled when typing in form fields</p>
                        <p class="help-note">Press <kbd>Esc</kbd> to close this help</p>
                    </div>
                </div>
            </div>
        `;
        
        return content;
    };

    /**
     * Enhanced toast notification system
     */
    KeyboardShortcuts.prototype.showToast = function(message, type = 'info', duration = 2000) {
        var icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        
        var toast = $(`
            <div class="keyboard-shortcuts-toast ${type}">
                <span class="toast-icon">${icons[type]}</span>
                <span class="toast-message">${message}</span>
            </div>
        `).appendTo('body');
        
        // Animate in
        setTimeout(() => toast.addClass('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    /**
     * Hide all feedback elements
     */
    KeyboardShortcuts.prototype.hideAllFeedback = function() {
        $('.keyboard-shortcuts-toast, .keyboard-shortcut-activation').removeClass('show');
        setTimeout(() => {
            $('.keyboard-shortcuts-toast, .keyboard-shortcut-activation').remove();
        }, 300);
    };

    // ... (continuing with existing methods and enhanced styles)
    KeyboardShortcuts.prototype.hideHelp = function() {
        $('.keyboard-shortcuts-overlay').fadeOut(300, function() {
            $(this).remove();
        });
        this.isHelpVisible = false;
    };

    KeyboardShortcuts.prototype.toggleHelp = function() {
        if (this.isHelpVisible) {
            this.hideHelp();
        } else {
            this.showHelp();
        }
    };

    KeyboardShortcuts.prototype.matchesModifiers = function(e, shortcut) {
        var altMatch = shortcut.alt ? e.altKey : !e.altKey;
        var ctrlMatch = shortcut.ctrl ? e.ctrlKey : !e.ctrlKey;
        var shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        return altMatch && ctrlMatch && shiftMatch;
    };

    KeyboardShortcuts.prototype.getKeyDisplayName = function(key, shortcut) {
        var parts = [];
        if (shortcut.alt) parts.push('Alt');
        if (shortcut.ctrl) parts.push('Ctrl');
        if (shortcut.shift) parts.push('Shift');
        
        switch (key) {
            // Navigation
            case 'KeyH': parts.push('H'); break;
            case 'KeyD': parts.push('D'); break;
            case 'KeyC': parts.push('C'); break;
            case 'KeyP': parts.push('P'); break;
            case 'KeyS': parts.push('S'); break;
            case 'KeyT': parts.push('T'); break;
            case 'KeyF': parts.push('F'); break;
            
            // Admin & Settings
            case 'KeyA': parts.push('A'); break;
            case 'KeyG': parts.push('G'); break;
            case 'KeyN': parts.push('N'); break;
            case 'KeyM': parts.push('M'); break;
            case 'KeyB': parts.push('B'); break;
            case 'KeyR': parts.push('R'); break;
            
            // Accessibility & Movement
            case 'KeyU': parts.push('U'); break;
            case 'KeyJ': parts.push('J'); break;
            case 'KeyK': parts.push('K'); break;
            case 'KeyZ': parts.push('Z'); break;
            case 'KeyX': parts.push('X'); break;
            case 'KeyV': parts.push('V'); break;
            
            // System
            case 'KeyL': parts.push('L'); break;
            case 'KeyE': parts.push('E'); break;
            case 'KeyQ': parts.push('Q'); break;
            case 'KeyI': parts.push('I'); break;
            
            // Special keys
            case 'Slash': parts.push('?'); break;
            case 'Escape': parts.push('Esc'); break;
            
            default: parts.push(key.replace('Key', ''));
        }
        return parts.join(' + ');
    };

    /**
     * Enhanced CSS styles
     */
    KeyboardShortcuts.prototype.addEnhancedStyles = function() {
        if ($('#keyboard-shortcuts-enhanced-styles').length) return;
        
        var styles = `
            <style id="keyboard-shortcuts-enhanced-styles">
                /* Enhanced Toast Notifications */
                .keyboard-shortcuts-toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 12px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 500;
                    z-index: 10001;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transform: translateX(100%);
                    opacity: 0;
                    transition: all 0.3s ease;
                    max-width: 300px;
                }
                
                .keyboard-shortcuts-toast.show {
                    transform: translateX(0);
                    opacity: 1;
                }
                
                .keyboard-shortcuts-toast.info {
                    background: #e3f2fd;
                    color: #1565c0;
                    border-left: 4px solid #2196f3;
                }
                
                .keyboard-shortcuts-toast.success {
                    background: #e8f5e8;
                    color: #2e7d32;
                    border-left: 4px solid #4caf50;
                }
                
                .keyboard-shortcuts-toast.warning {
                    background: #fff3e0;
                    color: #ef6c00;
                    border-left: 4px solid #ff9800;
                }
                
                .keyboard-shortcuts-toast.error {
                    background: #ffebee;
                    color: #c62828;
                    border-left: 4px solid #f44336;
                }
                
                .toast-icon {
                    margin-right: 8px;
                }
                
                /* Enhanced Activation Indicator */
                .keyboard-shortcut-activation {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.8);
                    background: rgba(0, 0, 0, 0.85);
                    color: white;
                    padding: 20px 30px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 500;
                    z-index: 10002;
                    opacity: 0;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                }
                
                .keyboard-shortcut-activation.show {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                
                .activation-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .activation-icon {
                    font-size: 24px;
                }
                
                .activation-text {
                    font-size: 18px;
                }
                
                /* Enhanced Modal Styles */
                .keyboard-shortcuts-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    z-index: 10003;
                    display: none;
                }
                
                .keyboard-shortcuts-modal {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 12px 48px rgba(0,0,0,0.3);
                    min-width: 320px;
                    max-width: 90vw;
                }
                
                .modal-header {
                    padding: 20px 24px 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #e0e0e0;
                    margin-bottom: 20px;
                }
                
                .modal-header h3 {
                    margin: 0;
                    color: #333;
                    font-size: 18px;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background-color 0.2s;
                }
                
                .modal-close:hover {
                    background: #f5f5f5;
                }
                
                .modal-body {
                    padding: 0 24px 20px;
                    color: #555;
                }
                
                .modal-footer {
                    padding: 20px 24px;
                    border-top: 1px solid #e0e0e0;
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                }
                
                .modal-footer .btn {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background-color 0.2s;
                }
                
                .btn-primary {
                    background: #1976d2;
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #1565c0;
                }
                
                .btn-secondary {
                    background: #f5f5f5;
                    color: #333;
                }
                
                .btn-secondary:hover {
                    background: #e0e0e0;
                }
                
                /* Enhanced Help Overlay */
                .keyboard-shortcuts-overlay.enhanced {
                    backdrop-filter: blur(4px);
                }
                
                .keyboard-shortcuts-help.enhanced {
                    max-width: 600px;
                    border-radius: 16px;
                    box-shadow: 0 16px 64px rgba(0,0,0,0.2);
                }
                
                .help-intro {
                    font-size: 16px;
                    color: #555;
                    margin-bottom: 24px;
                }
                
                .shortcuts-grid {
                    display: grid;
                    gap: 16px;
                    margin-bottom: 24px;
                }
                
                .shortcut-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 16px;
                    background: #f8f9fa;
                    border-radius: 8px;
                    border: 1px solid #e9ecef;
                }
                
                .shortcut-keys kbd {
                    background: white;
                    border: 2px solid #dee2e6;
                    border-radius: 6px;
                    color: #495057;
                    font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
                    font-size: 13px;
                    font-weight: 600;
                    padding: 4px 8px;
                    box-shadow: 0 2px 0 #dee2e6;
                }
                
                .shortcut-description {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 500;
                    color: #333;
                }
                
                .shortcut-icon {
                    font-size: 18px;
                }
                
                .help-footer {
                    border-top: 1px solid #e9ecef;
                    padding-top: 20px;
                    margin-top: 20px;
                }
                
                .help-tip {
                    background: #e8f4f8;
                    color: #0c5460;
                    padding: 12px 16px;
                    border-radius: 6px;
                    margin-bottom: 16px;
                    border-left: 4px solid #17a2b8;
                }
                
                .help-note {
                    text-align: center;
                    color: #6c757d;
                    font-size: 14px;
                    margin: 0;
                }
                
                /* Responsive design */
                @media (max-width: 768px) {
                    .keyboard-shortcuts-help.enhanced {
                        max-width: 95vw;
                        margin: 20px;
                    }
                    
                    .shortcut-item {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }
                    
                    .keyboard-shortcuts-toast {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            </style>
        `;
        
        $('head').append(styles);
    };

    // Return module interface
    return {
        init: function() {
            try {
                new KeyboardShortcuts();
                Log.debug('Enhanced Keyboard Shortcuts module initialized successfully');
            } catch (error) {
                Log.error('Failed to initialize Enhanced Keyboard Shortcuts:', error);
            }
        }
    };
});
