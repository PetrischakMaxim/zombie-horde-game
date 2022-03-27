export class State {
    public isStarted: boolean;
    public isPaused: boolean;
    public isEnded: boolean;

    constructor() {
        this.isStarted = false;
        this.isPaused = false;
        this.isEnded = false;
    }
}