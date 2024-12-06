document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("header nav");

    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuToggle.classList.toggle("open");

        if (menuToggle.classList.contains("open")) {
            menuToggle.innerHTML = "✖";
            menuToggle.setAttribute("aria-label", "Cerrar menú");
        } else {
            menuToggle.innerHTML = "&#9776;";
            menuToggle.setAttribute("aria-label", "Abrir menú");
        }
    });

    const menuButtons = document.querySelectorAll(".menuDesplegable .menubtn");

    menuButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            
            e.stopPropagation();
            const parent = button.closest(".menuDesplegable");

            parent.classList.toggle("active");

            document.querySelectorAll(".menuDesplegable.active").forEach((otherMenu) => {
                if (otherMenu !== parent) {
                    otherMenu.classList.remove("active");
                }
            });
        });
    });
});