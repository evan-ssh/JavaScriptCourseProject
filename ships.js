document.addEventListener('DOMContentLoaded', function () {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const vehicleImages = {
        "CR90 corvette": "starshipIMG/CR90.webp",
        "Star Destroyer": "starshipIMG/stardestroyer.jpg",
        "Sentinel-class landing craft": "starshipIMG/Sentinel.webp",
        "Death Star": "starshipIMG/DeathStar.jpeg",
        "Millennium Falcon": "starshipIMG/MillenniumFalcon.webp",
        "Y-wing": "starshipIMG/Y-Wing-Fighter_0e78c9ae.jpeg",
        "X-wing": "starshipIMG/Xwing.webp",
        "TIE Advanced x1": "starshipIMG/TieAdvanced.webp",
        "Executor": "starshipIMG/Executor.webp",
        "Rebel transport": "starshipIMG/GR-75.webp"
    };

    fetch('https://swapi.py4e.com/api/starships', requestOptions)
        .then(response => response.json())
        .then(result => {
            const shipsContainer = document.getElementById('ships');
            shipsContainer.innerHTML = '';

            result.results.forEach(ship => {
                const card = document.createElement('div');
                card.classList.add('character-card');
                card.style.cursor = "pointer";

                const name = document.createElement('h2');
                name.textContent = ship.name;

                const img = document.createElement('img');
                if (vehicleImages[ship.name]) {
                    img.src = vehicleImages[ship.name];
                    img.alt = `${ship.name} image`;
                } else {
                    img.alt = "Image not available";
                }

                const details = document.createElement('div');
                details.className = 'character-details';
                details.style.display = 'none';
                details.innerHTML = `
                    <strong>Model:</strong> ${ship.model}<br>
                    <strong>Manufacturer:</strong> ${ship.manufacturer}<br>
                    <strong>Cost in Credits:</strong> ${ship.cost_in_credits}<br>
                    <strong>Length:</strong> ${ship.length} meters<br>
                    <strong>Max Speed:</strong> ${ship.max_atmosphering_speed} km/h<br>
                    <strong>Crew:</strong> ${ship.crew}<br>
                    <strong>Passengers:</strong> ${ship.passengers}
                `;

                card.appendChild(name);
                card.appendChild(img);
                card.appendChild(details);

                card.addEventListener('click', function () {
                    details.style.display = details.style.display === 'none' ? 'block' : 'none';
                });

                shipsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching ships:', error));
});