import { BabyEvent } from "./BabyEvent.js";
import { BabyEvents } from "./BabyEvents.js";
import {
    time, addRecordBtn, cancelButton,
    wetDiaper, dirtyDiaper,
    formula, formulaAmount, formulaMeasurement,
    breastMilk, breastMilkAmount, breastMilkMeasurement,
    leftBreast, leftBreastDurationInMinutes,
    rightBreast, rightBreastDurationInMinutes,
    resetInputs,
} from './DOM.js';

const babyEvents = new BabyEvents();

function init() {
    addRecordBtn.addEventListener('click', recordBabyEvent);
    cancelButton.addEventListener('click', cancel);
    updateRecordListDisplay();
}

function recordBabyEvent() {
    if (eventIsDiaperChange()) {
        addDiaperChangeEvent();
    } else if (eventIsBottleFeeding()) {
        addBottleFeedEvent();
    } else if (eventIsBreastFeeding()) {
        addBreastFeedEvent();
    }
    updateRecordListDisplay();
    resetInputs();
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

function updateRecordListDisplay() {
    const recordList = document.getElementById('record-list');
    recordList.innerHTML = `<tr>
            <th rowspan="2"><i class="fa-2xl fa-solid fa-clock"></i></th>
            <th colspan="2">Diaper</th>
            <th colspan="2"><i class="fa-2xl fa-solid fa-bottle-water"></i> Formula</th>
            <th colspan="2"><i class="fa-2xl fa-solid fa-bottle-water"></i> Breast Milk</th>
            <th><i class="fa-2xl fa-solid fa-person-breastfeeding"></i> Left Breast</th>
            <th><i class="fa-2xl fa-solid fa-person-breastfeeding fa-flip-horizontal"></i> Right Breast</th>
        </tr>
        <tr>
            <th><i class="fa-2xl fa-solid fa-droplet"></i></th>
            <th><i class="fa-2xl fa-solid fa-poop"></i></th>
            <th>Amt</th>
            <th>ml/oz</th>
            <th>Amt</th>
            <th>ml/oz</th>
            <th>Minutes</th>
            <th>Minutes</th>
        </tr>`;
    const babyEventList = getSortedBabyEvents();
    for (const babyEvent of babyEventList) {
        const dateString = new Date(babyEvent.time)
            .toLocaleDateString('en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short'
            });
        const timeString = new Date(babyEvent.time)
            .toLocaleTimeString('en-US', {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
            });
        let rowString = `<tr>
            <td>${dateString + ', ' + timeString}</td>`;
        rowString += babyEvent.wetDiaper
            ? `<td class="active-cell"><i class="fa-solid fa-check fa-2xl"></i></td>`
            : `<td></td>`;
        rowString += babyEvent.dirtyDiaper
            ? `<td class="active-cell"><i class="fa-solid fa-check fa-2xl"></i></td>`
            : `<td></td>`;
        rowString += babyEvent.formula
            ? `
                <td class="active-cell">${babyEvent.formulaAmount}</td>
                <td class="active-cell">${babyEvent.formulaMeasurement}</td>
            `
            : `<td></td><td></td>`;
        rowString += babyEvent.breastMilk
            ? `
                <td class="active-cell">${babyEvent.breastMilkAmount}</td>
                <td class="active-cell">${babyEvent.breastMilkMeasurement}</td>
            `
            : `<td></td><td></td>`;
        rowString += babyEvent.leftBreast
            ? `<td class="active-cell">${babyEvent.leftBreastDurationInMinutes}</td>`
            : `<td></td>`;
        rowString += babyEvent.rightBreast
            ? `<td class="active-cell">${babyEvent.rightBreastDurationInMinutes}</td>`
            : `<td></td>`;
        rowString += `</tr>`;
        recordList.innerHTML += rowString;
    }
}

function getSortedBabyEvents() {
    const events = babyEvents.getBabyEvents()
    events.sort((a, b) => {
        if (a.time.valueOf() < b.time.valueOf()) {
            return 1;
        } else if (a.time.valueOf() > b.time.valueOf()) {
            return -1;
        }
        return 0;
    });
    return events;
}

function cancel() {
    resetInputs();
}

init();