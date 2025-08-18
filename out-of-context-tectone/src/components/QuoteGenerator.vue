<template>
  <div class="page-container">
    <header class="header">
      <img class="header-icon" src="/Users/breembair/Desktop/Code/out-of-context-tectone/out-of-context-tectone/src/assets/tectone-image.jpg">
      <h1 class="title">Tectcone Out Of Context</h1>
    </header>

    <main>
      <div class="quote-container">
        <div class="speech-bubble">
          <p class="quote-text">"{{ quote.text }}"</p>
          <p class="quote-author">- Tectone</p>
        </div>
        <button @click="fetchQuote" class="btn-generate">Generate</button>
      </div>
    </main>
  </div>
 </template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient' // update this path to match your actual file

const quote = ref({ text: '' })

const fetchQuote = async () => {
  const { data, error } = await supabase
    .from('quotes')
    .select('text')
    .order('RANDOM()', { ascending: true })
    .limit(1)

  if (error) {
    console.error('Error:', error)
  } else {
    quote.value = data?.[0] || { text: 'No more. :(' }
  }
}
</script>

<style scoped>

  .page-container {
    font-family: sans-serif;
    background-color: #f4f4f9;
    color: #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    box-sizing: border-box;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
  }

  .header-icon {
    font-size: 3rem;
    margin-top: 1rem;
  }

  .quote-container {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .speech-bubble {
    background: #ffffff;
    border-radius: 15px;
    padding: 2rem;
    position: relative;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    margin-bottom: 3rem;
    text-align: center;
  }

  .speech-bubble::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: #ffffff;
    border-bottom: 0;
  }

  .quote-text {
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 1rem;
  }

  #generate-btn {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  #generate-btn:hover {
    background-color: #2980b9;
  }

  </style>
