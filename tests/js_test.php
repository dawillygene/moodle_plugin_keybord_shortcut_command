<?php

define('CLI_SCRIPT', true);
require_once('/var/www/html/moodle/config.php');
require_once($CFG->libdir . '/adminlib.php');

// Create a minimal page to test our JavaScript loading
global $PAGE, $OUTPUT;

$PAGE->set_context(context_system::instance());
$PAGE->set_url('/local/moodle_plugin_keybord_shortcut_command/tests/js_test.php');
$PAGE->set_title('Keyboard Shortcuts Test');
$PAGE->set_heading('Testing Keyboard Shortcuts');

// Force load our AMD module
$PAGE->requires->js_call_amd('local_moodle_plugin_keybord_shortcut_command/keyboard_shortcuts', 'init');

echo $OUTPUT->header();
?>

<div style="padding: 20px;">
    <h2>Keyboard Shortcuts JavaScript Test</h2>
    <p>This page tests if our keyboard shortcuts JavaScript is loading properly.</p>
    
    <div style="background: #f0f0f0; padding: 15px; margin: 20px 0; border-radius: 5px;">
        <strong>Test Instructions:</strong>
        <ul>
            <li>Open browser developer tools (F12)</li>
            <li>Check the Console tab for any JavaScript messages</li>
            <li>Try keyboard shortcuts: Alt+H, Alt+D, Alt+C, Alt+P, Alt+S, Alt+L, Alt+?</li>
            <li>Look for initialization messages and shortcut activation feedback</li>
        </ul>
    </div>
    
    <div id="test-results" style="background: white; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
        <h3>Test Results:</h3>
        <p>JavaScript console messages will appear in the browser developer tools.</p>
    </div>
    
    <input type="text" placeholder="Test input field (shortcuts should be disabled here)" style="padding: 8px; margin: 10px 0; width: 300px;">
    
    <div style="margin-top: 20px;">
        <button onclick="console.log('Test button clicked')">Test Button</button>
        <button onclick="window.location.reload()">Reload Page</button>
    </div>
</div>

<script>
    console.log('Test page loaded');
    console.log('Checking for keyboard shortcuts module...');
    
    // Test if AMD is working
    if (typeof require !== 'undefined') {
        console.log('AMD require function is available');
    } else {
        console.log('AMD require function is NOT available');
    }
    
    // Monitor for our module
    setTimeout(function() {
        console.log('Checking if keyboard shortcuts module initialized...');
    }, 2000);
</script>

<?php
echo $OUTPUT->footer();
?>
