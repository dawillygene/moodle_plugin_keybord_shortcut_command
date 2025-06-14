/**
 * Keyboard Shortcuts Module for Moodle
 * 
 * This module provides keyboard shortcuts for quick navigation within Moodle.
 * 
 * @module     local_moodle_plugin_keybord_shortcut_command/keyboard_shortcuts
 * @copyright  2025 Your Name
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/log', 'core/str'], function($, Log, Str) {
    'use strict';

    /**
     * Keyboard Shortcuts class
     */
    var KeyboardShortcuts = function() {
        this.isEnabled = true;
        this.isHelpVisible = false;
        this.shortcuts = {
            'KeyH': { action: 'goHome', alt: true, description: 'Go to Home' },
            'KeyD': { action: 'goDashboard', alt: true, description: 'Go to Dashboard' },
            'KeyC': { action: 'goCourses', alt: true, description: 'Go to Courses' },
            'KeyP': { action: 'goProfile', alt: true, description: 'Go to Profile' },
            'KeyS': { action: 'openSearch', alt: true, description: 'Open Search' },
            'KeyL': { action: 'logout', alt: true, description: 'Logout' },
            'Slash': { action: 'showHelp', alt: true, shift: true, description: 'Show Help (Alt+?)' }
        };
        this.init();
    };

    /**
     * Initialize the keyboard shortcuts
     */
    KeyboardShortcuts.prototype.init = function() {
        var self = this;
        Log.debug('Keyboard Shortcuts: Initializing...');

        // Bind keyboard events
        $(document).on('keydown', function(e) {
            self.handleKeydown(e);
        });

        // Bind escape key for closing help
        $(document).on('keyup', function(e) {
            if (e.key === 'Escape' && self.isHelpVisible) {
                self.hideHelp();
            }
        });

        // Add visual feedback styles
        this.addStyles();

        Log.debug('Keyboard Shortcuts: Initialized successfully');
    };

    /**
     * Handle keydown events
     */
    KeyboardShortcuts.prototype.handleKeydown = function(e) {
        if (!this.isEnabled) {
            return;
        }

        // Don't interfere when user is typing in form fields
        if (this.isTypingInField(e.target)) {
            return;
        }

        var shortcut = this.shortcuts[e.code];
        if (shortcut && this.matchesModifiers(e, shortcut)) {
            e.preventDefault();
            this.executeAction(shortcut.action);
        }
    };

    /**
     * Check if user is typing in a form field
     */
    KeyboardShortcuts.prototype.isTypingInField = function(target) {
        var tagName = target.tagName.toLowerCase();
        var inputTypes = ['input', 'textarea', 'select'];
        var contentEditable = target.contentEditable === 'true';
        
        return inputTypes.includes(tagName) || contentEditable;
    };

    /**
     * Check if the key combination matches the shortcut requirements
     */
    KeyboardShortcuts.prototype.matchesModifiers = function(e, shortcut) {
        var altMatch = shortcut.alt ? e.altKey : !e.altKey;
        var ctrlMatch = shortcut.ctrl ? e.ctrlKey : !e.ctrlKey;
        var shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        
        return altMatch && ctrlMatch && shiftMatch;
    };

    /**
     * Execute the keyboard shortcut action
     */
    KeyboardShortcuts.prototype.executeAction = function(action) {
        Log.debug('Keyboard Shortcuts: Executing action - ' + action);
        
        this.showVisualFeedback(action);
        
        switch (action) {
            case 'goHome':
                this.navigateTo(M.cfg.wwwroot);
                break;
            case 'goDashboard':
                this.navigateTo(M.cfg.wwwroot + '/my');
                break;
            case 'goCourses':
                this.navigateTo(M.cfg.wwwroot + '/course');
                break;
            case 'goProfile':
                this.navigateTo(M.cfg.wwwroot + '/user/profile.php');
                break;
            case 'openSearch':
                this.focusSearch();
                break;
            case 'logout':
                this.logout();
                break;
            case 'showHelp':
                this.toggleHelp();
                break;
            default:
                Log.warn('Keyboard Shortcuts: Unknown action - ' + action);
        }
    };

    /**
     * Navigate to a specific URL
     */
    KeyboardShortcuts.prototype.navigateTo = function(url) {
        window.location.href = url;
    };

    /**
     * Focus on search input
     */
    KeyboardShortcuts.prototype.focusSearch = function() {
        var searchInput = $('input[name="search"], #searchform input, .search input').first();
        if (searchInput.length) {
            searchInput.focus();
        } else {
            // If no search field found, try to navigate to search page
            this.navigateTo(M.cfg.wwwroot + '/search/index.php');
        }
    };

    /**
     * Logout user
     */
    KeyboardShortcuts.prototype.logout = function() {
        var logoutUrl = $('a[href*="login/logout.php"]').attr('href');
        if (logoutUrl) {
            window.location.href = logoutUrl;
        } else {
            this.navigateTo(M.cfg.wwwroot + '/login/logout.php?sesskey=' + M.cfg.sesskey);
        }
    };

    /**
     * Show visual feedback for activated shortcut
     */
    KeyboardShortcuts.prototype.showVisualFeedback = function(action) {
        var feedback = $('<div class="keyboard-shortcut-feedback">')
            .text('Shortcut activated: ' + action)
            .appendTo('body');
        
        setTimeout(function() {
            feedback.fadeOut(500, function() {
                feedback.remove();
            });
        }, 1500);
    };

    /**
     * Toggle help overlay
     */
    KeyboardShortcuts.prototype.toggleHelp = function() {
        if (this.isHelpVisible) {
            this.hideHelp();
        } else {
            this.showHelp();
        }
    };

    /**
     * Show help overlay
     */
    KeyboardShortcuts.prototype.showHelp = function() {
        var self = this;
        
        if (this.isHelpVisible) {
            return;
        }

        var helpContent = this.buildHelpContent();
        var overlay = $('<div class="keyboard-shortcuts-overlay">')
            .html(helpContent)
            .css({
                'position': 'fixed',
                'top': '0',
                'left': '0',
                'right': '0',
                'bottom': '0',
                'width': '100vw',
                'height': '100vh',
                'background': 'rgba(0, 0, 0, 0.7)',
                'z-index': '999999',
                'display': 'flex',
                'align-items': 'center',
                'justify-content': 'center',
                'margin': '0',
                'padding': '0'
            })
            .appendTo('body')
            .fadeIn(300);

        // Close on overlay click
        overlay.on('click', function(e) {
            if (e.target === overlay[0]) {
                self.hideHelp();
            }
        });

        // Close button
        overlay.find('.close-help').on('click', function() {
            self.hideHelp();
        });

        this.isHelpVisible = true;
    };

    /**
     * Hide help overlay
     */
    KeyboardShortcuts.prototype.hideHelp = function() {
        $('.keyboard-shortcuts-overlay').fadeOut(300, function() {
            $(this).remove();
        });
        this.isHelpVisible = false;
    };

    /**
     * Build help content HTML
     */
    KeyboardShortcuts.prototype.buildHelpContent = function() {
        var content = '<div class="keyboard-shortcuts-help">';
        content += '<div class="help-header">';
        content += '<h3>Keyboard Shortcuts</h3>';
        content += '<button class="close-help" aria-label="Close help">&times;</button>';
        content += '</div>';
        content += '<div class="help-body">';
        content += '<p>Use these keyboard shortcuts to navigate quickly through Moodle:</p>';
        content += '<ul class="shortcuts-list">';
        
        for (var key in this.shortcuts) {
            var shortcut = this.shortcuts[key];
            var keyCombo = this.getKeyDisplayName(key, shortcut);
            content += '<li><kbd>' + keyCombo + '</kbd> - ' + shortcut.description + '</li>';
        }
        
        content += '</ul>';
        content += '<p class="help-note">Press <kbd>Esc</kbd> to close this help.</p>';
        content += '</div>';
        content += '</div>';
        
        return content;
    };

    /**
     * Get display name for key combination
     */
    KeyboardShortcuts.prototype.getKeyDisplayName = function(key, shortcut) {
        var parts = [];
        
        if (shortcut.alt) parts.push('Alt');
        if (shortcut.ctrl) parts.push('Ctrl');
        if (shortcut.shift) parts.push('Shift');
        
        switch (key) {
            case 'KeyH': parts.push('H'); break;
            case 'KeyD': parts.push('D'); break;
            case 'KeyC': parts.push('C'); break;
            case 'KeyP': parts.push('P'); break;
            case 'KeyS': parts.push('S'); break;
            case 'KeyL': parts.push('L'); break;
            case 'Slash': parts.push('?'); break;
            default: parts.push(key);
        }
        
        return parts.join(' + ');
    };

    /**
     * Add CSS styles for visual feedback and help overlay
     */
    KeyboardShortcuts.prototype.addStyles = function() {
        var styles = `
            <style id="keyboard-shortcuts-styles">
                .keyboard-shortcut-feedback {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #28a745;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 4px;
                    font-size: 14px;
                    z-index: 9999;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                }
                
                .keyboard-shortcuts-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 10000;
                    display: none;
                }
                
                .keyboard-shortcuts-help {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                }
                
                .help-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 24px 0;
                    border-bottom: 1px solid #eee;
                    margin-bottom: 20px;
                }
                
                .help-header h3 {
                    margin: 0;
                    color: #333;
                }
                
                .close-help {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .close-help:hover {
                    color: #333;
                }
                
                .help-body {
                    padding: 0 24px 24px;
                }
                
                .shortcuts-list {
                    list-style: none;
                    padding: 0;
                    margin: 20px 0;
                }
                
                .shortcuts-list li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #f0f0f0;
                }
                
                .shortcuts-list li:last-child {
                    border-bottom: none;
                }
                
                .shortcuts-list kbd {
                    background: #f8f9fa;
                    border: 1px solid #dee2e6;
                    border-radius: 3px;
                    color: #495057;
                    font-family: monospace;
                    font-size: 0.9em;
                    padding: 2px 6px;
                    margin-right: 10px;
                }
                
                .help-note {
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #666;
                    text-align: center;
                }
            </style>
        `;
        
        if (!$('#keyboard-shortcuts-styles').length) {
            $('head').append(styles);
        }
    };

    // Module return object
    return {
        /**
         * Initialize the keyboard shortcuts module
         */
        init: function() {
            new KeyboardShortcuts();
        }
    };
});
