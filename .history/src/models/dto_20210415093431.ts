import Annotation from "./annotation";
import Argument from "./argument";
import {
  toConstructorFromArgumentsList,
  toDeclarationFromArgumentsList,
  toFromJsonFromArgumentList,
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
    console.log("fromString");
    const args = this.argumentsFromString(documentContent);
    console.log("after getting args");
    const name = this.getName(documentContent);
    console.log("after getting name");
    const annotations = this.classAnnotationsFromString(documentContent);
    console.log("after getting annotations");
    console.log(name);
    return new Dto(name, args, annotations);
  }
  private static classAnnotationsFromString(
    documentContent: String
  ): Array<Annotation> {
    const regex = /(@[\w]+\([\w]+\))\s*(?=((@[\w]+\([\w]+\))\s*)*(class [\w]+\s*\{(.*[\s]*)*}))/g;
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
  ${this.generateFromJson()}
  
}
    `;
  }
  private generateFromJson(): String {
    return `
${this.name} fromJson(Map<String, dynamic> json){
  return ${this.name}(${toFromJsonFromArgumentList(this.arguments)});
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
    console.log("argumentsFromString");
    const argumentsRegex = /(((@[\w]+\([\w]+\))\s*\r*)*(final )(([\w]){1,} {1,1}([\w]){1,})(?=;))/g;
    //const argumentsRegex = /(?<=final )(([\w]){1,} {1,1}([\w]){1,})(?=;)/g;
    const matchingArguments = constructorString.match(argumentsRegex);
    console.log("gotten matching arguments");
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
      console.log(`annotation: ${annotations}`);
      return new Argument(
        splitArgument[splitArgument.length - 2],
        splitArgument[splitArgument.length - 1],
        annotations
      );
    });
  }
}
