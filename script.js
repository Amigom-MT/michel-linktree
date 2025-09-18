// Script JavaScript pour Michel Linktree avec interface de personnalisation

// Configuration par défaut
const DEFAULT_SETTINGS = {
    title: 'Michel Linktree',
    description: 'Bienvenue sur ma page de liens',
    backgroundColor: '#f4f4f4',
    buttonColor: '#007bff',
    profileImage: 'https://via.placeholder.com/100'
};

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('Michel Linktree - Page chargée avec succès!');
    
    // Initialiser les fonctionnalités
    initializeLinktree();
    initializeCustomization();
    loadSettings();
});

/**
 * Initialise les fonctionnalités principales du Linktree
 */
function initializeLinktree() {
    const linkButtons = document.querySelectorAll('.link-button');
    
    linkButtons.forEach(button => {
        // Ajouter un effet de clic
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Lien cliqué:', this.textContent.trim());
        });
    });
}

/**
 * Initialise l'interface de personnalisation
 */
function initializeCustomization() {
    const customizeToggle = document.getElementById('customizeToggle');
    const customizationPanel = document.getElementById('customizationPanel');
    const closePanel = document.getElementById('closePanel');
    const saveSettings = document.getElementById('saveSettings');
    const resetSettings = document.getElementById('resetSettings');
    
    // Ouvrir/fermer le panneau de personnalisation
    customizeToggle.addEventListener('click', function() {
        customizationPanel.classList.add('open');
    });
    
    closePanel.addEventListener('click', function() {
        customizationPanel.classList.remove('open');
    });
    
    // Fermer le panneau en cliquant en dehors
    document.addEventListener('click', function(e) {
        if (!customizationPanel.contains(e.target) && !customizeToggle.contains(e.target)) {
            customizationPanel.classList.remove('open');
        }
    });
    
    // Sauvegarder les paramètres
    saveSettings.addEventListener('click', function() {
        saveCurrentSettings();
        showNotification('Paramètres sauvegardés !', 'success');
    });
    
    // Réinitialiser les paramètres
    resetSettings.addEventListener('click', function() {
        resetToDefaults();
        showNotification('Paramètres réinitialisés !', 'info');
    });
    
    // Appliquer les changements en temps réel
    setupRealTimeUpdates();
}

/**
 * Configure les mises à jour en temps réel
 */
function setupRealTimeUpdates() {
    const pageTitle = document.getElementById('pageTitle');
    const pageDescription = document.getElementById('pageDescription');
    const backgroundColor = document.getElementById('backgroundColor');
    const buttonColor = document.getElementById('buttonColor');
    const profileImage = document.getElementById('profileImage');
    
    // Titre
    pageTitle.addEventListener('input', function() {
        document.getElementById('mainTitle').textContent = this.value;
        document.title = this.value;
    });
    
    // Description
    pageDescription.addEventListener('input', function() {
        document.getElementById('mainDescription').textContent = this.value;
    });
    
    // Couleur de fond
    backgroundColor.addEventListener('input', function() {
        document.body.style.backgroundColor = this.value;
    });
    
    // Couleur des boutons
    buttonColor.addEventListener('input', function() {
        const buttons = document.querySelectorAll('.link-button');
        buttons.forEach(button => {
            button.style.backgroundColor = this.value;
        });
        
        // Mettre à jour aussi le bouton de personnalisation
        document.getElementById('customizeToggle').style.backgroundColor = this.value;
    });
    
    // Image de profil
    profileImage.addEventListener('input', function() {
        const img = document.getElementById('profileImg');
        if (this.value) {
            img.src = this.value;
            img.onerror = function() {
                this.src = DEFAULT_SETTINGS.profileImage;
                showNotification('Image non trouvée, image par défaut utilisée', 'warning');
            };
        }
    });
}

/**
 * Sauvegarde les paramètres actuels dans localStorage
 */
function saveCurrentSettings() {
    const settings = {
        title: document.getElementById('pageTitle').value,
        description: document.getElementById('pageDescription').value,
        backgroundColor: document.getElementById('backgroundColor').value,
        buttonColor: document.getElementById('buttonColor').value,
        profileImage: document.getElementById('profileImage').value
    };
    
    localStorage.setItem('linktreeSettings', JSON.stringify(settings));
}

/**
 * Charge les paramètres depuis localStorage
 */
function loadSettings() {
    const savedSettings = localStorage.getItem('linktreeSettings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        applySettings(settings);
    } else {
        applySettings(DEFAULT_SETTINGS);
    }
}

/**
 * Applique les paramètres donnés
 */
function applySettings(settings) {
    // Appliquer aux champs du formulaire
    document.getElementById('pageTitle').value = settings.title;
    document.getElementById('pageDescription').value = settings.description;
    document.getElementById('backgroundColor').value = settings.backgroundColor;
    document.getElementById('buttonColor').value = settings.buttonColor;
    document.getElementById('profileImage').value = settings.profileImage;
    
    // Appliquer à la page
    document.getElementById('mainTitle').textContent = settings.title;
    document.getElementById('mainDescription').textContent = settings.description;
    document.body.style.backgroundColor = settings.backgroundColor;
    document.title = settings.title;
    
    // Appliquer aux boutons
    const buttons = document.querySelectorAll('.link-button');
    buttons.forEach(button => {
        button.style.backgroundColor = settings.buttonColor;
    });
    
    // Appliquer au bouton de personnalisation
    document.getElementById('customizeToggle').style.backgroundColor = settings.buttonColor;
    
    // Appliquer l'image de profil
    const img = document.getElementById('profileImg');
    img.src = settings.profileImage;
    img.onerror = function() {
        this.src = DEFAULT_SETTINGS.profileImage;
    };
}

/**
 * Réinitialise aux paramètres par défaut
 */
function resetToDefaults() {
    applySettings(DEFAULT_SETTINGS);
    localStorage.removeItem('linktreeSettings');
}

/**
 * Affiche une notification à l'utilisateur
 */
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Créer la nouvelle notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#FF9800' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        opacity: 0;
        transform: translateX(320px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animer l'apparition
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });
    
    // Supprimer automatiquement après 3 secondes
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(320px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Message de bienvenue dans la console
console.log('%cMichel Linktree', 'font-size: 20px; font-weight: bold; color: #007bff;');
console.log('%cInterface de personnalisation activée', 'color: #666;');
console.log('%cUtilisez le bouton ⚙️ pour personnaliser votre page', 'color: #007bff;');
