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
