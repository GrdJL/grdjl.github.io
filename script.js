const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    // toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});
// toggle mobile menu visibility
menuCloseButton.addEventListener("click", () => menuOpenButton.click());
