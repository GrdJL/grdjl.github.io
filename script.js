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
    // 1. Vérifie si le menu est actuellement ouvert
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
    { src: "test1.jpg", alt: "Two scientists in a lab coat reviewing documents, with 'Clinical Trial' and related icons overlaid." },
    { src: "test0.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "test2.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "test3.png", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "image.webp", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "pexels-etatics-inc-252430999-12512676.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "pexels-karola-g-4047073.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "pexels-karola-g-4047074.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "pexels-leeloothefirst-8383877.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "pexels-shvetsa-3683105.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "pexels-tara-winstead-7722680.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "pexels-tara-winstead-7723528.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "pexels-thirdman-5922066.jpg", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "Gemini_Generated_Image_by4fo4by4fo4by4f.png", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    { src: "Gemini_Generated_Image_e50nnae50nnae50n.png", alt: "Glass beakers on a table in a sunny, outdoor setting, representing scientific research." },
    // Ajoutez ici les chemins de vos autres images (ex: "ressources/pictures/image3.jpg")
    // { src: "ressources/pictures/image3.jpg", alt: "Description of image 3" }, 
];

const imageElement = document.querySelector(".image-to-cycle");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

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
 * Met à jour la source et le texte alternatif de l'image.
 * @param {number} index - Le nouvel index de l'image à afficher.
 */
function updateImage(index) {
    if (imageElement && imageSources.length > 0) {
        currentImageIndex = index;
        const newImage = imageSources[currentImageIndex];
        imageElement.src = newImage.src;
        imageElement.alt = newImage.alt;
    }
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
