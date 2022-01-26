export default class Spawner {
    constructor({create}) {
        this.time = 1000;
        this.maxCount = 3;
        this.create = create;
        this.elements = [];
        this.timerId = null;
        this.run();
    }

    run() {
        this.timerId = setInterval(() => {
            this.spawn();
        }, this.time)
    }

    spawn() {
        if (this.elements.length >= this.maxCount) {
            return;
        }
        const element = this.create();
        this.elements.push(element);
    }

}