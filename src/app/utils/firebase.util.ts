export const firebaseError = (code: string) => {
    switch (code) {
        case 'auth/email-already-in-use':
            return 'El email already in use';
        case 'auth/weak-password':
            return 'The password is very weak';
        case 'auth/invalid-email':
            return 'The email is invalid';
        case 'auth/invalid-email':
            return "The credentials is invalid";
        case 'auth/user-not-found':
            return "The credentials is invalid";
        case 'auth/wrong-password':
            return "The credentials is invalid";
        default:
            return "error desconocido";
    }
}