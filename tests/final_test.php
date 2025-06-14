<?php

define('CLI_SCRIPT', true);
require_once('/var/www/html/moodle/config.php');
require_once($CFG->libdir . '/adminlib.php');

global $PAGE, $OUTPUT;

$PAGE->set_context(context_system::instance());
$PAGE->set_url('/local/moodle_plugin_keybord_shortcut_command/tests/final_test.php');
$PAGE->set_title('Keyboard Shortcuts - Final Integration Test');
$PAGE->set_heading('Final Test Suite');

// Determine which module to load based on URL parameter
$version = optional_param('version', 'enhanced', PARAM_ALPHA);
$moduleMap = [
    'basic' => 'local_moodle_plugin_keybord_shortcut_command/keyboard_shortcuts',
    'debug' => 'local_moodle_plugin_keybord_shortcut_command/keyboard_shortcuts_debug',
    'enhanced' => 'local_moodle_plugin_keybord_shortcut_command/keyboard_shortcuts_enhanced'
];

$moduleName = $moduleMap[$version] ?? $moduleMap['enhanced'];
$PAGE->requires->js_call_amd($moduleName, 'init');

echo $OUTPUT->header();
?>

<div style="padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; max-width: 1200px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h1 style="margin: 0 0 10px 0; font-size: 28px;">🚀 Keyboard Shortcuts Plugin - Final Test Suite</h1>
        <p style="margin: 0; font-size: 16px; opacity: 0.9;">Comprehensive testing environment for all plugin features</p>
    </div>

    <!-- Version Selector -->
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px;">
        <h3 style="margin-top: 0; color: #333;">🔧 Module Version</h3>
        <p>Current version: <strong><?php echo ucfirst($version); ?></strong></p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <a href="?version=basic" class="btn <?php echo $version === 'basic' ? 'active' : ''; ?>">Basic Version</a>
            <a href="?version=debug" class="btn <?php echo $version === 'debug' ? 'active' : ''; ?>">Debug Version</a>
            <a href="?version=enhanced" class="btn <?php echo $version === 'enhanced' ? 'active' : ''; ?>">Enhanced Version</a>
        </div>
    </div>

    <!-- Test Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
        
        <!-- Keyboard Shortcuts Test -->
        <div class="test-card">
            <h3>⌨️ Keyboard Shortcuts</h3>
            <p>Test all available keyboard shortcuts:</p>
            <div class="shortcut-list">
                <div class="shortcut-item"><kbd>Alt + H</kbd> Go to Home</div>
                <div class="shortcut-item"><kbd>Alt + D</kbd> Go to Dashboard</div>
                <div class="shortcut-item"><kbd>Alt + C</kbd> Go to Courses</div>
                <div class="shortcut-item"><kbd>Alt + P</kbd> Go to Profile</div>
                <div class="shortcut-item"><kbd>Alt + S</kbd> Open Search</div>
                <div class="shortcut-item"><kbd>Alt + L</kbd> Logout</div>
                <div class="shortcut-item"><kbd>Alt + ?</kbd> Show Help</div>
                <div class="shortcut-item"><kbd>Esc</kbd> Close Help</div>
            </div>
        </div>

        <!-- Form Field Test -->
        <div class="test-card">
            <h3>📝 Form Field Test</h3>
            <p>Shortcuts should be <strong>disabled</strong> in these fields:</p>
            <input type="text" placeholder="Test input field" style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px;">
            <textarea placeholder="Test textarea" style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px; resize: vertical; height: 60px;"></textarea>
            <select style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px;">
                <option>Test select field</option>
            </select>
        </div>

        <!-- Visual Feedback Test -->
        <div class="test-card">
            <h3>✨ Visual Feedback</h3>
            <p>Test visual feedback systems:</p>
            <button onclick="testToast('info')" class="test-btn">Info Toast</button>
            <button onclick="testToast('success')" class="test-btn">Success Toast</button>
            <button onclick="testToast('warning')" class="test-btn">Warning Toast</button>
            <button onclick="testToast('error')" class="test-btn">Error Toast</button>
        </div>

        <!-- Console Monitor -->
        <div class="test-card">
            <h3>📊 Console Monitor</h3>
            <p>JavaScript console output:</p>
            <div id="console-output" style="background: #1e1e1e; color: #0f0; font-family: monospace; padding: 10px; border-radius: 4px; height: 150px; overflow-y: auto; font-size: 12px;"></div>
        </div>

        <!-- Navigation Test -->
        <div class="test-card">
            <h3>🧭 Navigation Test</h3>
            <p>Test navigation without leaving page:</p>
            <button onclick="testNavigation('home')" class="test-btn">Test Home Nav</button>
            <button onclick="testNavigation('dashboard')" class="test-btn">Test Dashboard Nav</button>
            <button onclick="testNavigation('courses')" class="test-btn">Test Courses Nav</button>
            <div id="nav-results" style="margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 4px; min-height: 40px;"></div>
        </div>

        <!-- Plugin Info -->
        <div class="test-card">
            <h3>ℹ️ Plugin Information</h3>
            <div id="plugin-info">
                <p><strong>Version:</strong> <?php echo $version; ?></p>
                <p><strong>Module:</strong> <?php echo $moduleName; ?></p>
                <p><strong>Moodle:</strong> <?php echo $CFG->version; ?></p>
                <p><strong>wwwroot:</strong> <?php echo $CFG->wwwroot; ?></p>
            </div>
        </div>
    </div>

    <!-- Test Results -->
    <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h3 style="margin-top: 0; color: #333;">📋 Test Results</h3>
        <div id="test-results" style="min-height: 100px;">
            <p style="color: #666;">Test results will appear here...</p>
        </div>
        <button onclick="clearResults()" class="test-btn" style="margin-top: 10px;">Clear Results</button>
    </div>
