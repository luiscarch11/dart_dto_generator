export default abstract class Annotation {
  public static fromJson(value: String) {
    return new AnnotationFromJson(value);
  }
  public static toJson(value: String) {
    return new AnnotationToJson(value);
  }
  public static domainName(value: String) {
    return new AnnotationDomainName(value);
  }
}
class AnnotationFromJson implements Annotation {
  value: String;
  constructor(value: String) {
    this.value = value;
  }
}
class AnnotationToJson implements Annotation {
  value: String;
  constructor(value: String) {
    this.value = value;
  }
}
class AnnotationDomainName implements Annotation {
  value: String;
  constructor(value: String) {
    this.value = value;
  }
}
