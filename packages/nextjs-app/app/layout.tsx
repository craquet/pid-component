import './globals.css';

export const metadata = {
  title: 'ResearchDemo - Lorem ipsum',
  description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>{children}</body>
    </html>
  );
}