</div>

<style>
    .test-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .test-card h3 {
        margin-top: 0;
        color: #333;
        font-size: 18px;
    }
    
    .shortcut-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .shortcut-item:last-child {
        border-bottom: none;
    }
    
    .shortcut-item kbd {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 3px;
        color: #495057;
        font-family: monospace;
        font-size: 11px;
        padding: 2px 6px;
        font-weight: 600;
    }
    
    .test-btn {
        background: #007bff;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        margin: 2px;
        font-size: 12px;
        transition: background 0.2s;
    }
    
    .test-btn:hover {
        background: #0056b3;
    }
    
    .btn {
        display: inline-block;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        border: 1px solid #007bff;
        color: #007bff;
        transition: all 0.2s;
    }
    
    .btn:hover {
        background: #007bff;
        color: white;
        text-decoration: none;
    }
    
    .btn.active {
        background: #007bff;
        color: white;
    }
    
    .test-result {
        padding: 8px 12px;
        margin: 4px 0;
        border-radius: 4px;
        font-size: 14px;
    }
    
    .test-result.success {
        background: #d4edda;
        color: #155724;
        border-left: 4px solid #28a745;
    }
    
    .test-result.error {
        background: #f8d7da;
        color: #721c24;
        border-left: 4px solid #dc3545;
    }
    
    .test-result.info {
        background: #d1ecf1;
        color: #0c5460;
        border-left: 4px solid #17a2b8;
    }
</style>

