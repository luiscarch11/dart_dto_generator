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
    return "";
  }
  private static argumentsFromString(
    constructorString: String
  ): Argument[] | Array<Argument> {
    const argumentsRegex = /((?<=(const )* ((([^]+\({)+))))([^]*)(?=(}\)))/;
    const matchingArguments = constructorString.match(argumentsRegex);
    console.log(constructorString);
    console.log(matchingArguments);
    if (matchingArguments === null || matchingArguments.length === 0) {
      return [];
    }
    const argumentsList = (matchingArguments !== null
      ? matchingArguments[0]
      : ""
    ).split(",");
    console.log(argumentsList);
    return argumentsList.map(
      (arg) => new Argument(arg.split(" ")[0], arg.split(" ")[1])
    );
  }
}
