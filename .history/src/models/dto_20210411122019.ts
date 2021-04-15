import Argument from "./argument";

export default class Dto {
  name: String;
  arguments: Argument[];

  constructor(name: String, args: Argument[]) {
    this.name = name;
    this.arguments = args;
  }
  public static fromString(documentContent: String): Dto {
    const nameRegex = /(?<=class\s+).*?(?= {)/;
    const matchingElements = documentContent.match(nameRegex);
    const name = matchingElements === null ? "" : matchingElements[0];

    const args = this.argumentsFromString(documentContent);

    return new Dto(name, args);
  }
  public toDartCode(): String {
    return `
      abstract class ${this.name}{
        const ${this.name}._(${this.arguments.map((arg) =>
      arg.toConstructorArguments()
    )});
      }
    `;
  }
  private static argumentsFromString(
    constructorString: String
  ): Argument[] | Array<Argument> {
    const argumentsRegex = /(?<=final )(([\w]){1,} {1,1}([\w]){1,})(?=;)/g;
    const matchingArguments = constructorString.match(argumentsRegex);
    console.log(constructorString);
    console.log(matchingArguments);
    if (matchingArguments === null || matchingArguments.length === 0) {
      return [];
    }
    const argumentsList = matchingArguments !== null ? matchingArguments : [];
    console.log(argumentsList);
    return argumentsList.map(
      (arg) => new Argument(arg.split(" ")[0], arg.split(" ")[1])
    );
  }
}
