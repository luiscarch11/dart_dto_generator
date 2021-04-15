import Argument from "./argument";

export function toConstructorFromArgumentsList(args: Argument[]): String {
  return args.map((arg) => arg.toConstructorArgument()).join(" ");
}
export function toDeclarationFromArgumentsList(args: Argument[]): String {
  return args.map((arg) => arg.toDeclarationArgument()).join("\n");
}
