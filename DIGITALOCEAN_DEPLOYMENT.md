# 🚀 DIGITALOCEAN DEPLOYMENT GUIDE

## 📋 **Complete Step-by-Step Guide to Deploy Your Instagram Saver API**

---

## 1️⃣ **SERVER REQUIREMENTS**

### **Minimum Specs:**
- **RAM:** 1GB (recommended: 2GB)
- **CPU:** 1 core (recommended: 2 cores)
- **Storage:** 25GB SSD
- **OS:** Ubuntu 22.04 LTS

### **Recommended DigitalOcean Droplet:**
- **$6/month** - 1GB RAM, 1 CPU, 25GB SSD
- **$12/month** - 2GB RAM, 1 CPU, 50GB SSD (Recommended)

---

## 2️⃣ **CREATE DIGITALOCEAN DROPLET**

### **Step 1: Sign up for DigitalOcean**
1. Go to https://www.digitalocean.com
2. Create account (Get $200 free credit for 60 days!)
3. Verify email and payment method

### **Step 2: Create a Droplet**
1. Click **"Create"** → **"Droplets"**
2. **Choose Region:** Select closest to your users
   - Example: Bangalore, India or Singapore
3. **Choose Image:** 
   - Distribution: **Ubuntu**
   - Version: **22.04 (LTS) x64**
4. **Choose Size:**
   - Basic plan
   - **$12/month** (2GB RAM, 1 CPU)
5. **Authentication:**
   - Choose **"Password"**
   - Set a strong password (save it!)
6. **Hostname:** `instagram-saver-api`
7. Click **"Create Droplet"**
8. Wait 1-2 minutes for creation

### **Step 3: Note Your Server IP**
You'll see your droplet with an IP like: `123.45.67.89`

**Save this IP!**

---

## 3️⃣ **CONNECT TO SERVER**

### **Windows (Using PowerShell):**
```powershell
ssh root@123.45.67.89
```
(Replace `123.45.67.89` with your actual IP)

Enter your password when prompted.

### **First Time Setup - Update System:**
```bash
apt update
apt upgrade -y
```

---

## 4️⃣ **INSTALL REQUIRED SOFTWARE**

### **Step 1: Install Node.js 20.x**
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install Node.js
apt install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v   # Should show 10.x.x
```

### **Step 2: Install Python 3 & pip**
```bash
# Install Python 3 and pip
apt install -y python3 python3-pip

# Verify installation
python3 --version  # Should show Python 3.10+
pip3 --version
```

### **Step 3: Install Git**
```bash
apt install -y git

# Verify
git --version
```

### **Step 4: Install PM2 (Process Manager)**
```bash
npm install -g pm2

# Verify
pm2 --version
```

### **Step 5: Install Nginx (Web Server)**
```bash
apt install -y nginx

# Start Nginx
systemctl start nginx
systemctl enable nginx

# Check status
systemctl status nginx
```

---

## 5️⃣ **UPLOAD YOUR BACKEND CODE**

### **Method 1: Using Git (Recommended)**

If you have your code in GitHub/GitLab:

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone your repository
git clone https://github.com/yourusername/instagram-saver-backend.git
cd instagram-saver-backend
```

### **Method 2: Using SCP (From Your Computer)**

On your Windows PowerShell:

```powershell
# Navigate to your project
cd d:\test

# Upload backend folder to server
scp -r backend root@123.45.67.89:/var/www/instagram-saver-backend
```

### **Method 3: Manual Upload**

1. Zip your `d:\test\backend` folder
2. Use FileZilla or WinSCP
3. Upload to `/var/www/instagram-saver-backend`

**For this guide, we'll use Method 2 (SCP).**

---

## 6️⃣ **INSTALL DEPENDENCIES**

### **On Server (SSH):**

```bash
# Navigate to backend directory
cd /var/www/instagram-saver-backend

# Install Node.js dependencies
npm install

# Install Python dependencies
pip3 install instagrapi
```

---

## 7️⃣ **CONFIGURE ENVIRONMENT**

### **Create .env file (if needed):**

```bash
nano /var/www/instagram-saver-backend/.env
```

Add (if you need any environment variables):
```
PORT=3000
NODE_ENV=production
```

Save: `Ctrl+X`, then `Y`, then `Enter`

---

## 8️⃣ **START SERVER WITH PM2**

### **Start the Application:**

```bash
cd /var/www/instagram-saver-backend

# Start with PM2
pm2 start server.js --name "instagram-api"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command it shows
```

### **Check if Running:**

```bash
pm2 status
pm2 logs instagram-api
```

### **Test Locally:**

```bash
curl http://localhost:3000
```

Should return: "Instagram Media Downloader API is Running"

---

## 9️⃣ **CONFIGURE NGINX (REVERSE PROXY)**

### **Create Nginx Configuration:**

```bash
nano /etc/nginx/sites-available/instagram-api
```

### **Add this configuration:**

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain or IP

    # API endpoints
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeouts for large downloads
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }
}
```

**Replace `your-domain.com` with:**
- Your domain (if you have one): `api.yourapp.com`
- OR your IP address: `123.45.67.89`

### **Enable the site:**

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/instagram-api /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

---

## 🔟 **SETUP SSL (HTTPS) - Optional but Recommended**

### **Step 1: Point Domain to Server**

If you have a domain:
1. Go to your domain registrar
2. Create an A record:
   - Name: `api` (or `@` for root)
   - Value: Your server IP (`123.45.67.89`)
3. Wait 5-10 minutes for DNS propagation

### **Step 2: Install Certbot (SSL Certificate)**

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d api.yourdomain.com

# Follow prompts:
# - Enter email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)
```

