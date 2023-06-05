# Batibot App

An AI-powered messaging companion app for iOS and Android.

- Supports conversation history

<div display='flex'>
<img src="https://raw.githubusercontent.com/zomeru/batibot-app/main/assets/screenshots/login.png" width="30%" height="30%">
<img src="https://raw.githubusercontent.com/zomeru/batibot-app/main/assets/screenshots/home.png" width="30%" height="30%">
</div>

## 🛠 Set Up

- To enable the functionality of Oauth, you must configure your oAuth provider within the Supabase dashboard.

```bash
# install dependencies
yarn install

# copy and modify `.env`
cp .env.example .env

# Start metro
yarn start --reset-cache

# Then choose what platform you want to develop
# Press "a" for Android or "i" for iOS
```
