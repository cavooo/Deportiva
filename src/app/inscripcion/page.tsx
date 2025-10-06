'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface Jugador {
  nombre: string;
  dni: string;
  edad: string;
  esSocio: boolean;
}

interface FormData {
  nombreEquipo: string;
  jugadores: Jugador[];
  email: string;
  telefono: string;
  dniResponsable: string;
  aceptaTerminos: boolean;
  comentarios: string;
  maxJugadores: number;
  minSociosRequeridos: number;
}

export default function InscripcionForm() {
  const router = useRouter();
  // Configuración para el número de jugadores y socios requeridos
  const [maxJugadores, setMaxJugadores] = useState(3);
  const [minSociosRequeridos, setMinSociosRequeridos] = useState(2);

  const [formData, setFormData] = useState<FormData>({
    nombreEquipo: '',
    jugadores: Array.from({ length: maxJugadores }, () => ({
      nombre: '',
      edad: '',
      esSocio: false,
      dni: ''
    })),
    email: '',
    telefono: '',
    dniResponsable: '',
    aceptaTerminos: false,
    comentarios: '',
    maxJugadores: maxJugadores,
    minSociosRequeridos: minSociosRequeridos
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

    // Validar jugadores
    formData.jugadores.forEach((jugador, index) => {
      if (!jugador.nombre.trim()) {
        errors[`jugadores.${index}.nombre`] = 'El nombre del jugador es obligatorio';
      }

      if (!jugador.dni.trim()) {
        errors[`jugadores.${index}.dni`] = 'El DNI del jugador es obligatorio';
      }
    });

    // Validar número mínimo de socios
    const sociosCount = formData.jugadores.filter(jugador => jugador.esSocio).length;
    if (sociosCount < formData.minSociosRequeridos) {
      errors.sociosRequeridos = `Se requieren al menos ${formData.minSociosRequeridos} socios en el equipo`;
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

  // Función para agregar un jugador
  const agregarJugador = () => {
    if (formData.jugadores.length < 10) { // Límite máximo de jugadores
      setFormData(prev => {
        const updatedJugadores = [...prev.jugadores, {
          nombre: '',
          edad: '',
          esSocio: false,
          dni: ''
        }];

        return {
          ...prev,
          jugadores: updatedJugadores,
          maxJugadores: updatedJugadores.length
        };
      });
    }
  };

  // Función para eliminar un jugador
  const eliminarJugador = (index: number) => {
    if (formData.jugadores.length > 1) { // Mantener al menos un jugador
      setFormData(prev => {
        const updatedJugadores = prev.jugadores.filter((_, i) => i !== index);

        return {
          ...prev,
          jugadores: updatedJugadores,
          maxJugadores: updatedJugadores.length
        };
      });
    }
  };

  return (
    <div className="max-w-4xl relative mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8 rugby-blue">Inscripción al Torneo</h1>

      {Object.keys(validationErrors).length > 0 && (
        <div className="fixed bg-white border border-red-600 p-4 rounded-md shadow-lg">
          <p className="text-red-600 text-center">{Object.values(validationErrors).join(', ')}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-300 p-6 rounded-lg duration-300 shadow hover:shadow-lg">
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
                Se requieren minimo {minSociosRequeridos} socios en el equipo*
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
                {/* {formData.jugadores.length > 1 && (
                  <button
                    type="button"
                    onClick={() => eliminarJugador(index)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                )} */}
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
          <label className="block text-sm font-medium mb-2">
            Comentarios adicionales
          </label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            placeholder="Información adicional que desee compartir"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 h-24"
          ></textarea>
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

        <div className="mt-8 text-center">
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