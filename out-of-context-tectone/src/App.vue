

supabase.from('your_table_name').select('*').then(console.log)

<template>
  <QuoteGenerator />
</template>

<script>
import QuoteGenerator from '/Users/breembair/Desktop/Code/out-of-context-tectone/out-of-context-tectone/src/components/QuoteGenerator'
import { supabase } from '@/supabaseClient'
supabase.from('your_table_name').select('*').then(console.log)


export default {
  name: 'App',
  components: {
    QuoteGenerator
  }
}
</script>

