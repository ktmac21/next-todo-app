import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "ChexMate",
  description: "Todo stuff that you need to do",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
