# 🚀 BUILD APK/AAB FOR GOOGLE PLAY STORE

## 📦 **Complete Guide to Play Store Submission**

---

## 📋 **Prerequisites:**

1. ✅ Google Play Developer Account ($25 one-time fee)
2. ✅ Expo account (free - create at expo.dev)
3. ✅ Node.js installed (you already have this)

---

## 🔧 **Step 1: Update app.json Configuration**

First, let's configure your app properly for Play Store:

**File:** `d:\test\mobile\app.json`

Update with these details:

```json
{
  "expo": {
    "name": "Instagram Saver",
    "slug": "instagram-saver",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourname.instagramsaver"
    },
    "android": {
      "package": "com.yourname.instagramsaver",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-media-library",
        {
          "photosPermission": "Allow Instagram Saver to save media to your gallery.",
          "savePhotosPermission": "Allow Instagram Saver to save photos to your gallery.",
          "isAccessMediaLocationEnabled": true
        }
      ]
    ]
  }
}
```

**Important:** Change `com.yourname.instagramsaver` to your own unique package name!

---

## 🎨 **Step 2: Prepare App Icons** (Optional but Recommended)

You'll need these images in `mobile/assets/`:

- `icon.png` - 1024x1024px (app icon)
- `adaptive-icon.png` - 1024x1024px (Android adaptive icon)
- `splash.png` - 1284x2778px (splash screen)

**Quick tip:** You can use a free tool like Canva to create these!

For now, Expo will use default icons if you don't have custom ones.

---

## 📱 **Step 3: Install EAS CLI**

Open PowerShell and run:

```powershell
npm install -g eas-cli
```

---

## 🔐 **Step 4: Login to Expo**

```powershell
eas login
```

**If you don't have an Expo account:**
1. Go to https://expo.dev
2. Click "Sign Up"
3. Create free account
4. Come back and run `eas login`

---

## ⚙️ **Step 5: Configure EAS Build**

Navigate to your mobile folder:

```powershell
cd d:\test\mobile
```

Initialize EAS:

```powershell
eas build:configure
```

This creates an `eas.json` file. Accept all defaults.

---

## 🏗️ **Step 6: Build for Play Store**

### **Option A: AAB (Recommended for Play Store)**

**AAB** (Android App Bundle) is what Google Play Store prefers:

```powershell
eas build --platform android --profile production
```

### **Option B: APK (For Testing)**

If you want an APK to test first:

```powershell
eas build --platform android --profile preview
```

---

## ⏳ **Step 7: Wait for Build**

The build process:
1. ✅ Uploads your code to Expo servers
2. ✅ Builds the app in the cloud
3. ✅ Takes 10-30 minutes
4. ✅ You'll get a download link

You'll see:
```
✔ Build started
✔ Build in progress...
✔ Build finished!
✔ Download: https://expo.dev/artifacts/...
```

---

## 📥 **Step 8: Download Your Build**

Two ways to download:

**Method 1: From Terminal**
- Click the link in terminal
- Downloads AAB/APK file

**Method 2: From Expo Dashboard**
- Go to https://expo.dev
- Click your project
- Go to "Builds"
- Download the AAB/APK

---

## 📤 **Step 9: Upload to Play Store**

### **Create Play Store Listing:**

1. Go to [Google Play Console](https://play.google.com/console)
2. Click "Create app"
3. Fill in details:
   - App name: "Instagram Saver"
   - Default language: English
   - App type: Application
   - Free or Paid: Free

### **Upload AAB:**

1. Go to "Production" → "Create new release"
2. Click "Upload" and select your AAB file
3. Fill in release notes
4. Click "Save" and "Review release"

### **Complete Store Listing:**

You need to provide:
- **App description** (short & full)
- **Screenshots** (2-8 images)
- **App icon** (512x512px)
- **Feature graphic** (1024x500px)
- **Privacy policy** (optional for free apps)
- **Content rating** questionnaire
- **Target audience** (age groups)

### **Submit for Review:**

1. Complete all sections
2. Click "Submit for review"
3. **Wait 1-7 days** for Google's review
4. ✅ App goes live!

---

## 🔄 **Future Updates:**

When you want to update your app:

1. **Increment version** in `app.json`:
   ```json
   "version": "1.0.1",
   "android": {
     "versionCode": 2  // Must increase
   }
   ```

2. **Build new version:**
   ```powershell
   eas build --platform android --profile production
   ```

3. **Upload to Play Store:**
   - Go to existing app
   - Create new release
   - Upload new AAB

---

## 💰 **Costs:**

| Item | Cost |
|------|------|
| Expo Account | FREE ✅ |
| EAS Builds | FREE (limited builds/month) |
| Google Play Developer | $25 (one-time) |
| **Total** | **$25** |

**Note:** Expo gives you free builds. For unlimited builds, it's $29/month (optional).

---

## 🚀 **Quick Command Reference:**

```powershell
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Navigate to project
cd d:\test\mobile

# Configure EAS
eas build:configure

# Build AAB for Play Store
eas build --platform android --profile production

# Build APK for testing
eas build --platform android --profile preview

# Check build status
eas build:list
```

---

## 📝 **Recommended app.json Changes:**

Before building, update these in `mobile/app.json`:

```json
{
  "expo": {
    "name": "Instagram Saver",           // Your app name
    "slug": "instagram-saver",          // URL-friendly name
    "version": "1.0.0",                 // App version
    "android": {
      "package": "com.yourname.instagramsaver",  // CHANGE THIS!
      "versionCode": 1                  // Build number
    }
  }
}
```

**IMPORTANT:** `package` must be **unique** and **never change**!

Format: `com.yourcompanyname.appname`

Example: `com.johndoe.instagramsaver`

---

## ⚠️ **Common Issues & Fixes:**

### **Issue: "package name already exists"**

**Fix:** Change the package name in `app.json` to something unique.

### **Issue: "build failed"**

**Fix:** Check error message. Common causes:
- Missing dependencies
- Invalid app.json
- Network issues

Run: `eas build --platform android --profile production --clear-cache`

### **Issue: "APK too large"**

**Fix:** Use AAB instead of APK. AAB is automatically optimized by Play Store.

---

## 🎯 **What You Need NOW:**

### **Immediate Steps:**

1. ✅ Update `app.json` with your package name
2. ✅ Run `npm install -g eas-cli`
3. ✅ Run `eas login` (create account if needed)
4. ✅ Run `cd d:\test\mobile`
5. ✅ Run `eas build:configure`
6. ✅ Run `eas build --platform android --profile production`
7. ✅ Wait for build (10-30 min)
8. ✅ Download AAB file

### **Later (Play Store Submission):**

1. ⏳ Create Play Store developer account ($25)
2. ⏳ Prepare screenshots & graphics
3. ⏳ Upload AAB to Play Store
4. ⏳ Complete store listing
5. ⏳ Submit for review
6. ⏳ Wait for approval
7. 🎉 Published!

---

## 🎉 **Summary:**

**To build APK/AAB:**
```powershell
npm install -g eas-cli
eas login
cd d:\test\mobile
eas build:configure
eas build --platform android --profile production
```

**To submit to Play Store:**
1. Download AAB from Expo
2. Create app in Play Console
3. Upload AAB
4. Complete store listing
5. Submit for review
6. Go live! 🚀

---

**The process is surprisingly simple with Expo!** Just follow the steps above and you'll have your app on Play Store! 🎊
