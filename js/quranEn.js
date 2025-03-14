document.addEventListener("DOMContentLoaded", async () => {
    const chooseReciter = document.querySelector('#chooseReciter');
    const chooseMoshaf = document.querySelector('#chooseMoshaf');
    const chooseSurah = document.querySelector('#chooseSurah');
    const audioPlayer = document.querySelector('#audioPlayer');

    if (!chooseReciter || !chooseMoshaf || !chooseSurah || !audioPlayer) {
        console.error("Error: Selection elements not found.");
        return;
    }

    chooseReciter.innerHTML = `<option value="">Choose Reciter</option>`;
    chooseMoshaf.innerHTML = `<option value="">Choose Edition</option>`;
    chooseSurah.innerHTML = `<option value="">Choose Surah</option>`;

    // ✅ Fetch reciters and convert Arabic names to English
    async function getReciters() {
        try {
            const res = await fetch("https://api.alquran.cloud/v1/edition?format=audio");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            const reciters = data.data;
            
            reciters.forEach(reciter => {
                const englishName = reciter.englishName || reciter.name;
                chooseReciter.innerHTML += `<option value="${reciter.identifier}" data-type="${reciter.type}">${englishName}</option>`;
            });
        } catch (error) {
            console.error("❌ Error fetching reciters:", error);
        }
    }

    await getReciters();

    // ✅ Update editions based on selected reciter
    chooseReciter.addEventListener("change", async (e) => {
        const reciterId = e.target.value;
        if (!reciterId) return;

        chooseMoshaf.innerHTML = `<option value="">Choose Edition</option>`;
        
        try {
            const res = await fetch("https://api.alquran.cloud/v1/edition?format=audio");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            const reciterEditions = data.data.filter(edition => edition.identifier === reciterId);
            
            reciterEditions.forEach(edition => {
                chooseMoshaf.innerHTML += `<option value="${edition.identifier}">${edition.englishName}</option>`;
            });
        } catch (error) {
            console.error("❌ Error fetching editions:", error);
        }
    });

    // ✅ Fetch surahs with English names only
    async function getSurahs() {
        try {
            const res = await fetch("https://api.alquran.cloud/v1/quran/en.asad");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            const surahs = data.data.surahs;
            
            surahs.forEach(surah => {
                chooseSurah.innerHTML += `<option value="${surah.number}">${surah.englishName}</option>`;
            });
        } catch (error) {
            console.error("❌ Error fetching surahs:", error);
        }
    }

    await getSurahs();

    // ✅ Play selected surah
    chooseSurah.addEventListener('change', async (e) => {
        const surahNumber = e.target.value;
        const moshafId = chooseMoshaf.value;
        if (!surahNumber || !moshafId) return;

        try {
            const res = await fetch(`https://api.alquran.cloud/v1/quran/${moshafId}`);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            const surahData = data.data.surahs.find(s => s.number == surahNumber);
            if (!surahData) {
                console.error("❌ Surah not found!");
                return;
            }
            
            const audioUrl = surahData.ayahs[0].audio;
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        } catch (error) {
            console.error("❌ Error playing surah:", error);
        }
    });
});