document.addEventListener('DOMContentLoaded', function () {

    // Game selection functionality
    const gameItems = document.querySelectorAll('.games-list li');
    const gamePanels = document.querySelectorAll('.game-panel');

    gameItems.forEach(item => {
        item.addEventListener('click', function () {
            const gameId = this.getAttribute('data-game');

            // Hide all game panels
            gamePanels.forEach(panel => {
                panel.classList.remove('active');
                panel.classList.add('hidden');
            });

            // Show selected game panel
            const selectedPanel = document.getElementById(gameId);
            selectedPanel.classList.remove('hidden');
            selectedPanel.classList.add('active');

            // Update active state in sidebar
            gameItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Activate the first game by default
    if (gameItems.length > 0) {
        gameItems[0].click();
    }

    // Memory game logic
    const memoryCards = document.querySelectorAll('.memory-card');

    memoryCards.forEach(card => {
        card.addEventListener('click', function () {

            this.textContent = "📖";
        });
    });

    // Quiz game logic
    const quizOptions = document.querySelectorAll('.quiz-option');

    quizOptions.forEach(option => {
        option.addEventListener('click', function () {
            if (this.textContent == 'casas') {
                alert(`Você selecionou: ${this.textContent} :-) certa resposta`);
            } else {
                alert(`Você selecionou: ${this.textContent} :-( resposta errada`);
            }
        });
    });
});