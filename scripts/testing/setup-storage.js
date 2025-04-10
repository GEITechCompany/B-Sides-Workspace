const { createClient } = require('@supabase/supabase-js');

async function testSupabaseConnection() {
  try {
    const supabaseUrl = 'https://hqbnxraoozwekkyfajxq.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYm54cmFvb3p3ZWtreWZhanhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4NzU4MDAsImV4cCI6MjA1OTQ1MTgwMH0.msHb88nm6EMbLDPSldrAxaubxLxhkQCTMJ68UnS6p4I';
    
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key:', supabaseKey.substring(0, 10) + '...');
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Supabase client created successfully');
    
    // Test connection by getting user
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
    } else {
      console.log('Successfully connected to Supabase!');
      console.log('User:', data.user || 'Not authenticated');
      
      // Simple test to see if we can access storage API
      console.log('Testing storage API access...');
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      
      if (bucketsError) {
        console.error('Error accessing storage:', bucketsError.message);
      } else {
        console.log('Successfully accessed storage API!');
        console.log('Existing buckets:', buckets.map(b => b.name).join(', ') || 'None');
      }
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);
  }
}

testSupabaseConnection(); 