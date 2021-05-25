"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotation_1 = require("./annotation");
const argument_1 = require("./argument");
const arguments_extension_1 = require("./arguments_extension");
class Dto {
    constructor(name, args, annotations) {
        this.name = name;
        this.arguments = args;
        this.annotations = annotations;
    }
    static fromString(documentContent) {
        const args = this.argumentsFromString(documentContent);
        const name = this.getName(documentContent);
        const annotations = this.classAnnotationsFromString(documentContent);
        if (args.length === 0 || name === null) {
            return null;
        }
        if (!this.shouldShowCommand(documentContent)) {
            return null;
        }
        return new Dto(name, args, annotations);
    }
    static shouldShowCommand(documentContent) {
        const regex = /((@[\w]+\([\w]+\))\s*\r*)*(((@[\w]+\([\w]+\))\s*\r*)*(class [\w]+\s*\r*{(\r*\s*((@[\w]+\([\w]+\))\s*\r*)*(final )(([\w](<[\w]{1,}>)*){1,} {1,1}([\w]){1,});)*\s*\r*}))/g;
        const matches = documentContent.match(regex);
        return matches === null ? false : matches.length > 0;
    }
    static classAnnotationsFromString(documentContent) {
        const regex = /(@[\w]+\([\w]+\))\s*(?=((@[\w]+\([\w]+\))\s*)*(class [\w]+\s*\{(.*[\s]*)*}))/g;
        const argumentsString = documentContent.match(regex);
        return annotation_1.default.annotationsListFromRegexMatches(argumentsString);
    }
    static getName(documentContent) {
        const nameRegex = /(?<=class\s+).*?(?=\s*{)/;
        const matchingElements = documentContent.match(nameRegex);
        const name = matchingElements === null ? null : matchingElements[0];
        return name;
    }
    toDartCode() {
        return `
class ${this.name}{
  const ${this.name}._({${arguments_extension_1.toConstructorFromArgumentsList(this.arguments)}});
  ${arguments_extension_1.toDeclarationFromArgumentsList(this.arguments)} 

  ${this.generateFromJson()}

  ${this.generateToJson()}

  ${this.generateFromDomain()}

  ${this.generateToDomain()}
}
    `;
    }
    generateFromJson() {
        return `
static ${this.name} fromJson(Map<String, dynamic> json){
  return ${this.name}._(${arguments_extension_1.toFromJsonFromArgumentList(this.arguments)});
}
    `;
    }
    generateToDomain() {
        let domainName = this.name.replace("Dto", "");
        this.annotations.forEach((annotation) => {
            if (annotation.name === "domainName") {
                domainName = annotation.value;
            }
        });
        return `
${domainName} toDomain(){
  return ${domainName}(${arguments_extension_1.toToDomainFromArgumentList(this.arguments)});
}
    `;
    }
    generateToJson() {
        return `
Map<String, dynamic> toJson(){
  return {${arguments_extension_1.toToJsonFromArgumentList(this.arguments)}};
}
    `;
    }
    generateFromDomain() {
        let domainName = this.name.replace("Dto", "");
        this.annotations.forEach((annotation) => {
            if (annotation.name === "domainName") {
                domainName = annotation.value;
            }
        });
        return `
static ${this.name} fromDomain(${domainName} domain){
  return ${this.name}._(
    ${arguments_extension_1.toFromDomainFromArgumentList(this.arguments)}
  );
}
      `;
    }
    static argumentsFromString(constructorString) {
        const argumentsRegex = /(((@[\w]+\([\w]+\))\s*\r*)*(final )(([\w](<[\w]{1,}>)*){1,} {1,1}([\w]){1,})(?=;))/g;
        //const argumentsRegex = /(?<=final )(([\w]){1,} {1,1}([\w]){1,})(?=;)/g;
        const matchingArguments = constructorString.match(argumentsRegex);
        if (matchingArguments === null || matchingArguments.length === 0) {
            return [];
        }
        const argumentsList = matchingArguments !== null ? matchingArguments : [];
        return argumentsList.map((arg) => {
            const cleanArgument = arg.trim();
            const splitArgument = cleanArgument.split(" ");
            const regexAnnotations = /(@[\w]+\([\w]+\))(?=(\s*\r*(@[\w]+\([\w]+\))\s*\r*)*)/g;
            const annotations = annotation_1.default.annotationsListFromRegexMatches(cleanArgument.match(regexAnnotations));
            return new argument_1.default(splitArgument[splitArgument.length - 2], splitArgument[splitArgument.length - 1], annotations);
        });
    }
}
exports.default = Dto;
//# sourceMappingURL=dto.js.map