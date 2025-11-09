<template>
  <div id="app">
    <TestSupabase />
  </div>
</template>

<script>
// import QuoteGenerator from './components/QuoteGenerator.vue'
import { supabase } from '@/supabaseClient'
supabase.from('quotes').select('*').then(console.log)


export default {
  name: 'App',
  components: {
    // QuoteGenerator
    TestSupabase
  }
}
</script>

