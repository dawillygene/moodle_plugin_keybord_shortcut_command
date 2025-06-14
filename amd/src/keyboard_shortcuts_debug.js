/**
 * Debug version of keyboard shortcuts - logs everything for testing
 */
define(['jquery', 'core/log'], function($, Log) {
    'use strict';
    
    console.log('🚀 KEYBOARD SHORTCUTS MODULE LOADING...');
    
    var KeyboardShortcuts = function() {
        console.log('🎯 KeyboardShortcuts constructor called');
        this.isEnabled = true;
        this.shortcuts = {
            'KeyH': { action: 'goHome', alt: true, description: 'Go to Home' },
            'KeyD': { action: 'goDashboard', alt: true, description: 'Go to Dashboard' },
            'Slash': { action: 'showHelp', alt: true, shift: true, description: 'Show Help' }
        };
        this.init();
    };

    KeyboardShortcuts.prototype.init = function() {
        console.log('🔧 Initializing keyboard shortcuts...');
        var self = this;
        
        $(document).on('keydown', function(e) {
            console.log('🎹 Key pressed:', e.code, 'Alt:', e.altKey, 'Ctrl:', e.ctrlKey, 'Shift:', e.shiftKey);
            self.handleKeydown(e);
        });
        
        console.log('✅ Keyboard shortcuts initialized successfully!');
    };

    KeyboardShortcuts.prototype.handleKeydown = function(e) {
        if (!this.isEnabled) return;
        
        var shortcut = this.shortcuts[e.code];
        if (shortcut && this.matchesModifiers(e, shortcut)) {
            console.log('🎯 SHORTCUT ACTIVATED:', shortcut.action);
            e.preventDefault();
            this.executeAction(shortcut.action);
        }
    };

    KeyboardShortcuts.prototype.matchesModifiers = function(e, shortcut) {
        var altMatch = shortcut.alt ? e.altKey : !e.altKey;
        var ctrlMatch = shortcut.ctrl ? e.ctrlKey : !e.ctrlKey;
        var shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;
        return altMatch && ctrlMatch && shiftMatch;
    };

    KeyboardShortcuts.prototype.executeAction = function(action) {
        console.log('🚀 Executing action:', action);
        
        switch (action) {
            case 'goHome':
                console.log('🏠 Going to home...');
                if (typeof M !== 'undefined' && M.cfg && M.cfg.wwwroot) {
                    window.location.href = M.cfg.wwwroot;
                } else {
                    alert('Home navigation activated! (M.cfg not available)');
                }
                break;
            case 'goDashboard':
                console.log('📊 Going to dashboard...');
                if (typeof M !== 'undefined' && M.cfg && M.cfg.wwwroot) {
                    window.location.href = M.cfg.wwwroot + '/my';
                } else {
                    alert('Dashboard navigation activated! (M.cfg not available)');
                }
                break;
            case 'showHelp':
                console.log('❓ Showing help...');
                alert('Help activated! Alt+H=Home, Alt+D=Dashboard, Alt+?=Help');
                break;
            default:
                console.log('❌ Unknown action:', action);
        }
    };

    return {
        init: function() {
            console.log('🌟 KEYBOARD SHORTCUTS MODULE INIT CALLED');
            try {
                new KeyboardShortcuts();
                console.log('🎉 Keyboard shortcuts module loaded successfully!');
            } catch (error) {
                console.error('💥 Error initializing keyboard shortcuts:', error);
            }
        }
    };
});
