# Brief Overview

Baby Tracker is meant to be a light-weight tracker app for parents to track
diaper changes and feedings for their newborn child. It's limited to only one
child currently. My apologies to parents of twins.

A current work-around would be to use this app on two different devices, using
one device for one child and the other device for the other child.

## Important Notes

* If you look at the code, you'll notice no data is collected and submitted
  anywhere. Your data is your own, and it doesn't leave your device.
  * IMPORTANT: I intend to implement DynamoDB for persistence in the future, so
    data will be stored in the cloud, but it will not be used for anything other
    than your own baby's tracking.
* Baby Tracker uses local storage, so if you clear your browser's cache or
  browsing data, you will most likely lose your tracking history. PLEASE be
  careful to keep your tracking history.
  * IMPORTANT: I intend to implement DynamoDB for persistence in the future, so
    data will be persisted in the cloud, making the event of losing your data a
    non-issue.

## Features

* Simplistic, minimal UI: fewer distractions
* Visual distinction between different actions (diaper changes, bottle feeding,
  breastfeeding)

# Requested (Upcoming) Features
* "Feeding Window Approaching" notification
* User Settings modal
* Import/Export data
* Use DynamoDB for persistence

# Future of Baby Tracker

* Dark Mode.
* Make it cloud-native.
* Nap tracking.
* Graphs or charts to help visualize data collected by parents.
* The option to add native notifications for an approaching feeding window.
* Define a custom feeding window.
* Add support for multiple children.
