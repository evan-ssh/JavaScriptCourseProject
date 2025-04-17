document.addEventListener('DOMContentLoaded', function () {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const planetImages = {
        "Tatooine": "planetIMG/Tatooine.jpg",
        "Alderaan": "planetIMG/Alderaan.webp",
        "Yavin IV": "planetIMG/Yavin.webp",
        "Hoth": "planetIMG/Hoth.webp",
        "Dagobah": "planetIMG/Dagobah.jpg",
        "Bespin": "planetIMG/Bespin.webp",
        "Endor": "planetIMG/Endor.webp",
        "Naboo": "planetIMG/Naboo.webp",
        "Coruscant": "planetIMG/Coruscant.webp",
        "Kamino": "planetIMG/Kamino.webp"
    };

    fetch('https://swapi.py4e.com/api/planets', requestOptions)
        .then(response => response.json())
        .then(result => {
            const planetsContainer = document.getElementById('planets');
            planetsContainer.innerHTML = '';

            result.results.forEach(planet => {
                const card = document.createElement('div');
                card.classList.add('character-card');
                card.style.cursor = "pointer";

                const name = document.createElement('h2');
                name.textContent = planet.name;

                const img = document.createElement('img');
                if (planetImages[planet.name]) {
                    img.src = planetImages[planet.name];
                    img.alt = `${planet.name} image`;
                } else {
                    img.alt = "Image not available";
                }

                const details = document.createElement('div');
                details.className = 'character-details';
                details.style.display = 'none';
                details.innerHTML = `
                    <strong>Rotation Period:</strong> ${planet.rotation_period} hours<br>
                    <strong>Orbital Period:</strong> ${planet.orbital_period} days<br>
                    <strong>Diameter:</strong> ${planet.diameter} km<br>
                    <strong>Climate:</strong> ${planet.climate}<br>
                    <strong>Gravity:</strong> ${planet.gravity}<br>
                    <strong>Terrain:</strong> ${planet.terrain}<br>
                    <strong>Population:</strong> ${planet.population}
                `;

                card.appendChild(name);
                card.appendChild(img);
                card.appendChild(details);
                card.addEventListener('click', function () {
                    details.style.display = details.style.display === 'none' ? 'block' : 'none';
                });

                planetsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching planets:', error));
});