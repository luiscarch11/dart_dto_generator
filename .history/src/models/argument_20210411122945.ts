export default class Argument {
  type: String;
  name: String;
  constructor(type: String, name: String) {
    this.type = type;
    this.name = name;
  }
  public toConstructorArgument(): String {
    return `this.${this.name},`;
  }
  public toDeclarationArgument(): String {
    return `final ${this.type} ${this.name};`;
  }
}
