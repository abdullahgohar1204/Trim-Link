# 🔗 URL Shortener

A simple, fast URL shortener built with Next.js, MongoDB, and Tailwind CSS. Paste a long URL, get a short one instantly — with optional custom short links.

## Features

- ⚡ Instant URL shortening
- 🔗 Custom short link names (optional, with validation)
- 🆓 No sign-up required
- 📋 One-click copy to clipboard
- 🚀 Automatic redirect from short link to original URL
- ✅ Duplicate short-name checking
- 🌐 Link validation (verify the original URL is reachable before shortening)

## Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS

## Project Structure

```
url-shortener/
├── app/
│   ├── page.jsx              # Home page
│   ├── layout.tsx            # Root layout + navbar
│   ├── globals.css
│   ├── about/page.jsx        # About page
│   ├── contact/page.jsx      # Contact page
│   ├── generate/page.jsx     # URL generation page
│   ├── api/generate/route.js # API route for shortening logic
│   └── [shortUrl]/page.jsx   # Dynamic route for redirection
├── components/
│   └── Navbar.jsx
├── lib/
│   └── mongodb.js            # Database connection
├── models/
│   └── url.js                # Mongoose schema
└── public/
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | Your MongoDB connection string |
| `NEXT_PUBLIC_BASE_URL` | The base URL of your deployed app (used to generate short links) |

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository into Vercel
3. Add your environment variables (`MONGODB_URI`, `NEXT_PUBLIC_BASE_URL`) in Vercel's project settings — set `NEXT_PUBLIC_BASE_URL` to your actual deployed domain
4. Deploy

## Roadmap

- [ ] Click analytics per short link
- [ ] User accounts to manage saved links

## License

Open-source and free to use.
