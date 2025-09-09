// This script handles the functionality of a circular menu with buttons that load content into a central box.  
// It includes a hamburger menu for mobile navigation and toggles visibility of buttons when one is clicked.
// It also handles closing the menu when clicking outside of it or on a close button.
const buttons = document.querySelectorAll(".circle-btn");
const contentBox = document.getElementById("circle-content");
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");
const close = document.getElementById("close");

// 🍔 Hamburger toggle
hamburger.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
});

// 🔁 Let circle buttons toggle the menu and hide the other buttons
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {

        // Hide all buttons except the clicked one
        buttons.forEach((b) => {
            if (b !== btn) {
                b.style.display = "none";
            } else {
                b.classList.add("active");
            }
        });

        // Load content into the center of the circle
        contentBox.innerHTML =
            `<h2>${btn.innerHTML}</h2>
            <p>${btn.dataset.content}</p>`

        mobileNav.classList.remove("hidden");


    });
});

function showAllButtons() {
    buttons.forEach((b) => {
        b.style.display = "inline-block";
        b.classList.remove("active");
    });
}
// 🔁 Show all buttons when clicking outside the menu
document.addEventListener("click", (event) => {
    if (
        !mobileNav.contains(event.target) &&
        !hamburger.contains(event.target) &&
        !event.target.classList.contains("circle-btn")
    ) {
        showAllButtons();
        contentBox.innerHTML = `<p>Klicke auf einen Button, um Inhalte zu laden!</p>`;
    }
});
// 🔒 Close menu when "close"" is clicked
close.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
});
// 🔒 Close menu when clicking outside of it
document.addEventListener("click", (event) => {
    if (
        !mobileNav.contains(event.target) &&
        !hamburger.contains(event.target) &&
        !event.target.classList.contains("circle-btn")
    ) {
        mobileNav.classList.add("hidden");
    }
});
