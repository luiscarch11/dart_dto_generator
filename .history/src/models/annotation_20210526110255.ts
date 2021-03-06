export default abstract class Annotation {
  abstract value: String;
  abstract name: String;
  constructor() {}

  public static annotationsListFromRegexMatches(
    matches: RegExpMatchArray | null
  ): Array<Annotation> {
    if (matches === null) {
      return [];
    }
    const matchesToArgument = matches.map((match) => this.fromString(match));
    if (matchesToArgument.includes(null)) {
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
      case "toDomain": {
        return this.toDomain(value);
      }
      case "domainName": {
        return this.domainName(value);
      }
      case "jsonName": {
        return this.jsonName(value);
      }
      default:
        return null;
    }
  }

  private static getName(value: String): String | null {
    const regex = /((?<=@)[\w]+(?=\(([\w]*(.[\w]+)*)\)))/;
    const match = value.match(regex);
    if (match === null) {
      return null;
    }
    return match[0];
  }
  private static getValue(value: String): String | null {
    const regex = /((?<=@[\w]+\())[\w]+(.[\w]+)*(?=\))/;
    const match = value.match(regex);
    if (match === null) {
      return null;
    }
    return match[0];
  }
  public static fromJson(value: String): Annotation {
    return new AnnotationFromJson(value);
  }
  public static toJson(value: String): Annotation {
    return new AnnotationToJson(value);
  }
  public static domainName(value: String): Annotation {
    return new AnnotationDomainName(value);
  }
  public static jsonName(value: String): Annotation {
    return new AnnotationJsonName(value);
  }
  public static toDomain(value: String): Annotation {
    return new AnnotationToDomain(value);
  }
  public map<T>({
    fromJson,
    toJson,
    domainName,
    jsonName,
    toDomain,
  }: AnnotationTypesInterface<T>): any {
    if ((this.name = "fromJson")) {
      return fromJson();
    }
    if ((this.name = "toJson")) {
      return toJson();
    }
    if ((this.name = "toDomain")) {
      return toDomain();
    }
    if ((this.name = "domainName")) {
      return domainName();
    }
    if ((this.name = "jsonName")) {
      return jsonName();
    }
    return fromJson();
  }
}
interface AnnotationTypesInterface<T> {
  fromJson: () => T;
  toJson: () => T;
  domainName: () => T;
  jsonName: () => T;
  toDomain: () => T;
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
class AnnotationJsonName extends Annotation {
  value: String;
  name: String;
  constructor(value: String) {
    super();
    this.name = "jsonName";
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
class AnnotationToDomain extends Annotation {
  value: String;
  name: String;
  constructor(value: String) {
    super();
    this.name = "toDomain";
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
