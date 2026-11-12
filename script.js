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
