import create, { State, SetState } from 'zustand';
import { User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { IUserData } from '@/pages/AuthPage';
import { auth } from '@/firebase/config';

interface IUserState {
    user: FirebaseUser | null;
    login: (value: IUserData) => void;
    register: (value: IUserData) => void;
    setUser: (value: FirebaseUser | null) => void
    logout: () => void;
}


export const useUserStore = create<IUserState>((set) => ({
    user: null,
    login: async (userData: IUserData) => {
        const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
        set({ user: userCredential.user });
    },
    setUser: (user: FirebaseUser | null) => set({ user }),
    register: async (userData: IUserData) => {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        await updateProfile(userCredential.user, { displayName: userData.name });
        set({ user: userCredential.user });
    },
    logout: async () => {
        await signOut(auth);
        set({ user: null });
    },
}));
