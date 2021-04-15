export default abstract class Annotation {
  abstract value: String;
  abstract name: String;
  constructor() {}

  public static argumentsListFromRegexMatches(
    matches: RegExpMatchArray | null
  ): Array<Annotation> {
    if (matches === null) {
      return [];
    }
    return matches.map((match) => this.fromString(match));
  }
  public static fromString(value: String): Annotation {}
  private static getName(value: String): String {
    const regex = /((?<=@)[\w]+(?=\([\w]+\)))/;
    const match = value.match(regex);
    if (match === null) {
      return null;
    }
    return match[0];
  }
  private static fromJson(value: String): Annotation {
    return new AnnotationFromJson(value);
  }
  private static toJson(value: String): Annotation {
    return new AnnotationToJson(value);
  }
  private static domainName(value: String): Annotation {
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
