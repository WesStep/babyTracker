export class BabyEvents {
    storeName = 'baby-events';
    addBabyEvent(babyEvent) {
        const events = this.getBabyEvents();
        events.push(babyEvent);
        localStorage.setItem(this.storeName, JSON.stringify(events));
    }
    getBabyEvents() {
        if (localStorage.getItem(this.storeName) === null) {
            localStorage.setItem(this.storeName, JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem(this.storeName));
    }
}