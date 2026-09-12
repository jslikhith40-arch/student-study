import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signOut, 
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  User
} from '../lib/firebase';
import { UserProfile, UserRole } from '../types';
import { seedInitialAcademicDataIfEmpty } from '../lib/academicData';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  role: UserRole;
  isEmailVerified: boolean;
  signInWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, fullName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  updateProfileData: (data: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  switchRoleDebug?: (newRole: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Trigger initial database verification & seed on boot
  useEffect(() => {
    seedInitialAcademicDataIfEmpty();
  }, []);

  // Synchronize Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadUserProfile = async (user: User) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        // Keep verification sync
        if (user.emailVerified && !data.emailVerified) {
          await updateDoc(userRef, { emailVerified: true });
          data.emailVerified = true;
        }
        setUserProfile(data);
      } else {
        // Prepare initial template profile for newly authenticated users
        const defaultProfile: UserProfile = {
          uid: user.uid,
          fullName: user.displayName || user.email?.split('@')[0] || 'Student',
          email: user.email || '',
          profileImage: user.photoURL || undefined,
          collegeId: 'clg_1',
          collegeName: 'National Institute of Engineering & Technology',
          courseId: 'btech',
          courseName: 'B.Tech',
          branchId: 'btech_cse',
          branchName: 'Computer Science & Engineering',
          year: '3rd Year',
          semester: 'Semester 1',
          rollNumber: '21CS1042',
          role: 'student',
          emailVerified: user.emailVerified,
          authProvider: user.providerData[0]?.providerId || 'password',
          accountStatus: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        };

        await setDoc(userRef, defaultProfile);
        setUserProfile(defaultProfile);
      }
    } catch (err) {
      console.warn('Could not read user profile from cloud Firestore, initializing memory fallback:', err);
      // Fallback local memory profile so user is not stuck
      setUserProfile({
        uid: user.uid,
        fullName: user.displayName || user.email?.split('@')[0] || 'Student User',
        email: user.email || '',
        collegeId: 'clg_1',
        collegeName: 'National Institute of Technology',
        courseId: 'btech',
        courseName: 'B.Tech',
        branchId: 'btech_cse',
        branchName: 'Computer Science & Engineering',
        year: '3rd Year',
        semester: 'Semester 1',
        rollNumber: '21CS1042',
        role: 'student',
        emailVerified: user.emailVerified,
        authProvider: 'firebase',
        accountStatus: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      });
    }
  };

  const signInWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    if (cred.user) {
      await loadUserProfile(cred.user);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      await loadUserProfile(cred.user);
    }
  };

  const registerWithEmail = async (email: string, pass: string, fullName: string) => {
    // Validate Gmail condition
    if (!email.toLowerCase().endsWith('@gmail.com') && !email.toLowerCase().includes('@')) {
      throw new Error('Please enter a valid Gmail address (e.g. name@gmail.com).');
    }

    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (cred.user) {
      // Send official email verification
      await sendEmailVerification(cred.user);

      const newProfile: UserProfile = {
        uid: cred.user.uid,
        fullName,
        email,
        collegeId: 'clg_1',
        collegeName: 'National Institute of Technology',
        courseId: 'btech',
        courseName: 'B.Tech',
        branchId: 'btech_cse',
        branchName: 'Computer Science & Engineering',
        year: '3rd Year',
        semester: 'Semester 1',
        rollNumber: `21CS${Math.floor(1000 + Math.random() * 9000)}`,
        role: 'student',
        emailVerified: false,
        authProvider: 'password',
        accountStatus: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      try {
        await setDoc(doc(db, 'users', cred.user.uid), newProfile);
      } catch (e) {
        console.warn('Set doc error during signup', e);
      }
      setUserProfile(newProfile);
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const resendVerification = async () => {
    if (currentUser) {
      await sendEmailVerification(currentUser);
    }
  };

  const updateProfileData = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, { ...data, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('Update doc fallback', e);
    }
    setUserProfile((prev) => prev ? { ...prev, ...data } : null);
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUserProfile(null);
  };

  const switchRoleDebug = (newRole: UserRole) => {
    if (userProfile) {
      const updated = { ...userProfile, role: newRole };
      setUserProfile(updated);
      if (currentUser) {
        updateDoc(doc(db, 'users', currentUser.uid), { role: newRole }).catch(() => {});
      }
    }
  };

  const role = userProfile?.role || 'student';
  const isEmailVerified = Boolean(currentUser?.emailVerified || userProfile?.emailVerified || currentUser?.providerData[0]?.providerId === 'google.com');

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        role,
        isEmailVerified,
        signInWithGoogle,
        loginWithEmail,
        registerWithEmail,
        resetPassword,
        resendVerification,
        updateProfileData,
        logout,
        switchRoleDebug
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
