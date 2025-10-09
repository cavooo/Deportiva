import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Torneo Infantil - Deportiva Francesa",
  description: "Torneo de fútbol infantil - Deportiva Francesa",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="group rounded-lg p-8 text-center flex items-center justify-center relative h-[80lvh]">
        <Image src="/depoEquipo.webp" width={2000} height={1000} alt="Torneo Infantil" className="absolute -z-1 top-0 left-0 w-full h-full object-cover rounded-lg" />
        <div className="max-w-3xl mx-auto z-10 text-white">
          <h1 className="text-5xl font-bold mb-6">Torneo de Fútbol Infantil</h1>
          <p className="py-6 text-lg">
            Bienvenido al torneo infantil de fútbol organizado por el Club Deportiva Francesa.
            Consulta toda la información sobre el torneo.
          </p>
          <Link
            href="/informacion"
            className="bg-red-600 px-8 py-3 rounded-md font-medium text-white"
          >
            Ver Información
          </Link>
        </div>
        <div className="absolute z-1 inset-0 bg-black/50 group-hover:bg-black/70 transition duration-300 rounded-lg" />
      </div>

      <div className="card md:w-[80%] mx-auto flex items-center flex-col">
        <h2 className="text-3xl font-bold mb-3 text-red-600">¡Vení a jugar el Gran Torneo de Fútbol Infantil de la Deportiva Francesa!</h2>
        <p className="text-lg mb-4">Una jornada inolvidable donde los más chicos podrán demostrar su talento, hacer nuevos amigos y disfrutar del deporte en un ambiente familiar. ¡No te lo pierdas! Inscribí a tu equipo y sé parte de esta gran fiesta del fútbol infantil.</p>
        <p className="text-lg mb-4">Habla con nosotros para más información sobre el torneo y cómo inscribirte.</p>
        <div className="flex gap-2 items-center">
          <Link
            href="https://wa.me/5491131881755"
            className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-2 rounded-md font-medium text-white inline-block"
          >
            Hablar con Santi
          </Link>
          <Link
            href="https://wa.me/5491123383316"
            className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-2 rounded-md font-medium text-white inline-block"
          >
            Hablar con Lulo
          </Link>
        </div>
      </div>



    </div>
  );
}
