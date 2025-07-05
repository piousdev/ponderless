# Google OAuth Setup for Better Auth

To make Google sign-in work, you need to configure your Google OAuth app with the correct redirect URI:

## Required Redirect URI
Add this redirect URI to your Google OAuth app in the Google Cloud Console:
```
http://localhost:3000/api/auth/callback/google
```

## Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Add the redirect URI above to "Authorized redirect URIs"
6. Save the changes

## Production Setup
For production, replace `http://localhost:3000` with your actual domain:
```
https://yourdomain.com/api/auth/callback/google
```

## Environment Variables
Make sure these are set in your `.env` file:
- `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret
- `NEXT_PUBLIC_BETTER_AUTH_URL` - Your app's base URL (e.g., http://localhost:3000)