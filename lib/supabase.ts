import {createClient} from '@supabase/supabase-js';

const PROJECT_URL = 'https://zgirxxpaoptlkvirnfvi.supabase.co'
const PROJECT_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnaXJ4eHBhb3B0bGt2aXJuZnZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5ODM2ODIsImV4cCI6MjAzODU1OTY4Mn0.ZICS34Uh1Qf7_m2UTxxELqduWlU69SJDw-GrOAs0qGg'

export const supabase = createClient(PROJECT_URL, PROJECT_API_KEY)