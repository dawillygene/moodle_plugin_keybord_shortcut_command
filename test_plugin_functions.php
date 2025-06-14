<?php
define('CLI_SCRIPT', true);
require_once('/var/www/html/moodle/config.php');

echo "Testing plugin functions...\n";

// Load our lib.php
require_once('/var/www/html/moodle/local/moodle_plugin_keybord_shortcut_command/lib.php');

echo "✅ lib.php loaded successfully\n";

// Test the CSS function
if (function_exists('local_moodle_plugin_keybord_shortcut_command_before_standard_head_html')) {
    echo "✅ CSS function exists\n";
    
    try {
        $css_output = local_moodle_plugin_keybord_shortcut_command_before_standard_head_html();
        echo "✅ CSS function executed without error\n";
        echo "CSS output length: " . strlen($css_output) . " characters\n";
        
        if (strlen($css_output) > 10000) {
            echo "⚠️  WARNING: CSS output is very large (" . strlen($css_output) . " chars)\n";
            echo "This might cause performance issues\n";
        }
        
    } catch (Exception $e) {
        echo "❌ ERROR in CSS function: " . $e->getMessage() . "\n";
    }
} else {
    echo "❌ CSS function not found\n";
}

// Test the JS function
if (function_exists('local_moodle_plugin_keybord_shortcut_command_before_footer')) {
    echo "✅ JS function exists\n";
    
    try {
        local_moodle_plugin_keybord_shortcut_command_before_footer();
        echo "✅ JS function executed without error\n";
    } catch (Exception $e) {
        echo "❌ ERROR in JS function: " . $e->getMessage() . "\n";
    }
} else {
    echo "❌ JS function not found\n";
}

echo "Test completed.\n";
?>
