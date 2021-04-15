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
    const matchesToArgument = matches.map((match) => this.fromString(match));
    if (!matchesToArgument.includes(null)) {
      return [];
    }
    return matchesToArgument as Array<Annotation>;
  }
  public static fromString(annotationString: String): Annotation | null {
    const name = this.getName(annotationString);
    const value = this.getValue(annotationString);

    return this.fromNameAndValue(name, value);
  }
  private static fromNameAndValue(
    name: String | null,
    value: String | null
  ): Annotation | null {
    if (name === null || value === null) {
      return null;
    }
    switch (name) {
      case "fromJson": {
        return this.fromJson(value);
      }
      case "toJson": {
        return this.toJson(value);
      }
      case "domainName": {
        return this.domainName(value);
      }
      default:
        return null;
    }
  }

  private static getName(value: String): String | null {
    const regex = /((?<=@)[\w]+(?=\([\w]+\)))/;
    const match = value.match(regex);
    if (match === null) {
      return null;
    }
    return match[0];
  }
  private static getValue(value: String): String | null {
    const regex = /((?<=@[\w]+\())[\w]+(?=\))/;
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
