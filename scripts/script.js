import { BabyEvent } from "./BabyEvent.js";
import { BabyEvents } from "./BabyEvents.js";
import {
    time, addRecordBtn, cancelButton,
    wetDiaper, dirtyDiaper,
    formula, formulaAmount, formulaMeasurement,
    breastMilk, breastMilkAmount, breastMilkMeasurement,
    leftBreast, leftBreastDurationInMinutes,
    rightBreast, rightBreastDurationInMinutes,
    resetAddRecordFormInputs, updateRecordListDisplay,
} from './DOM.js';

const babyEvents = new BabyEvents();

function init() {
    addRecordBtn.addEventListener('click', recordBabyEvent);
    cancelButton.addEventListener('click', cancel);
    updateRecordListDisplay(getSortedBabyEvents());
}

function recordBabyEvent() {
    if (eventIsDiaperChange()) {
        addDiaperChangeEvent();
    } else if (eventIsBottleFeeding()) {
        addBottleFeedEvent();
    } else if (eventIsBreastFeeding()) {
        addBreastFeedEvent();
    }
    updateRecordListDisplay(getSortedBabyEvents());
    resetAddRecordFormInputs();
}

const eventIsDiaperChange = () => wetDiaper.checked || dirtyDiaper.checked;

const addDiaperChangeEvent = () => {
    try {
        validateInputs();
        babyEvents.addBabyEvent(new BabyEvent(
            time.value, wetDiaper.checked, dirtyDiaper.checked,
            false, '', '',
            false, '', '',
            false, '', false, ''
        ));
    } catch (e) {
        window.alert(e);
    }
}

const validateInputs = () => {
    if (time.value === '') {
        throw "Time must be filled in";
    }
};

const eventIsBottleFeeding = () => formula.checked || breastMilk.checked;

function addBottleFeedEvent() {
    try {
        validateInputs();
        babyEvents.addBabyEvent(new BabyEvent(
            time.value, false, false,
            formula.checked, formulaAmount.value,
            formulaMeasurement.options[formulaMeasurement.selectedIndex].value,
            breastMilk.checked, breastMilkAmount.value,
            breastMilkMeasurement.options[breastMilkMeasurement.selectedIndex].value,
            false, '', false, ''
        ));
    } catch (e) {
        window.alert(e);
    }
}

const eventIsBreastFeeding = () => leftBreast.checked || rightBreast.checked;

function addBreastFeedEvent() {
    try {
        validateInputs();
        babyEvents.addBabyEvent(new BabyEvent(
            time.value, false, false,
            false, '', '',
            false, '', '',
            leftBreast.checked, leftBreastDurationInMinutes.value,
            rightBreast.checked, rightBreastDurationInMinutes.value
        ));
    } catch (e) {
        window.alert(e);
    }
}

function getSortedBabyEvents() {
    const events = babyEvents.getBabyEvents()
    return events.sort((a, b) => {
        if (a.time.valueOf() < b.time.valueOf()) {
            return 1;
        } else if (a.time.valueOf() > b.time.valueOf()) {
            return -1;
        }
        return 0;
    });
}

function cancel() {
    resetAddRecordFormInputs();
}

init();