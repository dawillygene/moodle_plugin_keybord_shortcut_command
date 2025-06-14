# Moodle Keyboard Shortcuts Plugin

A Moodle local plugin that adds keyboard shortcuts for quick navigation throughout the Moodle interface.

## Features

- **Alt+H**: Navigate to Home page
- **Alt+D**: Navigate to Dashboard
- **Alt+C**: Navigate to Courses
- **Alt+P**: Navigate to Profile
- **Alt+S**: Focus search field or open search page
- **Alt+L**: Logout
- **Alt+?**: Show help overlay with all shortcuts

## Installation

1. Download or clone this plugin to your Moodle installation:
   ```bash
   cd /path/to/moodle/local/
   git clone [repository-url] keyboard_shortcuts
   ```

2. Log in to Moodle as an administrator

3. Navigate to Site Administration > Notifications

4. Complete the plugin installation process

## Usage

Once installed, the keyboard shortcuts are automatically available on all Moodle pages. Simply press the key combinations listed above to navigate quickly.

- Shortcuts are disabled when typing in form fields (inputs, textareas, etc.)
- Press **Alt+?** to see a help overlay with all available shortcuts
- Press **Esc** to close the help overlay

## Development

### Testing Outside Moodle

Use the standalone test file for development and debugging:

```bash
# Open in browser
open tests/standalone_test.html
```

### Testing Inside Moodle

1. Install the plugin in your Moodle development environment
2. Navigate to any Moodle page
3. Test keyboard shortcuts
4. Check browser console for any errors

### Building AMD Modules

```bash
cd /path/to/moodle
grunt amd --root=local/keyboard_shortcuts
```

## Version History

- **0.1.0** - Initial development version
- Basic keyboard shortcuts implementation
- Standalone testing environment
- Help overlay functionality

## Requirements

- Moodle 4.4 or higher
- Modern web browser with JavaScript enabled

## License

This plugin is licensed under the GNU GPL v3 or later.

## Author

Developed as part of Moodle plugin development project.

## Support

For issues and questions, please refer to the documentation in the `docs/` directory or check the project repository.
