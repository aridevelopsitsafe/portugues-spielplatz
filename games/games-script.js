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

    document.getElementById('calculate').addEventListener('click', function () {
        const height = parseInt(document.getElementById('height').value) / 100; // Convert cm to m
        const weight = parseInt(document.getElementById('weight').value);

        if (!height || !weight) {
            alert("Por favor, preencha altura e peso!");
            return;
        }

        const bmi = (weight / (height * height)).toFixed(1);
        let resultText, emoji;

        if (bmi < 18.5) {
            resultText = `MAGRO (IMC: ${bmi})`;
            emoji = "🥗🏃";
        } else if (bmi >= 18.5 && bmi < 25) {
            resultText = `BEM (IMC: ${bmi})`;
            emoji = "👍😊";
        } else if (bmi >= 25 && bmi < 30) {
            resultText = `GORDINHO (IMC: ${bmi})`;
            emoji = "🍔🤏";
        } else {
            resultText = `GORDO (IMC: ${bmi})`;
            emoji = "🍔🍟";
        }

        document.getElementById('result').textContent = resultText;
        document.getElementById('emoji-result').textContent = emoji;
    });
});