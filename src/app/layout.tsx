import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Torneo Infantil - Deportiva Francesa",
  description: "Torneo de fútbol infantil - Deportiva Francesa",
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
          <header className="z-[9999] sticky top-0 px-4 md:px-0 bg-white text-black  shadow-lg">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-2">
              <Link href="/">
                <div className="w-fit flex items-center gap-2">
                  <Image src="/logo.png" width={50} height={50} alt="Logo Deportiva Francesa" className="w-15 mr-2" />
                  <h1 className="text-xl hidden md:block font-bold">Deportiva Francesa</h1>
                </div>
              </Link>
              <nav>
                <ul className="flex space-x-4">
                  <li><Link href="/" className="font-medium text-sm md:text-md hover:text-gray-600 duration-300">Inicio</Link></li>
                  <li><Link href="/informacion" className="font-medium text-sm md:text-md hover:text-gray-600 duration-300">Información</Link></li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="mx-auto p-4 relative">
            {children}
          </main>
        </div>

        <footer className="bg-white border-t border-t-gray-300 text-white p-8 mt-8 h-fit flex items-center">
          <div className="container mx-auto flex flex-col gap-4 justify-center items-center">
            <div className="text-center text-black">
              <p>&copy; {new Date().getFullYear()} Deportiva Francesa. Todos los derechos reservados.</p>
              <div className="flex gap-2 justify-center items-center mt-2">
                <a href="https://www.facebook.com/DeportivaFrancesaFundadaen1913/?locale=es_LA" target="_blank" rel="noopener noreferrer" className=" hover:scale-120 duration-200 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" fill="blue">
                    <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/deportivafrancesa/" target="_blank" rel="noopener noreferrer" className=" hover:scale-120 duration-200 transition-all">
                  <svg fill="#00000" viewBox="0 0 32 32" className="size-11" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"></path><path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"></path></g></svg>
                </a>
              </div>
            </div>
            <div className="flex items-center text-black">
              <a href="https://minificando.ai" target="_blank" rel="noopener noreferrer">
                <Image src="/minificando_logo.svg" width={150} height={25} alt="Minificando Logo" />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
