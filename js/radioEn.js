// Fetch and display radio stations with search functionality
async function fetchRadios() {
    const radioList = document.getElementById('radio-list');
    const searchInput = document.getElementById('search');
    const radioTemplate = document.getElementById('radio-template');

    let radios = [];

    // search box of radio
    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();
        radioList.innerHTML = ""; // Clear the container

        const filteredRadios = radios.filter(radio => 
            radio.name.toLowerCase().includes(value)
        );

        filteredRadios.forEach(radio => {
            radioList.appendChild(radio.element);
        });
    });

    // get radio channels from api
    try {
        const response = await fetch('https://mp3quran.net/api/v3/radios?language=eng');
        const data = await response.json();
        radios = data.radios.map(radio => {
            const card = radioTemplate.content.cloneNode(true).children[0];
            const name = card.querySelector("[data-name]");
            name.textContent = radio.name;

            card.addEventListener('click', () => {
                const audioPlayer = document.getElementById('audio-player');
                audioPlayer.src = radio.url;
                audioPlayer.play();
            });

            radioList.appendChild(card); // Append all radios initially
            return { name: radio.name, element: card };
        });
    } catch (error) {
        console.error('Error fetching radio stations:', error);
    }
}

// Initialize the function
fetchRadios();

// pin radio item when click
document.addEventListener('DOMContentLoaded', function () {
    const radioList = document.getElementById('radio-list');

    radioList.addEventListener('click', function (event) {
        const target = event.target.closest('.radio-item');

        if (target) {
            // إزالة الخلفية الحمراء والرمز من جميع العناصر
            const activeItem = radioList.querySelector('.radio-item.active');
            if (activeItem) {
                activeItem.classList.remove('active');
            }

            // إضافة الخلفية الحمراء والرمز للعنصر المختار
            target.classList.add('active');
        }
    });
});
