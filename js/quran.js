document.addEventListener("DOMContentLoaded", async () => {
    const language = 'ar';
    const chooseReciter = document.querySelector('#chooseReciter');
    const chooseMoshaf = document.querySelector('#chooseMoshaf');
    const chooseSurah = document.querySelector('#chooseSurah');
    const audioPlayer = document.querySelector('#audioPlayer');

    if (!chooseReciter || !chooseMoshaf || !chooseSurah || !audioPlayer) {
        console.error("خطأ: لم يتم العثور على عناصر الاختيار.");
        return;
    }

    chooseReciter.innerHTML = `<option value="">اختر القارئ</option>`;
    chooseMoshaf.innerHTML = `<option value="">اختر الرواية</option>`;
    chooseSurah.innerHTML = `<option value="">اختر السورة</option>`;

    // ✅ 1. جلب جميع القرّاء باللغة العربية فقط
    async function getReciters() {
        try {
            const res = await fetch("https://api.alquran.cloud/v1/edition?format=audio&language=ar");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            const reciters = data.data;
            
            reciters.forEach(reciter => {
                chooseReciter.innerHTML += `<option value="${reciter.identifier}">${reciter.name}</option>`;
            });
        } catch (error) {
            console.error("❌ خطأ في جلب القرّاء:", error);
        }
    }

    await getReciters();

    // ✅ 2. تحديث الروايات وإعادة تعيين اختيار السورة عند تغيير القارئ
    chooseReciter.addEventListener("change", async (e) => {
        const reciterId = e.target.value;
        if (!reciterId) return;

        chooseMoshaf.innerHTML = `<option value="">اختر الرواية</option>`;
        chooseSurah.innerHTML = `<option value="">اختر السورة</option>`;
        
        try {
            const res = await fetch("https://api.alquran.cloud/v1/edition?format=audio&language=ar");
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            const reciterEditions = data.data.filter(edition => edition.identifier === reciterId);
            
            reciterEditions.forEach(edition => {
                chooseMoshaf.innerHTML += `<option value="${edition.identifier}">${edition.name}</option>`;
            });
        } catch (error) {
            console.error("❌ خطأ في جلب الروايات:", error);
        }
    });

    // ✅ 3. تحديث السور عند اختيار الرواية
    chooseMoshaf.addEventListener("change", async (e) => {
        const moshafId = e.target.value;
        if (!moshafId) return;

        chooseSurah.innerHTML = `<option value="">اختر السورة</option>`;

        try {
            const res = await fetch(`https://api.alquran.cloud/v1/quran/${moshafId}`);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            const surahs = data.data.surahs;
            
            surahs.forEach(surah => {
                chooseSurah.innerHTML += `<option value="${surah.number}">${surah.name}</option>`;
            });
        } catch (error) {
            console.error("❌ خطأ في جلب السور:", error);
        }
    });

    // ✅ 4. تشغيل السورة المختارة بناءً على القارئ والرواية المختارين
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
                console.error("❌ السورة غير موجودة!");
                return;
            }
            
            const audioUrl = surahData.ayahs[0].audio;
            audioPlayer.src = audioUrl;
            audioPlayer.play();
        } catch (error) {
            console.error("❌ خطأ في تشغيل السورة:", error);
        }
    });
});
