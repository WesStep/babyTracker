import { BabyEvent } from "./BabyEvent.js";
import { BabyEvents } from "./BabyEvents.js";

const addRecordBtn = document.getElementById('add-record-btn');
const cancelButton = document. getElementById('cancel-btn');

// Inputs
const time = document.getElementById('time');

const wetDiaper = document.getElementById('diaper-type-wet');
const dirtyDiaper = document.getElementById('diaper-type-dirty');

const formula = document.getElementById('bottle-formula');
const formulaAmount = document.getElementById('bottle-formula-amount');
const formulaMeasurement = document
    .getElementById('bottle-formula-measurement');

const breastMilk = document.getElementById('bottle-breast-milk');
const breastMilkAmount = document.getElementById('bottle-breast-milk-amount');
const breastMilkMeasurement = document
    .getElementById('bottle-breast-milk-measurement');

const leftBreast = document.getElementById('left-breast');
const leftBreastDurationInMinutes = document
    .getElementById('left-breast-duration');
const rightBreast = document.getElementById('right-breast');
const rightBreastDurationInMinutes = document
    .getElementById('right-breast-duration');


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
                year: 'numeric',
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
            <td>${dateString + ' @ ' + timeString}</td>`;
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

function resetInputs() {
    time.value = '';
    wetDiaper.checked = false;
    dirtyDiaper.checked = false;
    formula.checked = false;
    formulaAmount.value = '';
    formulaMeasurement.selectedIndex = 0;
    breastMilk.checked = false;
    breastMilkAmount.value = '';
    breastMilkMeasurement.selectedIndex = 0;
    leftBreast.checked = false;
    leftBreastDurationInMinutes.value = '';
    rightBreast.checked = false;
    rightBreastDurationInMinutes.value = '';
}

function cancel() {
    resetInputs();
}

init();