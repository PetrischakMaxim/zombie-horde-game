export function initSound(soundPath: string ) {
    const audioElement = new Audio(soundPath);
    audioElement.addEventListener("timeupdate", onTimeUpdate);

    function onTimeUpdate() {
        if (this.currentTime > this.duration - 0.2) {
            this.currentTime = 0;
        }
    }

    return audioElement;
}