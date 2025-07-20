// Test script to verify Gemini API integration
import { sendMessageToGemini } from '../services/geminiService.js';

export const testGeminiIntegration = async () => {
  try {
    console.log('🧪 Testing Gemini API integration...');
    
    const testContext = "You are RasaYatra's AI assistant, an expert in Indian cuisine and cooking. Help users discover recipes, learn about Indian cuisine, and navigate our platform.";
    const testMessage = "What is biryani?";
    
    console.log('📤 Sending test message:', testMessage);
    
    const response = await sendMessageToGemini(testMessage, testContext);
    console.log('✅ Gemini API Response received:', response);
    
    return response;
  } catch (error) {
    console.error('❌ Gemini API Test Failed:', error);
    
    if (error.message.includes('404')) {
      console.error('💡 Possible fix: The Gemini model endpoint might be incorrect or unavailable');
    } else if (error.message.includes('403')) {
      console.error('💡 Possible fix: Check API key permissions or quota');
    } else if (error.message.includes('API key')) {
      console.error('💡 Possible fix: Verify VITE_GEMINI_API_KEY in .env file');
    }
    
    throw error;
  }
};

// Test different Gemini model endpoints
export const testDifferentModels = async () => {
  const models = [
    'gemini-1.5-flash-latest',
    'gemini-1.5-pro-latest',
    'gemini-pro'
  ];
  
  for (const model of models) {
    try {
      console.log(`🧪 Testing model: ${model}`);
      
      const testUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      const response = await fetch(`${testUrl}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Hello, what is your name?" }] }]
        })
      });
      
      if (response.ok) {
        console.log(`✅ Model ${model} works!`);
        return model;
      } else {
        console.log(`❌ Model ${model} failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Model ${model} error:`, error.message);
    }
  }
  
  return null;
};

// Run in browser console: testGeminiIntegration();
