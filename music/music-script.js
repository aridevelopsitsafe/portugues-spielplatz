document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            mobileNav.classList.toggle('hidden');
        });
    }

    // Sample artist data (in a real app, this would come from an API)
    const artistsByLetter = {
        'A': ['Ana Carolina', 'Anitta', 'Alceu Valença'],
        'B': ['Banda Eva', 'Barão Vermelho', 'Belo'],
        'C': ['Caetano Veloso', 'Chico Buarque', 'Cazuza'],
        'D': ['Daniela Mercury', 'Djavan', 'Dona Ivone Lara'],
        'E': ['Elis Regina', 'Erasmo Carlos', 'Exaltasamba'],
        'F': ['Falamansa', 'Fernanda Abreu', 'Frejat'],
        'G': ['Gal Costa', 'Gilberto Gil', 'Gonzaguinha'],
        'L': ['Legião Urbana', 'Los Hermanos', 'Luiz Gonzaga'],
        'M': ['Marisa Monte', 'Maria Bethânia', 'Milton Nascimento'],
        'T': ['Tim Maia', 'Titãs', 'Tropicalia']
    };

    // Alphabet links functionality
    const alphabetLinks = document.querySelectorAll('.alphabet-list a');
    const artistAccordion = document.getElementById('artist-accordion');
    const currentLetterDisplay = document.getElementById('current-letter');

    alphabetLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const letter = this.getAttribute('data-letter');
            currentLetterDisplay.textContent = `Artistas com a letra ${letter}`;

            // Clear previous content
            artistAccordion.innerHTML = '';

            // Check if we have artists for this letter
            if (artistsByLetter[letter]) {
                artistsByLetter[letter].forEach(artist => {
                    const accordionItem = document.createElement('div');
                    accordionItem.className = 'accordion-item';

                    const header = document.createElement('div');
                    header.className = 'accordion-header';
                    header.innerHTML = `
                        <span>${artist}</span>
                        <span>+</span>
                    `;

                    const content = document.createElement('div');
                    content.className = 'accordion-content';
                    content.innerHTML = `
                        <p>Músicas disponíveis:</p>
                        <ul>
                            <li><a href="#">Música 1</a></li>
                            <li><a href="#">Música 2</a></li>
                            <li><a href="#">Música 3</a></li>
                        </ul>
                    `;

                    header.addEventListener('click', function () {
                        content.classList.toggle('active');
                        const icon = this.querySelector('span:last-child');
                        icon.textContent = content.classList.contains('active') ? '−' : '+';
                    });

                    accordionItem.appendChild(header);
                    accordionItem.appendChild(content);
                    artistAccordion.appendChild(accordionItem);
                });
            } else {
                artistAccordion.innerHTML = '<p>Nenhum artista encontrado para esta letra.</p>';
            }
        });
    });
});