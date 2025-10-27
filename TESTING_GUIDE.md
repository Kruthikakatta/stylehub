# 🧪 Authentication System - Testing Guide

## 🎯 Objective

Verify that the complete JWT authentication system is working correctly across frontend and backend.

---

## ✅ Pre-Testing Checklist

Before starting tests:
- [ ] Backend running on http://localhost:3000
- [ ] Frontend running on http://localhost:4200
- [ ] MongoDB Atlas connected
- [ ] Browser DevTools available (F12)
- [ ] Fresh browser session (or clear localStorage)

**Start fresh**: Open incognito/private window

---

## 🧪 Test Cases

### Test Suite 1: Signup Flow

#### Test 1.1: Valid Signup
**Steps:**
1. Navigate to http://localhost:4200/signup
2. Enter:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Sign Up" button

**Expected Results:**
- ✅ Success message appears
- ✅ Redirected to home page (`/`)
- ✅ Navbar shows "John Doe" instead of login buttons
- ✅ "Logout" button appears in navbar
- ✅ No console errors

**Verification:**
```
Open DevTools (F12) → Application → LocalStorage
Look for: auth_token (should contain JWT token)
```

---

#### Test 1.2: Signup with Invalid Email
**Steps:**
1. Navigate to /signup
2. Fill form with:
   - Name: `Jane Smith`
   - Email: `invalid-email` (no @domain)
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Sign Up"

**Expected Results:**
- ✅ Error message: "Please provide a valid email"
- ❌ Page does NOT redirect
- ❌ No token in localStorage
- ❌ Navbar still shows login buttons

---

#### Test 1.3: Signup with Short Password
**Steps:**
1. Navigate to /signup
2. Fill form with:
   - Name: `Bob Johnson`
   - Email: `bob@example.com`
   - Password: `123` (only 3 chars)
   - Confirm Password: `123`
3. Click "Sign Up"

**Expected Results:**
- ✅ Error message: "Password must be at least 6 characters"
- ❌ Account NOT created
- ❌ No redirect

---

#### Test 1.4: Signup with Mismatched Passwords
**Steps:**
1. Navigate to /signup
2. Fill form with:
   - Name: `Alice Brown`
   - Email: `alice@example.com`
   - Password: `password123`
   - Confirm Password: `password456`
3. Click "Sign Up"

**Expected Results:**
- ✅ Error message: "Passwords do not match"
- ❌ Account NOT created
- ❌ No token

---

#### Test 1.5: Signup with Duplicate Email
**Steps:**
1. Signup with email: `duplicate@example.com`
2. Logout
3. Try signup again with same email: `duplicate@example.com`
4. Fill other fields correctly
5. Click "Sign Up"

**Expected Results:**
- ✅ Error message: "Email already in use"
- ❌ No new account created
- ❌ No token issued

---

### Test Suite 2: Login Flow

#### Test 2.1: Valid Login
**Steps:**
1. Logout if logged in
2. Navigate to http://localhost:4200/login
3. Enter:
   - Email: `john@example.com` (from signup test)
   - Password: `password123`
4. Click "Login" button

**Expected Results:**
- ✅ Success message appears
- ✅ Redirected to home (`/`)
- ✅ Navbar shows "John Doe"
- ✅ "Logout" button visible
- ✅ Token in localStorage

---

#### Test 2.2: Login with Wrong Email
**Steps:**
1. Navigate to /login
2. Enter:
   - Email: `nonexistent@example.com`
   - Password: `password123`
3. Click "Login"

**Expected Results:**
- ✅ Error message: "Invalid email or password"
- ❌ Not redirected
- ❌ Navbar still shows login buttons
- ❌ No token created

---

#### Test 2.3: Login with Wrong Password
**Steps:**
1. Navigate to /login
2. Enter:
   - Email: `john@example.com` (correct)
   - Password: `wrongpassword` (incorrect)
3. Click "Login"

**Expected Results:**
- ✅ Error message: "Invalid email or password"
- ❌ Not logged in
- ❌ No token created

---

