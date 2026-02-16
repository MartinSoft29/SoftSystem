// Router SPA
class Router {
    constructor() {
        this.currentPage = 'inicio';
        this.init();
    }

    init() {
        // Manejar clics en enlaces de navegación
        const handleNavClick = (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            this.navigate(page);
        };

        // Enlaces de navegación principal
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Botones de acción (hero buttons)
        document.querySelectorAll('.hero-btn').forEach(btn => {
            btn.addEventListener('click', handleNavClick);
        });

        // Manejar botón atrás/adelante del navegador
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page);
            }
        });

        // Cargar página inicial desde el hash
        const hash = window.location.hash.substring(1);
        if (hash) {
            this.navigate(hash, false);
        }
    }

    navigate(page, addToHistory = true) {
        this.showPage(page);
        if (addToHistory) {
            history.pushState({ page }, '', `#${page}`);
        }
    }

    showPage(page) {
        // Ocultar todas las páginas
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Mostrar página seleccionada
        const targetPage = document.getElementById(page);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
        }

        // Actualizar navegación activa
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${page}`) {
                link.classList.add('active');
            }
        });

        // Scroll al inicio suave
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Inicializar router
const router = new Router();

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado.`);
    e.target.reset();
});

// Parallax effect on scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const yPos = Math.min(scrolled * 0.08, 40);
                heroTitle.style.transform = `translateY(${yPos}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Console message
console.log('🎨 SPA con diseño moderno cargada');
