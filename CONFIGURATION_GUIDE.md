# ⚙️ CONFIGURATION GUIDE

## 🔧 **How to Configure for Different Environments**

Your app is now **environment-agnostic** - it works in any environment! Just change one file.

---

## 📝 **SINGLE FILE TO CHANGE**

**File:** `mobile/src/constants/Config.js`

This is the **ONLY** file you need to edit to switch between environments!

---

## 🏠 **LOCAL DEVELOPMENT (Testing on WiFi)**

### **Step 1: Find Your Computer's IP**

**Windows:**
```powershell
ipconfig
```
Look for: `IPv4 Address. . . . . . . . : 192.168.0.75`

**Mac/Linux:**
```bash
ifconfig
```

### **Step 2: Update Config.js**

```javascript
export const API_BASE_URL = "http://192.168.0.75:3000/api/v1";
```

Replace `192.168.0.75` with YOUR computer's IP.

### **Step 3: Start Backend**

```powershell
cd d:\test\backend
npm start
```

### **Step 4: Test in Expo Go**

- Both devices on same WiFi
- Scan QR code
- App connects to your computer!

---

## 🌐 **PRODUCTION (Deployed on Server)**

### **Option 1: Using Domain (Recommended)**

If you have a domain like `api.myapp.com`:

```javascript
export const API_BASE_URL = "https://api.myapp.com/api/v1";
```

**Benefits:**
- ✅ Looks professional
- ✅ Easy to remember
- ✅ HTTPS support
- ✅ Can change servers without updating app

### **Option 2: Using Server IP**

If using direct server IP:

```javascript
export const API_BASE_URL = "http://123.45.67.89/api/v1";
```

Replace `123.45.67.89` with your DigitalOcean server IP.

**Note:** Use HTTP (not HTTPS) unless you've set up SSL.

### **Option 3: Using Domain + HTTPS (Best!)**

After setting up SSL (from deployment guide):

```javascript
export const API_BASE_URL = "https://api.myapp.com/api/v1";
```

---

## 🔄 **SWITCHING ENVIRONMENTS**

### **From Local to Production:**

1. Open `mobile/src/constants/Config.js`
2. Change this:
   ```javascript
   // OLD (Local)
   export const API_BASE_URL = "http://192.168.0.75:3000/api/v1";
   ```
   To this:
   ```javascript
   // NEW (Production)
   export const API_BASE_URL = "https://api.myapp.com/api/v1";
   ```
3. Rebuild app:
   ```powershell
   cd d:\test\mobile
   eas build --platform android --profile production
   ```

### **From Production to Local:**

Just reverse the process!

---

## 📱 **TESTING DIFFERENT CONFIGS**

### **Test Local Config:**

```javascript
export const API_BASE_URL = "http://192.168.0.75:3000/api/v1";
```

**Test:**
1. Start backend locally
2. Run app in Expo Go
3. Should connect to your computer

### **Test Production Config:**

```javascript
export const API_BASE_URL = "https://api.myapp.com/api/v1";
```

**Test:**
1. Deploy backend to server
2. Rebuild app
3. Should connect to server

---

## ⚡ **QUICK REFERENCE**

### **Config.js Examples:**

```javascript
// 1. LOCAL DEVELOPMENT (Same WiFi)
export const API_BASE_URL = "http://192.168.0.75:3000/api/v1";

// 2. PRODUCTION (Server IP, HTTP)
export const API_BASE_URL = "http://123.45.67.89/api/v1";

// 3. PRODUCTION (Domain, HTTP)
export const API_BASE_URL = "http://api.myapp.com/api/v1";

// 4. PRODUCTION (Domain, HTTPS) ⭐ RECOMMENDED
export const API_BASE_URL = "https://api.myapp.com/api/v1";
```

---

## 🔍 **HOW IT WORKS**

All files now reference `Config.js`:

**HomeScreen.js:**
```javascript
import { API_BASE_URL } from '../constants/Config';

fetch(`${API_BASE_URL}/fetch?url=...`)
```

**ResultScreen.js:**
```javascript
import { API_BASE_URL } from '../constants/Config';

const BACKEND_URL = API_BASE_URL.replace('/api/v1', '');
```

**Change once, works everywhere!** ✅

---

## 🎯 **COMMON SCENARIOS**

### **Scenario 1: Testing Locally**

**Config:**
```javascript
export const API_BASE_URL = "http://192.168.0.75:3000/api/v1";
```

**Requirements:**
- ✅ Backend running on your computer
- ✅ Phone on same WiFi
- ✅ Using Expo Go

### **Scenario 2: Showing to Friends**

**Config:**
```javascript
export const API_BASE_URL = "https://api.myapp.com/api/v1";
```

**Requirements:**
- ✅ Backend deployed on server
- ✅ App built with EAS
- ✅ Works on any internet connection

### **Scenario 3: Play Store Release**

**Config:**
```javascript
export const API_BASE_URL = "https://api.myapp.com/api/v1";
```

**Requirements:**
- ✅ Backend on production server
- ✅ SSL certificate (HTTPS)
- ✅ Domain name
- ✅ Build production APK/AAB

---

## ⚠️ **IMPORTANT NOTES**

### **After Changing Config.js:**

**For Development (Expo Go):**
- No rebuild needed! ✅
- Just save file
- App auto-reloads

**For Production (Standalone APK/AAB):**
- **MUST rebuild!** ⚠️
- Run: `eas build --platform android --profile production`
- Download new APK/AAB
- Install updated version

### **Backend Server Must Match:**

If your config says:
```javascript
"https://api.myapp.com/api/v1"
```

Then backend must be:
- ✅ Running on server
- ✅ Accessible at that URL
- ✅ HTTPS configured (if using https://)

---

## 🔐 **SECURITY TIPS**

### **Development:**
✅ HTTP is fine
✅ Use IP address
✅ Local network only

### **Production:**
⚠️ Always use HTTPS
⚠️ Use domain name
⚠️ Set up SSL certificate

**Why HTTPS?**
- Encrypted communication
- Secure data transfer
- Required for Play Store
- User trust

---

## 📋 **CHECKLIST**

Before deploying to production:

- [ ] Backend deployed on server
- [ ] Domain pointed to server (if using domain)
- [ ] SSL certificate installed (for HTTPS)
- [ ] `Config.js` updated with production URL
- [ ] App tested with production backend
- [ ] New APK/AAB built
- [ ] Play Store listing updated

---

## 🎉 **SUMMARY**

**One file to rule them all:**
```
mobile/src/constants/Config.js
```

**Change this:**
```javascript
export const API_BASE_URL = "YOUR-BACKEND-URL";
```

**Three states:**
1. **Local:** `http://YOUR-LOCAL-IP:3000/api/v1`
2. **Server:** `http://YOUR-SERVER-IP/api/v1`
3. **Production:** `https://api.yourdomain.com/api/v1`

**That's it!** 🚀

---

## 💡 **PRO TIP**

Keep multiple configs ready:

```javascript
// Edit this line to switch environments:
export const API_BASE_URL = PRODUCTION; // or LOCAL or SERVER

// Configs
const LOCAL = "http://192.168.0.75:3000/api/v1";
const SERVER = "http://123.45.67.89/api/v1";
const PRODUCTION = "https://api.myapp.com/api/v1";
```

Just change which one is exported!

---

**No more hardcoded IPs!** Your app is now portable and production-ready! 🎊
