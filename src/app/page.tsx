'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";


export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/carrousel1.jpeg', '/carrousel2.jpeg', '/carrousel3.jpeg', '/carrousel4.jpeg', '/carrousel5.jpeg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Cambiar imagen cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="group rounded-lg p-8 text-center flex items-center justify-center relative h-[85lvh]">
        <Image src="/banner.jpeg" loading="eager" fill alt="Torneo Infantil" className="absolute -z-1 top-0 left-0 w-full h-full object-cover rounded-lg" />
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

      <div className="flex flex-col lg:flex-row  items-center justify-center md:p-8 gap-4">
        <video src="/banner.mp4" autoPlay muted loop className=" lg:w-1/2 min-h-[500px] h-[60lvh] hover:scale-102 duration-300  object-cover rounded-lg"></video>
        <div className="card min-h-[500px] h-[60lvh] bg-red-600 text-white w-full text-center hover:scale-102 duration-300 flex items-center justify-center flex-col">
          <h2 className=" pt-2 text-2xl md:text-3xl font-bold mb-3 text-white">¡Vení a jugar el Gran Torneo de Fútbol Infantil de la Deportiva Francesa!</h2>
          <p className="md:text-lg mb-4">Una jornada inolvidable donde los más chicos podrán demostrar su talento, hacer nuevos amigos y disfrutar del deporte en un ambiente familiar. ¡No te lo pierdas! Inscribí a tu equipo y sé parte de esta gran fiesta del fútbol infantil.</p>
          <p className="md:text-lg mb-4">Habla con nosotros para más información sobre el torneo y cómo inscribirte.</p>
          <div className="flex gap-2 items-center">
            <Link
              href="https://wa.me/5491131881755"
              className="bg-white text-black hover:bg-[whitesmoke] transition-colors px-6 py-2 rounded-md font-medium  inline-block"
            >
              Hablar con Santi
            </Link>
            <Link
              href="https://wa.me/5491166836295"
              className="bg-white text-black hover:bg-[whitesmoke] transition-colors px-6 py-2 rounded-md font-medium  inline-block"
            >
              Hablar con Facu
            </Link>
          </div>
        </div>
      </div>
      <div className="relative w-full min-h-[600px] h-[80lvh] overflow-hidden rounded-lg">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <Image
              src={image}
              loading={index === 0 ? 'eager' : 'lazy'}
              alt={`Carrusel imagen ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full ${index === currentImage ? 'bg-red-600' : 'bg-white bg-opacity-50'
                }`}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>



    </div>
  );
}
