# Guion propuesto de 4 minutos y 45 segundos

Reparto sugerido entre los tres integrantes autorizados. Ajustar si el equipo prefiere otro orden. Los tiempos son un presupuesto, no ensayos acreditados. Hablar con palabras propias. Mantener el navegador abierto en la demo antes de comenzar.

| Intervalo | Lámina | Responsable propuesto | Duración |
|---|---|---|---|
| 0:00 a 0:25 | 1 Apertura | Milovan Solis | 25 s |
| 0:25 a 1:00 | 2 Problema | Diego Lopez | 35 s |
| 1:00 a 1:30 | 3 Experiencia | Javier Rodriguez | 30 s |
| 1:30 a 2:40 | 4 y prototipo real | Milovan Solis | 70 s |
| 2:40 a 3:10 | 5 Mapa | Diego Lopez | 30 s |
| 3:10 a 3:50 | 6 Arquitectura | Javier Rodriguez | 40 s |
| 3:50 a 4:15 | 7 Tecnologías | Javier Rodriguez | 25 s |
| 4:15 a 4:35 | 8 Viabilidad | Diego Lopez | 20 s |
| 4:35 a 4:45 | 9 Cierre | Milovan Solis | 10 s |

Total 285 segundos. Margen hasta el corte: 15 segundos. Milovan 105 s, Diego 85 s y Javier 95 s.

## 0:00 a 0:25 Apertura

“Para personas mayores que dudan ante un enlace, correo o mensaje sospechoso, Aquila Guard muestra señales comprensibles y una acción de verificación antes de responder o entregar información. Hoy demostramos esa experiencia con ejemplos ficticios.”

La promesa tiene público, dificultad y resultado. No abrir con frameworks ni anunciar detección universal.

## 0:25 a 1:00 Problema

“La encuesta de SUBTEL distingue acceso de habilidades: 96,6 % de hogares declara internet propio y pagado y 42,9 % del grupo de 60 años o más declara poder hacer transacciones, compras y pagos por sí mismo. Son poblaciones distintas y no son tasas de fraude. Por eso proponemos explicaciones sencillas para una decisión cotidiana.”

Fuente y alcance: propuesta sección 1 y bibliografía. Si incluyen la cifra de reclamos de CMF, expliquen su periodo y unidad y recorten otro contenido para respetar el reloj.

## 1:00 a 1:30 Experiencia

“Elena tiene 68 años y es una persona ficticia de diseño. Recibe un mensaje que amenaza con suspender su cuenta y pide una clave. Necesita saber qué revisar antes de responder. La experiencia reúne el contenido, las razones de la advertencia y una recomendación de verificación en un recorrido breve.”

## 1:30 a 2:40 Demostración real

Cambiar del PowerPoint al HTML ya abierto. No usar la captura como sustituto.

1. En Inicio, señalar la entrada a Revisar y abrirla.
2. Seleccionar enlace y pulsar Cargar ejemplo. Debe aparecer https://banc0.example/validar.
3. Pulsar Analizar ejemplo y esperar el resultado. Mostrar que “banc0” coincide con una regla de ejemplo. La app no abre ese enlace.
4. Leer una razón y señalar la recomendación. Explicar: “No demuestra que todos los fraudes se detecten. Sin coincidencias tampoco se garantiza seguridad”.
5. Abrir Alertas y marcar la ficha revisada. Ir a Resumen y mostrar los contadores coherentes con la sesión.

Se habrán mostrado cuatro secciones encadenadas: Inicio, Revisar, Alertas y Resumen. Resultado pertenece a Revisar. La demo no necesita internet. No introducir datos personales reales.

## 2:40 a 3:10 Mapa

“El mapa organiza cinco secciones. Revisar contiene ingreso y resultado. Alertas conserva las fichas de esta sesión. Resumen reúne los contadores y Ajustes agrupa lectura y privacidad. Acabamos de recorrer Inicio, Revisar, Alertas y Resumen. La navegación global deja volver a cualquiera de ellas.”

Señalar esa ruta en el diagrama. No limitarse a leer los nombres.

## 3:10 a 3:50 Arquitectura

“La demo corre en HTML, CSS y JavaScript locales. La arquitectura propuesta separa cliente, servidor y datos. Al revisar un mensaje, RevisarForm enviaría JSON por HTTPS. AnalisisController validaría la petición. AnalisisService produciría razones. Los repositorios guardarían el análisis y su ficha en PostgreSQL. La respuesta volvería por las capas hasta la pantalla. Esos componentes de servidor todavía son un diseño.”

