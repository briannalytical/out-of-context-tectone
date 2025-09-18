<template>
  <div class="page-container">
    <header class="header">
      <img class="logo-icon" src="/tectone_logo.jpg" alt="Tectone Logo">
      <h1 class="title">Tectone Out Of Context</h1>
    </header>
    
    <div class="quote-container">
      <div class="thought-bubble">
        <img class="bubble-icon" src="/tectone_image.jpg" alt="Tectone">
        <p class="quote-text">"{{ currentQuote }}"</p>
        <p class="quote-author">- Tectone</p>
      </div>
      <button @click="fetchQuote" class="btn-generate" :disabled="loading">
        {{ loading ? 'Loading...' : 'Generate' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { supabase } from '../supabaseClient'

const currentQuote = ref('BIIIIIIG 2025!')
const loading = ref(false)

const adjustFontSize = async () => {
  await nextTick()
  const quoteElement = document.querySelector('.quote-text')
  if (!quoteElement) return
  
  const quoteLength = currentQuote.value.length
  let fontSize
  
  if (quoteLength < 50) {
    fontSize = '1.1rem'
  } else if (quoteLength < 100) {
    fontSize = '1rem'
  } else if (quoteLength < 150) {
    fontSize = '0.9rem'
  } else if (quoteLength < 200) {
    fontSize = '0.8rem'
  } else {
    fontSize = '0.75rem'
  }
  
  quoteElement.style.fontSize = fontSize
}

const fetchQuote = async () => {
  try {
    loading.value = true
    
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select('quote_text')
    
    if (error) {
      console.error('Error:', error)
      currentQuote.value = 'Error loading quotes'
      return
    }
    
    if (!quotes || quotes.length === 0) {
      currentQuote.value = 'No quotes found in database'
      return
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const selectedQuote = quotes[randomIndex]
    
    currentQuote.value = selectedQuote.quote_text
    await adjustFontSize()
    
  } catch (err) {
    console.error('Unexpected error:', err)
    currentQuote.value = 'Something went wrong!'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo-icon {
  width: 100px;
  height: auto;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

.title {
  color: white;
  font-size: 2rem;
  text-align: center;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-weight: bold;
}

.quote-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
  position: relative;
}

.thought-bubble {
  background: white;
  border-radius: 30px;
  padding: 1.5rem;
  padding-top: 4.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  position: relative;
  text-align: center;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 350px;
}

.thought-bubble::before {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 40px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 5px 12px rgba(0,0,0,0.1);
}

.thought-bubble::after {
  content: '';
  position: absolute;
  bottom: -25px;
  left: 25px;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 3px 8px rgba(0,0,0,0.08);
}

.bubble-icon {
  position: absolute !important;
  top: 0.75rem !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: 70px !important;
  height: 70px !important;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e8e8e8;
  box-shadow: 0 3px 8px rgba(0,0,0,0.12);
}

.quote-text {
  font-size: 1.1rem;
  font-style: italic;
  color: #2c3e50;
  line-height: 1.4;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  padding: 0 0.75rem;
}

.quote-author {
  color: #7f8c8d;
  font-weight: bold;
  font-size: 0.85rem !important;
  text-align: right;
  margin: 0;
  margin-right: 0.75rem;
  position: absolute;
  bottom: 1rem;
  right: 0;
}

.btn-generate {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.25);
  font-weight: bold;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
}

.btn-generate:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .logo-icon {
    width: 100px;
  }
  
  .thought-bubble {
    padding: 1.5rem;
    padding-top: 5rem;
    height: 200px;
    max-width: 350px;
  }
  
  .bubble-icon {
    width: 80px !important;
    height: 80px !important;
  }
}
</style>