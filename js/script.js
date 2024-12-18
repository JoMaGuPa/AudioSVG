document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('player'); // Element de l'àudio
    const playPauseButton = document.getElementById('playPauseButton'); // Botó de reproducció/pausa
    const playPauseIcon = document.getElementById('playPauseIcon'); // Icona de reproducció/pausa (SVG)
    const volumeSlider = document.getElementById('volumeSlider'); // Barra de volum
    const volumeIcon = document.getElementById('volumeIcon'); // Icona del volum
    const volumeLevel = document.getElementById('volumeLevel'); // Text del nivell de volum

    let isMuted = false; // Estat de silenci
    let lastVolume = 1; // Darrer volum seleccionat

    // Reproduir o pausar l'àudio
    function togglePlayPause() {
        if (audio.paused) {
            audio.play(); // Reproduir àudio
            playPauseIcon.src = 'svg/pause.svg'; // Canvia la icona a pausa
            createLights(); // Inicia les animacions de llum
        } else {
            audio.pause(); // Pausa l'àudio
            playPauseIcon.src = 'svg/start.svg'; // Canvia la icona a reproduir
            stopLights(); // Atura les animacions de llum
        }
    }

    // Ajustar el volum de l'àudio
    function adjustVolume() {
        const volume = parseFloat(volumeSlider.value); // Obté el valor de la barra de volum
        audio.volume = volume; // Ajusta el volum de l'àudio

        // Cambiar icono de volumen dependiendo del valor
        if (volume === 0) {
            volumeIcon.src = 'svg/volum_mute.svg'; // Icono de mute
        } else if (volume <= 0.25) {
            volumeIcon.src = 'svg/volum_min.svg'; // Icono de volumen bajo
        } else if (volume <= 0.75) {
            volumeIcon.src = 'svg/volum_mid.svg'; // Icono de volumen medio
        } else {
            volumeIcon.src = 'svg/volum_up.svg'; // Icono de volumen alto
        }

        // Actualiza el nivel de volumen en porcentaje
        volumeLevel.textContent = `${Math.round(volume * 100)}%`;
    }

    // Silenciar o activar el sonido al hacer clic en el icono
    function toggleMute() {
        if (isMuted) {
            isMuted = false;
            audio.volume = lastVolume; // Recupera el último volumen
            volumeSlider.value = lastVolume;
            adjustVolume(); // Actualiza el icono según el volumen
        } else {
            isMuted = true;
            lastVolume = audio.volume; // Guarda el volumen actual
            audio.volume = 0; // Silencia el audio
            volumeSlider.value = 0;
            volumeIcon.src = 'svg/volum_mute.svg'; // Muestra el icono de mute
        }

        // Actualiza el nivel de volumen
        volumeLevel.textContent = `${Math.round(audio.volume * 100)}%`;
    }

    // Crear las luces brillantes en el fondo
    let lightInterval;
    function createLights() {
        lightInterval = setInterval(() => {
            const light = document.createElement('div'); // Crea una luz
            light.classList.add('light'); // Afiage la clase "light"
            light.style.left = `${Math.random() * 100}%`; // Posición horizontal aleatoria
            fonsPlayer.appendChild(light); // Añade la luz al fondo

            // Elimina la luz después de un tiempo
            setTimeout(() => {
                light.remove();
            }, 12000); // Las luces duran 12 segundos
        }, 800); // Cada 0.8 segundos se crea una nueva luz
    }

    // Detener las luces
    function stopLights() {
        clearInterval(lightInterval); // Detener el ciclo de luces
    }

    // Event listeners
    playPauseButton.addEventListener('click', togglePlayPause); // Click en play/pause
    volumeSlider.addEventListener('input', adjustVolume); // Cambiar volumen
    volumeIcon.addEventListener('click', toggleMute); // Click para silenciar/activar

    // Configuración inicial
    adjustVolume(); // Ajusta el volumen inicial
});