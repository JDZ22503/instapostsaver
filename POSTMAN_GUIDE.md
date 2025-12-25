# 📮 POSTMAN API COLLECTION GUIDE

## 🎯 **How to Import & Use**

---

## 📥 **Step 1: Import Collection**

### **Method 1: Direct Import (Easiest)**

1. Open **Postman** app or web (postman.com)
2. Click **"Import"** button (top left)
3. Click **"Upload Files"**
4. Select: `d:\test\Instagram_Saver_API.postman_collection.json`
5. Click **"Import"**
6. ✅ Done! Collection appears in left sidebar

### **Method 2: Drag & Drop**

1. Open Postman
2. Drag the JSON file into Postman window
3. ✅ Imported!

---

## ⚙️ **Step 2: Configure Variables**

The collection uses a variable `{{base_url}}` which is set to:
```
http://192.168.0.75:3000
```

**To Change IP:**
1. Click on collection name
2. Click "Variables" tab
3. Update `base_url` value
4. Save

---

## 📋 **API Endpoints Overview**

### **1. Health Check**
```
GET /
```
**Purpose:** Check if server is running

**Response:**
```
Instagram Media Downloader API is Running
```

---

### **2. Fetch Instagram Media**
```
GET /api/v1/fetch?url={instagram_url}
```

**Purpose:** Get media details from Instagram post/reel

**Parameters:**
- `url` (required): Instagram post/reel URL

**Example Request:**
```
GET /api/v1/fetch?url=https://www.instagram.com/p/DSR-dLWjG4a/
```

**Example Response:**
```json
{
  "success": true,
  "id": "DSR-dLWjG4a",
  "type": "image",
  "metadata": {
    "title": "Caption text here..."
  },
  "media": [
    {
      "type": "image",
      "url": "https://instagram.fraj3-3.fna.fbcdn.net/...",
      "thumbnail": null,
      "width": null,
      "height": null
    }
  ]
}
```

**Supports:**
- ✅ Single images
- ✅ Single videos
- ✅ Carousel posts (multiple images/videos)
- ✅ Reels

---

### **3. Download Media (Proxy)**
```
GET /api/v1/download?url={media_url}
```

**Purpose:** Download media file through proxy

**Parameters:**
- `url` (required): Direct media URL from Instagram CDN

**Example Request:**
```
GET /api/v1/download?url=https://instagram.fraj3-3.fna.fbcdn.net/v/t51.2885-15/image.jpg
```

**Response:**
- Binary file (image or video)
- Automatic download with proper filename

**Use Case:**
This endpoint proxies Instagram CDN URLs to avoid CORS and 403 errors when downloading from client apps.

---

## 🔄 **Typical Workflow**

### **Complete Example:**

**Step 1: Fetch Media Details**
```
GET /api/v1/fetch?url=https://www.instagram.com/p/ABC123/

Response:
{
  "success": true,
  "media": [
    {
      "type": "image",
      "url": "https://instagram.fraj3-3.fna.fbcdn.net/image1.jpg"
    },
    {
      "type": "image",
      "url": "https://instagram.fraj3-3.fna.fbcdn.net/image2.jpg"
    }
  ]
}
```

**Step 2: Download Specific Media**
```
GET /api/v1/download?url=https://instagram.fraj3-3.fna.fbcdn.net/image1.jpg

Response:
[Binary Image File]
```

---

## 📝 **Sample Requests in Postman**

### **1. Test Health Check**

1. Select "Health Check" request
2. Click "Send"
3. ✅ Should return: "Instagram Media Downloader API is Running"

---

### **2. Fetch Single Image**

1. Select "Fetch Instagram Media" request
2. In query params, set `url` to:
   ```
   https://www.instagram.com/p/DSR-dLWjG4a/
   ```
3. Click "Send"
4. ✅ Check response JSON

---

### **3. Fetch Carousel Post**

1. Select "Fetch Instagram Media" request
2. Change `url` parameter to a carousel post
3. Click "Send"
4. ✅ Response will have multiple items in `media` array

---

### **4. Download Image**

1. First, fetch media details to get URL
2. Copy a media URL from response
3. Select "Download Media (Proxy)" request
4. Paste URL in `url` parameter
5. Click "Send"
6. Click "Save Response" → "Save to file"
7. ✅ Image/video downloaded!

---

## 🧪 **Test Data**

### **Sample Instagram URLs for Testing:**

**Single Image:**
```
https://www.instagram.com/p/DSR-dLWjG4a/
```

**Reel (Video):**
```
https://www.instagram.com/reel/CxDfDv2suD8/
```

**Note:** Use real, public Instagram URLs for testing.

---

## 📊 **Response Format Details**

### **Success Response:**
```json
{
  "success": true,
  "id": "shortcode",
  "type": "image | video | carousel",
  "metadata": {
    "title": "Caption text"
  },
  "media": [
    {
      "type": "image | video",
      "url": "https://...",
      "thumbnail": "https://..." | null,
      "width": number | null,
      "height": number | null
    }
  ]
}
```

### **Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## ⚠️ **Common Error Messages**

| Error | Meaning | Solution |
|-------|---------|----------|
| "URL parameter is required" | Missing URL parameter | Add `url` query param |
| "Invalid Instagram URL" | Wrong URL format | Use valid Instagram post/reel URL |
| "Could not access post" | Post is private/deleted | Use public post URL |
| "Internal Server Error" | Backend issue | Check backend logs |

---

## 🔧 **Advanced Usage**

### **Using Environment Variables:**

1. Create new environment in Postman
2. Add variable:
   - Name: `base_url`
   - Value: `http://192.168.0.75:3000`
3. Select environment
4. All requests will use this URL

### **Chaining Requests:**

1. In "Fetch Media" request, add to Tests tab:
   ```javascript
   // Save first media URL to environment
   const response = pm.response.json();
   if (response.success && response.media.length > 0) {
       pm.environment.set("media_url", response.media[0].url);
   }
   ```

2. In "Download" request, use:
   ```
   {{media_url}}
   ```

3. Run "Fetch" then "Download" - automatic chaining!

---

## 📦 **Collection Structure**

```
Instagram Saver API
├── Health Check
├── Fetch Instagram Media
│   ├── Example: Single Image
│   ├── Example: Carousel
│   ├── Error: Invalid URL
│   └── Error: Missing URL
└── Download Media (Proxy)
    ├── Example: Image Download
    ├── Example: Video Download
    └── Error: Missing URL
```

---

## 🎯 **Quick Reference**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Health check |
| `/api/v1/fetch` | GET | Fetch media details |
| `/api/v1/download` | GET | Download media file |

**Base URL:** `http://192.168.0.75:3000`

---

## ✅ **Checklist Before Testing**

- [ ] Backend server is running (`npm start` in `d:\test\backend`)
- [ ] Postman collection imported
- [ ] `base_url` variable is correct
- [ ] Using public Instagram URLs
- [ ] Network connectivity is good

---

## 🎉 **You're All Set!**

The collection includes:
- ✅ All API endpoints
- ✅ Example requests
- ✅ Sample responses
- ✅ Error examples
- ✅ Complete documentation

Just import the collection and start testing! 🚀
