document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburger.addEventListener('click', function () {
        mobileNav.classList.toggle('hidden');
    });

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

    // Hangman game logic (simplified)
    const letterInput = document.querySelector('.letter-input');
    const guessBtn = document.querySelector('.guess-btn');

    guessBtn.addEventListener('click', function () {
        const letter = letterInput.value.toUpperCase();
        if (letter && letter.match(/[A-ZÀ-Ú]/)) {
            // In a real implementation, you would check the letter against the word
            alert(`Você adivinhou a letra ${letter}`);
            letterInput.value = '';
        }
    });

    // Memory game logic (simplified)
    const memoryCards = document.querySelectorAll('.memory-card');

    memoryCards.forEach(card => {
        card.addEventListener('click', function () {
            // In a real implementation, you would reveal the card
            this.textContent = "📖"; // Example content
        });
    });

    // Quiz game logic (simplified)
    const quizOptions = document.querySelectorAll('.quiz-option');

    quizOptions.forEach(option => {
        option.addEventListener('click', function () {
            // In a real implementation, you would check the answer
            alert(`Você selecionou: ${this.textContent}`);
        });
    });
});