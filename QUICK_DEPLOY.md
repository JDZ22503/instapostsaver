# ⚡ QUICK DEPLOYMENT REFERENCE

## 🚀 **Fast Track - Copy & Paste Commands**

---

## 1. CREATE DROPLET
- Go to DigitalOcean
- Ubuntu 22.04 LTS
- $12/month (2GB RAM)
- Note your IP: `123.45.67.89`

---

## 2. CONNECT & SETUP

```bash
# Connect to server
ssh root@123.45.67.89

# Update system
apt update && apt upgrade -y

# Install everything
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs python3 python3-pip git nginx
npm install -g pm2
pip3 install instagrapi

# Create directory
mkdir -p /var/www
```

---

## 3. UPLOAD CODE

**From Windows PowerShell:**
```powershell
cd d:\test
scp -r backend root@123.45.67.89:/var/www/instagram-saver-backend
```

---

## 4. START APP

```bash
# Install dependencies
cd /var/www/instagram-saver-backend
npm install

# Start with PM2
pm2 start server.js --name "instagram-api"
pm2 save
pm2 startup  # Run the command it shows

# Test
curl http://localhost:3000
```

---

## 5. CONFIGURE NGINX

```bash
nano /etc/nginx/sites-available/instagram-api
```

**Paste this:**
```nginx
server {
    listen 80;
    server_name 123.45.67.89;  # Your IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable:**
```bash
ln -s /etc/nginx/sites-available/instagram-api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 6. SETUP FIREWALL

```bash
ufw allow OpenSSH
ufw allow 'Nginx HTTP'
ufw enable
```

---

## 7. UPDATE MOBILE APP

**File:** `mobile/src/constants/Config.js`
```javascript
export const API_BASE_URL = "http://123.45.67.89/api/v1";
```

**Rebuild:**
```powershell
cd d:\test\mobile
eas build --platform android --profile production
```

---

## ✅ DONE!

**Test:** `http://123.45.67.89/api/v1/fetch?url=INSTAGRAM_URL`

---

## 🔧 USEFUL COMMANDS

```bash
# View logs
pm2 logs instagram-api

# Restart
pm2 restart instagram-api

# Monitor
pm2 monit

# Check Nginx
systemctl status nginx

# Nginx logs
tail -f /var/log/nginx/error.log
```

---

## 📱 UPDATE APP

```powershell
# Upload new code
scp -r d:\test\backend root@123.45.67.89:/var/www/instagram-saver-backend
```

```bash
# On server
cd /var/www/instagram-saver-backend
npm install
pm2 restart instagram-api
```

---

## 💰 COST

**$12/month** for DigitalOcean droplet

**Total setup time:** ~30 minutes

---

**Read `DIGITALOCEAN_DEPLOYMENT.md` for detailed guide!**
