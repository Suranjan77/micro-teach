import localFont from "next/font/local";
import globalStyle from "./global.css";

const atkinsonBold = localFont({
  src: "./fonts/Atkinson-Hyperlegible-Bold-102.woff",
  variable: "--font-atkinson-bold-sans",
  weight: "100 900",
});
const atkinsonRegular = localFont({
  src: "./fonts/Atkinson-Hyperlegible-Regular-102.woff",
  variable: "--font-atkinson-regular",
  weight: "100 900",
});

export const metadata = {
  title: "Micro Teaching",
  description: "Micro teaching session on: Number representation by computers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${atkinsonRegular.variable} ${atkinsonBold.variable}`}>
        {children}
      </body>
    </html>
  );
}
