import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Authentication Services
export const authService = {
  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create new user account
  signUp: async (email, password, userData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with additional data
      await updateProfile(user, {
        displayName: userData.name
      });

      // Save user data to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: userData.name,
        email: userData.email,
        rollNo: userData.rollNo,
        course: userData.course,
        year: userData.year,
        section: userData.section,
        college: userData.college,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Sign out current user
  signOut: async () => {
    try {
      console.log('Calling Firebase signOut...');
      await firebaseSignOut(auth);
      console.log('Firebase signOut successful');
      return { success: true };
    } catch (error) {
      console.error('Firebase signOut error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get current user
  getCurrentUser: () => {
    return auth.currentUser;
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};

// Database Services
export const dbService = {
  // Save user profile data
  saveUserProfile: async (userId, userData) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        updatedAt: new Date()
      }, { merge: true });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get user profile data
  getUserProfile: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, error: 'User profile not found' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Save attendance record
  saveAttendance: async (attendanceData) => {
    try {
      const docRef = await addDoc(collection(db, 'attendance'), {
        ...attendanceData,
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get attendance records for a user
  getAttendanceRecords: async (userId) => {
    try {
      const q = query(
        collection(db, 'attendance'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const records = [];
      querySnapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: records };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Save homework assignment
  saveHomework: async (homeworkData) => {
    try {
      const docRef = await addDoc(collection(db, 'homework'), {
        ...homeworkData,
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get homework assignments
  getHomework: async (filters = {}) => {
    try {
      let q = collection(db, 'homework');
      
      if (filters.userId) {
        q = query(q, where('userId', '==', filters.userId));
      }
      if (filters.date) {
        q = query(q, where('date', '==', filters.date));
      }
      
      q = query(q, orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const homework = [];
      querySnapshot.forEach((doc) => {
        homework.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: homework };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Save notice
  saveNotice: async (noticeData) => {
    try {
      const docRef = await addDoc(collection(db, 'notices'), {
        ...noticeData,
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get notices
  getNotices: async (limit = 10) => {
    try {
      const q = query(
        collection(db, 'notices'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const notices = [];
      querySnapshot.forEach((doc) => {
        notices.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: notices.slice(0, limit) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Save help desk query
  saveHelpDeskQuery: async (queryData) => {
    try {
      const docRef = await addDoc(collection(db, 'helpDeskQueries'), {
        ...queryData,
        status: 'pending',
        createdAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get help desk queries for a user
  getHelpDeskQueries: async (userId) => {
    try {
      const q = query(
        collection(db, 'helpDeskQueries'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const queries = [];
      querySnapshot.forEach((doc) => {
        queries.push({ id: doc.id, ...doc.data() });
      });
      return { success: true, data: queries };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};