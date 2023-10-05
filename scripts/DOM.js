import { FeedingWindow } from './FeedingWindow.js';

// Add Record Buttons
export const addRecordBtn = document.getElementById('add-record-btn');
export const cancelButton = document. getElementById('cancel-btn');



/*******************************************************************************
 * FEEDING WINDOW FORM INPUTS
 ******************************************************************************/
export const minutesToNextWindow = document.getElementById('minutes-to-next-window');
export const feedingWindowDuration = document.getElementById('feeding-window-duration');
export const updateWindowBtn = document.getElementById('update-feeding-window-btn');

export function initFeedingWindowInputValues() {
    const feedingWindow = FeedingWindow.getFeedingWindow();
    minutesToNextWindow.value = feedingWindow.minutesUntilNextFeeding;
    feedingWindowDuration.value = feedingWindow.durationInMinutes;
}



/*******************************************************************************
 * ADD EVENT FORM INPUTS
 ******************************************************************************/
// Time
export const time = document.getElementById('time');

// Diaper
export const wetDiaper = document.getElementById('diaper-type-wet');
export const dirtyDiaper = document.getElementById('diaper-type-dirty');

// Formula
export const formula = document.getElementById('bottle-formula');
export const formulaAmount = document.getElementById('bottle-formula-amount');
export const formulaMeasurement = document
    .getElementById('bottle-formula-measurement');

// Breast milk
export const breastMilk = document.getElementById('bottle-breast-milk');
export const breastMilkAmount = document.getElementById('bottle-breast-milk-amount');
export const breastMilkMeasurement = document
    .getElementById('bottle-breast-milk-measurement');

// Breastfeeding
export const leftBreast = document.getElementById('left-breast');
export const leftBreastDurationInMinutes = document
    .getElementById('left-breast-duration');
export const rightBreast = document.getElementById('right-breast');
export const rightBreastDurationInMinutes = document
    .getElementById('right-breast-duration');
/*******************************************************************************
 *  END ADD EVENT FORM INPUTS
 ******************************************************************************/

export function resetAddRecordFormInputs() {
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

export function updateRecordListDisplay(babyEventList) {
    const recordList = document.getElementById('record-list');
    recordList.innerHTML = document.getElementById('table-header').innerHTML;
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