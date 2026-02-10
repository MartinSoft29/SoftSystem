// Router SPA
class Router {
    constructor() {
        this.currentPage = 'inicio';
        this.init();
    }

    init() {
        // Manejar clics en enlaces de navegación
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('href').substring(1);
                this.navigate(page);
            });
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
            const parallaxElements = document.querySelectorAll('.hero h1, .feature-card, .project-card');
            parallaxElements.forEach((el, i) => {
                const speed = 0.5 + (i * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Console message
console.log('🎨 SPA con diseño moderno cargada');
