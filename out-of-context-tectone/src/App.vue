<template>
  <div id="app">
    <QuoteGenerator />
  </div>
</template>

<script>
import QuoteGenerator from './components/QuoteGenerator.vue'
import { supabase } from '@/supabaseClient'
supabase.from('out_of_context_tectone').select('*').then(console.log)


export default {
  name: 'App',
  components: {
    QuoteGenerator
  }
}
</script>

