import "./globals.css";


export const metadata = {
  title: "Educação Digital",
  description: "Aprenda conosco!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
