function toggleDarkMode() {
    const body = document.body;
    const isDarkMode = body.classList.toggle("dark-mode");

    // Salva a preferência no Local Storage
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

// Aplica o modo escuro ao carregar a página, se estiver habilitado
window.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
    }
});
