import '../styles/globals.css';
import ThemeProvider from '../components/themeProvider';
import Navbar from '../components/navbar';
import { Rethink_Sans } from 'next/font/google'
import Header from '@/components/header';
import Skills from '@/components/skills';
import AboutMe from '@/components/aboutMe';
import WreckingBall from '@/components/wreckingBall';
import MouseBubble from '@/components/mouseBubble';
export const metadata = {
  title: 'My Portfolio',
  description: 'Built with Next.js and Tailwind',
};

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rethinkSans.className}>
      <body className="flex flex-col">
        <ThemeProvider>
          <MouseBubble />
          <Navbar />

          {/* shift your main content over so it doesn’t sit under the sidebar */}
          <main className=" flex-grow transition-all">
          <Header />
            {children}
          
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