#### Test 2.4: Login with Empty Fields
**Steps:**
1. Navigate to /login
2. Leave email and password empty
3. Click "Login"

**Expected Results:**
- ✅ Error message: "Please provide email and password"
- ❌ Request not sent

---

### Test Suite 3: Route Protection

#### Test 3.1: Access Protected Route Without Login
**Steps:**
1. Clear localStorage: Press F12 → Console → Type:
   ```javascript
   localStorage.clear()
   ```
2. Navigate to http://localhost:4200/outfits

**Expected Results:**
- ✅ Redirected to http://localhost:4200/login
- ❌ Outfit list NOT displayed
- ✅ Still on login page

---

#### Test 3.2: Access Protected Route With Login
**Steps:**
1. Login successfully
2. Click "Outfits" in navbar
3. Or navigate to http://localhost:4200/outfits

**Expected Results:**
- ✅ Outfit list loads
- ✅ No redirect
- ✅ User stays on `/outfits` page

---

#### Test 3.3: Access All Protected Routes
**Steps:**
After logging in, test each route:

```
✅ /outfits          → Outfit list loads
✅ /categories       → Categories load
✅ /bookmarks        → Bookmarks load
✅ /notes            → Notes load
✅ /search           → Search loads
✅ /outfit/:id       → Single outfit loads
```

**Expected Results:**
- All protected routes load successfully
- No redirects
- No errors

---

#### Test 3.4: Access Public Routes Without Login
**Steps:**
1. Clear localStorage
2. Navigate to these routes:

```
✅ /             → Home loads
✅ /login        → Login page loads
✅ /signup       → Signup page loads
```

**Expected Results:**
- All public routes accessible
- No redirects
- Can see content

---

### Test Suite 4: Token Management

#### Test 4.1: Token Storage
**Steps:**
1. Login successfully
2. Open DevTools (F12)
3. Go to Application → LocalStorage
4. Look for `auth_token` entry

**Expected Results:**
- ✅ `auth_token` exists
- ✅ Contains valid JWT (looks like: `eyJhbGciOiJIUzI1NiIs...`)
- ✅ Can be decoded (try jwt.io if interested)

---

#### Test 4.2: Token Persistence on Refresh
**Steps:**
1. Login successfully
2. Navbar shows your name
3. Press F5 (refresh page)
4. Wait for page to reload

**Expected Results:**
- ✅ Still logged in after refresh
- ✅ Navbar still shows your name
- ✅ Token still in localStorage
- ✅ Can access protected routes

---

#### Test 4.3: Token in API Requests
**Steps:**
1. Login successfully
2. Open DevTools (F12)
3. Go to Network tab
4. Click any protected route (e.g., Outfits)
5. Find the request in Network tab
6. Click on request
7. Go to "Request Headers"

**Expected Results:**
- ✅ Authorization header present
- ✅ Format: `Authorization: Bearer <token>`
- ✅ Token matches localStorage value

---

#### Test 4.4: Token Removed on Logout
**Steps:**
1. Login and verify token exists
2. Click "Logout" button
3. Open DevTools
4. Check LocalStorage

**Expected Results:**
- ✅ Redirected to login page
- ✅ `auth_token` removed from localStorage
- ✅ Navbar shows "Login" and "Sign Up" buttons

---

### Test Suite 5: Logout Functionality

#### Test 5.1: Logout from Navbar (Desktop)
**Steps:**
1. Login successfully
2. Look for "Logout" button in navbar
3. Click "Logout"

**Expected Results:**
- ✅ Redirected to login page
- ✅ Token removed
- ✅ Navbar shows login buttons
- ✅ Can't access protected routes

---

#### Test 5.2: Logout from Mobile Menu
**Steps:**
1. Login successfully
2. Resize window to mobile size
3. Click hamburger menu (≡)
4. Scroll down to see logout button
5. Click "Logout"

**Expected Results:**
- ✅ Menu closes
- ✅ Redirected to login
- ✅ Token removed
- ✅ Mobile menu shows login buttons

---

