# 🔧 Gemini API Troubleshooting Guide

## Fixed Issues in Latest Update:

### ✅ **API Endpoint Corrected**
- **Old**: `gemini-pro:generateContent` (404 error)
- **New**: `gemini-1.5-flash-latest:generateContent`

### ✅ **Improved Error Handling**
- Better error messages in ChatBot
- API key validation
- Response format validation

## 🧪 **Test Your Setup**

Open browser console (F12) and run:

```javascript
// Import test function
import { testGeminiIntegration, testDifferentModels } from '/src/utils/testGemini.js';

// Test current setup
testGeminiIntegration();

// Or test different models if still having issues
testDifferentModels();
```

## 🚨 **Common Issues & Fixes**

### 404 Error - Model Not Found
```
❌ Error: HTTP error! status: 404
✅ Fix: Updated to use gemini-1.5-flash-latest
```

### 403 Error - Authentication
```
❌ Error: HTTP error! status: 403  
✅ Fix: Check API key is correct and has permissions
```

### API Key Issues
```
❌ Error: API key not configured
✅ Fix: Ensure .env file has VITE_GEMINI_API_KEY=your_key
```

## 🔄 **If Still Having Issues**

1. **Restart Dev Server**: `npm run dev`
2. **Clear Browser Cache**: Hard refresh (Ctrl+Shift+R)
3. **Check Console**: Open DevTools and look for detailed error logs
4. **Verify API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)

## 📋 **Current Configuration**

**Model**: `gemini-1.5-flash-latest`  
**Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`  
**Temperature**: 0.7  
**Max Tokens**: 1024

## ✨ **Expected Behavior**

After fixes, your ChatBot should:
- ✅ Connect successfully to Gemini AI
- ✅ Provide context-aware cooking assistance
- ✅ Show proper error messages if issues occur
- ✅ Display typing indicators during AI processing

Try the ChatBot now at: `http://localhost:5173/`
