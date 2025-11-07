// --- Sélection des éléments du DOM ---
// Récupère les éléments HTML nécessaires pour gérer la navigation mobile.

const menuOpenButton = document.querySelector("#menu-open-button"); // Le bouton "hamburger" pour ouvrir le menu
const menuCloseButton = document.querySelector("#menu-close-button"); // Le bouton "X" pour fermer le menu
const mobileMenu = document.querySelector(".nav-menu"); // Le conteneur du menu lui-même (le "tiroir")
const navLinks = document.querySelectorAll(".nav-link"); // Tous les liens dans le menu (ex: Home, Services)

// --- Gestion de l'ouverture/fermeture via les boutons ---

// Écouteur pour ouvrir/fermer le menu via le bouton "hamburger"
menuOpenButton.addEventListener("click", () => {
    // Alterne (ajoute/retire) la classe 'show-mobile-menu' sur l'élément <body>.
    // Le CSS utilise cette classe pour afficher/masquer le menu et l'overlay.
    document.body.classList.toggle("show-mobile-menu");
});

// Le bouton de fermeture ("X") simule un clic sur le bouton d'ouverture
// Cela déclenche le 'toggle' ci-dessus et ferme le menu.
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// --- NOUVELLE LOGIQUE POUR FERMER LE MENU AU CLIC SUR UN LIEN ---
// Parcourt chaque lien de navigation
navLinks.forEach(link => {
    // Ajoute un écouteur d'événement sur chaque lien
    link.addEventListener("click", () => {
        // Quand un utilisateur clique sur un lien (ex: "Services"),
        // on retire la classe pour fermer le menu immédiatement.
        // C'est crucial pour une bonne expérience sur mobile.
        document.body.classList.remove("show-mobile-menu");
    });
});
// -----------------------------------------------------------------

// --- Logique pour fermer le menu au clic externe (clic "à côté") ---
// Ajoute un écouteur d'événement global sur l'ensemble du document
document.addEventListener("click", (event) => {
    // 1. Vérifie si le menu est currently ouvert
    const isMenuOpen = document.body.classList.contains("show-mobile-menu");

    // Si le menu est bien ouvert...
    if (isMenuOpen) {
        // 2. Vérifie si l'élément cliqué (event.target) n'est PAS :
        //    a) à l'intérieur du conteneur du menu (.nav-menu)
        //    b) le bouton d'ouverture lui-même (#menu-open-button)
        // Si le clic a lieu EN DEHORS de ces deux éléments, cela signifie qu'on a cliqué "à côté".
        if (!mobileMenu.contains(event.target) && !menuOpenButton.contains(event.target)) {
            
            // 3. Ferme le menu en retirant la classe
            document.body.classList.remove("show-mobile-menu");
        }
    }
});

// --- LOGIQUE POUR LA GALERIE D'IMAGES DANS SECTION ABOUT ---

// Liste des images disponibles (simulant le contenu de ressources/pictures)
// Utilisation des images existantes dans 'ressources' pour l'exemple
const imageSources = [
    {
        src: "ressources/pexels-mikhail-nilov-8851547.jpg",
        alt: "Two scientists working in a laboratory, conducting experiments and analyzing samples."
    },
    {
        src: "ressources/pexels-kampus-8829175.jpg",
        alt: "Scientist looking through a microscope in a research laboratory."
    },
    {
        src: "ressources/pexels-shvetsa-3683102.jpg",
        alt: "Researchers in protective gear working with chemical substances in a scientific laboratory."
    },
    {
        src: "ressources/bechers.webp",
        alt: "lab props."
    },
    {
        src: "ressources/pexels-thirdman-5922066.jpg",
        alt: "Young scientist holding a test tube and documenting results at a workstation."
    },
    {
        src: "ressources/pexels-cottonbro-7580248.jpg",
        alt: "Laboratory technician examining a biological sample under controlled lighting."
    },
    {
        src: "ressources/pexels-artempodrez-6823561.jpg",
        alt: "Team of scientists discussing their findings in a laboratory filled with research equipment."
    },
    {
        src: "ressources/pexels-thirdman-5961132.jpg",
        alt: "Researchers conducting chemical analysis and recording data in a science lab."
    },
];

const imageElement = document.querySelector(".image-to-cycle");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const imageGalleryWrapper = document.querySelector(".image-gallery-wrapper");
// SÉLECTION DES ÉLÉMENTS POUR LE FONDU
const overlayElement = document.querySelector(".overlay");
const sceneElement = document.querySelector(".scene");

let currentImageIndex = 0;

