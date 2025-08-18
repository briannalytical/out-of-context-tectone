<template>
  <QuoteGenerator />
</template>

<script>
import QuoteGenerator from '/Users/breembair/Desktop/Code/out-of-context-tectone/out-of-context-tectone/src/components/QuoteGenerator'
import { supabase } from '@/supabaseClient'
supabase.from('your_table_name').select('*').then(console.log)

const fetchQuote = async () => {
  const { data, error } = await supabase
    .from('quotes')
    .select('text')
    .order('RANDOM()', { ascending: true })
    .limit(1)

  if (error) {
    console.error('Error:', error)
  } else {
    quote.value = data?.[0]?.text || 'No more. :('
  }
}

export default {
  name: 'App',
  components: {
    QuoteGenerator
  }
}
</script>

