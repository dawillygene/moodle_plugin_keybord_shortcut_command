<?php
// Simple test script to check if Moodle recognizes our plugin

// Change to Moodle directory
chdir('/var/www/html/moodle');

// Include Moodle config
require_once('/var/www/html/moodle/config.php');
require_once($CFG->libdir . '/adminlib.php');

// Check if our plugin is detected
$plugins = core_plugin_manager::instance()->get_plugins();

echo "Checking for local plugins...\n";

if (isset($plugins['local'])) {
    echo "Found local plugins:\n";
    foreach ($plugins['local'] as $pluginname => $plugin) {
        echo "- {$pluginname}: {$plugin->displayname}\n";
        
        if ($pluginname === 'moodle_plugin_keybord_shortcut_command') {
            echo "  ✅ Our plugin is detected!\n";
            echo "  Version: {$plugin->versiondisk}\n";
            echo "  Status: " . ($plugin->is_installed() ? 'Installed' : 'Not installed') . "\n";
        }
    }
} else {
    echo "No local plugins found.\n";
}

echo "\nDone.\n";
