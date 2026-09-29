# Qbel Employee Evaluation System

A self-contained browser prototype for point-based employee evaluations.

## Run

Open `index.html` in a browser. No build step or dependencies are required.

## Included

- Employee evaluation dashboard with cycle progress and department health
- Search and department filtering for recent evaluations
- Evaluation modal with shared criteria and department-specific criteria
- HR form structure with 70% common competencies and 30% department process evaluation
- Weighted score calculation from 0 to 5 ratings into a 100-point total
- Responsive layout for desktop and mobile screens

The HR criteria are based on `HR evaluation form.docx`. Department process wording for Operations, Procurement, and Engineering is currently a structured template until those department forms are finalized.

## Supabase database

`supabase-schema.sql` creates the Employee Evaluations and Development Centre cloud tables, indexes, authenticated-user access policies, and private Storage buckets for resource files and certificate evidence. The Development Centre includes development plans, skill assessments, certifications, exam results, and before/after training impact records. In Supabase, open **SQL Editor**, run that file, then provide the app with the project URL and public `anon` key through `supabase-config.js`. Re-run this script after pulling schema updates; it is safe for existing tables. The public anon key is intended for browser apps; never use a Supabase service-role key in this browser app. Keep `supabase-config.js` included in static deployments, or configure the deployment build variables so it is generated.

## GitHub Pages

This is a static app and can be hosted with GitHub Pages. Create a repository, copy the project files into it, push the default branch, then enable **Settings > Pages > Deploy from branch**. Keep `supabase-config.js` out of the repository if it contains environment-specific values.
