import Argument from "./argument";

export function toConstructorFromArgumentsList(args: Argument[]): String {
  return args.map((arg) => arg.toConstructorArgument()).join(" ");
}
export function toDeclarationFromArgumentsList(args: Argument[]): String {
  return args.map((arg) => arg.toDeclarationArgument()).join("\n");
}
export function toFromJsonFromArgumentList(args: Argument[]): String {
  return `${args.map((arg) => arg.toFromJson()).join(", ")},`;
}
export function toToJsonFromArgumentList(args: Argument[]): String {
  return `${args.map((arg) => arg.toToJson()).join(", ")},`;
}
export function toFromDomainFromArgumentList(args: Argument[]): String {
  return `${args.map((arg) => arg.toFromDomain()).join(", ")},`;
}
export function toToDomainFromArgumentList(args: Argument[]): String {
  return `${args.map((arg) => arg.toToDomain()).join(", ")},`;
}
