export class FeedingWindow {
    storeName = 'feeding-window';
    minutesUntilNextFeeding;
    durationInMinutes;

    constructor(startTime, minutesUntilNextFeeding = 120, durationInMinutes = 60) {
        this.startTime = startTime;
        this.minutesUntilNextFeeding = minutesUntilNextFeeding;
        this.durationInMinutes = durationInMinutes;
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