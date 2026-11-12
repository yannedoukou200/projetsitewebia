// 1. On sélectionne le bouton dans le document HTML grâce à son id "theme-toggle"
const themeBtn = document.getElementById('theme-toggle');

// 2. On écoute le clic de l'utilisateur sur ce bouton
themeBtn.addEventListener('click', function() {
    // 3. On ajoute ou retire la classe "dark-mode" sur le <body> de la page
    document.body.classList.toggle('dark-mode');

    // 4. On adapte le texte et l'icône du bouton selon le mode activé
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = '☀️ Mode Clair';
    } else {
        themeBtn.textContent = '🌙 Mode Sombre';
    }
});

// 5. Synthèse vocale automatique dès l'arrivée sur le site
const voiceBtn = document.getElementById('voice-btn');
let hasSpoken = false;

function speakWelcome() {
    if (hasSpoken) return;
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const message = "Bienvenue sur le portfolio de Yann Edoukou ! Passionné par l'univers de la Data et du Web, je vous souhaite une excellente visite.";
        const utterance = new SpeechSynthesisUtterance(message);

        utterance.lang = 'fr-FR';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        if (voiceBtn) voiceBtn.textContent = '🔊 Lecture en cours...';
        utterance.onend = function() {
            if (voiceBtn) voiceBtn.textContent = "🔊 Réécouter l'accueil";
        };

        window.speechSynthesis.speak(utterance);
        hasSpoken = true;
    }
}

// Lancement automatique dès l'ouverture de la page
window.addEventListener('load', function() {
    setTimeout(speakWelcome, 600);
});

// Sécurité pour les navigateurs (Chrome bloque parfois le son avant le 1er geste) :
// La voix se déclenche instantanément dès la moindre touche, clic ou défilement !
function triggerOnFirstAction() {
    speakWelcome();
}
document.addEventListener('click', triggerOnFirstAction, { once: true });
document.addEventListener('scroll', triggerOnFirstAction, { once: true });
document.addEventListener('keydown', triggerOnFirstAction, { once: true });

if (voiceBtn) {
    voiceBtn.addEventListener('click', function() {
        hasSpoken = false;
        speakWelcome();
    });
}

// 6. Animation 3D interactive (Effet d'inclinaison Tilt) sur la photo de profil
const tiltCard = document.querySelector('.profile-3d-wrapper');
const tiltImg = document.querySelector('.profile-pic');

if (tiltCard && tiltImg) {
    tiltCard.addEventListener('mousemove', function(e) {
        const rect = tiltCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = (-y / rect.height) * 35;
        const rotateY = (x / rect.width) * 35;

        tiltImg.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08)`;
    });

    tiltCard.addEventListener('mouseleave', function() {
        tiltImg.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

// 7. Animation Réseau Neuronal IA en temps réel (Canvas 60 FPS, 0 chargement !)
const canvas = document.getElementById('ai-network-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 1.0;
            this.vy = (Math.random() - 0.5) * 1.0;
            this.radius = Math.random() * 2.5 + 1.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#38bdf8';
            ctx.fill();
        }
    }

    const count = Math.min(65, Math.floor((canvas.width * canvas.height) / 7000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animateNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 115) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist / 115})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateNetwork);
    }
    animateNetwork();
}