// Initialiser l'index avec l'image actuellement visible dans l'HTML
if (imageElement) {
    const initialSrc = imageElement.getAttribute('src');
    const index = imageSources.findIndex(img => img.src === initialSrc);
    if (index !== -1) {
        currentImageIndex = index;
    }
}


/**
 * Met à jour la source et le texte alternatif de l'image avec une transition de fondu.
 * Déclenche le fondu en entrée uniquement après le chargement de la nouvelle image.
 * @param {number} newIndex - Le nouvel index de l'image à afficher.
 */
function updateImage(newIndex) {
    if (!imageElement || imageSources.length === 0) return;
    
    // Si l'index ne change pas, on ne fait rien
    if (newIndex === currentImageIndex) return;

    // L'image à afficher
    const newImage = imageSources[newIndex];

    // 1. Déclenche le fondu en sortie (les éléments deviennent transparents)
    imageElement.style.opacity = '0';
    if (overlayElement) overlayElement.style.opacity = '0';
    if (sceneElement) sceneElement.style.opacity = '0';

    // 2. Commence le préchargement de la nouvelle image en arrière-plan
    const preloader = new Image();
    preloader.src = newImage.src;
    
    // 3. Attends que l'ancienne image ait fini de disparaître (selon la transition CSS)
    setTimeout(() => {
        // Si l'image n'est pas encore chargée, attend l'événement 'load'
        if (!preloader.complete) {
            preloader.onload = () => {
                applyNewImage(newIndex, newImage);
            };
        } else {
            // Sinon, l'image est déjà en cache ou chargée instantanément
            applyNewImage(newIndex, newImage);
        }
    }, 500); // Durée de la transition CSS en millisecondes (0.5s)
}

/**
 * Applique la nouvelle image au DOM et lance le fondu en entrée.
 * Cette fonction est appelée UNIQUEMENT après le chargement de l'image.
 * @param {number} index - L'index de la nouvelle image.
 * @param {object} imageObject - L'objet contenant la source et le texte alternatif de l'image.
 */
function applyNewImage(index, imageObject) {
    // Met à jour l'index courant
    currentImageIndex = index;

    // Change la source et l'attribut alt de l'élément visible
    imageElement.src = imageObject.src;
    imageElement.alt = imageObject.alt;
    
    // Déclenche le fondu en entrée pour l'image, l'overlay et la scène
    imageElement.style.opacity = '1';
    if (overlayElement) overlayElement.style.opacity = '1';
    if (sceneElement) sceneElement.style.opacity = '1';
}

/**
 * Affiche l'image précédente.
 */
function showPrevImage() {
    let newIndex = currentImageIndex - 1;
    // Boucle vers la dernière image si on dépasse le début
    if (newIndex < 0) {
        newIndex = imageSources.length - 1;
    }
    updateImage(newIndex);
}

/**
 * Affiche l'image suivante.
 */
function showNextImage() {
    let newIndex = currentImageIndex + 1;
    // Boucle vers la première image si on dépasse la fin
    if (newIndex >= imageSources.length) {
        newIndex = 0;
    }
    updateImage(newIndex);
}

// Ajout des écouteurs d'événements aux boutons
if (prevButton) {
    prevButton.addEventListener("click", showPrevImage);
}

if (nextButton) {
    nextButton.addEventListener("click", showNextImage);
}

// -----------------------------------------------------------------

// --- LOGIQUE POUR LE DIAPORAMA AUTOMATIQUE (SLIDER AUTO) ---

// Définir la durée (en millisecondes) entre les changements d'image
const SLIDE_INTERVAL = 24000; // Changer d'image toutes les 4 secondes (4000 ms)
let autoSlideTimer;

/**
 * Démarre le diaporama automatique en utilisant setInterval.
 */
function startAutoSlide() {
    // S'assurer qu'un diaporama n'est pas déjà en cours avant d'en créer un nouveau
    stopAutoSlide(); 
    
    // Si l'élément d'image existe et qu'il y a plus d'une image
    if (imageElement && imageSources.length > 1) {
        // Définit un intervalle qui appelle showNextImage après SLIDE_INTERVAL millisecondes
        autoSlideTimer = setInterval(showNextImage, SLIDE_INTERVAL);
    }
}

/**
 * Arrête le diaporama automatique.
 */
function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// Logique pour PAUSER le diaporama au survol de la galerie (bonne UX)
if (imageGalleryWrapper) {
    // Écouteur pour arrêter le timer quand la souris est au-dessus
    imageGalleryWrapper.addEventListener("mouseenter", stopAutoSlide);

    // Écouteur pour redémarrer le timer quand la souris quitte
    imageGalleryWrapper.addEventListener("mouseleave", startAutoSlide);
}
// -----------------------------------------------------------------


// Démarre le diaporama lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    startAutoSlide();
});
