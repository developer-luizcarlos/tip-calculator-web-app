export default class Tip {
    constructor() {
        this.bill = 0;
        this.people = 0;
        this.percentage = 0;
    }
    get getTipAmount() {
        if (this.bill === 0 || this.percentage === 0)
            return 0;
        return this.bill * (this.percentage / 100);
    }
    get getBill() {
        return this.bill;
    }
    get getPeople() {
        return this.people;
    }
    get getPercentage() {
        return this.percentage;
    }
    set setBill(bill) {
        this.bill = bill || 0;
    }
    set setPeople(people) {
        this.people = people || 0;
    }
    set setPercentage(percentage) {
        this.percentage = percentage || 0;
    }
}
