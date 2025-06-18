// Mobile menu toggle
document.querySelector('.menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Lista de videos disponibles
const availableVideos = [
    {
        id: '1zvCjPwrvDs',
        title: 'Introducción a Bases de Datos',
        views: '1.4M vistas',
        timeAgo: 'hace 1 año',
        channel: 'SISTELBO ACADEMIA'
    },
    {
        id: 'nwbIXbleeOQ',
        title: 'Programación Orientada a Objetos',
        views: '640K vistas',
        timeAgo: 'hace 3 semanas',
        channel: 'SISTELBO ACADEMIA'
    },
    {
        id: 'fRWM4i7A5_E',
        title: 'Desarrollo Web Moderno',
        views: '43K vistas',
        timeAgo: 'hace 2 días',
        channel: 'SISTELBO ACADEMIA'
    },
    {
        id: '45Yh_PP6eUo',
        title: 'SQL Avanzado',
        views: '151 vistas',
        timeAgo: 'hace 2 días',
        channel: 'SISTELBO ACADEMIA'
    }
];

// Lista de redes sociales
const socialLinks = [
    {
        name: 'YouTube',
        url: 'https://youtube.com/@sistelbo?si=L36YVYCBohFR381A',
        icon: 'fab fa-youtube',
        class: 'youtube'
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/sistelbo?igsh=MTRucnBjcjN0NGc5OQ==',
        icon: 'fab fa-instagram',
        class: 'instagram'
    },
    {
        name: 'TikTok',
        url: 'https://www.tiktok.com/@sistelbo?_t=ZM-8xJgG7TCWk4&_r=1',
        icon: 'fab fa-tiktok',
        class: 'tiktok'
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/share/1XWcm2TgPb/',
        icon: 'fab fa-facebook-f',
        class: 'facebook'
    },
    {
        name: 'Spotify',
        url: 'https://open.spotify.com/user/31h72bb7yqp4ukjtlkxgs7t7zmry?si=qZuXmmgxT0C4Uqz5X4Ytsg',
        icon: 'fab fa-spotify',
        class: 'spotify'
    },
    {
        name: 'Sitio Web',
        url: 'https://sistelboacademia.webcindario.com/',
        icon: 'fas fa-globe',
        class: 'website'
    }
];

// Función para mezclar array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Función para generar miniaturas de videos relacionados
function generateRelatedVideos() {
    const relatedVideosContainer = document.getElementById('relatedVideos');
    relatedVideosContainer.innerHTML = '';
    
    // Mezclar los videos aleatoriamente
    const shuffledVideos = shuffleArray([...availableVideos]);
    
    // Seleccionar 4 videos aleatorios
    const randomVideos = shuffledVideos.slice(0, 4);

    // Generar el HTML para cada video relacionado
    randomVideos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-thumbnail';
        videoElement.innerHTML = `
            <div onclick="changeMainVideo('${video.id}', '${video.title}')">
                <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}">
                <div class="play-icon">▶</div>
                <div class="video-info-small">
                    <h4>${video.title}</h4>
                    <p>${video.channel}</p>
                    <p>${video.views} • ${video.timeAgo}</p>
                </div>
            </div>
        `;
        relatedVideosContainer.appendChild(videoElement);
    });
}

// Función para cambiar el video principal
function changeMainVideo(videoId, title) {
    const iframe = document.querySelector('.video-wrapper iframe');
    const videoTitle = document.querySelector('.video-info h2');
    const videoDate = document.querySelector('.video-info p:first-of-type');
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoTitle.textContent = title;
    videoDate.textContent = `Publicado ${availableVideos.find(v => v.id === videoId)?.timeAgo || 'recientemente'}`;
    
    // Hacer scroll suave hacia el video
    document.querySelector('.video-container').scrollIntoView({ behavior: 'smooth' });
}

// Función para generar enlaces de redes sociales
function generateSocialLinks() {
    const sidebarLinks = document.getElementById('socialLinks');
    const footerLinks = document.getElementById('footerSocialLinks');
    
    sidebarLinks.innerHTML = '';
    footerLinks.innerHTML = '';
    
    // Versión para sidebar (con nombres)
    socialLinks.forEach(social => {
        const linkElement = document.createElement('a');
        linkElement.className = 'social-link';
        linkElement.href = social.url;
        linkElement.target = '_blank';
        linkElement.innerHTML = `
            <div class="social-icon ${social.class}">
                <i class="${social.icon}"></i>
            </div>
            <span class="social-name">${social.name}</span>
        `;
        sidebarLinks.appendChild(linkElement);
    });
    
    // Versión para footer (solo iconos)
    socialLinks.forEach(social => {
        const linkElement = document.createElement('a');
        linkElement.href = social.url;
        linkElement.target = '_blank';
        linkElement.innerHTML = `<i class="${social.icon}"></i>`;
        footerLinks.appendChild(linkElement);
    });
}

// Función para inicializar la aplicación
function initApp() {
    generateRelatedVideos();
    generateSocialLinks();
    
    console.log('Aplicación inicializada');
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initApp);

// Hacer la función accesible globalmente para los eventos onclick
window.changeMainVideo = changeMainVideo;