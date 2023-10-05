export class FeedingWindow {
    static storeName = 'feeding-window';
    minutesUntilNextFeeding;
    durationInMinutes;
    startTime;

    constructor(startTime, minutesUntilNextFeeding, durationInMinutes) {
        this.startTime = startTime;
        this.minutesUntilNextFeeding = minutesUntilNextFeeding;
        this.durationInMinutes = durationInMinutes;
    }

    static getFeedingWindow() {
        if (localStorage.getItem(this.storeName) === null) {
            const feedWindowData = {
                durationInMinutes: null,
                minutesUntilNextFeeding: null,
                startTime: null
            };
            localStorage.setItem(this.storeName, JSON.stringify(feedWindowData));
        }
        const feedWindowData = JSON.parse(localStorage.getItem(this.storeName));
        return new FeedingWindow(
            feedWindowData.startTime,
            feedWindowData.minutesUntilNextFeeding,
            feedWindowData.durationInMinutes
        );
    }

    setMinutesUntilNextFeeding(minutes) {
        const feedingWindow = FeedingWindow.getFeedingWindow();
        feedingWindow.minutesUntilNextFeeding = +minutes;
        localStorage.setItem(FeedingWindow.storeName, JSON.stringify(feedingWindow));
    }

    setDurationInMinutes(minutes) {
        const feedingWindow = FeedingWindow.getFeedingWindow();
        feedingWindow.durationInMinutes = +minutes;
        localStorage.setItem(FeedingWindow.storeName, JSON.stringify(feedingWindow));
    }

    setStartTime(startTime) {
        const feedingWindow = FeedingWindow.getFeedingWindow();
        feedingWindow.startTime = startTime;
        localStorage.setItem(FeedingWindow.storeName, JSON.stringify(feedingWindow));
    }

    beforeActiveWindow() {
        const feedingWindow = FeedingWindow.getFeedingWindow();
        const now = new Date();
        const startTime = new Date(feedingWindow.startTime);
        return feedingWindow.startTime !== null
            && startTime.getTime() >= now.getTime();
    }

    inActiveWindow() {
        const feedingWindow = FeedingWindow.getFeedingWindow();
        const now = new Date();
        const startTime = new Date(feedingWindow.startTime);
        const endTime = new Date(startTime.getTime() + (feedingWindow.durationInMinutes * 60000));
        return feedingWindow.startTime !== null && (now >= startTime && now <= endTime);
    }

    afterActiveWindow() {
        const feedingWindow = FeedingWindow.getFeedingWindow();
        const now = new Date();
        const durationInMilliseconds = feedingWindow.durationInMinutes * 60000;
        const endTime = new Date(new Date(feedingWindow.startTime).getTime() + durationInMilliseconds);
        return feedingWindow.startTime !== null && (now >= endTime);
    }
}

/******************************* GENERAL IDEA **********************************
 *
 * The idea is that when a "feeding" event is recorded (bottle or
 * breastfeeding), the app will show a timer counting down until the next
 * feeding window.
 *
 * If a user records a feeding event, a record will be made in localStorage.
 *
 * We need to start an interval that counts down to zero. If the page is
 * reloaded or clicked away from and revisited, first we will get the start time
 * and minutes until next feeding and if we're still before the next feeding
 * window, we'll start the timer again for the remaining time. If we're in the
 * next feeding window, we'll erase what's in localStorage, waiting for the next
 * feeding event.
 *
 ******************************************************************************/