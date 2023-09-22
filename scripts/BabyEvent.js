export class BabyEvent {
    constructor(time, wetDiaper, dirtyDiaper, formula, formulaAmount, formulaMeasurement,
                breastMilk, breastMilkAmount, breastMilkMeasurement, leftBreast,
                leftBreastDurationInMinutes, rightBreast, rightBreastDurationInMinutes) {
        this.time = time;
        this.wetDiaper = wetDiaper;
        this.dirtyDiaper = dirtyDiaper;
        this.formula = formula;
        this.formulaAmount = formulaAmount;
        this.formulaMeasurement = formulaMeasurement;
        this.breastMilk = breastMilk;
        this.breastMilkAmount = breastMilkAmount;
        this.breastMilkMeasurement = breastMilkMeasurement;
        this.leftBreast = leftBreast;
        this.leftBreastDurationInMinutes = leftBreastDurationInMinutes;
        this.rightBreast = rightBreast;
        this.rightBreastDurationInMinutes = rightBreastDurationInMinutes;
    }
}