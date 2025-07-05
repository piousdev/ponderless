# Ponderless

> A mental gym for your brain's judgement muscles

Ponderless is a mental training platform that diagnoses your decision-making and critical thinking blind spots with science-backed micro-tests, then fixes the weakest links in a 60-second game—rewarding you with XP, streaks and instant feedback.

## 🧠 What is Ponderless?

In just five minutes a day, Ponderless helps you:

- **Diagnose** cognitive blind spots with science-backed micro-tests
- **Train** critical thinking and decision-making skills
- **Track** progress with XP, streaks, and instant feedback
- **Improve** mental fitness through gamified exercises

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ponderless
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables (see [documentation](./documentation/GOOGLE_OAUTH_SETUP.md) for OAuth setup)

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Better Auth
- **Database**: Drizzle ORM
- **Build Tool**: Bun
- **Linting**: Biome

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js app router pages
│   ├── components/             # Reusable UI components
│   ├── config/                 # Configuration files
│   ├── lib/                    # Utility libraries
│   ├── modules/                # Feature modules
│   └── styles/                 # Global styles
├── public/                     # Static assets
├── documentation/              # Project documentation
└── scripts/                    # Build and utility scripts
```

## 🔧 Development

### Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run linter
- `bun lint:fix` - Fix linting issues
- `bun db:generate` - Generate database migrations
- `bun db:migrate` - Run database migrations

### Environment Variables

Required environment variables:

- `DATABASE_URL` - Database connection string
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `NEXT_PUBLIC_BETTER_AUTH_URL` - Authentication URL

## 📚 Documentation

Comprehensive documentation is available in the [`documentation/`](./documentation/) directory:

- [Google OAuth Setup](./documentation/GOOGLE_OAUTH_SETUP.md) - Configure authentication
- [Web Manifest Configuration](./documentation/WEB_MANIFEST.md) - PWA setup
- [Documentation Index](./documentation/README.md) - Full documentation overview

## 🌟 Features

- **Progressive Web App** - Install on mobile and desktop
- **Authentication** - Google OAuth integration
- **Responsive Design** - Works on all devices
- **Type Safety** - Full TypeScript support
- **Modern UI** - Clean, accessible interface
- **Performance** - Optimized for speed

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy automatically on every push

### Manual Deployment

1. Build the application:
   ```bash
   bun build
   ```

2. Start the production server:
   ```bash
   bun start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [ponderless.app](https://ponderless.app)
- **Documentation**: [./documentation/](./documentation/)
- **Creator**: [Pious Alpha](https://piousalpha.com)
