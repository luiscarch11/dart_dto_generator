import Annotation from "./annotation";
import Argument from "./argument";
import {
  toConstructorFromArgumentsList,
  toDeclarationFromArgumentsList,
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
  public static fromString(documentContent: String): Dto {
    const args = this.argumentsFromString(documentContent);
    const name = this.getName(documentContent);
    const annotations = this.classAnnotationsFromString(documentContent);
    return new Dto(name, args, annotations);
  }
  private static classAnnotationsFromString(
    documentContent: String
  ): Array<Annotation> {
    const regex = /(@[\w]+\([\w]+\))\s*\r*(?=((@[\w]+\([\w]+\))\s*\r*)*class [\w]+\s*{(.[\s]*\r*)*})/g;
    const argumentsString = documentContent.match(regex);

    return Annotation.annotationsListFromRegexMatches(argumentsString);
  }
  private static getName(documentContent: String): String {
    const nameRegex = /(?<=class\s+).*?(?= {)/;
    const matchingElements = documentContent.match(nameRegex);
    const name = matchingElements === null ? "" : matchingElements[0];
    return name;
  }
  public toDartCode(): String {
    return `
abstract class ${this.name}{
  const ${this.name}._(${toConstructorFromArgumentsList(this.arguments)});
  ${toDeclarationFromArgumentsList(this.arguments)} 

  
}
    `;
  }

  private generateFromDomain(): String {
    return `
factory ${this.name}.fromDomain()
      `;
  }
  private static argumentsFromString(
    constructorString: String
  ): Array<Argument> {
    const argumentsRegex = /(((@[\w]+\([\w]+\))\s*\r*)*(final )(([\w]){1,} {1,1}([\w]){1,})(?=;))/g;
    //const argumentsRegex = /(?<=final )(([\w]){1,} {1,1}([\w]){1,})(?=;)/g;
    const matchingArguments = constructorString.match(argumentsRegex);
    console.log(constructorString);
    console.log(matchingArguments);
    if (matchingArguments === null || matchingArguments.length === 0) {
      return [];
    }
    const argumentsList = matchingArguments !== null ? matchingArguments : [];
    console.log(argumentsList);
    return argumentsList.map((arg) => {
      console.log(arg);
      const splitArgument = arg.split(" ");
      const regexAnnotations = /(@[\w]+\([\w]+\))\s*\r*(?=((@[\w]+\([\w]+\))\s*\r*)*)/;
      const annotations = Annotation.annotationsListFromRegexMatches(
        arg.match(regexAnnotations)
      );
      return new Argument(
        splitArgument[splitArgument.length - 2],
        splitArgument[splitArgument.length - 1],
        annotations
      );
    });
  }
}
