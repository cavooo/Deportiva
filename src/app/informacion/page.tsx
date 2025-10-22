import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Torneo Infantil - Deportiva Francesa",
  description: "Reglamento del torneo de fútbol infantil - Deportiva Francesa",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function Informacion() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 rugby-blue">Reglamento Torneo Infantiles ADF</h1>

      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-4 rugby-blue">Detalles Generales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Fecha</h3>
            <p className="mb-4">07/12/2025</p>

            <h3 className="text-xl font-semibold mb-2">Ubicación y horarios</h3>
            <p className="mb-4">El torneo se llevará a cabo durante todo el día (9 am a 18 hs) en el Club Asociación Deportiva Francesa, KM 42,5, Pilar</p>

            <h3 className="text-xl font-semibold mb-2">Categorías</h3>
            <p className="mb-2">Habrá 4 categorías de varones:</p>
            <ul className="list-disc pl-5 mb-4">
              <li>9-10 años (Nacidos en los años 2015 y 2016)</li>
              <li>11-12 años (Nacidos en los años 2013 y 2014)</li>
              <li>13-14 años (Nacidos en los años 2011 y 2012)</li>
              <li>15-16 años (Nacidos en los años 2009 y 2010)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Cupos</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Hay un límite de 12 equipos por categoría</li>
              <li>Cada equipo puede anotar como máximo 12 jugadores</li>
              <li>Cada equipo va a tener en cancha 7 jugadores + 1 arquero</li>
              <li>Cada equipo puede incluir máximo 5 socios del club Deportiva Francesa</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Valor</h3>
            <p className="mb-4">El torneo tendrá un valor de $35.000 pesos por jugador</p>
          </div>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-4 rugby-blue">Etapas de inscripción</h2>

        <div className="mb-4">
          <p className="mb-4">Tendrán tiempo para inscribirse hasta el domingo 30 de noviembre inclusive. No serán aceptados equipos después de esa fecha.</p>
          <p className="mb-2">Las inscripciones se hacen por equipo, y quedan confirmada una vez se cumplan los siguientes pasos:</p>
          <ul className="list-disc pl-5 mb-4">
            <li>Efectuar el pago y enviar el comprobante (Vía transferencia al CBU indicado)</li>
            <li>Completar el formulario de inscripción con los datos de TODOS los jugadores y padre responsable</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">¿Qué incluye el torneo?</h3>
          <ul className="list-disc pl-5">
            <li>Aguas y gatorade por equipo + puestos de hidratación</li>
            <li>Puestos de frutas durante todo el día</li>
            <li>Pileta disponible</li>
            <li>Trofeos y medallas para los ganadores</li>
            <li>Fotógrafo durante todo el evento</li>
          </ul>
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-4 rugby-blue">Reglamento y fixture</h2>
        <p className="mb-4">El reglamento y el fixture del torneo serán publicados en la semana del torneo, una vez las inscripciones hayan concluído.</p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4 rugby-blue">Contactos para la inscripción</h2>

        <div className="flex gap-2 items-center w-full justify-center mt-10">
          <Link
            href="https://wa.me/5491131881755"
            className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-2 rounded-md font-medium text-white inline-block"
          >
            Hablar con Santi
          </Link>
          <Link
            href="https://wa.me/5491166836295"
            className="bg-red-600 hover:bg-red-700 transition-colors px-6 py-2 rounded-md font-medium text-white inline-block"
          >
            Hablar con Facu
          </Link>
        </div>
      </div>
    </div >
  );
}