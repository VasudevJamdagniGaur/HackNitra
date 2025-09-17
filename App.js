import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SignInScreen';
import StudentRegistrationScreen from './src/screens/StudentRegistrationScreen';
import ClassYearSelectionScreen from './src/screens/ClassYearSelectionScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TrackExamsScreen from './src/screens/TrackExamsScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';
import NotesScreen from './src/screens/NotesScreen';
import HomeworkScreen from './src/screens/HomeworkScreen';
import HelpDeskScreen from './src/screens/HelpDeskScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import TeacherRemarksScreen from './src/screens/TeacherRemarksScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import FacultyScreen from './src/screens/FacultyScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="StudentRegistration" component={StudentRegistrationScreen} />
          <Stack.Screen name="ClassYearSelection" component={ClassYearSelectionScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="TrackExams" component={TrackExamsScreen} />
          <Stack.Screen name="Attendance" component={AttendanceScreen} />
          <Stack.Screen name="Notes" component={NotesScreen} />
          <Stack.Screen name="Homework" component={HomeworkScreen} />
          <Stack.Screen name="HelpDesk" component={HelpDeskScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="TeacherRemarks" component={TeacherRemarksScreen} />
          <Stack.Screen name="Achievements" component={AchievementsScreen} />
          <Stack.Screen name="Faculty" component={FacultyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
