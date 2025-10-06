import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Torneo Juvenil - Deportiva Francesa",
  description: "Inscripción al torneo de fútbol juvenil masculino - Deportiva Francesa",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`flex flex-col justify-between min-h-screen ${inter.className}`}>
        <div>
          <header className="z-[9999] sticky top-0 bg-white text-black  shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-2">
              <Link href="/">
                <div className="w-fit flex items-center gap-2">
                  <Image src="/logo.png" width={50} height={50} alt="Logo Deportiva Francesa" className="w-15 mr-2" />
                  <h1 className="text-xl hidden md:block font-bold">Deportiva Francesa</h1>
                </div>
              </Link>
              <nav>
                <ul className="flex space-x-4">
                  <li><Link href="/" className="font-medium hover:text-gray-600 duration-300">Inicio</Link></li>
                  <li><Link href="/inscripcion" className="font-medium hover:text-gray-600 duration-300">Inscripción</Link></li>
                  <li><Link href="/informacion" className="font-medium hover:text-gray-600 duration-300">Información</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="mx-auto p-4 relative">
            {children}
          </main>
        </div>

        <footer className="bg-red-600 text-white p-4 mt-8 h-[100px] flex items-center justify-center">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Deportiva Francesa. Todos los derechos reservados.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
