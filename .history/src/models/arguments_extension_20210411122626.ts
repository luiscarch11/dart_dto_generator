import Argument from "./argument";

export function toConstructorFromList(args: Argument[]): String[] {
  return args.map((arg) => arg.toConstructorArguments());
}
