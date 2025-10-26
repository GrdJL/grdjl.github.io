const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const mobileMenu = document.querySelector(".nav-menu"); // 👈 SÉLECTIONNEUR CORRIGÉ
const navLinks = document.querySelectorAll(".nav-link"); // 👈 NOUVEAU: Sélectionne tous les liens du menu

// Écouteur pour ouvrir/fermer le menu via les boutons
menuOpenButton.addEventListener("click", () => {
    // toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

// Le bouton de fermeture simule un clic sur le bouton d'ouverture
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// --- NOUVELLE LOGIQUE POUR FERMER LE MENU AU CLIC SUR UN LIEN ---
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        // Ferme le menu en retirant la classe, simulant le tiroir
        document.body.classList.remove("show-mobile-menu");
    });
});
// -----------------------------------------------------------------

// --- Logique pour fermer le menu au clic externe ---
document.addEventListener("click", (event) => {
    // 1. Vérifie si le menu est actuellement ouvert
    const isMenuOpen = document.body.classList.contains("show-mobile-menu");

    if (isMenuOpen) {
        // 2. Vérifie si l'élément cliqué (event.target) n'est PAS :
        //    a) à l'intérieur du conteneur du menu (.nav-menu)
        //    b) le bouton d'ouverture lui-même (#menu-open-button)
        if (!mobileMenu.contains(event.target) && !menuOpenButton.contains(event.target)) {
            // 3. Ferme le menu en retirant la classe
            document.body.classList.remove("show-mobile-menu");
        }
    }
});
