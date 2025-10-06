import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torneo Juvenil - Deportiva Francesa",
  description: "Inscripción al torneo de fútbol juvenil masculino - Deportiva Francesa",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function Confirmacion() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 rugby-blue">¡Inscripción Completada!</h1>

        <div className="mb-8">
          <svg className="w-20 h-20 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>

          <p className="text-lg mb-4">
            Hemos recibido tu inscripción al torneo juvenil de fútbol masculino de Deportiva Francesa.
          </p>

          <p className="mb-6">
            Te enviaremos un correo electrónico con la confirmación y más detalles sobre el torneo.
            Si tienes alguna pregunta, no dudes en contactarnos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-rugby-blue text-white px-6 py-2 rounded-md hover:bg-opacity-90"
          >
            Volver al inicio
          </Link>

          <Link
            href="/informacion"
            className="bg-rugby-green text-white px-6 py-2 rounded-md hover:bg-opacity-90"
          >
            Ver información del torneo
          </Link>
        </div>
      </div>
    </div>
  );
}