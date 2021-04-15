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
      return fromJson();
    }
    if ((this.name = "toJson")) {
      return toJson();
    }
    if ((this.name = "domainName")) {
      return domainName();
    }
    return fromJson();
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
    this.name = "fromJson";
    this.value = value;
  }
}
class AnnotationToJson extends Annotation {
  value: String;
  name: String;
  constructor(value: String) {
    super();
    this.name = "toJson";
    this.value = value;
  }
}
class AnnotationDomainName extends Annotation {
  value: String;
  name: String;
  constructor(value: String) {
    super();
    this.name = "domainName";
    this.value = value;
  }
}
