// ================= 1. CONFIGURACIÓN DE PARTÍCULAS =================
document.addEventListener("DOMContentLoaded", function() {
    if (window.particlesJS) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#8b5cf6", "#3b82f6"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8b5cf6",
                    "opacity": 0.3,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }
});

// ================= 2. MENÚ MÓVIL FUNCIONAL =================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', function() {
    if (navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ================= 3. EFECTOS DE NAVEGACIÓN EN SCROLL =================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(5, 0, 15, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.1)';
    } else {
        navbar.style.background = 'rgba(5, 0, 15, 0.85)';
        navbar.style.boxShadow = 'none';
    }
});

// ================= 4. ANIMACIÓN DE CONTADORES =================
const counters = document.querySelectorAll('.counter');
const speed = 100;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const observerOptions = {
    root: null,
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.getElementById('estadisticas');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ================= 5. ANIMACIONES DE ENTRADA =================
const observerAnim = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observerAnim.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

const cards = document.querySelectorAll('.service-card-advanced, .benefit-card, .stat-box, .manager-card, .info-item, .contact-map');
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observerAnim.observe(card);
});

// ================= 6. FILTRO DE GALERÍA =================
const filterBtns = document.querySelectorAll('.filter-btn');
const galeriaItems = document.querySelectorAll('.galeria-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remover clase active de todos los botones
        filterBtns.forEach(b => b.classList.remove('active'));
        // Agregar active al botón clickeado
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        // Filtrar items
        galeriaItems.forEach(item => {
            const itemFilter = item.getAttribute('data-filter');
            
            if (filterValue === 'all' || itemFilter === filterValue) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
    });
});

// ================= 7. EFECTO PARALLAX EN HERO =================
const particlesContainer = document.getElementById('particles-js');

window.addEventListener('mousemove', (e) => {
    if (particlesContainer) {
        const moveX = (e.clientX / window.innerWidth) * 10;
        const moveY = (e.clientY / window.innerHeight) * 10;
        particlesContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// ================= 8. VALIDACIÓN Y ENVÍO DEL FORMULARIO =================
const formDiagnostico = document.getElementById('form-diagnostico');

const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        this.style.borderBottomColor = this.value ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)';
    });
});

formDiagnostico.addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const dispositivo = document.getElementById('dispositivo').value.trim();
    const problema = document.getElementById('problema').value.trim();

    if (!nombre || !correo || !telefono || !dispositivo || !problema) {
        mostrarNotificacion('Por favor completa todos los campos', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        mostrarNotificacion('Por favor ingresa un correo válido', 'error');
        return;
    }

    const datosCliente = {
        nombre: nombre,
        correo: correo,
        telefono: telefono,
        dispositivo: dispositivo,
        problema: problema,
        fecha: new Date().toISOString()
    };

    console.log("Datos capturados listos para Firebase:", datosCliente);
    
    mostrarNotificacion('¡Solicitud enviada con éxito! Nos comunicaremos pronto.', 'exito');
    
    formDiagnostico.reset();
    
    inputs.forEach(input => {
        input.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    });
});

// ================= 9. NOTIFICACIONES VISUALES =================
function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'exito' ? '#25D366' : '#ff6b6b'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        max-width: 300px;
    `;

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notificacion.remove(), 300);
    }, 4000);
}

// ================= 10. SMOOTH SCROLL MEJORADO =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ================= 11. ANIMACIÓN DEL INDICADOR DE SCROLL =================
const scrollArrow = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        if (scrollArrow) {
            scrollArrow.style.opacity = '0';
            scrollArrow.style.pointerEvents = 'none';
        }
    } else {
        if (scrollArrow) {
            scrollArrow.style.opacity = '1';
            scrollArrow.style.pointerEvents = 'auto';
        }
    }
});

// ================= 12. ANIMACIÓN DE CARGA =================
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
window.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
});

// ================= 13. ESTILOS DINÁMICOS =================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .notificacion {
            top: 80px !important;
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);

// ================= 14. VALIDACIÓN DE TELÉFONO EN TIEMPO REAL =================
const telefonoInput = document.getElementById('telefono');
if (telefonoInput) {
    telefonoInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9-+ ]/g, '');
    });
}

// ================= 15. CONTADOR DE CARACTERES PARA TEXTAREA =================
const problemaTextarea = document.getElementById('problema');
if (problemaTextarea) {
    problemaTextarea.addEventListener('input', function() {
        const maxLength = 500;
        if (this.value.length > maxLength) {
            this.value = this.value.substring(0, maxLength);
        }
    });
}

// ================= 16. EFECTO DE TYPING EN TÍTULOS (Opcional) =================
function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, speed);
}

// Observar cuando los servicios entren en vista
const serviciosSection = document.getElementById('servicios');
if (serviciosSection) {
    const observerServicios = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Podrías agregar efectos aquí si deseas
            }
        });
    }, { threshold: 0.1 });
    
    observerServicios.observe(serviciosSection);
}
