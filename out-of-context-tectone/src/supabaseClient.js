import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://egtxvtbfxkbshbjbhqqb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndHh2dGJmeGtic2hiamJocXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzcwOTcsImV4cCI6MjA2OTkxMzA5N30.a4IVfX-24eunwnJyBbOvnw468UsNncpPa1c0t4ppqE0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)