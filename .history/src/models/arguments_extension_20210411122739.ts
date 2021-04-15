import Argument from "./argument";

export function toConstructorFromArgumentsList(args: Argument[]): String {
  return args.map((arg) => arg.toConstructorArguments()).join(" ");
}
