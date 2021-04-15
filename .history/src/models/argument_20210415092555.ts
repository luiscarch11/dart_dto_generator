import Annotation from "./annotation";

export default class Argument {
  type: String;
  name: String;
  annotations: Array<Annotation>;
  constructor(type: String, name: String, annotations: Array<Annotation>) {
    this.type = type;
    this.name = name;
    this.annotations = annotations;
  }
  public toConstructorArgument(): String {
    return `this.${this.name},`;
  }
  public toDeclarationArgument(): String {
    return `final ${this.type} ${this.name};`;
  }
  public toFromJson(): String {
    const jsonName = this.name;
    this.annotations.forEach((annotation) => {
      if (annotation.name === "jsonName") {
      }
    });
    return `${this.name}:json[]`;
  }
}
