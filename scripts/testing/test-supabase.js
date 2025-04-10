// A simple script to test Supabase connectivity
console.log('Testing Supabase connectivity...');

const supabaseUrl = 'https://hqbnxraoozwekkyfajxq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYm54cmFvb3p3ZWtreWZhanhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzU4MDAsImV4cCI6MjA1OTQ1MTgwMH0.msHb88nm6EMbLDPSldrAxaubxLxhkQCTMJ68UnS6p4I';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey.substring(0, 15) + '...');

// Import Supabase client
const { createClient } = require('@supabase/supabase-js');

try {
  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client created successfully');
  
  // Test an API call
  console.log('Testing API call...');
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('Session:', data.session ? 'Active' : 'None');
    }
  });
} catch (error) {
  console.error('Error:', error.message);
} 