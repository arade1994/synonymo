import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

import "./globals.scss";

export const metadata: Metadata = {
  title: "Synonymo",
  description: "App for adding and searching synonyms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer
          closeOnClick
          draggable
          newestOnTop
          pauseOnFocusLoss
          pauseOnHover
          autoClose={5000}
          hideProgressBar={false}
          position="top-right"
          rtl={false}
          theme="light"
        />
      </body>
    </html>
  );
}
