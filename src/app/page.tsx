import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="group rounded-lg p-8 text-center flex items-center justify-center relative h-[500px]">
        <Image src="/depoEquipo.webp" alt="Torneo Juvenil" className="absolute -z-1 top-0 left-0 w-full h-full object-cover rounded-lg" />
        <div className="max-w-3xl mx-auto z-10 text-white">
          <h1 className="text-5xl font-bold  mb-6">Torneo de Fútbol Juvenil Masculino</h1>
          <p className="py-6 text-lg">
            Bienvenido al torneo juvenil de fútbol masculino organizado por el Club Deportiva Francesa.
            Inscribe a tu equipo y sé parte de esta gran competencia.
          </p>
          <Link
            href="/inscripcion"
            className="bg-red-600 px-8 py-3 rounded-md font-medium text-white"
          >
            Inscríbete Ahora
          </Link>
        </div>
        <div className="absolute z-1 inset-0 bg-black/50 group-hover:bg-black/70 transition duration-300 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 rugby-blue">Categorías</h2>
          <p>Participan equipos en categorías Sub-15, Sub-17 y Sub-19.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 rugby-blue">Fechas</h2>
          <p>El torneo se realizará del 15 de agosto al 30 de septiembre de 2024.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 rugby-blue">Premios</h2>
          <p>Trofeos y medallas para los equipos ganadores y destacados del torneo.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4 rugby-blue">Sobre el Club</h2>
        <p className="mb-4">
          Deportiva Francesa es un prestigioso club de rugby con una larga tradición en la formación
          de jóvenes deportistas. Este torneo de fútbol juvenil es parte de nuestras iniciativas para
          promover el deporte y los valores del trabajo en equipo entre los jóvenes.
        </p>
        <p>
          Nuestras instalaciones cuentan con campos de primera calidad y todas las comodidades para
          que los participantes y espectadores disfruten de una experiencia deportiva inolvidable.
        </p>
      </div>
    </div>
  );
}