No decir que la demo actual consulta una API o mantiene datos al recargar.

## 3:50 a 4:15 Tecnologías

“Comparamos React con Vue, Express con FastAPI y PostgreSQL con MongoDB. Proponemos componentes React y continuidad de TypeScript con Express. PostgreSQL representa la relación entre análisis y ficha. Asumimos aprender el build y hooks, validar explícitamente el JSON y mantener migraciones. La propuesta contiene la comparación y su ratificación pendiente.”

La afirmación de decisión firmada solo podrá hacerse después de la firma real del anexo B.

## 4:15 a 4:35 Viabilidad

“El prototipo funciona sin servicios de pago. El producto requerirá presupuestar infraestructura y mantenimiento. La suscripción institucional es una hipótesis, todavía sin precio ni acuerdos. El siguiente paso de validación es observar si las personas comprenden las razones y saben cómo continuar.”

No presentar entrevistas, experiencia familiar o encuestas como evidencia si no pueden respaldarlas.

## 4:35 a 4:45 Cierre

“Aquila Guard propone ayudar a personas mayores a reconocer señales de engaño y verificar antes de actuar. La experiencia ya puede recorrerse con ejemplos. Gracias.”

## Preparación de la defensa individual

Cada integrante debe poder responder sin apoyo y conectar la explicación con el prototipo o una decisión del equipo.

**¿Qué hace realmente la función evaluate?** Normaliza texto y busca palabras de ejemplo y patrones como banc0 o http sin cifrado. Devuelve título, razones, signal y recomendación. No consulta listas externas ni usa un modelo entrenado. Para teléfonos solo informa que la identidad no está comprobada.

**¿Por qué no prometen detectar cualquier fraude?** Las reglas tienen cobertura limitada y no se midieron falsos positivos ni falsos negativos en un conjunto etiquetado. Se puede demostrar navegación y explicación, no eficacia universal.

**¿Qué pasa si no encuentra señales?** El resultado expresa ausencia de coincidencias con reglas locales. No confirma legitimidad. Mantiene una recomendación de verificación.

**¿Dónde están los datos?** En session, un arreglo en la memoria de la pestaña. Recargar reinicia la demo. No hay localStorage, API ni SQL conectado en src/app.js.

**¿Cuál es la diferencia entre mapa y arquitectura?** El mapa organiza contenidos y navegación del usuario. La arquitectura técnica separa componentes y responsabilidades para sostener ese recorrido.

**¿Qué haría cada capa en una revisión?** El cliente recoge y presenta. El controlador valida el contrato HTTP. El servicio aplica reglas. El repositorio accede a datos. La base conserva y controla integridad. Hoy las reglas están en el cliente porque es un prototipo del Hito 1.

**¿Por qué SPA y qué costo tiene?** Mantener contexto facilita pasar de revisión a resultado y fichas. Exige JavaScript y trabajo de foco, historial y mensajes de estado. Una multipágina sería viable si se transfiere o persiste ese estado.

**¿Por qué React y Express?** La propuesta prioriza componentes y continuidad de lenguaje. Vue y FastAPI son alternativas viables. Se asumen aprendizaje y validación explícita. La experiencia real del equipo debe respaldar la ratificación.

**¿Qué relación hay en el modelo de datos?** alertas.analisis_id referencia a analisis.id y es UNIQUE, por lo que el esquema inicial permite como máximo una ficha por análisis. El borrado en cascada mantiene la relación. No guarda texto original ni razones; ese detalle requiere una decisión posterior.

**¿Cómo evitan interpretar la entrada como HTML?** La interfaz usa textContent para crear los textos del resultado y de las fichas. Esto no constituye una auditoría completa de seguridad del producto futuro.

**¿Qué significa el 42,9 %?** Habilidad autodeclarada para transacciones, compras y pagos en línea en el grupo de 60 años o más. No es un porcentaje de víctimas ni de personas que detectan phishing.

**¿Qué falta antes de entregar?** Cuentas de GitHub, repositorio y acceso docente, firma auténtica de decisiones y ensayos. Ciudad y sección ya están confirmadas. La autorización de equipo de tres ya fue confirmada por el solicitante.

## Respaldo ante fallas

Extraer la carpeta antes de la clase. Abrir demo y PDF local. Mantener una segunda copia en otra ubicación y comprobarla con el equipo. Si no abre un enlace dibujado en la presentación, cambiar a la pestaña ya abierta. Si el navegador falla, mostrar el respaldo y declarar la limitación: las capturas no satisfacen por sí solas A2 destacado.
