// Script JavaScript pour Michel Linktree
// Fichier préparé pour de futures fonctionnalités

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('Michel Linktree - Page chargée avec succès!');
    
    // Initialiser les fonctionnalités de base
    initializeLinktree();
});

/**
 * Initialise les fonctionnalités principales du Linktree
 */
function initializeLinktree() {
    // Ajouter des écouteurs d'événements aux boutons de liens
    const linkButtons = document.querySelectorAll('.link-button');
    
    linkButtons.forEach(button => {
        // Ajouter un effet de clic
        button.addEventListener('click', function(e) {
            // Ajouter une petite animation de clic
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Log pour le suivi (peut être retiré en production)
            console.log('Lien cliqué:', this.textContent.trim());
        });
        
        // Ajouter des effets au survol pour améliorer l'UX
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Ajouter une animation d'apparition progressive aux liens
    animateLinksOnLoad();
}

/**
 * Anime l'apparition des liens au chargement de la page
 */
function animateLinksOnLoad() {
    const linkButtons = document.querySelectorAll('.link-button');
    
    linkButtons.forEach((button, index) => {
        // Démarrer invisible
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        // Animer avec un délai progressif
        setTimeout(() => {
            button.style.transition = 'all 0.5s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

/**
 * Fonction utilitaire pour ajouter de nouveaux liens dynamiquement
 * (prête pour une future fonctionnalité d'administration)
 */
function addNewLink(url, text, icon = '🔗') {
    const linksContainer = document.querySelector('.links-container');
    
    if (linksContainer) {
        const newLink = document.createElement('a');
        newLink.href = url;
        newLink.target = '_blank';
        newLink.className = 'link-button';
        newLink.innerHTML = `
            <span class="link-icon">${icon}</span>
            ${text}
        `;
        
        linksContainer.appendChild(newLink);
        
        // Réappliquer les écouteurs d'événements
        initializeLinktree();
        
        console.log('Nouveau lien ajouté:', text);
    }
}

/**
 * Fonction pour gérer le mode sombre (future fonctionnalité)
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    console.log('Mode sombre:', isDark ? 'activé' : 'désactivé');
}

/**
 * Fonction pour récupérer les statistiques de clics (future fonctionnalité)
 */
function getClickStats() {
    const stats = JSON.parse(localStorage.getItem('linkStats') || '{}');
    return stats;
}

/**
 * Fonction pour sauvegarder les statistiques de clics (future fonctionnalité)
 */
function saveClickStats(linkText) {
    const stats = getClickStats();
    stats[linkText] = (stats[linkText] || 0) + 1;
    localStorage.setItem('linkStats', JSON.stringify(stats));
}

// Ajouter un message de bienvenue dans la console
console.log('%cMichel Linktree', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cDéveloppé avec ❤️ pour une expérience utilisateur optimale', 'color: #764ba2;');
