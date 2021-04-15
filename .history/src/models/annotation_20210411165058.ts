export default abstract class Annotation {
  abstract value: String;
  abstract name: String;
  constructor() {}
  public static fromJson(value: String): Annotation {
    return new AnnotationFromJson(value);
  }
  public static toJson(value: String): Annotation {
    return new AnnotationToJson(value);
  }
  public static domainName(value: String): Annotation {
    return new AnnotationDomainName(value);
  }
  public map<T>({
    fromJson,
    toJson,
    domainName,
  }: AnnotationTypesInterface<T>): any {
    if ((this.name = "fromJson")) {
      return;
    }
  }
}
interface AnnotationTypesInterface<T> {
  fromJson: () => T;
  toJson: () => T;
  domainName: () => T;
}
class AnnotationFromJson extends Annotation {
  value: String;
  name: String;
  constructor(value: String) {
    super();
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
