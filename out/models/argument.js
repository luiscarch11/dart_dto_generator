"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Argument {
    constructor(type, name, annotations) {
        this.type = type;
        this.name = name;
        this.annotations = annotations;
    }
    toConstructorArgument() {
        return `this.${this.name},`;
    }
    toDeclarationArgument() {
        return `final ${this.type} ${this.name};`;
    }
    toFromJson() {
        return `${this.name}:${this.wrappedFromJsonValue()}`;
    }
    toFromDomain() {
        const domainName = this.getDomainName();
        return `${this.name}:domain.${domainName}`;
    }
    toToDomain() {
        const domainName = this.getDomainName();
        const toDomain = this.getToDomain();
        if (toDomain !== "") {
            return `${domainName}:${toDomain}(this.${this.name})`;
        }
        return `${domainName}:this.${this.name}`;
    }
    getDomainName() {
        let nameToReturn = this.name;
        this.annotations.forEach((annotation) => {
            if (annotation.name === "domainName") {
                nameToReturn = annotation.value;
            }
        });
        return nameToReturn;
    }
    getToDomain() {
        let toDomain = "";
        this.annotations.forEach((annotation) => {
            if (annotation.name === "toDomain") {
                toDomain = annotation.value;
            }
        });
        return toDomain;
    }
    toToJson() {
        let jsonName = this.name;
        let toJson = "";
        this.annotations.forEach((annotation) => {
            if (annotation.name === "jsonName") {
                jsonName = annotation.value;
            }
            if (annotation.name === "toJson") {
                toJson = annotation.value;
            }
        });
        if (toJson !== "") {
            return `${jsonName}: ${toJson}(${this.name})`;
        }
        return `'${jsonName}': ${this.name}`;
    }
    wrappedFromJsonValue() {
        let jsonName = this.name;
        let fromJson = "";
        this.annotations.forEach((annotation) => {
            if (annotation.name === "jsonName") {
                jsonName = annotation.value;
            }
            if (annotation.name === "fromJson") {
                fromJson = annotation.value;
            }
        });
        if (fromJson !== "") {
            return `${fromJson}(json['${jsonName}'])`;
        }
        return `json['${jsonName}']`;
    }
}
exports.default = Argument;
//# sourceMappingURL=argument.js.map