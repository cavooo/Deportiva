'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Jugador {
  nombre: string;
  dni: string;
  edad: string;
  esSocio: boolean;
}

interface FormData {
  nombreEquipo: string;
  categoria: string;
  jugadores: Jugador[];
  email: string;
  telefono: string;
  dniResponsable: string;
  aceptaTerminos: boolean;
  aceptaPagado: boolean;
  comentarios: string;
  maxJugadores: number;
  maxSociosRequeridos: number;
}

export default function InscripcionForm() {
  const router = useRouter();
  // Configuración para el número de jugadores y socios requeridos
  const maxJugadores = 12
  const maxSociosRequeridos = 5

  // Definir las categorías y sus rangos de años
  const categorias = [
    { nombre: "9-10 años", añosNacimiento: [2015, 2016], edadMin: 9, edadMax: 10 },
    { nombre: "11-12 años", añosNacimiento: [2013, 2014], edadMin: 11, edadMax: 12 },
    { nombre: "13-14 años", añosNacimiento: [2011, 2012], edadMin: 13, edadMax: 14 },
    { nombre: "15-16 años", añosNacimiento: [2009, 2010], edadMin: 15, edadMax: 16 },
  ];

  const [formData, setFormData] = useState<FormData>({
    nombreEquipo: '',
    categoria: '',
    jugadores: Array.from({ length: maxJugadores }, (_, index) => ({
      nombre: "",
      edad: "",
      esSocio: false,
      dni: ""
    })),
    email: '',
    telefono: '',
    dniResponsable: '',
    aceptaTerminos: false,
    aceptaPagado: false,
    comentarios: '',
    maxJugadores: maxJugadores,
    maxSociosRequeridos: maxSociosRequeridos
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    // Manejar cambios en los campos de jugadores
    if (name.startsWith('jugadores.')) {
      const [_, indexStr, field] = name.split('.');
      const index = parseInt(indexStr);

      setFormData(prev => {
        const updatedJugadores = [...prev.jugadores];
        updatedJugadores[index] = {
          ...updatedJugadores[index],
          [field]: field === 'esSocio' ? checked : value
        };

        return {
          ...prev,
          jugadores: updatedJugadores
        };
      });
    } else {
      // Manejar cambios en otros campos
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Limpiar errores de validación al cambiar el campo
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.nombreEquipo.trim()) {
      errors.nombreEquipo = 'El nombre del equipo es obligatorio';
    }

    if (!formData.categoria) {
      errors.categoria = 'Debe seleccionar una categoría';
    }

    // Obtener la categoría seleccionada
    const categoriaSeleccionada = categorias.find(cat => cat.nombre === formData.categoria);

    // Validar jugadores
    formData.jugadores.forEach((jugador, index) => {
      if (!jugador.nombre.trim()) {
        errors[`jugadores.${index}.nombre`] = 'El nombre del jugador es obligatorio';
      }

      if (!jugador.dni.trim()) {
        errors[`jugadores.${index}.dni`] = 'El DNI del jugador es obligatorio';
      }

      // Validar edad según la categoría seleccionada
      if (categoriaSeleccionada && jugador.edad) {
        const edadJugador = parseInt(jugador.edad);
        if (!isNaN(edadJugador)) {
          if (edadJugador < categoriaSeleccionada.edadMin || edadJugador > categoriaSeleccionada.edadMax) {
            errors[`jugadores.${index}.edad`] = `La edad debe estar entre ${categoriaSeleccionada.edadMin} y ${categoriaSeleccionada.edadMax} años para esta categoría`;
          }
        }
      }
    });

    // Validar número mínimo de socios
    const sociosCount = formData.jugadores.filter(jugador => jugador.esSocio).length;
    if (sociosCount > formData.maxSociosRequeridos) {
      errors.sociosRequeridos = `Se requieren máximo ${formData.maxSociosRequeridos} socios en el equipo`;
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'El formato del email no es válido';
    }

    if (!formData.telefono.trim()) {
      errors.telefono = 'El teléfono es obligatorio';
    }

    if (!formData.dniResponsable.trim()) {
      errors.dniResponsable = 'El DNI del responsable es obligatorio';
    }

    if (!formData.aceptaTerminos) {
      errors.aceptaTerminos = 'Debe aceptar los términos y condiciones';
    }

    setValidationErrors(errors);
    setTimeout(() => {
      setValidationErrors({})
    }, 3000)
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario antes de enviar
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/inscripcion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario');
      }

      setSubmitStatus('success');
      // Redirigir a la página de confirmación
      router.push('/confirmacion');
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-4xl relative mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8 rugby-blue">Inscripción al Torneo</h1>

      {Object.keys(validationErrors).length > 0 && (
        <div className="fixed top-26 left-1/4 w-1/2 bg-white border border-red-600 p-4 rounded-md shadow-lg">
          <p className="text-red-600 text-center">{Object.values(validationErrors).join(', ')}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="card">
        {/* Configuración del equipo */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-red-600 border-b pb-2">Datos del Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 text-black gap-6">
            <div className="form-control w-full">
              <label className="block text-sm font-medium mb-2">
                Nombre del equipo
              </label>
              <input
                type="text"
                id="nombreEquipo"
                name="nombreEquipo"
                value={formData.nombreEquipo}
                onChange={handleChange}
                placeholder="Ingrese el nombre del equipo"
                className={`w-full px-3 py-2 border ${validationErrors.nombreEquipo ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                required
              />
              {validationErrors.nombreEquipo && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.nombreEquipo}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="block text-sm font-medium mb-2">
                Categoría
              </label>
              <select
                id="categoria"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${validationErrors.categoria ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.nombre} value={cat.nombre}>
                    {cat.nombre} (Nacidos en {cat.añosNacimiento.join(' y ')})
                  </option>
                ))}
              </select>
              {validationErrors.categoria && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.categoria}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="block text-sm font-medium mb-2">
                Se requieren máximo {maxSociosRequeridos} socios en el equipo*
              </label>
              {validationErrors.sociosRequeridos && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.sociosRequeridos}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sección de jugadores */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-red-600 border-b pb-2">Datos de los Jugadores</h2>
          </div>

          {formData.jugadores.map((jugador, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Jugador {index + 1}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`Jugador${index}-nombre`} className="block text-sm font-medium mb-1">Nombre completo</label>
                  <input
                    type="text"
                    id={`Jugador${index}-nombre`}
                    name={`jugadores.${index}.nombre`}
                    value={jugador.nombre}
                    onChange={handleChange}
                    placeholder="Nombre y apellido"
                    className={`w-full px-3 py-2 border ${validationErrors[`jugadores.${index}.nombre`] ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                    required
                  />
                  {validationErrors[`jugadores.${index}.nombre`] && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors[`jugadores.${index}.nombre`]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor={`Jugador${index}-dni`} className="block text-sm font-medium mb-1">DNI</label>
                  <input
                    type="text"
                    id={`Jugador${index}-dni`}
                    name={`jugadores.${index}.dni`}
                    value={jugador.dni}
                    onChange={handleChange}
                    placeholder="Ej: 12345678"
                    className={`w-full px-3 py-2 border ${validationErrors[`jugadores.${index}.dni`] ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                    required
                  />
                  {validationErrors[`jugadores.${index}.dni`] && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors[`jugadores.${index}.dni`]}</p>
                  )}
                </div>

                <div>
                  <label htmlFor={`Jugador${index}-edad`} className="block text-sm font-medium mb-1">Edad</label>
                  <input
                    type="number"
                    id={`Jugador${index}-edad`}
                    name={`jugadores.${index}.edad`}
                    value={jugador.edad}
                    onChange={handleChange}
                    placeholder="Ej: 15"
                    min="5"
                    max="19"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id={`Jugador${index}-esSocio`}
                      name={`jugadores.${index}.esSocio`}
                      checked={jugador.esSocio}
                      onChange={handleChange}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">¿Es socio del club?</span>
                  </label>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Sección de contacto */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-red-600 border-b pb-2">Datos de Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="block text-sm font-medium mb-2">
                Email de contacto
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
                className={`w-full px-3 py-2 border ${validationErrors.email ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                required
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="block text-sm font-medium mb-2">
                Teléfono de contacto
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: 11-1234-5678"
                className={`w-full px-3 py-2 border ${validationErrors.telefono ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                required
              />
              {validationErrors.telefono && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.telefono}</p>
              )}
            </div>

            <div className="form-control w-full">
              <label className="block text-sm font-medium mb-2">
                DNI del responsable
              </label>
              <input
                type="text"
                id="dniResponsable"
                name="dniResponsable"
                value={formData.dniResponsable}
                onChange={handleChange}
                placeholder="Ej: 12345678"
                className={`w-full px-3 py-2 border ${validationErrors.dniResponsable ? 'border-red-600' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                required
              />
              {validationErrors.dniResponsable && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.dniResponsable}</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-control mt-6">
          <h2 className="text-xl font-semibold mb-4 text-red-600 border-b pb-2">Importante</h2>
          <ol className='list-decimal ml-10'>
            <li className='text-lg text-gray-800'>El torneo tiene un costo de 35.000$ por jugador</li>
            <li className='text-lg'>Esto incluye:</li>
            <ul className='ml-5 list-disc'>
              <li className='text-gray-800'>🍌Hidratacion + Fruta</li>
              <li className='text-gray-800'>🏆 Premios</li>
            </ul>
            <li className='text-lg'>Pasar el comprobante con el monto total a:</li>
            <ul className='ml-5 list-disc'>
              <li className='text-gray-800'><Link href="https://wa.me/5491131881755" className='hover:border-b text-blue-400 hover:text-blue-500' target="_blank">+54 9 11 3188 1755</Link></li>
              <li className='text-gray-800'><Link href="https://wa.me/5491123383316" className='hover:border-b text-blue-400 hover:text-blue-500' target="_blank">+54 9 11 2338 3316</Link></li>
            </ul>
            <p className='text-gray-600'>Cualquier duda o consulta también escribanle a ellos</p>
          </ol>
        </div>

        <div className="form-control mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="aceptaTerminos"
              name="aceptaTerminos"
              checked={formData.aceptaTerminos}
              onChange={handleChange}
              className="h-4 w-4"
              required
            />
            <span className="text-sm">Acepto los términos y condiciones del torneo explicados <a className="underline text-red-600" href="/informacion">aqui</a></span>
          </label>
          {validationErrors.aceptaTerminos && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.aceptaTerminos}</p>
          )}
        </div>
        <div className="form-control mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="aceptaPagado"
              name="aceptaPagado"
              checked={formData.aceptaPagado}
              onChange={handleChange}
              className="h-4 w-4"
              required
            />
            <span className="text-sm">Ya mande el comprobante de pago al cualquiera de los números indicados</span>
          </label>
        </div>

        <div className="mt-4 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-red-600 text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Inscripción'}
          </button>

          {submitStatus === 'error' && errorMessage && (
            <p className="mt-4 text-red-600">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}