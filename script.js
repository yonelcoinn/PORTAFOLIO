// JavaScript para el portafolio de Yonel Galvis
// Funcionalidades: navegación móvil, formulario de contacto y efectos interactivos

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVEGACIÓN MÓVIL
    // ============================================
    
    // Obtener elementos del menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Event listener para el botón hamburguesa
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Cerrar menú móvil al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // ============================================
    // NAVEGACIÓN SUAVE
    // ============================================
    
    // Función para navegación suave a secciones
    function smoothScroll(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Ajustar por altura del navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    // Event listeners para enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScroll(targetId);
        });
    });
    
    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================
    
    // Obtener el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    // Función para validar el formulario
    function validateForm(formData) {
        const errors = [];
        
        // Validar nombre
        if (!formData.nombre.trim()) {
            errors.push('El nombre es requerido');
        } else if (formData.nombre.trim().length < 2) {
            errors.push('El nombre debe tener al menos 2 caracteres');
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.push('El correo electrónico es requerido');
        } else if (!emailRegex.test(formData.email)) {
            errors.push('El correo electrónico no es válido');
        }
        
        // Validar mensaje
        if (!formData.mensaje.trim()) {
            errors.push('El mensaje es requerido');
        } else if (formData.mensaje.trim().length < 10) {
            errors.push('El mensaje debe tener al menos 10 caracteres');
        }
        
        return errors;
    }
    
    // Función para mostrar mensajes de error
    function showErrors(errors) {
        // Limpiar errores anteriores
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
        
        // Mostrar nuevos errores
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#f97316';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '0.5rem';
            errorDiv.textContent = error;
            
            // Insertar después del formulario
            contactForm.appendChild(errorDiv);
        });
    }
    
    // Función para limpiar errores
    function clearErrors() {
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
    }
    
    // Función para mostrar mensaje de éxito
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.color = '#38bdf8';
        successDiv.style.fontSize = '1rem';
        successDiv.style.marginTop = '1rem';
        successDiv.style.padding = '1rem';
        successDiv.style.backgroundColor = 'rgba(56, 189, 248, 0.1)';
        successDiv.style.borderRadius = '8px';
        successDiv.style.border = '1px solid #38bdf8';
        successDiv.textContent = '¡Mensaje enviado correctamente! Te contactaré pronto.';
        
        // Insertar después del formulario
        contactForm.appendChild(successDiv);
        
        // Remover el mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
    
    // Event listener para el envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir envío por defecto
        
        // Limpiar errores anteriores
        clearErrors();
        
        // Obtener datos del formulario
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            mensaje: document.getElementById('mensaje').value
        };
        
        // Validar formulario
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            // Mostrar errores
            showErrors(errors);
        } else {
            // Simular envío del formulario
            console.log('Formulario enviado correctamente');
            console.log('Datos del formulario:', formData);
            
            // Mostrar mensaje de éxito
            showSuccessMessage();
            
            // Limpiar formulario
            contactForm.reset();
        }
    });
    
    // ============================================
    // EFECTOS DE SCROLL
    // ============================================
    
    // Función para mostrar elementos cuando son visibles
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.project-card, .experience-card, .skills-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Aplicar estilos iniciales para la animación
    const animatedElements = document.querySelectorAll('.project-card, .experience-card, .skills-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Event listener para scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Ejecutar una vez al cargar la página
    handleScrollAnimation();
    
    // ============================================
    // EFECTOS INTERACTIVOS ADICIONALES
    // ============================================
    
    // Efecto de hover en tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de typing en el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto de typing al título principal (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Descomentar la siguiente línea si quieres el efecto de typing
        // typeWriter(heroTitle, originalText, 150);
    }
    
    // ============================================
    // NAVEGACIÓN ACTIVA
    // ============================================
    
    // Función para actualizar el enlace activo según la sección visible
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Event listener para actualizar navegación activa
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ============================================
    // CARGAR IMÁGENES CON EFECTO FADE
    // ============================================
    
    // Función para cargar imágenes con efecto fade
    function loadImagesWithFade() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = function() {
                this.style.opacity = '1';
            };
            
            // Si la imagen ya está cargada
            if (img.complete) {
                img.style.opacity = '1';
            }
        });
    }
    
    // Ejecutar al cargar la página
    loadImagesWithFade();
    
    // ============================================
    // MENSAJE DE CONSOLA
    // ============================================
    
    // Mensaje de bienvenida en consola
    console.log('%c¡Bienvenido al portafolio de Yonel Galvis!', 'color: #38bdf8; font-size: 16px; font-weight: bold;');
    console.log('%cDesarrollado con HTML, CSS y JavaScript puro', 'color: #f97316; font-size: 12px;');
    console.log('%cPara más información, visita: yonelgalvisnetworket@gmail.com', 'color: #f8fafc; font-size: 10px;');
    
});

// ============================================
// FUNCIONES GLOBALES
// ============================================

// Función para copiar email al portapapeles
function copyEmail() {
    const email = 'yonelgalvisnetworket@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copiado al portapapeles: ' + email);
    }).catch(() => {
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Email copiado al portapapeles: ' + email);
    });
}

// Función para abrir enlaces externos de forma segura
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}
