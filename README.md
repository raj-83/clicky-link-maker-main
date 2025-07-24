
# 🔗 URL Shortener

A modern and minimal URL Shortener web application built using **Next.js**, **React**, and **Supabase**.  
Easily shorten long URLs, track visit analytics, and manage your links from a sleek dashboard.

---

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS (optional)
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Deployment**: Vercel (Recommended)

---

## 📸 Features

- 🔐 User authentication (Supabase Auth)
- 🔗 Shorten long URLs instantly
- 📊 Track click count and creation date
- 🗂️ Logged-in users can view and manage their shortened URLs
- ⚡ Fully serverless & scalable

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
2. Install Dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. Configure Environment Variables
Create a .env.local file in the root and add the following:

env
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
You can find these in your Supabase project dashboard.

4. Set Up Supabase Database
Run the following SQL in Supabase SQL editor to create the urls table:

sql
Copy
Edit
create table urls (
  id uuid default uuid_generate_v4() primary key,
  original_url text not null,
  short_code text unique not null,
  click_count int default 0,
  user_id uuid references auth.users(id),
  created_at timestamp default now()
);
Enable Row Level Security (RLS) and add policies if you're using auth.

🧪 Running Locally
bash
Copy
Edit
npm run dev
# or
yarn dev
Visit http://localhost:3000 to access the app.

🌍 Deployment
You can deploy the app easily using Vercel:

bash
Copy
Edit
vercel login
vercel --prod
📁 Folder Structure
bash
Copy
Edit
/pages
  /api
    /shorten.ts      # API route to generate short URL
    /[code].ts       # Redirect handler
/components
  LinkCard.tsx       # UI for displaying shortened links
/lib
  supabaseClient.ts  # Supabase client init
🛡️ Security Notes
Make sure to enable Row Level Security (RLS) in Supabase

Validate input URLs on both client and server

📃 License
This project is licensed under the MIT License.

🙌 Acknowledgements
Supabase

Next.js

Vercel

yaml
Copy
Edit

---

Let me know if you want the `README` to include screenshots, dark mode, multi-user support, or analytics features.








Ask ChatGPT


