export const signOutGAPI = () => {
    if (gapi.auth2) {
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            gapi.auth2.getAuthInstance().signOut();
        }
    }
}