export default class Argument {
  type: String;
  name: String;
  constructor(type: String, name: String) {
    this.type = type;
    this.name = name;
  }
  public toConstructorArguments(): String {
    return `this.${this.name},`;
  }
}
