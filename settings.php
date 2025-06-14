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
 * Keyboard Shortcuts Plugin - Settings
 *
 * @package    local_moodle_plugin_keybord_shortcut_command
 * @copyright  2025 Your Name
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die;

if ($hassiteconfig) {
    $settings = new admin_settingpage('local_moodle_plugin_keybord_shortcut_command', 
        get_string('pluginname', 'local_moodle_plugin_keybord_shortcut_command'));

    // Enable/disable keyboard shortcuts
    $settings->add(new admin_setting_configcheckbox(
        'local_moodle_plugin_keybord_shortcut_command/enabled',
        get_string('settings_enable', 'local_moodle_plugin_keybord_shortcut_command'),
        get_string('settings_enable_desc', 'local_moodle_plugin_keybord_shortcut_command'),
        1
    ));

    // Enable/disable visual feedback
    $settings->add(new admin_setting_configcheckbox(
        'local_moodle_plugin_keybord_shortcut_command/visual_feedback',
        get_string('settings_visual_feedback', 'local_moodle_plugin_keybord_shortcut_command'),
        get_string('settings_visual_feedback_desc', 'local_moodle_plugin_keybord_shortcut_command'),
        1
    ));

    // Enable/disable help overlay
    $settings->add(new admin_setting_configcheckbox(
        'local_moodle_plugin_keybord_shortcut_command/help_overlay',
        get_string('settings_help_overlay', 'local_moodle_plugin_keybord_shortcut_command'),
        get_string('settings_help_overlay_desc', 'local_moodle_plugin_keybord_shortcut_command'),
        1
    ));

    $ADMIN->add('localplugins', $settings);
}
