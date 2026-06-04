import './globals.css';

export const metadata = {
  title: 'Larix Bot Dashboard',
  description: 'Discord bot dashboard for Larix'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
