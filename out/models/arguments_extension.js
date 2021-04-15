"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toToDomainFromArgumentList = exports.toFromDomainFromArgumentList = exports.toToJsonFromArgumentList = exports.toFromJsonFromArgumentList = exports.toDeclarationFromArgumentsList = exports.toConstructorFromArgumentsList = void 0;
function toConstructorFromArgumentsList(args) {
    return args.map((arg) => arg.toConstructorArgument()).join(" ");
}
exports.toConstructorFromArgumentsList = toConstructorFromArgumentsList;
function toDeclarationFromArgumentsList(args) {
    return args.map((arg) => arg.toDeclarationArgument()).join("\n");
}
exports.toDeclarationFromArgumentsList = toDeclarationFromArgumentsList;
function toFromJsonFromArgumentList(args) {
    return `${args.map((arg) => arg.toFromJson()).join(", ")},`;
}
exports.toFromJsonFromArgumentList = toFromJsonFromArgumentList;
function toToJsonFromArgumentList(args) {
    return `${args.map((arg) => arg.toToJson()).join(", ")},`;
}
exports.toToJsonFromArgumentList = toToJsonFromArgumentList;
function toFromDomainFromArgumentList(args) {
    return `${args.map((arg) => arg.toFromDomain()).join(", ")},`;
}
exports.toFromDomainFromArgumentList = toFromDomainFromArgumentList;
function toToDomainFromArgumentList(args) {
    return `${args.map((arg) => arg.toToDomain()).join(", ")},`;
}
exports.toToDomainFromArgumentList = toToDomainFromArgumentList;
//# sourceMappingURL=arguments_extension.js.map