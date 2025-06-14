<?php
/**
 * Final verification test for keyboard shortcuts help overlay positioning fix
 * 
 * This test can be run in a Moodle environment to verify the fix is working
 * 
 * @package    local_moodle_plugin_keybord_shortcut_command
 * @copyright  2025 ELIA WILLIAM MARIKI (@dawillygene) and RAMADHANI ABDALLAH SAID
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

// Ensure user is logged in
require_login();

$PAGE->set_context(context_system::instance());
$PAGE->set_url('/local/moodle_plugin_keybord_shortcut_command/tests/overlay_positioning_verification.php');
$PAGE->set_title('Keyboard Shortcuts Help Overlay - Positioning Fix Verification');
$PAGE->set_heading('Help Overlay Positioning Verification');
$PAGE->set_pagelayout('standard');

// Include the plugin's CSS and JavaScript
$PAGE->requires->css('/local/moodle_plugin_keybord_shortcut_command/styles/keyboard_shortcuts.css');
$PAGE->requires->js('/local/moodle_plugin_keybord_shortcut_command/amd/src/keyboard_shortcuts_enhanced.js');

echo $OUTPUT->header();
?>

<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h2 class="mb-0">🎯 Help Overlay Positioning Fix - Verification Test</h2>
                </div>
                <div class="card-body">
                    
                    <div class="alert alert-success">
                        <h4 class="alert-heading">✅ Fix Status: COMPLETED</h4>
                        <p>The keyboard shortcuts help overlay positioning issue has been resolved. The overlay now appears as a proper centered modal dialog.</p>
                        <hr>
                        <p class="mb-0"><strong>Next Step:</strong> Use the tests below to verify the fix is working correctly in your Moodle environment.</p>
                    </div>

                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="card border-info">
                                <div class="card-header bg-info text-white">
                                    <h5 class="mb-0">🧪 Manual Test</h5>
                                </div>
                                <div class="card-body">
                                    <p><strong>Press <kbd class="bg-dark text-white p-1 rounded">Alt + ?</kbd></strong></p>
                                    <p class="text-muted">This should open the help overlay as a centered popup dialog above all content.</p>
                                    <div class="mt-3">
                                        <h6>Expected Results:</h6>
                                        <ul class="list-unstyled">
                                            <li>✅ Overlay appears centered on screen</li>
                                            <li>✅ Dark semi-transparent background</li>
                                            <li>✅ Modal dialog with close button</li>
                                            <li>✅ Tabbed interface for shortcuts</li>
                                            <li>✅ Can close with Esc key</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="card border-success">
                                <div class="card-header bg-success text-white">
                                    <h5 class="mb-0">🚀 Automated Test</h5>
                                </div>
                                <div class="card-body">
                                    <button class="btn btn-primary btn-lg" onclick="runPositioningTest()">
                                        Run Positioning Test
                                    </button>
                                    <p class="text-muted mt-2">This will simulate the Alt+? keypress and verify the overlay positioning.</p>
                                    <div id="test-results" class="mt-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card border-warning mb-4">
                        <div class="card-header bg-warning">
                            <h5 class="mb-0">🔧 Technical Details</h5>
                        </div>
                        <div class="card-body">
                            <h6>Changes Applied:</h6>
                            <div class="row">
                                <div class="col-md-4">
                                    <strong>CSS Updates:</strong>
                                    <ul class="small">
                                        <li>Fixed overlay positioning</li>
                                        <li>Added enhanced class support</li>
                                        <li>Improved z-index management</li>
                                        <li>Added flexbox centering</li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <strong>Structure Support:</strong>
                                    <ul class="small">
                                        <li>Regular overlay classes</li>
                                        <li>Enhanced overlay classes</li>
                                        <li>Tabbed interface support</li>
                                        <li>Responsive design fixes</li>
                                    </ul>
                                </div>
                                <div class="col-md-4">
                                    <strong>Compatibility:</strong>
                                    <ul class="small">
                                        <li>Backward compatible</li>
                                        <li>Works with existing themes</li>
                                        <li>No JavaScript changes needed</li>
                                        <li>Cross-browser support</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card border-secondary">
                        <div class="card-header bg-secondary text-white">
                            <h5 class="mb-0">📋 Other Available Shortcuts</h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <h6>Navigation:</h6>
                                    <ul class="small">
                                        <li><kbd>Alt + H</kbd> - Home</li>
                                        <li><kbd>Alt + D</kbd> - Dashboard</li>
                                        <li><kbd>Alt + C</kbd> - Courses</li>
                                        <li><kbd>Alt + P</kbd> - Profile</li>
                                    </ul>
                                </div>
                                <div class="col-md-3">
                                    <h6>Admin:</h6>
                                    <ul class="small">
                                        <li><kbd>Alt + A</kbd> - Admin</li>
                                        <li><kbd>Alt + G</kbd> - Grades</li>
                                        <li><kbd>Alt + N</kbd> - Notifications</li>
                                        <li><kbd>Alt + M</kbd> - Messages</li>
                                    </ul>
                                </div>
                                <div class="col-md-3">
                                    <h6>Tools:</h6>
                                    <ul class="small">
                                        <li><kbd>Alt + S</kbd> - Search</li>
                                        <li><kbd>Alt + F</kbd> - Files</li>
                                        <li><kbd>Alt + T</kbd> - Calendar</li>
                                        <li><kbd>Alt + B</kbd> - Bookmarks</li>
                                    </ul>
                                </div>
                                <div class="col-md-3">
                                    <h6>System:</h6>
                                    <ul class="small">
                                        <li><kbd>Alt + L</kbd> - Logout</li>
                                        <li><kbd>Alt + E</kbd> - Edit Mode</li>
                                        <li><kbd>Alt + I</kbd> - Page Info</li>
                                        <li><kbd>Alt + ?</kbd> - Help</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Sample content to test overlay positioning -->
                    <div class="mt-5 p-4 bg-light rounded">
                        <h3>Sample Page Content</h3>
                        <p>This is sample content to verify that the help overlay appears above all other page elements. The overlay should not affect the layout of this content and should appear as a modal dialog.</p>
                        <div class="row">
                            <div class="col-4"><div class="p-3 bg-primary text-white rounded">Content Block 1</div></div>
                            <div class="col-4"><div class="p-3 bg-success text-white rounded">Content Block 2</div></div>
                            <div class="col-4"><div class="p-3 bg-warning text-white rounded">Content Block 3</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
// Initialize the keyboard shortcuts when page loads
require(['jquery'], function($) {
    console.log('✅ Keyboard shortcuts verification test loaded');
    
    // Initialize enhanced keyboard shortcuts
    require(['local_moodle_plugin_keybord_shortcut_command/keyboard_shortcuts_enhanced'], function(KeyboardShortcuts) {
        console.log('✅ Enhanced keyboard shortcuts module loaded');
        KeyboardShortcuts.init();
    });
});

function runPositioningTest() {
    const resultDiv = document.getElementById('test-results');
    
    // Clear previous results
    resultDiv.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="sr-only">Testing...</span></div>';
    
    setTimeout(() => {
        // Simulate keyboard shortcut
        const event = new KeyboardEvent('keydown', {
            code: 'Slash',
            key: '?',
            altKey: true,
            shiftKey: true,
            bubbles: true
        });
        
        document.dispatchEvent(event);
        
        // Check if overlay was created
        setTimeout(() => {
            const overlay = document.querySelector('.keyboard-shortcuts-overlay');
            const helpContent = document.querySelector('.keyboard-shortcuts-help');
            
            let results = '<div class="mt-3">';
            
            if (overlay) {
                const overlayStyles = window.getComputedStyle(overlay);
                const isFixed = overlayStyles.position === 'fixed';
                const hasFullSize = overlayStyles.width === '100%' || overlayStyles.width.includes('100');
                const isFlexCentered = overlayStyles.display === 'flex';
                const hasHighZIndex = parseInt(overlayStyles.zIndex) >= 10000;
                
                results += '<h6 class="text-success">✅ Overlay Element Found</h6>';
                results += '<ul class="list-unstyled small">';
                results += `<li>${isFixed ? '✅' : '❌'} Position: ${overlayStyles.position}</li>`;
                results += `<li>${hasFullSize ? '✅' : '❌'} Width: ${overlayStyles.width}</li>`;
                results += `<li>${isFlexCentered ? '✅' : '❌'} Display: ${overlayStyles.display}</li>`;
                results += `<li>${hasHighZIndex ? '✅' : '❌'} Z-index: ${overlayStyles.zIndex}</li>`;
                results += '</ul>';
                
                if (helpContent) {
                    const helpStyles = window.getComputedStyle(helpContent);
                    results += '<h6 class="text-success">✅ Help Content Found</h6>';
                    results += '<ul class="list-unstyled small">';
                    results += `<li>Position: ${helpStyles.position}</li>`;
                    results += `<li>Width: ${helpStyles.width}</li>`;
                    results += `<li>Max-width: ${helpStyles.maxWidth}</li>`;
                    results += '</ul>';
                }
                
                const allTestsPassed = isFixed && hasFullSize && isFlexCentered && hasHighZIndex;
                
                if (allTestsPassed) {
                    results += '<div class="alert alert-success mt-2"><strong>🎉 ALL TESTS PASSED!</strong><br>The help overlay positioning fix is working correctly.</div>';
                } else {
                    results += '<div class="alert alert-warning mt-2"><strong>⚠️ SOME TESTS FAILED</strong><br>Please check the CSS implementation.</div>';
                }
                
                // Add close button
                results += '<button class="btn btn-sm btn-secondary mt-2" onclick="closeOverlay()">Close Overlay</button>';
                
            } else {
                results += '<div class="alert alert-danger"><strong>❌ ERROR:</strong> Overlay element not found. Please check if the JavaScript module is properly loaded.</div>';
            }
            
            results += '</div>';
            resultDiv.innerHTML = results;
            
        }, 500);
        
    }, 1000);
}

function closeOverlay() {
    const overlay = document.querySelector('.keyboard-shortcuts-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// Add some styling for the test page
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .card { margin-bottom: 1rem; }
        kbd { 
            background-color: #212529 !important; 
            color: white !important; 
            padding: 0.2rem 0.4rem !important;
            border-radius: 0.25rem !important;
            font-size: 0.875em !important;
        }
        .test-item { 
            padding: 0.5rem; 
            margin: 0.25rem 0; 
            border-left: 3px solid #007bff; 
            background: #f8f9fa; 
        }
    `;
    document.head.appendChild(style);
});
</script>

<?php
echo $OUTPUT->footer();
?>
