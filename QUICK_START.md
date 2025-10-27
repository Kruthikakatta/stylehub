# 🚀 Quick Start Guide - StyleHub Authentication

## ⚡ 30-Second Setup

### **Step 1: Start Backend**
```bash
cd stylehub_fullstack_complete/backend
npm start
# Should show: ✅ MongoDB Atlas connected successfully!
# Server running on port 3000
```

### **Step 2: Start Frontend** (in new terminal)
```bash
cd stylehub_fullstack_complete/frontend
npm start
# Application opens at http://localhost:4200
```

---

## ✨ What's Working

✅ **Signup** - Create new account
✅ **Login** - Authenticate with email/password
✅ **Protected Routes** - Outfits, Categories, Bookmarks, Notes, Search
✅ **User Info Display** - Shows logged-in user in navbar
✅ **Logout** - Clears token and redirects to login
✅ **Token Persistence** - Stays logged in on refresh
✅ **Automatic Token Injection** - All API calls include JWT

---

## 🧪 Try It Out

### **Create Account**
1. Go to http://localhost:4200/signup
2. Enter: Name, Email, Password
3. Click "Sign Up"
4. ✅ You're logged in!

### **Login**
1. Go to http://localhost:4200/login
2. Enter your email & password
3. Click "Login"
4. ✅ See your name in navbar

### **Access Protected Routes**
1. Click "Outfits" in navbar
2. ✅ Should load outfit list (you need to be logged in)

### **Logout**
1. Click "Logout" button in navbar
2. ✅ Redirects to login page
3. ✅ Token removed from browser

---

## 🔍 How to Verify It Works

### **Check Token in Browser**
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **LocalStorage**
4. Look for **auth_token** entry
5. ✅ Should contain JWT (long string)

### **Check MongoDB**
1. Go to MongoDB Atlas dashboard
2. Navigate to stylehub database
3. View **users** collection
4. ✅ Should see your account

### **Check Network Requests**
1. Open DevTools (F12)
2. Go to **Network** tab
3. Make any API request
4. View request headers
5. ✅ Should see `Authorization: Bearer <token>`

---

## 🎨 UI Components

### **Login Page** (`/login`)
- Email input field
- Password input field
- Login button
- Success/Error alerts
- Link to signup

### **Signup Page** (`/signup`)
- Name input field
- Email input field
- Password input field
- Confirm Password field
- Signup button
- Success/Error alerts

### **Navbar Updates**
- **Logged Out**: Shows "Login" & "Sign Up" buttons
- **Logged In**: Shows user name & "Logout" button
- **Mobile**: User info in slide-out menu

---

## 📌 Important Files

| File | Purpose |
|------|---------|
| `backend/models/userModel.js` | User database schema |
| `backend/routes/authRoutes.js` | Authentication endpoints |
| `backend/index.js` | Backend server setup |
| `frontend/src/app/services/auth.service.ts` | Auth logic |
| `frontend/src/app/guards/auth.guard.ts` | Route protection |
| `frontend/src/app/interceptors/auth.interceptor.ts` | Token injection |
| `frontend/src/app/components/layout/navbar/navbar.component.ts` | Navbar with user info |

---

## 🐛 Troubleshooting

### **Backend won't start**
```
Error: Cannot connect to MongoDB
✓ Check MongoDB Atlas credentials
✓ Ensure connection string is correct
✓ Check internet connection
```

### **Frontend compilation error**
```
Error: Cannot find module '@angular/...'
✓ Run: npm install
✓ Delete node_modules and package-lock.json
✓ Run: npm install again
```

### **Login not working**
```
Errors: "Email not found" or "Wrong password"
✓ Make sure you signed up first
✓ Check email spelling
✓ Try another browser
✓ Check backend console for errors
```

### **Token not persisting**
```
Problem: Logged out after refresh
✓ Check if localStorage is enabled
✓ Check browser privacy settings
✓ Clear browser cache
✓ Try in Incognito mode
```

### **Protected routes not working**
```
Problem: Redirect to login even when logged in
✓ Check token in LocalStorage (DevTools)
✓ Check Network tab for Authorization header
✓ Restart frontend server
✓ Check browser console for errors
```

---

## 📱 API Endpoints

All endpoints: `http://localhost:3000`

### **Public Endpoints**
```
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "passwordConfirm": "password123"
}

POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### **Protected Endpoints**
```
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

---

## 💾 Database Structure

### **Users Collection**
```javascript
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$10$...", // hashed with bcrypt
  createdAt: 2024-01-15T10:30:00.000Z
}
```

---

## 🔐 Security Info

- **Passwords**: Hashed with bcryptjs (not stored as plain text)
- **Tokens**: JWT format, expires in 7 days
- **CORS**: Enabled for localhost:4200
- **Validation**: Email format & password length checked

---

## 📚 Next Steps

1. ✅ Test the authentication system
2. ✅ Verify user accounts in MongoDB
3. ✅ Check token persistence
4. ⏭️ Build additional features on top (profile, settings, etc.)
5. ⏭️ Move JWT secret & DB string to environment variables
6. ⏭️ Deploy to production

---

## 🎓 Learn More

- Read: `AUTHENTICATION_SETUP.md` - Complete documentation
- Check: `backend/routes/authRoutes.js` - Backend logic
- Check: `frontend/src/app/services/auth.service.ts` - Frontend logic

---

**Status**: ✅ Ready to use!

Need help? Check the logs or create an issue.