import "./globals.css";


export const metadata = {
  title: "Paint Reveal",
  description: "Mouse over the site to reveal the text",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
