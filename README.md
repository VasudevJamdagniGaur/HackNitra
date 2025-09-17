# Edutrack - Academic Management App

Edutrack is a comprehensive mobile application designed to help students and teachers manage their academic activities efficiently. The app provides features for attendance tracking, exam management, notes access, homework tracking, and much more.

## Features

### 🎯 Core Features
- **Splash Screen** - Beautiful animated splash screen with Edutrack branding
- **Role-based Authentication** - Separate flows for Teachers and Students
- **Student Registration** - Complete registration process with course and class selection
- **Dashboard** - Centralized hub with quick access to all features
- **Sidebar Navigation** - Easy navigation between different sections

### 📚 Academic Management
- **Notice Board** - Display important announcements and notices
- **Track Exams** - View upcoming and past exam schedules with detailed information
- **Attendance Tracking** - QR code-based attendance marking with visual analytics
- **Notes Management** - Access subject-wise notes and PDFs
- **Homework Tracking** - Date-wise homework management with priority levels
- **Results Viewing** - Semester-wise results with detailed grade breakdowns

### 👥 Communication & Support
- **HelpDesk** - Complaint and suggestion submission system
- **Teacher Remarks** - View feedback and remarks from teachers
- **Faculty Directory** - Complete faculty information with contact details

### 🏆 Student Features
- **Achievements** - Track academic and extracurricular achievements
- **Profile Management** - Manage personal and academic information

## Technology Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation between screens
- **React Native Paper** - Material Design components
- **React Native Chart Kit** - Data visualization
- **Expo Camera** - QR code scanning functionality
- **Expo Mail Composer** - Email integration

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Edutrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/emulator**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   
   # For Web
   npm run web
   ```

## Project Structure

```
Edutrack/
├── src/
│   ├── screens/          # All screen components
│   │   ├── SplashScreen.js
│   │   ├── SignInScreen.js
│   │   ├── StudentRegistrationScreen.js
│   │   ├── ClassYearSelectionScreen.js
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── TrackExamsScreen.js
│   │   ├── AttendanceScreen.js
│   │   ├── NotesScreen.js
│   │   ├── HomeworkScreen.js
│   │   ├── HelpDeskScreen.js
│   │   ├── ResultsScreen.js
│   │   ├── TeacherRemarksScreen.js
│   │   ├── AchievementsScreen.js
│   │   └── FacultyScreen.js
│   ├── components/       # Reusable components
│   ├── utils/           # Utility functions
│   └── data/            # Static data and constants
├── App.js               # Main app component
├── package.json         # Dependencies and scripts
└── README.md           # Project documentation
```

## Key Screens

### 1. Splash Screen
- Animated Edutrack logo with book icon
- Smooth transitions to main app

### 2. Authentication Flow
- **Sign In**: Role selection (Teacher/Student)
- **Student Registration**: Multi-step registration process
- **Login**: Existing user authentication

### 3. Dashboard
- Notice board with priority-based notifications
- Quick action buttons for major features
- Sidebar navigation menu
- Profile access

### 4. Academic Features
- **Track Exams**: Upcoming and past exam schedules
- **Attendance**: QR scanner integration with pie chart analytics
- **Notes**: Subject-wise PDF notes with download functionality
- **Homework**: Date-wise homework management
- **Results**: Semester-wise grade tracking

### 5. Communication
- **HelpDesk**: Email-based complaint and suggestion system
- **Teacher Remarks**: Feedback and rating system
- **Faculty**: Complete faculty directory with contact information

### 6. Student Features
- **Achievements**: Multi-category achievement tracking
- **Profile**: Personal and academic information management

## Features in Detail

### Attendance System
- QR code scanning for attendance marking
- Visual pie chart showing attendance percentage
- Low attendance warnings (below 75%)
- Subject-wise attendance tracking

### Notes Management
- Subject codes: BOE-312, BAS-301, BCS-301, BCS-302, BCS-303, BCC-302, BCS-351, BCS-352, BCS-353, BCC-351
- PDF viewer integration
- Download functionality
- Organized by subject and date

### Results System
- Semester 1-8 results tracking
- Sessional 1, Sessional 2, External, and Practicals marks
- CGPA calculation
- Grade-based color coding
- Performance analytics

### Faculty Directory
- Complete faculty information
- Contact details (email, phone)
- Office hours and location
- Specialization and experience
- Rating system

## Customization

The app is designed to be easily customizable:

1. **Colors**: Update the color scheme in individual screen styles
2. **Data**: Modify static data in screen components
3. **Features**: Add or remove features by modifying screen components
4. **Navigation**: Update navigation structure in App.js

## Future Enhancements

- Push notifications for important updates
- Offline mode support
- Real-time data synchronization
- Advanced analytics and reporting
- Integration with college management systems
- Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Edutrack** - Your Academic Companion 📚
