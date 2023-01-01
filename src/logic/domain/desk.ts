export class Desk {
  constructor(readonly id: string, readonly label: string) {}

  equals = (other: Desk) => this.id === other.id;
}
