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
    return `${this.name}:${this.wrappedJsonValue()}`;
  }
  private wrappedJsonValue(): String {
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
