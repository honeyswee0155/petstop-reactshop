
import { createClient } from '@supabase/supabase-js';

// Hardcoded for GitHub Pages deployment
const supabaseUrl = 'https://hrgpayrfsuocecopvdgg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZ3BheXJmc3VvY2Vjb3B2ZGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MDI5NjIsImV4cCI6MjA2NjA3ODk2Mn0.cVEvObsQSkjKDl-pKGTMxrJULFlPFV_gfq8OKd7kkjA';

export const supabase = createClient(supabaseUrl, supabaseKey);
