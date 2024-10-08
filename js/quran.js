const apiUrl = 'https://mp3quran.net/api/v3';
const language = 'ar';

chooseReciter.innerHTML = `<option value="">اختر قارئ</option>`

async function getReciters() {
    const chooseReciter = document.querySelector('#chooseReciter');
    const res = await fetch(`${apiUrl}/reciters?language=${language}`);
    const data = await res.json();
    console.log(data);
    data.reciters.forEach(reciter => chooseReciter.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`);
    chooseReciter.addEventListener('change', e => getMoshaf(e.target.value))
}
getReciters()


chooseMoshaf.innerHTML = `<option value="" data-server="" data-surah-list="">اختر الرواية</option>`;

async function getMoshaf(reciter) {
    
    const chooseMoshaf = document.querySelector('#chooseMoshaf');

    const res = await fetch(`${apiUrl}/reciters?language=${language}&reciter=${reciter}`);
    const data = await res.json();
    const moshafs = data.reciters[0].moshaf;

    chooseMoshaf.innerHTML = `<option value="" data-server="" data-surah-list="">اختر الرواية</option>`;

    moshafs.forEach(moshaf => { 
        chooseMoshaf.innerHTML += `<option value="${moshaf.id}" data-server="${moshaf.server}" data-surah-list="${moshaf.surah_list}">${moshaf.name}</option>`; 
    });

    
    chooseMoshaf.addEventListener('change', e => {
        const selectedMosfah = chooseMoshaf.options[chooseMoshaf.selectedIndex]
        const surahServer = selectedMosfah.dataset.server;
        const surahList = selectedMosfah.dataset.surahList;
        getSurah(surahServer, surahList)
    });
}


chooseSurah.innerHTML = `<option value="">اختر السورة</option>`;

async function getSurah(surahServer, surahList) {
    const chooseSurah = document.querySelector('#chooseSurah');

    console.log(surahServer);


    const res = await fetch(`https://mp3quran.net/api/v3/suwar`)
    const data = await res.json()

    console.log(surahList);
    const surahNames = data.suwar;

    surahList = surahList.split(',')
    chooseSurah.innerHTML = `<option value="">اختر السورة</option>`;


    surahList.forEach(surah => {
        const padSurah = surah.padStart(3, '0')

        surahNames.forEach(surahName => {
            if (surahName.id == surah) {
                chooseSurah.innerHTML += `<option value="${surahServer}${padSurah}.mp3">${surahName.name}</option>`;
            }
        });
    });

    chooseSurah.addEventListener('change', e => {
        const selectedSurah = chooseSurah.options[chooseSurah.selectedIndex]; // Fixing the variable reference
        playSurah(selectedSurah.value);
    });
}


function playSurah(surahMp3) {
    const audioPlayer = document.querySelector('#audioPlayer');
    audioPlayer.src = surahMp3
    audioPlayer.play();
}