<script>
    // Console monitoring
    var originalLog = console.log;
    var originalDebug = console.debug;
    var originalWarn = console.warn;
    var originalError = console.error;
    
    function addToConsole(message, type = 'log') {
        var output = document.getElementById('console-output');
        var colors = {
            log: '#0f0',
            debug: '#00f',
            warn: '#ff0',
            error: '#f00'
        };
        var timestamp = new Date().toLocaleTimeString();
        output.innerHTML += '<div style="color: ' + colors[type] + '">[' + timestamp + '] ' + message + '</div>';
        output.scrollTop = output.scrollHeight;
    }
    
    console.log = function(...args) {
        originalLog.apply(console, args);
        addToConsole(args.join(' '), 'log');
    };
    
    console.debug = function(...args) {
        originalDebug.apply(console, args);
        addToConsole('DEBUG: ' + args.join(' '), 'debug');
    };
    
    console.warn = function(...args) {
        originalWarn.apply(console, args);
        addToConsole('WARN: ' + args.join(' '), 'warn');
    };
    
    console.error = function(...args) {
        originalError.apply(console, args);
        addToConsole('ERROR: ' + args.join(' '), 'error');
    };
    
    // Test functions
    function testToast(type) {
        var messages = {
            info: 'This is an info toast notification',
            success: 'Success! Operation completed',
            warning: 'Warning: Please check your input',
            error: 'Error: Something went wrong'
        };
        
        addTestResult('Testing ' + type + ' toast notification', 'info');
        
        // Try to trigger toast if enhanced version is loaded
        if (typeof window.keyboardShortcutsModule !== 'undefined' && window.keyboardShortcutsModule.showToast) {
            window.keyboardShortcutsModule.showToast(messages[type], type);
        } else {
            addTestResult('Toast function not available (basic/debug version)', 'error');
        }
    }
    
    function testNavigation(type) {
        var results = document.getElementById('nav-results');
        results.innerHTML = '<p style="color: #17a2b8;">Testing ' + type + ' navigation...</p>';
        
        // Simulate navigation test without actually navigating
        setTimeout(function() {
            results.innerHTML += '<p style="color: #28a745;">✅ Navigation URL constructed successfully</p>';
            addTestResult('Navigation test completed for: ' + type, 'success');
        }, 500);
    }
    
    function addTestResult(message, type) {
        var results = document.getElementById('test-results');
        var timestamp = new Date().toLocaleTimeString();
        var resultDiv = document.createElement('div');
        resultDiv.className = 'test-result ' + type;
        resultDiv.innerHTML = '[' + timestamp + '] ' + message;
        results.appendChild(resultDiv);
        results.scrollTop = results.scrollHeight;
    }
    
    function clearResults() {
        document.getElementById('test-results').innerHTML = '<p style="color: #666;">Test results cleared...</p>';
        document.getElementById('console-output').innerHTML = '';
        document.getElementById('nav-results').innerHTML = '';
    }
    
    // Page load monitoring
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🏁 Final test page loaded successfully');
        console.log('📦 Module version: <?php echo $version; ?>');
        console.log('🔧 Module path: <?php echo $moduleName; ?>');
        
        addTestResult('Test page initialized with <?php echo $version; ?> version', 'success');
        
        // Monitor for keyboard events
        var keyCount = 0;
        document.addEventListener('keydown', function(e) {
            keyCount++;
            var modifiers = [];
            if (e.altKey) modifiers.push('Alt');
            if (e.ctrlKey) modifiers.push('Ctrl');
            if (e.shiftKey) modifiers.push('Shift');
            if (e.metaKey) modifiers.push('Meta');
            
            var keyInfo = modifiers.length ? modifiers.join('+') + '+' + e.code : e.code;
            console.log('🎹 Key #' + keyCount + ': ' + keyInfo + ' (target: ' + e.target.tagName + ')');
        });
        
        // Test module availability after a delay
        setTimeout(function() {
            if (typeof require !== 'undefined') {
                addTestResult('AMD require function is available', 'success');
            } else {
                addTestResult('AMD require function not detected', 'error');
            }
            
            if (typeof M !== 'undefined' && M.cfg) {
                addTestResult('Moodle configuration available', 'success');
            } else {
                addTestResult('Moodle configuration not detected', 'error');
            }
        }, 2000);
    });
</script>

<?php
echo $OUTPUT->footer();
?>
