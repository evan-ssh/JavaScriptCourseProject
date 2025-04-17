document.addEventListener('DOMContentLoaded', function() {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const peopleImages = {
        "Luke Skywalker": "peopleIMG/LukeSkywalker.webp",
        "C-3PO": "peopleIMG/C3PO.webp",
        "R2-D2": "peopleIMG/R2D2.webp",
        "Darth Vader": "peopleIMG/DARTH.webp",
        "Leia Organa": "peopleIMG/leia.jpg",
        "Owen Lars": "peopleIMG/OwenCardTrader.webp",
        "Beru Whitesun lars": "peopleIMG/BeruLars9BBY-SWCT.webp",
        "R5-D4": "peopleIMG/R5D4.webp",
        "Biggs Darklighter": "peopleIMG/Biggs.webp",
        "Obi-Wan Kenobi": "peopleIMG/obiwan.webp"
    };

    fetch('https://swapi.py4e.com/api/people', requestOptions)
        .then(response => response.json())
        .then(result => {
            const charactersContainer = document.getElementById('characters');
            charactersContainer.innerHTML = '';

            result.results.forEach(character => {
                const card = document.createElement('div');
                card.classList.add('character-card');
                card.style.cursor = "pointer";

                const name = document.createElement('h2');
                name.textContent = character.name;

                const img = document.createElement('img');
                if (peopleImages[character.name]) {
                    img.src = peopleImages[character.name];
                    img.alt = `${character.name} image`;
                } else {
                    img.alt = "Image not available";
                }

                const details = document.createElement('div');
                details.className = 'character-details';
                details.style.display = 'none';
                details.innerHTML = `
                    <strong>Height:</strong> ${character.height} cm<br>
                    <strong>Mass:</strong> ${character.mass} kg<br>
                    <strong>Hair Color:</strong> ${character.hair_color}<br>
                    <strong>Skin Color:</strong> ${character.skin_color}<br>
                    <strong>Eye Color:</strong> ${character.eye_color}<br>
                    <strong>Birth Year:</strong> ${character.birth_year}<br>
                    <strong>Gender:</strong> ${character.gender}
                `;
                card.appendChild(name);
                card.appendChild(img);
                card.appendChild(details);
                card.addEventListener('click', function() {
                    if (details.style.display === 'none') {
                        details.style.display = 'block';
                    } else {
                        details.style.display = 'none';
                    }
                });
                charactersContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching characters:', error));
});