# OSC-Lit

OSC-Lit is a modern web application designed to help developers discover and contribute to open-source projects easily. Built with Next.js and TypeScript, it provides an intuitive interface for exploring GitHub repositories and making meaningful contributions to the open-source community.

## 🌟 Features

- **Repository Discovery**: Browse through popular open-source repositories
- **GSOC Organizations**: Special focus on Google Summer of Code organizations
- **Advanced Filtering**: Filter repositories by language, topics, and popularity
- **Real-time Search**: Instant search results with debounced queries
- **Rate Limit Management**: Smart handling of GitHub API rate limits
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Tech Stack**: Built with Next.js, TypeScript, and Tailwind CSS

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & GSAP
- **Icons**: React Icons
- **API**: GitHub REST API

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- A GitHub account
- A GitHub Personal Access Token (PAT)

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaishcodescape/OSC-Lit.git
   cd OSC-Lit
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add your GitHub token:
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_GITHUB_TOKEN` | Your GitHub Personal Access Token |

## 📦 Deployment

The application is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add the `NEXT_PUBLIC_GITHUB_TOKEN` environment variable in Vercel project settings
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Aditya Vaish** - *Initial work* - [vaishcodescape](https://github.com/vaishcodescape)

## 🙏 Acknowledgments

- GitHub API for providing the data
- All the open-source contributors who make this project possible