#### Test 5.3: Access Protected Route After Logout
**Steps:**
1. Login and navigate to /outfits
2. Click "Logout"
3. Try to navigate to /outfits directly

**Expected Results:**
- ✅ Redirected to /login
- ❌ Outfit page NOT accessible

---

### Test Suite 6: Navbar Auth Status

#### Test 6.1: Navbar Shows Login/Signup When Logged Out
**Steps:**
1. Fresh browser (clear localStorage)
2. Navigate to http://localhost:4200

**Expected Results:**
- ✅ Navbar shows "Login" button
- ✅ Navbar shows "Sign Up" button
- ❌ No user name displayed
- ❌ No "Logout" button

---

#### Test 6.2: Navbar Shows User Info When Logged In
**Steps:**
1. Login successfully
2. Look at navbar

**Expected Results:**
- ✅ Navbar shows user name (e.g., "John Doe")
- ✅ "Logout" button visible
- ❌ No "Login" button
- ❌ No "Sign Up" button

---

#### Test 6.3: Navbar Responsive Design
**Steps:**
1. Login successfully
2. Resize window to mobile size (< 768px)
3. Click hamburger menu

**Expected Results:**
- ✅ Mobile menu appears
- ✅ Navigation links visible
- ✅ User name shown
- ✅ Logout button available
- ✅ Menu slides in smoothly

---

### Test Suite 7: Form Validation

#### Test 7.1: Empty Form Submission
**Steps:**
1. Go to signup page
2. Leave all fields empty
3. Click "Sign Up"

**Expected Results:**
- ✅ Error shown
- ❌ Form not submitted

---

#### Test 7.2: Email Format Validation
**Steps:**
Test various email formats:
- `test@example.com` → ✅ Valid
- `test@example` → ❌ Invalid
- `@example.com` → ❌ Invalid
- `test.name@example.com` → ✅ Valid
- `test+tag@example.com` → ✅ Valid

**Expected Results:**
- Valid emails accepted
- Invalid emails rejected with error

---

#### Test 7.3: Password Strength
**Steps:**
Test various password lengths:
- `123` (3 chars) → ❌ Too short
- `12345` (5 chars) → ❌ Too short
- `123456` (6 chars) → ✅ Accepted
- `password123` (11 chars) → ✅ Accepted

**Expected Results:**
- Minimum 6 characters enforced
- Clear error message for short passwords

---

### Test Suite 8: Error Handling

#### Test 8.1: Backend Connection Error
**Steps:**
1. Stop backend server
2. Try to login
3. Enter credentials
4. Click "Login"

**Expected Results:**
- ✅ Error message shown
- ✅ User-friendly message (not technical)
- ✅ No crash or hang
- ❌ No navigation

---

#### Test 8.2: Invalid Token Error
**Steps:**
1. Login successfully
2. Open DevTools → Console
3. Manually change token:
   ```javascript
   localStorage.setItem('auth_token', 'invalid-token')
   ```
4. Refresh page
5. Try to access protected route

**Expected Results:**
- ✅ Token rejected
- ✅ Redirected to login
- ❌ Error in console (optional, handled)

---

#### Test 8.3: Console Error Checking
**Steps:**
1. Perform normal flow (signup, login, navigate)
2. Open DevTools Console (F12 → Console)
3. Look for any red error messages

**Expected Results:**
- ✅ No red console errors
- ✅ No CORS errors
- ✅ No network errors
- ⚠️ Warnings are OK

---

### Test Suite 9: Database Verification

#### Test 9.1: User Created in MongoDB
**Steps:**
1. Signup with new email
2. Go to MongoDB Atlas dashboard
3. Navigate to: Databases → stylehub → Collections → users

**Expected Results:**
- ✅ New user document created
- ✅ Contains: name, email, password (hashed), createdAt
- ✅ Password is hashed (looks like: `$2a$10$...`)
- ❌ Not plain text

---

#### Test 9.2: Multiple Users in Database
**Steps:**
1. Create 3 different user accounts
2. Check MongoDB users collection

**Expected Results:**
- ✅ 3 separate user documents
- ✅ Each has unique email
- ✅ Each has different ID
- ✅ All passwords hashed

