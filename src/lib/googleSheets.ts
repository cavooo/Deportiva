import { google } from "googleapis";

// Tipo para un jugador
export interface Jugador {
    nombre: string;
    edad: string | number;
    esSocio: boolean;
    dni: string;
}

// Tipos para los datos del formulario
export interface FormData {
    nombreEquipo: string;
    jugadores: Jugador[];
    email: string;
    telefono: string;
    dniResponsable: string;
    aceptaTerminos: boolean;
    comentarios?: string;
    // Configuración para el número de jugadores y socios requeridos
    maxJugadores: number;
    minSociosRequeridos: number;
}

// Función para conectar con Google Sheets usando un enfoque más simple
export async function saveToGoogleSheets(data: FormData): Promise<boolean> {
    try {
        // Verificar variables de entorno
        if (
            !process.env.GOOGLE_CLIENT_EMAIL ||
            !process.env.GOOGLE_PRIVATE_KEY ||
            !process.env.GOOGLE_SHEET_ID
        ) {
            console.error("Faltan variables de entorno para Google Sheets");
            return false;
        }

        // Autenticación con service account
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Para cada jugador, creamos una fila en la hoja de cálculo
        for (const jugador of data.jugadores) {
            // Preparar datos para la fila
            const row = [
                data.nombreEquipo,
                jugador.nombre,
                data.email,
                data.telefono,
                jugador.edad,
                data.dniResponsable,
                jugador.esSocio ? "Sí" : "No",
                new Date().toLocaleString("es-AR"), // fecha de registro
            ];

            // Agregar fila al sheet
            await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: "A2:H2",
                valueInputOption: "RAW",
                requestBody: {
                    values: [row],
                },
            });

            console.log("Datos guardados en Google Sheets:", row);
        }
        return true;
    } catch (error) {
        console.error('Error al procesar datos:', error);
        return false;
    }
}