# Reset And Restore Plan

Do not delete the current Supabase project until the completed JSON export is present in this folder and its record counts have been verified.

After the reset:
1. Create a new GitHub repository and upload this workspace.
2. Create a new Supabase project.
3. Run ../supabase-schema.sql in the Supabase SQL Editor.
4. Configure the new project URL and publishable anon key in Vercel environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
5. Import the JSON backup tables in this order: employees, development_resources, evaluations, training_assignments.
6. Create one Vercel project from the new GitHub repository and use only its production domain.

The retired Snagging workspace table was intentionally deleted and cannot be restored from this backup.
