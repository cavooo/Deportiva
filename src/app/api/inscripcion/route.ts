import { NextResponse } from 'next/server';
import { saveToGoogleSheets, FormData } from '@/lib/googleSheets';

export async function POST(request: Request) {
  try {
    const formData = await request.json() as FormData;

    // Validar datos
    if (!formData.nombreEquipo || !formData.jugadores || !formData.email ||
      !formData.telefono || !formData.dniResponsable || !formData.aceptaTerminos) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Validar que hay suficientes jugadores
    if (formData.jugadores.length === 0) {
      return NextResponse.json(
        { error: 'Debe incluir al menos un jugador' },
        { status: 400 }
      );
    }

    // Validar que hay suficientes socios
    const sociosCount = formData.jugadores.filter(jugador => jugador.esSocio).length;
    if (sociosCount < formData.minSociosRequeridos) {
      return NextResponse.json(
        { error: `Se requieren al menos ${formData.minSociosRequeridos} socios en el equipo` },
        { status: 400 }
      );
    }

    // Guardar datos en Google Sheets usando nuestra librería
    const success = await saveToGoogleSheets(formData);

    if (!success) {
      return NextResponse.json(
        { error: 'Error al guardar en Google Sheets' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error al procesar la inscripción:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}