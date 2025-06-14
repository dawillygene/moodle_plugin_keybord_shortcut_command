<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Keyboard Shortcuts Plugin - Main library file
 *
 * @package    local_keyboard_shortcuts
 * @copyright  2025 Your Name
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Hook to add keyboard shortcuts JavaScript to all Moodle pages
 */
function local_keyboard_shortcuts_before_footer() {
    global $PAGE;
    
    // Only load on user-facing pages, not during installation/upgrade
    if (during_initial_install() || moodle_needs_upgrading()) {
        return;
    }
    
    // Load the AMD module
    $PAGE->requires->js_call_amd('local_keyboard_shortcuts/keyboard_shortcuts', 'init');
}

/**
 * Extends the global navigation
 *
 * @param global_navigation $navigation
 */
function local_keyboard_shortcuts_extend_navigation(global_navigation $navigation) {
    // This function can be used to add navigation elements if needed
    // Currently not implemented but reserved for future use
}

/**
 * Extends the settings navigation
 *
 * @param settings_navigation $navigation
 * @param context $context
 */
function local_keyboard_shortcuts_extend_settings_navigation(settings_navigation $navigation, context $context) {
    // This function can be used to add settings navigation if needed
    // Currently not implemented but reserved for future use
}
