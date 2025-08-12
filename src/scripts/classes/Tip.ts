export default abstract class Tip {
  private bill = 0;
  private people = 0;
  private percentage = 0;

  public get getTipAmount() {
    if (this.bill === 0 || this.percentage === 0) return 0;
    return this.bill * (this.percentage / 100);
  }

  public get getBill() {
    return this.bill;
  }

  public get getPeople() {
    return this.people;
  }

  public get getPercentage() {
    return this.percentage;
  }

  public set setBill(bill: number) {
    this.bill = bill || 0;
  }

  public set setPeople(people: number) {
    this.people = people || 0;
  }

  public set setPercentage(percentage: number) {
    this.percentage = percentage || 0;
  }
}
