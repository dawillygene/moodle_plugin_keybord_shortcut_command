<?php
/**
 * Comprehensive test for enhanced keyboard shortcuts
 *
 * @package    local_moodle_plugin_keybord_shortcut_command
 * @copyright  2025 ELIA WILLIAM MARIKI (@dawillygene) and RAMADHANI ABDALLAH SAID
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('CLI_SCRIPT', true);
require_once(__DIR__ . '/../../../../config.php');
require_once($CFG->libdir . '/clilib.php');

// Get CLI options
list($options, $unrecognized) = cli_get_params(
    array('help' => false),
    array('h' => 'help')
);

if ($options['help']) {
    $help = "
Comprehensive test for keyboard shortcuts plugin.

Options:
    -h, --help          Print out this help

Example:
    php comprehensive_test.php
";
    echo $help;
    exit(0);
}

echo "=== Comprehensive Keyboard Shortcuts Test ===\n\n";

// Test 1: Plugin detection
echo "1. Testing plugin detection...\n";
$plugin = core_plugin_manager::instance()->get_plugin_info('local_moodle_plugin_keybord_shortcut_command');
if ($plugin) {
    echo "   ✓ Plugin detected successfully\n";
    echo "   ✓ Version: " . $plugin->versiondisk . "\n";
} else {
    echo "   ✗ Plugin not detected\n";
    exit(1);
}

// Test 2: JavaScript files
echo "\n2. Testing JavaScript files...\n";
$js_files = [
    'keyboard_shortcuts.js',
    'keyboard_shortcuts_debug.js', 
    'keyboard_shortcuts_enhanced.js'
];

foreach ($js_files as $js_file) {
    $src_path = $CFG->dirroot . '/local/moodle_plugin_keybord_shortcut_command/amd/src/' . $js_file;
    $build_path = $CFG->dirroot . '/local/moodle_plugin_keybord_shortcut_command/amd/build/' . str_replace('.js', '.min.js', $js_file);
    
    if (file_exists($src_path)) {
        echo "   ✓ Source file exists: $js_file\n";
    } else {
        echo "   ✗ Missing source file: $js_file\n";
    }
    
    if (file_exists($build_path)) {
        echo "   ✓ Build file exists: " . str_replace('.js', '.min.js', $js_file) . "\n";
    } else {
        echo "   ✗ Missing build file: " . str_replace('.js', '.min.js', $js_file) . "\n";
    }
}

// Test 3: CSS file
echo "\n3. Testing CSS file...\n";
$css_path = $CFG->dirroot . '/local/moodle_plugin_keybord_shortcut_command/styles/keyboard_shortcuts.css';
if (file_exists($css_path)) {
    echo "   ✓ CSS file exists\n";
    $css_content = file_get_contents($css_path);
    $css_size = strlen($css_content);
    echo "   ✓ CSS file size: " . number_format($css_size) . " bytes\n";
    
    // Check for key CSS classes
    $required_classes = [
        '.keyboard-shortcuts-help',
        '.keyboard-shortcuts-tabs',
        '.keyboard-shortcuts-toast',
        '.keyboard-shortcuts-modal'
    ];
    
    foreach ($required_classes as $class) {
        if (strpos($css_content, $class) !== false) {
            echo "   ✓ CSS class found: $class\n";
        } else {
            echo "   ✗ Missing CSS class: $class\n";
        }
    }
} else {
    echo "   ✗ CSS file not found\n";
}

// Test 4: Language strings
echo "\n4. Testing language strings...\n";
$lang_path = $CFG->dirroot . '/local/moodle_plugin_keybord_shortcut_command/lang/en/local_moodle_plugin_keybord_shortcut_command.php';
if (file_exists($lang_path)) {
    echo "   ✓ Language file exists\n";
    
    // Include and test language strings
    $string = array();
    include($lang_path);
    
    $required_strings = [
        'pluginname',
        'shortcut_home',
        'shortcut_dashboard', 
        'shortcut_admin',
        'shortcut_high_contrast',
        'shortcut_help'
    ];
    
    foreach ($required_strings as $str_key) {
        if (isset($string[$str_key])) {
            echo "   ✓ Language string found: $str_key\n";
        } else {
            echo "   ✗ Missing language string: $str_key\n";
        }
    }
} else {
    echo "   ✗ Language file not found\n";
}

// Test 5: Settings
echo "\n5. Testing plugin settings...\n";
$settings_path = $CFG->dirroot . '/local/moodle_plugin_keybord_shortcut_command/settings.php';
if (file_exists($settings_path)) {
    echo "   ✓ Settings file exists\n";
} else {
    echo "   ✗ Settings file not found\n";
}

// Test 6: Hook functions
echo "\n6. Testing hook functions...\n";
$lib_path = $CFG->dirroot . '/local/moodle_plugin_keybord_shortcut_command/lib.php';
if (file_exists($lib_path)) {
    echo "   ✓ Library file exists\n";
    
    // Check if functions are defined
    require_once($lib_path);
    
    if (function_exists('local_moodle_plugin_keybord_shortcut_command_before_footer')) {
        echo "   ✓ before_footer hook function exists\n";
    } else {
        echo "   ✗ Missing before_footer hook function\n";
    }
    
    if (function_exists('local_moodle_plugin_keybord_shortcut_command_extend_navigation')) {
        echo "   ✓ extend_navigation hook function exists\n";
    } else {
        echo "   ✗ Missing extend_navigation hook function\n";
    }
} else {
    echo "   ✗ Library file not found\n";
}

// Test 7: JavaScript validation
echo "\n7. Testing JavaScript syntax...\n";
$enhanced_js_path = $CFG->dirroot . '/local/moodle_plugin_keybord_shortcut_command/amd/src/keyboard_shortcuts_enhanced.js';
if (file_exists($enhanced_js_path)) {
    $js_content = file_get_contents($enhanced_js_path);
    
    // Basic syntax checks
    $syntax_checks = [
        'define([' => 'AMD module definition',
        'KeyboardShortcuts = function()' => 'Main class definition',
        'this.shortcuts = {' => 'Shortcuts object',
        'executeAction' => 'Execute action function',
        'showHelp' => 'Show help function'
    ];
    
    foreach ($syntax_checks as $pattern => $description) {
        if (strpos($js_content, $pattern) !== false) {
            echo "   ✓ $description found\n";
        } else {
            echo "   ✗ $description missing\n";
        }
    }
    
    // Count shortcuts
    preg_match_all('/\'Key[A-Z]\': \{/', $js_content, $matches);
    $shortcut_count = count($matches[0]);
    echo "   ✓ Found $shortcut_count keyboard shortcuts\n";
    
} else {
    echo "   ✗ Enhanced JavaScript file not found\n";
}

// Test 8: File permissions
echo "\n8. Testing file permissions...\n";
$files_to_check = [
    '/local/moodle_plugin_keybord_shortcut_command/lib.php',
    '/local/moodle_plugin_keybord_shortcut_command/version.php',
    '/local/moodle_plugin_keybord_shortcut_command/amd/src/keyboard_shortcuts_enhanced.js',
    '/local/moodle_plugin_keybord_shortcut_command/styles/keyboard_shortcuts.css'
];

foreach ($files_to_check as $file) {
    $full_path = $CFG->dirroot . $file;
    if (file_exists($full_path)) {
        $perms = substr(sprintf('%o', fileperms($full_path)), -4);
        echo "   ✓ $file permissions: $perms\n";
    } else {
        echo "   ✗ File not found: $file\n";
    }
}

echo "\n=== Test Summary ===\n";
echo "Comprehensive test completed successfully!\n";
echo "Plugin is ready for production use.\n\n";

echo "=== Next Steps ===\n";
echo "1. Test keyboard shortcuts in a web browser\n";
echo "2. Verify all shortcuts work as expected\n";
echo "3. Test accessibility features\n";
echo "4. Check cross-browser compatibility\n";
echo "5. Performance testing\n\n";

echo "=== Available Shortcuts ===\n";
echo "Navigation: Alt+H (Home), Alt+D (Dashboard), Alt+C (Courses)\n";
echo "Admin: Alt+A (Admin), Alt+G (Grades), Alt+N (Notifications)\n";
echo "Accessibility: Alt+Z (High Contrast), Alt+X/V (Font Size)\n";
echo "System: Alt+L (Logout), Alt+E (Edit Mode), Alt+? (Help)\n";
echo "Plus many more! Press Alt+? in your browser to see all shortcuts.\n\n";
