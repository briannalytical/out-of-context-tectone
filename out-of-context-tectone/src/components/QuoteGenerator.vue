<template>
  <div class="page-container">
    <header class="header">
      <img class="logo-icon" src="/tectone_logo.jpg" alt="Tectone Logo">
      <h1 class="title">Tectone Out Of Context</h1>
    </header>

    <div class="quote-container">
      <div class="thought-bubble">
        <span class="quote-mark quote-mark-left">"</span>
        <span class="quote-mark quote-mark-right">"</span>
        <img class="bubble-icon" src="/tectone_image.jpg" alt="Tectone">
        <p class="quote-text">{{ currentQuote }}</p>
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

    // unused quotes
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select('id, quote_text')
      .eq('is_used', false)

    if (error) {
      console.error('Error:', error)
      currentQuote.value = 'error :('
      return
    }

    if (!quotes || quotes.length === 0) {
      currentQuote.value = 'Thats it. Go watch Tectone.';
      return
    }

    const randomIndex = Math.floor(Math.random() * quotes.length)
    const selectedQuote = quotes[randomIndex]

    // Mark the quote as used
    const { error: updateError } = await supabase
      .from('quotes')
      .update({ is_used: true })
      .eq('id', selectedQuote.id)

    if (updateError) {
      console.error('Error marking quote as used:', updateError)
    }

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
  background: linear-gradient(135deg, #000000 0%, #32CD32 100%);
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile browsers */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 4vh 5vw;
  font-family: Arial, sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}

.header {
  text-align: center;
  flex-shrink: 0;
}

.logo-icon {
  width: min(80px, 15vw);
  height: min(80px, 15vw);
  object-fit: cover;
  margin-bottom: 1vh;
  border-radius: 50%;
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

.title {
  color: white;
  font-size: min(1.5rem, 6vw);
  text-align: center;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  font-weight: bold;
}

.quote-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 90vw;
  flex-grow: 1;
  justify-content: center;
  position: relative;
}

.thought-bubble {
  background: white;
  border-radius: min(30px, 5vw);
  padding: min(1.5rem, 4vw);
  padding-top: min(5rem, 12vh);
  margin-bottom: 3vh;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  position: relative;
  text-align: center;
  min-height: 30vh;
  max-height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: min(350px, 85vw);
  box-sizing: border-box;
}

.thought-bubble::before {
  content: '';
  position: absolute;
  bottom: min(-20px, -3vh);
  left: min(50px, 12vw);
  width: min(30px, 5vw);
  height: min(30px, 5vw);
  background: white;
  border-radius: 50%;
  box-shadow: 0 6px 15px rgba(0,0,0,0.12);
}

.thought-bubble::after {
  content: '';
  position: absolute;
  bottom: min(-35px, -5vh);
  left: min(30px, 7vw);
  width: min(18px, 3vw);
  height: min(18px, 3vw);
  background: white;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.bubble-icon {
  position: absolute !important;
  top: min(0.5rem, 1vh) !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  width: min(95px, 18vw) !important;
  height: min(95px, 18vw) !important;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #e8e8e8;
  box-shadow: 0 5px 15px rgba(0,0,0,0.18);
}

.quote-mark {
  position: absolute;
  font-size: min(3rem, 8vw);
  font-family: Garamond, serif;
  color: rgba(0, 0, 0, 0.5);
  line-height: 1;
  font-weight: bold;
  z-index: 0;
}

.quote-mark-left {
  top: min(7rem, 14vh);
  left: min(0.9rem, 3vw);
}

.quote-mark-right {
  top: min(7rem, 14vh);
  right: min(0.9rem, 3vw);
}

.quote-text {
  font-size: min(1.1rem, 4.2vw);
  font-style: italic;
  color: #2c3e50;
  line-height: 1.4;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  margin-top: min(2rem, 4vh);
  padding: 0 min(0.75rem, 3vw);
  overflow-y: auto;
  max-height: 100%;
}

.quote-author {
  color: #7f8c8d;
  font-weight: bold;
  font-style: italic;
  font-size: min(1.15rem, 4.5vw) !important;
  text-align: right;
  margin: 0;
  margin-right: min(3rem, 8vw);
  position: absolute;
  bottom: min(1rem, 2vh);
  right: 0;
}

.btn-generate {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: min(0.75rem, 2vh) min(1.5rem, 6vw);
  font-size: min(1rem, 4vw);
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.25);
  font-weight: bold;
  flex-shrink: 0;
  white-space: nowrap;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
}

.btn-generate:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>
