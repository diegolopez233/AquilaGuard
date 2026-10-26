# Aquila Guard

Para personas mayores que dudan ante un enlace, correo o mensaje sospechoso, Aquila Guard propone mostrar señales comprensibles y una acción de verificación antes de responder o entregar información.

## Estado del Hito 1

Prototipo educativo navegable con HTML, CSS y JavaScript. Las reglas son ejemplos locales, no un detector validado de phishing o de todo tipo de fraude. No hay API conectada, base operativa, monitoreo, consultas de reputación ni aplicación nativa instalada. El teléfono se valida solo por formato. La sesión desaparece al recargar.

## Integrantes

| Integrante en orden por apellido | Usuario de GitHub |
|---|---|
| Diego Lopez | Por completar |
| Javier Rodriguez | Por completar |
| Milovan Solis | Por completar |

Equipo de tres autorizado por el docente, según confirmación del solicitante el 25/10/2026. Los nombres conservan las grafías del paquete recibido.

- Docente indicado en la pauta: Carlos Muñoz S.
- Ciudad: Santiago, Providencia. Sección: 001.
- URL del repositorio: pendiente de creación. El equipo todavía no tiene cuentas de GitHub ni repositorio.
- Colaboradores, acceso de lectura del docente e historial: comprobar en GitHub.

## Abrir el prototipo

1. Extraer todo el ZIP y conservar la estructura de carpetas.
2. Abrir [Aquila_Guard_Prototipo_Hito1.html](Aquila_Guard_Prototipo_Hito1.html) en un navegador con JavaScript.
3. Mantener assets y src junto al HTML. No hace falta instalar dependencias ni conectarse a internet.

Alternativa opcional con Python 3, desde la raíz del proyecto:

```console
python -m http.server 8000 --bind 127.0.0.1
```

Abrir [el prototipo servido localmente](http://127.0.0.1:8000/Aquila_Guard_Prototipo_Hito1.html). Este comando sirve archivos y no inicia una API.

Flujo: Inicio → Revisar → Cargar ejemplo → Analizar ejemplo → razones del resultado → Alertas → marcar revisadas → Resumen. Ajustes permite texto grande, consultar privacidad y borrar la sesión. Usar únicamente datos ficticios. “Sin señales” significa ausencia de coincidencias con reglas limitadas, no seguridad confirmada.

Si faltan estilos, verificar que se extrajo el ZIP completo. Si no cambia de sección, activar JavaScript. Si el puerto está ocupado, abrir directamente el HTML o usar otro puerto.

## Entregables oficiales del Hito 1

| Requisito | Archivo |
|---|---|
| Propuesta PDF | [Propuesta comercial y arquitectura](docs/Aquila_Guard_Hito1_Propuesta.pdf) |
| Láminas PDF | [Las nueve láminas del PowerPoint recibido](docs/Aquila_Guard_Hito1_Presentacion_Original.pdf) |
| Prototipo navegable | [HTML de Aquila Guard](Aquila_Guard_Prototipo_Hito1.html) |
| Mapa del producto | [PNG](docs/Mapa_Producto.png) y [SVG](docs/Mapa_Producto.svg) |
| Diagrama de arquitectura | [PNG](docs/Arquitectura.png) y [SVG](docs/Arquitectura.svg) |
| Instrucciones | Este README.md |

El [PowerPoint original](docs/Aquila_Guard_Hito1_Presentacion_Original.pptx) se conserva para evaluar y editar. No se modificaron sus láminas. Su PDF es una representación visual renderizada; comparar ambos en el equipo de exposición, especialmente las fuentes. Las barras con el nombre del prototipo en las láminas no tienen hipervínculo externo. El archivo real del proyecto termina en _Hito1.html.

La propuesta ocupa 18 páginas: tapa e índice, 14 páginas numeradas de contenido principal y dos de anexos. El índice se genera automáticamente durante la construcción del PDF. La entrega final del documento es PDF. Hay [texto editable](docs/Propuesta_Editable.md) y [contenido estructurado](docs/Propuesta_Contenido.json) para revisión.

## Evaluación y preparación

- [Evaluación de la presentación según la rúbrica](docs/Evaluacion_Presentacion_Hito1.pdf).
- [Guion propuesto de 4:45 y preguntas de defensa](docs/Guion_y_Defensa.md).
- [Rúbrica exacta del Hito 1](docs/Rubrica_Hito1.md).
- [Matriz de evidencias y pendientes](docs/Matriz_Hito1.md).
- [Registros humanos por completar](docs/Registros_Equipo.md).
- [Alcance de la revisión y sustituciones](docs/Registro_Revision.md).

El bloque A se califica durante la exposición. El archivo no prueba duración, participación o respuesta individual. El guion es una propuesta de reparto, no acredita ensayos realizados.

## Arquitectura actual y propuesta

Actual: el HTML define cinco secciones, assets/app.css define estilos y src/app.js alterna vistas, valida entradas y aplica reglas educativas. session vive en memoria. No se observa uso de fetch, almacenamiento persistente ni conexión SQL en ese archivo.

Propuesta: cliente React con TypeScript; API Node.js con Express y TypeScript; controladores, servicios y repositorios; PostgreSQL para análisis y fichas. Las comparaciones y desventajas están en la propuesta, sección 6. El anexo B requiere firma auténtica de los integrantes. Los README de src/servidor_propuesto y el SQL de db son material de diseño conservado, no implementación de servidor. El modelo aún no guarda las razones ni el texto original.

.env.example contiene variables previstas para el diseño de servidor, sin credenciales reales. La demo no lo consume. .gitignore excluye dependencias, archivos de entorno y artefactos de compilación.

[Cómo crear el repositorio y completar las firmas](docs/GitHub_y_Firmas.md).

## Antes de entregar en GitHub

Crear las cuentas personales y el repositorio, completar sus datos en el README, ratificar las tecnologías, verificar los enlaces y el acceso del docente y ensayar tres veces. Preparar una copia de respaldo en una segunda ubicación. Todos deben comprender la demo y el diseño completo. No fabricar firmas o historial.

La pauta recibida fija el cierre el 20/09/2026 a las 23:59 y exposición del 21 al 23/09/2026. Esta revisión del 25/10/2026 no acredita la fecha de carga original ni modifica el plazo. Confirmar la situación académica con el docente. El ZIP es un paquete de archivos y no reemplaza el repositorio obligatorio.
