<?php

define('CLI_SCRIPT', true);
require_once('/var/www/html/moodle/config.php');
require_once($CFG->libdir . '/adminlib.php');

global $PAGE, $OUTPUT;

$PAGE->set_context(context_system::instance());
$PAGE->set_url('/local/moodle_plugin_keybord_shortcut_command/tests/debug_test.php');
$PAGE->set_title('Keyboard Shortcuts Debug Test');
$PAGE->set_heading('Debug Testing Keyboard Shortcuts');

// Load our debug AMD module
$PAGE->requires->js_call_amd('local_moodle_plugin_keybord_shortcut_command/keyboard_shortcuts_debug', 'init');

echo $OUTPUT->header();
?>

<div style="padding: 20px; font-family: Arial, sans-serif;">
    <h2>🔧 Keyboard Shortcuts Debug Test</h2>
    <p>This page loads the debug version of our keyboard shortcuts to test functionality.</p>
    
    <div style="background: #e8f4f8; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #17a2b8;">
        <strong>🧪 Test Instructions:</strong>
        <ol>
            <li>Open browser developer tools (F12)</li>
            <li>Check the Console tab for debug messages</li>
            <li>Try these keyboard shortcuts:
                <ul>
                    <li><kbd>Alt + H</kbd> - Go to Home</li>
                    <li><kbd>Alt + D</kbd> - Go to Dashboard</li>
                    <li><kbd>Alt + Shift + /</kbd> - Show Help (Alt + ?)</li>
                </ul>
            </li>
            <li>Verify that debug messages appear in console</li>
        </ol>
    </div>
    
    <div style="background: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #ffc107;">
        <strong>⚠️ Expected Console Messages:</strong>
        <ul>
            <li>🚀 KEYBOARD SHORTCUTS MODULE LOADING...</li>
            <li>🌟 KEYBOARD SHORTCUTS MODULE INIT CALLED</li>
            <li>🔧 Initializing keyboard shortcuts...</li>
            <li>✅ Keyboard shortcuts initialized successfully!</li>
            <li>🎹 Key pressed: [when you press keys]</li>
            <li>🎯 SHORTCUT ACTIVATED: [when you use shortcuts]</li>
        </ul>
    </div>
    
    <div style="background: #d4edda; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #28a745;">
        <h3>✅ Test Results Area</h3>
        <p>Test your keyboard shortcuts here. Form fields below should NOT trigger shortcuts:</p>
        <input type="text" placeholder="Type here - shortcuts should be disabled" style="padding: 8px; margin: 5px; width: 300px; display: block;">
        <textarea placeholder="Shortcuts should also be disabled in textarea" style="padding: 8px; margin: 5px; width: 300px; height: 60px; display: block;"></textarea>
    </div>
    
    <div style="background: #f8f9fa; padding: 15px; margin: 20px 0; border-radius: 5px; border: 1px solid #dee2e6;">
        <h3>📊 Test Buttons</h3>
        <button onclick="console.log('Test button clicked')" style="padding: 10px 15px; margin: 5px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;">Test Console Log</button>
        <button onclick="location.reload()" style="padding: 10px 15px; margin: 5px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer;">Reload Page</button>
        <button onclick="alert('Alert test')" style="padding: 10px 15px; margin: 5px; background: #ffc107; color: black; border: none; border-radius: 3px; cursor: pointer;">Test Alert</button>
    </div>
</div>

<style>
kbd {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 3px;
    color: #495057;
    font-family: monospace;
    font-size: 0.9em;
    padding: 2px 6px;
    margin: 0 2px;
}
</style>

<script>
    console.log('🏁 Debug test page loaded');
    console.log('🔍 Checking for Moodle globals...');
    
    if (typeof M !== 'undefined') {
        console.log('✅ Moodle M object available:', M);
        if (M.cfg) {
            console.log('✅ M.cfg available:', M.cfg);
        } else {
            console.log('❌ M.cfg not available');
        }
    } else {
        console.log('❌ Moodle M object not available');
    }
    
    if (typeof require !== 'undefined') {
        console.log('✅ AMD require function available');
    } else {
        console.log('❌ AMD require function not available');
    }
    
    // Monitor for our module loading
    var checkCount = 0;
    var checkInterval = setInterval(function() {
        checkCount++;
        console.log('🔍 Check #' + checkCount + ' - Looking for keyboard shortcuts initialization...');
        
        if (checkCount >= 10) {
            console.log('⏰ Stopped checking after 10 attempts');
            clearInterval(checkInterval);
        }
    }, 1000);
</script>

<?php
echo $OUTPUT->footer();
?>
