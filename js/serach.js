document.addEventListener('DOMContentLoaded', function () {
    function filterSelect(selectId, searchId) {
        const searchInput = document.getElementById(searchId);
        const selectElement = document.getElementById(selectId);
        
        searchInput.addEventListener('input', function () {
            const filter = searchInput.value.toLowerCase();
            const options = selectElement.querySelectorAll('option');

            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(filter)) {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            });
        });
    }

    filterSelect('chooseReciter', 'searchReciter');
    filterSelect('chooseMoshaf', 'searchMoshaf');
    filterSelect('chooseSurah', 'searchSurah');

    // Populate the select options
    function populateSelect(selectId, options) {
        const selectElement = document.getElementById(selectId);
        options.forEach(optionText => {
            const option = document.createElement('option');
            option.textContent = optionText;
            selectElement.appendChild(option);
        });
    }

    populateSelect('chooseReciter'); // Replace with actual data
    populateSelect('chooseMoshaf'); // Replace with actual data
    populateSelect('chooseSurah'); // Replace with actual data

    
});


// البحث عن القارئ
const btReciter = document.getElementById("toggleReciter");
const searchReciter = document.getElementById("searchReciter");

// البحث عن الرواية
const btMoshaf = document.getElementById("toggleMoshaf");
const searchMoshaf = document.getElementById("searchMoshaf");

// البحث عن السورة
const btSurah = document.getElementById("toggleSurah");
const searchSurah = document.getElementById("searchSurah");

// ضبط القيم الابتدائية
searchReciter.style.visibility = "hidden";

searchMoshaf.style.visibility = "hidden";

searchSurah.style.visibility = "hidden";

// دالة التحكم في الإظهار والإخفاء
function toggleVisibility(element) {
    if (element.style.visibility === "hidden") {
        element.style.visibility = "visible";
    } else {
        element.style.visibility = "hidden";
    }
}

// التحكم في القارئ
btReciter.addEventListener("click", event => {
    event.preventDefault();
    toggleVisibility(searchReciter);
});

// التحكم في الرواية
btMoshaf.addEventListener("click", event => {
    event.preventDefault();
    toggleVisibility(searchMoshaf);
});

// التحكم في السورة
btSurah.addEventListener("click", event => {
    event.preventDefault();
    toggleVisibility(searchSurah);
});