### **Step 3: Auto-renewal**

```bash
# Test renewal
certbot renew --dry-run

# Certbot will auto-renew every 90 days
```

---

## 1️⃣1️⃣ **CONFIGURE FIREWALL**

### **Setup UFW (Ubuntu Firewall):**

```bash
# Allow SSH (important!)
ufw allow OpenSSH

# Allow HTTP
ufw allow 'Nginx HTTP'

# Allow HTTPS
ufw allow 'Nginx HTTPS'

# Enable firewall
ufw enable

# Check status
ufw status
```

---

## 1️⃣2️⃣ **UPDATE MOBILE APP**

### **Update Config.js:**

**File:** `d:\test\mobile\src\constants\Config.js`

```javascript
// Change from local IP to your server
export const API_BASE_URL = "http://123.45.67.89/api/v1";

// OR with domain and HTTPS
export const API_BASE_URL = "https://api.yourdomain.com/api/v1";
```

### **Rebuild Mobile App:**

```powershell
cd d:\test\mobile
eas build --platform android --profile production
```

---

## 1️⃣3️⃣ **TESTING**

### **Test API Endpoints:**

**From your computer:**
```powershell
# Health check
curl http://123.45.67.89

# Fetch media
curl "http://123.45.67.89/api/v1/fetch?url=https://www.instagram.com/p/DSR-dLWjG4a/"
```

**From Postman:**
1. Update `base_url` to `http://123.45.67.89`
2. Test all endpoints

**From Mobile App:**
1. Open app
2. Paste Instagram URL
3. Click search
4. Should work! ✅

---

## 1️⃣4️⃣ **USEFUL PM2 COMMANDS**

```bash
# View all processes
pm2 list

# View logs
pm2 logs instagram-api

# Restart
pm2 restart instagram-api

# Stop
pm2 stop instagram-api

# Delete
pm2 delete instagram-api

# Monitor in real-time
pm2 monit
```

---

## 1️⃣5️⃣ **UPDATING YOUR APP**

### **When you make code changes:**

**On your computer:**
```powershell
# Upload new code
scp -r d:\test\backend root@123.45.67.89:/var/www/instagram-saver-backend
```

**On server:**
```bash
cd /var/www/instagram-saver-backend

# Install new dependencies (if any)
npm install
pip3 install -r requirements.txt  # if you create this

# Restart app
pm2 restart instagram-api

# Check logs
pm2 logs instagram-api
```

---

## 1️⃣6️⃣ **MONITORING & MAINTENANCE**

### **Check Server Health:**

```bash
# CPU and Memory usage
htop  # Press q to quit

# Disk usage
df -h

# Check logs
pm2 logs instagram-api --lines 100
```

### **View Nginx Logs:**

```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

---

## 🔧 **TROUBLESHOOTING**

### **Issue: API not accessible**

**Check if Node.js is running:**
```bash
pm2 status
pm2 logs instagram-api
```

**Check if Nginx is running:**
```bash
systemctl status nginx
```

**Check firewall:**
```bash
ufw status
```

### **Issue: Python dependencies not found**

```bash
pip3 install instagrapi
pip3 list | grep instagrapi
```

### **Issue: Port 3000 already in use**

```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Restart app
pm2 restart instagram-api
```

---

## 📋 **COMPLETE COMMAND REFERENCE**

### **Initial Server Setup:**
```bash
# Update system
apt update && apt upgrade -y

# Install all required software
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs python3 python3-pip git nginx
npm install -g pm2

# Create directory
mkdir -p /var/www
```

### **Deploy Backend:**
```bash
# Upload code (from Windows)
scp -r d:\test\backend root@123.45.67.89:/var/www/instagram-saver-backend

# On server
cd /var/www/instagram-saver-backend
npm install
pip3 install instagrapi

# Start with PM2
pm2 start server.js --name "instagram-api"
pm2 save
pm2 startup
```

### **Configure Nginx:**
```bash
# Create config
nano /etc/nginx/sites-available/instagram-api
# [Add configuration]

# Enable and reload
ln -s /etc/nginx/sites-available/instagram-api /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### **Setup Firewall:**
```bash
ufw allow OpenSSH
ufw allow 'Nginx HTTP'
ufw allow 'Nginx HTTPS'
ufw enable
```

---

## ✅ **DEPLOYMENT CHECKLIST**

- [ ] DigitalOcean droplet created
- [ ] SSH access working
- [ ] Node.js 20.x installed
- [ ] Python 3 & pip installed
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Backend code uploaded
- [ ] npm packages installed
- [ ] Python packages installed (instagrapi)
- [ ] PM2 running the app
- [ ] Nginx configured
- [ ] Firewall setup
- [ ] SSL certificate (if using domain)
- [ ] Mobile app Config.js updated
- [ ] API tested and working

---

## 🎉 **YOU'RE DONE!**

Your Instagram Saver API is now:
- ✅ Running on DigitalOcean
- ✅ Always online (PM2 auto-restart)
- ✅ Accessible from anywhere
- ✅ Production-ready
- ✅ Scalable

**Your API URL:**
- HTTP: `http://123.45.67.89/api/v1`
- HTTPS: `https://api.yourdomain.com/api/v1` (if using domain + SSL)

Update this URL in your mobile app's `Config.js` and rebuild!

---

## 📞 **SUPPORT**

If you face any issues:
1. Check PM2 logs: `pm2 logs instagram-api`
2. Check Nginx logs: `tail -f /var/log/nginx/error.log`
3. Restart services: `pm2 restart instagram-api && systemctl reload nginx`

**Everything should now be working perfectly!** 🚀
