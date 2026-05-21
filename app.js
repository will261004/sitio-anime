document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LÓGICA PARA LOS BOTONES "VER MÁS" ===
    // Esta función asigna el evento de clic a cualquier botón .btn-ver
    function activarBotonesVerMas() {
        const botonesVerMas = document.querySelectorAll('.btn-ver');
        botonesVerMas.forEach(boton => {
            // Removemos cualquier evento previo para no duplicar alertas
            boton.replaceWith(boton.cloneNode(true));
        });

        // Volvemos a seleccionarlos ya limpios y les asignamos el comportamiento
        document.querySelectorAll('.btn-ver').forEach(boton => {
            boton.addEventListener('click', (evento) => {
                const tarjeta = evento.target.closest('.card');
                const tituloAnime = tarjeta.querySelector('h3').innerText;
                alert(`🎉 ¡Pronto añadiremos más detalles sobre ${tituloAnime}! Mantente atento.`);

                if (typeof gtag === 'function') {
                    gtag('event', 'clic_ver_mas', { 'anime_seleccionado': tituloAnime });
                }
            });
        });
    }

    // Activamos los botones al cargar la página por primera vez
    activarBotonesVerMas();


    // === 2. LÓGICA DE NAVEGACIÓN (CAMBIO DE PESTAÑAS) ===
    // Seleccionamos los botones del menú usando sus nuevos IDs
    const btnInicio = document.getElementById('btn-inicio');
    const btnPopulares = document.getElementById('btn-populares');

    // Seleccionamos las secciones contenedoras
    const seccionInicio = document.getElementById('seccion-inicio');
    const seccionPopulares = document.getElementById('seccion-populares');

    // Función encargada de ocultar y mostrar las listas
    function cambiarSeccion(pestañaActiva, pestañaInactiva, seccionMostrar, seccionOcultar, nombreFiltro) {
        // Cambiar la clase activa en el menú superior
        pestañaActiva.classList.add('active');
        pestañaInactiva.classList.remove('active');

        // Mostrar una sección y ocultar la otra
        seccionMostrar.classList.remove('hidden');
        seccionOcultar.classList.add('hidden');

        // Volver a enganchar la lógica de los botones por si acaso
        activarBotonesVerMas();

        // Enviar rastro a Google Analytics
        if (typeof gtag === 'function') {
            gtag('event', 'navegacion_menu', { 'seccion_visitada': nombreFiltro });
            console.log(`Filtro cambiado a: ${nombreFiltro}`);
        }
    }

    // Evento al presionar "Populares"
    if (btnPopulares) {
        btnPopulares.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarSeccion(btnPopulares, btnInicio, seccionPopulares, seccionInicio, 'Populares');
        });
    }

    // Evento al presionar "Inicio"
    if (btnInicio) {
        btnInicio.addEventListener('click', (e) => {
            e.preventDefault();
            cambiarSeccion(btnInicio, btnPopulares, seccionInicio, seccionPopulares, 'Inicio');
        });
    }
});