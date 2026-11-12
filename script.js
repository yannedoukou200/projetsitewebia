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

// 5. Synthèse vocale : Message d'accueil vocal
const voiceBtn = document.getElementById('voice-btn');

voiceBtn.addEventListener('click', function() {
    // On vérifie si le navigateur supporte la synthèse vocale
    if ('speechSynthesis' in window) {
        // Stoppe toute lecture en cours pour éviter les chevauchements
        window.speechSynthesis.cancel();

        const message = "Bienvenue sur le portfolio de Yann Edoukou ! Passionné par l'univers de la Data et du Web, je vous souhaite une excellente visite.";
        const utterance = new SpeechSynthesisUtterance(message);

        // Configuration de la voix en français
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0; // Vitesse de lecture
        utterance.pitch = 1.0; // Tonalité de la voix

        // Changement temporaire du texte du bouton pendant qu'elle parle
        voiceBtn.textContent = '🔊 Lecture en cours...';
        utterance.onend = function() {
            voiceBtn.textContent = "🔊 Écouter l'accueil";
        };

        // Déclencher la parole
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Désolé, votre navigateur ne supporte pas la synthèse vocale.");
    }
});

// 6. Animation 3D interactive (Effet d'inclinaison Tilt) sur la photo de profil
const tiltCard = document.querySelector('.profile-3d-wrapper');
const tiltImg = document.querySelector('.profile-pic');

if (tiltCard && tiltImg) {
    tiltCard.addEventListener('mousemove', function(e) {
        const rect = tiltCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Calcul des angles d'inclinaison 3D selon la position du curseur
        const rotateX = (-y / rect.height) * 35;
        const rotateY = (x / rect.width) * 35;

        tiltImg.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08)`;
    });

    tiltCard.addEventListener('mouseleave', function() {
        // Retour automatique à l'état initial dès que la souris quitte la photo
        tiltImg.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}
