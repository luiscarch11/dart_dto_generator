import Annotation from "./annotation";
import Argument from "./argument";
import {
  toConstructorFromArgumentsList,
  toDeclarationFromArgumentsList,
  toFromDomainFromArgumentList,
  toFromJsonFromArgumentList,
  toToDomainFromArgumentList,
  toToJsonFromArgumentList,
} from "./arguments_extension";

export default class Dto {
  name: String;
  arguments: Argument[];
  annotations: Annotation[];

  constructor(name: String, args: Argument[], annotations: Annotation[]) {
    this.name = name;
    this.arguments = args;
    this.annotations = annotations;
  }
  public static fromString(documentContent: String): Dto | null {
    const args = this.argumentsFromString(documentContent);
    const name = this.getName(documentContent);
    const annotations = this.classAnnotationsFromString(documentContent);
    if (args.length === 0 || name === null) {
      return null;
    }
    return new Dto(name, args, annotations);
  }
  private static classAnnotationsFromString(
    documentContent: String
  ): Array<Annotation> {
    const regex = /(@[\w]+\([\w]+\))\s*(?=((@[\w]+\([\w]+\))\s*)*(class [\w]+\s*\{(.*[\s]*)*}))/g;
    const argumentsString = documentContent.match(regex);

    return Annotation.annotationsListFromRegexMatches(argumentsString);
  }
  private static getName(documentContent: String): String | null {
    const nameRegex = /(?<=class\s+).*?(?= {)/;
    const matchingElements = documentContent.match(nameRegex);

    const name = matchingElements === null ? null : matchingElements[0];
    return name;
  }
  public toDartCode(): String | null {
    return `
class ${this.name}{
  const ${this.name}._({${toConstructorFromArgumentsList(this.arguments)}});
  ${toDeclarationFromArgumentsList(this.arguments)} 

  ${this.generateFromJson()}

  ${this.generateToJson()}

  ${this.generateFromDomain()}

  ${this.generateToDomain()}
}
    `;
  }

  private generateFromJson(): String {
    return `
static ${this.name} fromJson(Map<String, dynamic> json){
  return ${this.name}._(${toFromJsonFromArgumentList(this.arguments)});
}
    `;
  }
  private generateToDomain(): String {
    let domainName: String = this.name.replace("Dto", "");
    this.annotations.forEach((annotation) => {
      if (annotation.name === "domainName") {
        domainName = annotation.value;
      }
    });
    return `
${domainName} toDomain(){
  return ${domainName}(${toToDomainFromArgumentList(this.arguments)});
}
    `;
  }
  private generateToJson(): String {
    return `
Map<String, dynamic> toJson(){
  return {${toToJsonFromArgumentList(this.arguments)}};
}
    `;
  }

  private generateFromDomain(): String {
    let domainName: String = this.name.replace("Dto", "");
    this.annotations.forEach((annotation) => {
      if (annotation.name === "domainName") {
        domainName = annotation.value;
      }
    });
    return `
static ${this.name} fromDomain(${domainName} domain){
  return ${this.name}._(
    ${toFromDomainFromArgumentList(this.arguments)}
  );
}
      `;
  }
  private static argumentsFromString(
    constructorString: String
  ): Array<Argument> {
    const argumentsRegex = /(((@[\w]+\([\w]+\))\s*\r*)*(final )(([\w]){1,} {1,1}([\w]){1,})(?=;))/g;
    //const argumentsRegex = /(?<=final )(([\w]){1,} {1,1}([\w]){1,})(?=;)/g;
    const matchingArguments = constructorString.match(argumentsRegex);

    if (matchingArguments === null || matchingArguments.length === 0) {
      return [];
    }
    const argumentsList = matchingArguments !== null ? matchingArguments : [];

    return argumentsList.map((arg) => {
      const cleanArgument = arg.trim();
      const splitArgument = cleanArgument.split(" ");
      const regexAnnotations = /(@[\w]+\([\w]+\))(?=(\s*\r*(@[\w]+\([\w]+\))\s*\r*)*)/g;
      const annotations = Annotation.annotationsListFromRegexMatches(
        cleanArgument.match(regexAnnotations)
      );

      return new Argument(
        splitArgument[splitArgument.length - 2],
        splitArgument[splitArgument.length - 1],
        annotations
      );
    });
  }
}
