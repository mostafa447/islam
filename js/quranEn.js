const apiUrl = 'https://mp3quran.net/api/v3';
const language = 'eng';


chooseReciter.innerHTML = `<option value="">Choose Reciter</option>`; 

async function getReciters() {
    const chooseReciter = document.querySelector('#chooseReciter');
    const res = await fetch(`${apiUrl}/reciters?language=${language}`);
    const data = await res.json();
    console.log(data);
    chooseReciter.innerHTML = `<option value="">Choose Reciter</option>`; 
    data.reciters.forEach(reciter => chooseReciter.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`);
    chooseReciter.addEventListener('change', e => getMoshaf(e.target.value));
}
getReciters();


chooseMoshaf.innerHTML = `<option value="" data-server="" data-surah-list="">Choose Recitation</option>`; // الترجمة إلى الإنجليزية


async function getMoshaf(reciter) {
    const chooseMoshaf = document.querySelector('#chooseMoshaf');

    const res = await fetch(`${apiUrl}/reciters?language=${language}&reciter=${reciter}`);
    const data = await res.json();
    const moshafs = data.reciters[0].moshaf;

    chooseMoshaf.innerHTML = `<option value="" data-server="" data-surah-list="">Choose Recitation</option>`; // الترجمة إلى الإنجليزية

    moshafs.forEach(moshaf => { 
        chooseMoshaf.innerHTML += `<option value="${moshaf.id}" data-server="${moshaf.server}" data-surah-list="${moshaf.surah_list}">${moshaf.name}</option>`;
    });

    chooseMoshaf.addEventListener('change', e => {
        const selectedMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex];
        const surahServer = selectedMoshaf.dataset.server;
        const surahList = selectedMoshaf.dataset.surahList;
        getSurah(surahServer, surahList);
    });
}

chooseSurah.innerHTML = `<option value="">Choose Surah</option>`

async function getSurah(surahServer, surahList) {
    const chooseSurah = document.querySelector('#chooseSurah');

    console.log(surahServer);

    const res = await fetch(`https://mp3quran.net/api/v3/suwar?language=${language}`);
    const data = await res.json();

    console.log(surahList);
    const surahNames = data.suwar;

    surahList = surahList.split(',');

    chooseSurah.innerHTML = `<option value="">Choose Surah</option>`; // الترجمة إلى الإنجليزية

    surahList.forEach(surah => {
        const padSurah = surah.padStart(3, '0');

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
    audioPlayer.src = surahMp3;
    audioPlayer.play();
}
