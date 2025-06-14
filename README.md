# 🎯 Moodle Keyboard Shortcuts Plugin

A powerful Moodle local plugin that enhances user experience by adding intuitive keyboard shortcuts for quick navigation throughout the Moodle Learning Management System.

## 👨‍💻 Authors & Credits

**Primary Developer**: ELIA WILLIAM MARIKI ([@dawillygene](https://github.com/dawillygene))  
**Project Supervisor**: RAMADHANI ABDALLAH SAID  
**Project Type**: Final Year Project  
**Institution**: [University/College Name]  
**Academic Year**: 2024/2025  

## 📄 License & Distribution

**License**: GNU GPL v3 or later  
**Distribution**: Free and Open Source Software (FOSS)  
**Availability**: Public domain for educational and commercial use  
**Contributing**: Community contributions welcome  

## 🎓 Academic Project Information

This plugin was developed as part of the final year project for **RAMADHANI ABDALLAH SAID**'s degree program. The project demonstrates:

- **Software Engineering Principles**: Modular design, version control, comprehensive testing
- **Web Development Technologies**: JavaScript/AMD, PHP, CSS, HTML5
- **Educational Technology**: Learning Management System enhancement
- **User Experience Design**: Accessibility, responsive design, intuitive interfaces
- **Project Management**: Agile development, documentation, quality assurance

### Project Objectives
1. **Enhance Moodle Usability**: Improve navigation efficiency for students and educators
2. **Accessibility Improvement**: Provide keyboard-only navigation options
3. **Modern Web Standards**: Implement contemporary JavaScript and UX patterns
4. **Educational Impact**: Contribute to open-source educational technology

## ✨ Features

### Core Keyboard Shortcuts
- **Alt+H**: Navigate to Home page
- **Alt+D**: Navigate to Dashboard  
- **Alt+C**: Navigate to Courses
- **Alt+P**: Navigate to Profile
- **Alt+S**: Focus search field or open search page
- **Alt+L**: Logout (with confirmation dialog)
- **Alt+?**: Show help overlay with all shortcuts

### Enhanced User Experience
- **🎨 Visual Feedback**: Toast notifications and smooth animations
- **📱 Mobile Responsive**: Optimized for all device sizes
- **♿ Accessibility**: Screen reader support and keyboard navigation
- **🔒 Smart Detection**: Automatically disables shortcuts in form fields
- **🎯 Confirmation Dialogs**: User-friendly logout confirmation
- **📖 Interactive Help**: Modern help overlay with icons and descriptions

## 🚀 Installation

### Method 1: Download and Install
1. Download the plugin from the repository
2. Extract to your Moodle installation:
   ```bash
   cd /path/to/moodle/local/
   # Extract plugin files to moodle_plugin_keybord_shortcut_command/
   ```

### Method 2: Git Clone (Recommended for Developers)
```bash
cd /path/to/moodle/local/
git clone [repository-url] moodle_plugin_keybord_shortcut_command
```

### Method 3: Moodle Plugin Directory
1. Download from Moodle.org plugins directory
2. Upload via Site Administration > Plugins > Install plugins

### Installation Steps
1. **Upload Files**: Place plugin in `/local/moodle_plugin_keybord_shortcut_command/`
2. **Admin Login**: Log in to Moodle as an administrator
3. **Plugin Detection**: Navigate to Site Administration > Notifications
4. **Complete Installation**: Follow the installation wizard
5. **Configure Settings**: Go to Site Administration > Plugins > Local plugins > Keyboard Shortcuts

## 📖 Usage Guide

### Quick Start
Once installed, keyboard shortcuts are automatically active on all Moodle pages:

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Alt + H` | Home | Navigate to Moodle homepage |
| `Alt + D` | Dashboard | Go to user dashboard |
| `Alt + C` | Courses | Access courses overview |
| `Alt + P` | Profile | View user profile |
| `Alt + S` | Search | Focus search field or open search |
| `Alt + L` | Logout | Secure logout with confirmation |
| `Alt + ?` | Help | Show shortcuts help overlay |
| `Esc` | Close | Close help overlay or dialogs |

### Advanced Features
- **Smart Context**: Shortcuts automatically disable in form fields
- **Visual Feedback**: Toast notifications confirm actions
- **Help System**: Press `Alt + ?` for interactive help
- **Mobile Support**: Touch-friendly on mobile devices
- **Accessibility**: Full screen reader and keyboard support

### Configuration Options
Administrators can configure:
- Enable/disable shortcuts globally
- Customize visual feedback settings
- Configure help overlay behavior
- Set accessibility preferences

## 🛠️ Development & Testing

### For Developers
This plugin includes comprehensive development and testing tools:

### Testing Outside Moodle
```bash
# Open standalone test environment
open tests/standalone_test.html

# Test specific features
open tests/debug_test.php        # Debug version testing
open tests/final_test.php        # Comprehensive test suite
```

### Testing Inside Moodle
1. Install plugin in development environment
2. Navigate to any Moodle page
3. Test keyboard shortcuts functionality
4. Check browser console for debug information
5. Use test pages: `/local/moodle_plugin_keybord_shortcut_command/tests/`

### Building AMD Modules
```bash
cd /path/to/moodle
# Build minified versions
grunt amd --root=local/moodle_plugin_keybord_shortcut_command

# Or manually copy for development
cp amd/src/*.js amd/build/
```

### Plugin Versions Available
- **Basic Version**: Core functionality only
- **Debug Version**: Enhanced logging and debugging
- **Enhanced Version**: Full UX features with animations

### Development Tools Included
- **Standalone Testing**: HTML test environment
- **Plugin Detection**: Moodle integration testing
- **Debug Console**: Real-time JavaScript debugging
- **Performance Testing**: Load time and memory impact analysis

## 📋 Technical Specifications

### Requirements
- **Moodle Version**: 4.4+ (Build: 20240422 or later)
- **PHP Version**: Compatible with Moodle requirements (7.4+)
- **JavaScript**: ES6+ support required
- **Browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

### Architecture
- **Pattern**: AMD (Asynchronous Module Definition)
- **Framework**: Moodle's RequireJS implementation
- **Styling**: Progressive CSS enhancement
- **Performance**: Lazy loading, minimal footprint

### File Structure
```
local/moodle_plugin_keybord_shortcut_command/
├── version.php                    # Plugin metadata
├── lib.php                       # Moodle integration hooks
├── settings.php                  # Admin configuration
├── README.md                     # This documentation
├── lang/en/                      # Language strings
├── amd/src/                      # JavaScript source files
├── amd/build/                    # Minified production files
├── tests/                        # Testing environment
└── docs/                         # Additional documentation
```

## 📊 Version History & Changelog

### Version 0.1.0 (June 2025) - Initial Release
**🎯 Features Added:**
- ✅ Complete keyboard shortcuts system
- ✅ Visual feedback and animations
- ✅ Help overlay with modern design
- ✅ Mobile responsive interface
- ✅ Accessibility compliance
- ✅ Comprehensive testing suite

**🔧 Technical Achievements:**
- AMD module architecture
- Moodle 4.4+ compatibility
- Cross-browser support
- Performance optimization
- Security considerations

**🧪 Testing Completed:**
- Unit testing for all functions
- Integration testing with Moodle
- Cross-browser compatibility testing
- Accessibility compliance verification
- Performance impact assessment

## 🤝 Contributing

### How to Contribute
1. **Fork the Repository**: Create your own copy
2. **Create Feature Branch**: `git checkout -b feature/amazing-feature`
3. **Make Changes**: Follow coding standards
4. **Test Thoroughly**: Use provided testing tools
5. **Submit Pull Request**: Detailed description required

### Development Guidelines
- Follow Moodle coding standards
- Include comprehensive tests
- Update documentation
- Maintain backward compatibility
- Consider accessibility in all changes

### Reporting Issues
- Use GitHub Issues for bug reports
- Include browser/Moodle version information
- Provide steps to reproduce
- Include console error messages

## 📞 Support & Documentation

### Getting Help
- **Documentation**: Check `/docs/` directory
- **Testing**: Use comprehensive test suite in `/tests/`
- **Issues**: Report via project repository
- **Community**: Moodle developer forums

### Educational Use
This project is specifically designed for:
- **Computer Science Students**: Learning web development
- **Educational Institutions**: Teaching modern development practices
- **Open Source Community**: Contributing to educational technology
- **Accessibility Advocates**: Promoting inclusive design

## 🏆 Academic Recognition

**Project Status**: ✅ **COMPLETED SUCCESSFULLY**

This final year project demonstrates proficiency in:
- **Modern Web Development**: JavaScript, PHP, CSS, HTML5
- **Software Engineering**: Version control, testing, documentation
- **User Experience Design**: Accessibility, responsiveness, usability
- **Educational Technology**: LMS enhancement, pedagogical considerations
- **Open Source Development**: Community standards, collaborative practices

**Supervisor Approval**: RAMADHANI ABDALLAH SAID  
**Development Lead**: ELIA WILLIAM MARIKI (@dawillygene)  
**Project Classification**: Educational Technology Enhancement  
**Contribution Type**: Open Source Software Development  

---

## 🌟 Acknowledgments

Special thanks to:
- **Moodle Community**: For excellent documentation and support
- **Open Source Contributors**: For inspiration and best practices
- **Academic Supervisors**: For guidance and project oversight
- **Beta Testers**: For feedback and quality assurance

---

**💝 This project is dedicated to improving educational technology accessibility and user experience for students and educators worldwide.**

---
*Developed with ❤️ for the education community | Free and Open Source Software | GPL v3+ Licensed*
