# Deployment Guide — Betwo Tech Website

## Step 1: Upload your project to the server

**On your local machine**, open a terminal and run:

```bash
scp -r /home/amir/Betwo-Tech-Company-website-main betwo_web@178.104.220.147:~/betwo-tech
```

This copies your entire project folder to the server.

## Step 2: SSH into the server

```bash
ssh betwo_web@178.104.220.147 -A
```

## Step 3: Install required software

Run these one by one:

```bash
sudo apt update && sudo apt upgrade -y
```

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

```bash
sudo apt install -y postgresql postgresql-contrib nginx
```

```bash
sudo npm install -g pm2
```

## Step 4: Set up PostgreSQL database

```bash
sudo -i -u postgres psql <<EOF
CREATE DATABASE betwo_tech;
CREATE USER betwo_user WITH PASSWORD 'AEHJSS36';
GRANT ALL PRIVILEGES ON DATABASE betwo_tech TO betwo_user;
\c betwo_tech
GRANT ALL ON SCHEMA public TO betwo_user;
EOF
exit
```

## Step 5: Configure and start the backend

```bash
cd ~/betwo-tech/backend
npm install
```

Create the `.env` file:

```bash
cat > .env << 'EOF'
DB_HOST=localhost
DB_PORT=5432
DB_NAME=betwo_tech
DB_USER=betwo_user
DB_PASSWORD=AEHJSS36
PORT=5003
SESSION_SECRET=your-random-secret-here
NODE_ENV=production
SMTP_EMAIL=betwotechet@gmail.com
SMTP_PASSWORD=jazkuajcsyqegvpg
EOF
```

Start the backend with PM2 (stays running forever):

```bash
pm2 start server.js --name betwo-backend
pm2 save
pm2 startup
```

After `pm2 startup`, it will show you a command to run. Copy-paste and run that command (it enables auto-start on server reboot).

## Step 6: Build the frontend

```bash
cd ~/betwo-tech/frontend
npm install
```

```bash
cat > .env << 'EOF'
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
EOF
```

```bash
npm run build
```

This creates a `dist/` folder with the static website files.

## Step 7: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/betwo-tech
```

Paste this:

```nginx
server {
    listen 80;
    server_name 178.104.220.147;

    # Serve frontend static files
    root /home/betwo_web/betwo-tech/frontend/dist;
    index index.html;

    # API requests go to backend
    location /api/ {
        proxy_pass http://localhost:5003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploaded files (images)
    location /storage/ {
        proxy_pass http://localhost:5003;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # SPA routing — all other paths go to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Save (Ctrl+X, then Y, then Enter).

Then enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/betwo-tech /etc/nginx/sites-enabled/
sudo nginx -t          # test config
sudo systemctl restart nginx
```

## Step 8: Allow HTTP traffic through firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable    # if not already enabled
```

## Done!

Your site should be live at: **http://178.104.220.147**

### Useful commands

| What | Command |
|------|---------|
| Check backend status | `pm2 status` |
| View backend logs | `pm2 logs betwo-backend` |
| Restart backend | `pm2 restart betwo-backend` |
| Stop backend | `pm2 stop betwo-backend` |
| Restart Nginx | `sudo systemctl restart nginx` |
| View Nginx logs | `sudo tail -f /var/log/nginx/error.log` |

### If something goes wrong

1. Check backend logs: `pm2 logs betwo-backend`
2. Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
3. Make sure PostgreSQL is running: `sudo systemctl status postgresql`
4. Make sure port 5003 is listening: `ss -tlnp | grep 5003`
