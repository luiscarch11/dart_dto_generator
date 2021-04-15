import Argument from "./argument";

export default class Dto {
  name: String;
  arguments: Argument[];

  constructor(name: String, args: Argument[]) {
    this.name = name;
    this.arguments = args;
  }
  public static fromString(documentContent: String) {
    const nameRegex = /(?<=class\s+).*?(?= {)/;
    const name = documentContent.match(nameRegex);
    const args = this.argumentsFromString(documentContent);
  }
  private static argumentsFromString(constructorString: String): Argument[] {
    const argumentsRegex = /((?<=(const )*factory ((([^]+\({)+))))([^]*)(?=(}\)))/;
    const matchingArguments = constructorString.match(argumentsRegex);
    if (matchingArguments === null || matchingArguments.length === 0) {
      return [];
    }
    const argumentsList = (matchingArguments !== null
      ? matchingArguments[0]
      : null
    )?.split(",");
    console.log(argumentsList);
    return [];
  }
}
