
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pufibkierivdhjxgvklb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Zmlia2llcml2ZGhqeGd2a2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUxMjk3OTksImV4cCI6MjA1MDcwNTc5OX0.rdf1aP9hXiTs9Ui6bcNEg-jBVtK0IA7vDSYHn-HyWBQ'
export const supabase = createClient(supabaseUrl, supabaseKey)