---

#### Test 9.3: Password Hashing Verification
**Steps:**
1. Create user with email: `hash-test@example.com`
2. Password: `testpassword123`
3. Check MongoDB
4. Look at password field

**Expected Results:**
- ✅ Password is hashed: `$2a$10$...`
- ❌ NOT `testpassword123` in plain text
- ✅ Each hashing is different (even same password)

---

### Test Suite 10: Performance

#### Test 10.1: Login Speed
**Steps:**
1. Open DevTools → Network tab
2. Go to login
3. Enter credentials
4. Click Login
5. Measure time

**Expected Results:**
- ✅ Response time < 2 seconds
- ✅ No timeout errors
- ✅ Smooth redirect

---

#### Test 10.2: Route Navigation Speed
**Steps:**
1. Login successfully
2. Click through multiple routes
3. Measure load times

**Expected Results:**
- ✅ Each route loads quickly
- ✅ No delays in protection check
- ✅ Smooth user experience

---

#### Test 10.3: No Memory Leaks
**Steps:**
1. Login
2. Navigate around
3. Logout
4. Login again (repeat 5 times)
5. Open DevTools → Memory
6. Take heap snapshot before and after

**Expected Results:**
- ✅ No significant memory growth
- ✅ No leaked subscriptions
- ✅ Clean state management

---

## 📊 Test Results Summary

Create a test results log:

```
Test Date: ____________
Tested By: ____________
Browser: ____________
Backend: ✅ Running / ❌ Down
Frontend: ✅ Running / ❌ Down

Test Suite 1 (Signup): ✅ / ❌ Pass/Fail
Test Suite 2 (Login): ✅ / ❌ Pass/Fail
Test Suite 3 (Route Protection): ✅ / ❌ Pass/Fail
Test Suite 4 (Token Management): ✅ / ❌ Pass/Fail
Test Suite 5 (Logout): ✅ / ❌ Pass/Fail
Test Suite 6 (Navbar): ✅ / ❌ Pass/Fail
Test Suite 7 (Form Validation): ✅ / ❌ Pass/Fail
Test Suite 8 (Error Handling): ✅ / ❌ Pass/Fail
Test Suite 9 (Database): ✅ / ❌ Pass/Fail
Test Suite 10 (Performance): ✅ / ❌ Pass/Fail

Overall Result: ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

Issues Found:
- Issue 1: ___________
- Issue 2: ___________

Notes:
_____________________
```

---

## 🔍 Debugging Tips

### If Tests Fail

**Check 1: Backend Running?**
```bash
# Terminal
curl http://localhost:3000
# Should return: Backend is working and ready for outfits!
```

**Check 2: MongoDB Connected?**
```
Look at backend console output
Should show: ✅ MongoDB Atlas connected successfully!
```

**Check 3: Token in LocalStorage?**
```javascript
// DevTools Console
localStorage.getItem('auth_token')
// Should return JWT token or null
```

**Check 4: Console Errors?**
```
DevTools → Console → Look for red errors
Fix each error message shown
```

**Check 5: Network Issues?**
```
DevTools → Network tab → Check requests
Look for red X marks (failed requests)
Check 401/403 status codes (auth issues)
```

---

## ✅ Final Verification

When all tests pass:
- [ ] Signup works with validation
- [ ] Login works with credentials
- [ ] Protected routes are protected
- [ ] Logout removes token
- [ ] Navbar shows correct status
- [ ] Token persists on refresh
- [ ] MongoDB has user data
- [ ] Passwords are hashed
- [ ] No console errors
- [ ] Responsive design works

**Status: ✅ Ready for Production Use**

---

## 📞 Need Help?

If tests fail:
1. Check error message carefully
2. Look at browser console (F12)
3. Check backend console logs
4. Verify MongoDB connection
5. Read error message from /api endpoint
6. Check documentation files
7. Review architecture diagram

**Common Issues & Solutions in QUICK_START.md**

---

**Testing Guide Complete**
**Last Updated**: 2024
**Status**: Ready to test
