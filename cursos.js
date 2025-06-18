// Datos de los cursos (videos proporcionados)
const coursesData = [
    {
        id: '1zvCjPwrvDs',
        title: 'Introducción a Bases de Datos',
        channel: 'SISTELBO ACADEMIA',
        views: '1.4M',
        timeAgo: 'hace 1 año',
        category: 'database'
    },
    {
        id: 'nwbIXbleeOQ',
        title: 'Programación Orientada a Objetos',
        channel: 'SISTELBO ACADEMIA',
        views: '640K',
        timeAgo: 'hace 3 semanas',
        category: 'programming'
    },
    {
        id: 'fRWM4i7A5_E',
        title: 'Desarrollo Web Moderno',
        channel: 'SISTELBO ACADEMIA',
        views: '43K',
        timeAgo: 'hace 2 días',
        category: 'web'
    },
    {
        id: '45Yh_PP6eUo',
        title: 'SQL Avanzado',
        channel: 'SISTELBO ACADEMIA',
        views: '151',
        timeAgo: 'hace 2 días',
        category: 'database'
    }
];

// Función para crear un elemento de video
function createVideoElement(video) {
    const videoElement = document.createElement('div');
    videoElement.className = 'video-item';
    videoElement.innerHTML = `
        <a href="https://youtu.be/${video.id}" target="_blank">
            <div class="video-thumbnail">
                <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}">
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span>${video.views} vistas</span>
                    <span>${video.timeAgo}</span>
                </div>
                <div class="video-channel">${video.channel}</div>
            </div>
        </a>
    `;
    return videoElement;
}

// Función para mostrar videos en una sección
function displayVideosInSection(sectionId, filter = null) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Mezclar los videos para mostrarlos aleatoriamente
    const shuffledVideos = [...coursesData].sort(() => Math.random() - 0.5);
    
    // Filtrar si es necesario
    const videosToShow = filter 
        ? shuffledVideos.filter(video => video.category === filter)
        : shuffledVideos;

    // Limpiar la sección
    section.innerHTML = '';
    
    // Agregar videos a la sección
    videosToShow.forEach(video => {
        section.appendChild(createVideoElement(video));
    });
}

// Función para el menú móvil
function setupMobileMenu() {
    document.querySelector('.menu-btn').addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });
}

// Inicializar la página
function initCoursesPage() {
    // Mostrar videos en diferentes secciones
    displayVideosInSection('featuredCourses');
    displayVideosInSection('recentCourses');
    displayVideosInSection('databaseCourses', 'database');
    displayVideosInSection('programmingCourses', 'programming');
    
    setupMobileMenu();
    console.log('Página de cursos estilo YouTube inicializada');
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initCoursesPage);