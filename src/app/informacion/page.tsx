import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torneo Juvenil - Deportiva Francesa",
  description: "Inscripción al torneo de fútbol juvenil masculino - Deportiva Francesa",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function Informacion() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 rugby-blue">Información del Torneo</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 rugby-blue">Detalles Generales</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Fechas</h3>
            <p className="mb-4">Del 15 de agosto al 30 de septiembre de 2024</p>

            <h3 className="text-xl font-semibold mb-2">Lugar</h3>
            <p className="mb-4">Instalaciones del Club Deportiva Francesa</p>

            <h3 className="text-xl font-semibold mb-2">Categorías</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Sub-15 (nacidos en 2009-2010)</li>
              <li>Sub-17 (nacidos en 2007-2008)</li>
              <li>Sub-19 (nacidos en 2005-2006)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Formato</h3>
            <p className="mb-4">Fase de grupos seguida de eliminatorias directas</p>

            <h3 className="text-xl font-semibold mb-2">Equipos</h3>
            <p className="mb-4">Máximo 12 equipos por categoría</p>

            <h3 className="text-xl font-semibold mb-2">Premios</h3>
            <ul className="list-disc pl-5 mb-4">
              <li>Trofeo para el campeón y subcampeón</li>
              <li>Medallas para los tres primeros lugares</li>
              <li>Reconocimientos individuales (goleador, mejor jugador, etc.)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 rugby-blue">Reglamento</h2>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Reglas Básicas</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Partidos de 2 tiempos de 35 minutos cada uno</li>
            <li>Máximo 5 sustituciones por partido</li>
            <li>Sistema de puntuación: 3 puntos por victoria, 1 por empate, 0 por derrota</li>
            <li>En caso de empate en eliminatorias: penales directos (5 por equipo)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Requisitos</h3>
          <ul className="list-disc pl-5">
            <li>Todos los jugadores deben presentar identificación oficial</li>
            <li>Uniforme completo (camiseta numerada, shorts, medias, espinilleras)</li>
            <li>Cada equipo debe proporcionar un balón reglamentario</li>
            <li>Certificado médico de aptitud física para cada jugador</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 rugby-blue">Contacto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Dirección</h3>
            <p className="mb-4">
              Av. Principal 1234<br />
              Ciudad Deportiva<br />
              CP 12345
            </p>

            <h3 className="text-xl font-semibold mb-2">Teléfono</h3>
            <p className="mb-4">(123) 456-7890</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="mb-4">torneo@deportivafrancesa.com</p>

            <h3 className="text-xl font-semibold mb-2">Redes Sociales</h3>
            <p>
              Instagram: @deportivafrancesa<br />
              Facebook: /DeportivaFrancesaOficial<br />
              Twitter: @DepFrancesa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}