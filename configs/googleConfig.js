export const googleConfig = {
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    "895935298518-8apvnm51q2vj6ivbm6pbqj7ma5v7dsq9.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: "", // specifies a hosted domain restriction
  loginHint: "", // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: "" // [Android] specifies an account name on the device that should be used
}