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
    return `${this.name}:${this.wrappedFromJsonValue()}`;
  }
  public toToJson(): String {
    let jsonName = this.name;
    let toJson: String = "";
    this.annotations.forEach((annotation) => {
      if (annotation.name === "jsonName") {
        jsonName = annotation.value;
      }
      if (annotation.name === "toJson") {
        toJson = annotation.value;
      }
    });
    if (toJson !== "") {
      return `${jsonName}: ${toJson}(${this.name})`;
    }
    return `'${jsonName}': ${this.name}`;
  }
  private wrappedFromJsonValue(): String {
    let jsonName = this.name;
    let fromJson: String = "";
    this.annotations.forEach((annotation) => {
      if (annotation.name === "jsonName") {
        jsonName = annotation.value;
      }
      if (annotation.name === "fromJson") {
        fromJson = annotation.value;
      }
    });
    if (fromJson !== "") {
      return `${fromJson}(json['${jsonName}'])`;
    }
    return `json['${jsonName}']`;
  }
}
