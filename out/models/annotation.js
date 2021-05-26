"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Annotation {
    constructor() { }
    static annotationsListFromRegexMatches(matches) {
        if (matches === null) {
            return [];
        }
        const matchesToArgument = matches.map((match) => this.fromString(match));
        if (matchesToArgument.includes(null)) {
            return [];
        }
        return matchesToArgument;
    }
    static fromString(annotationString) {
        const name = this.getName(annotationString);
        const value = this.getValue(annotationString);
        return this.fromNameAndValue(name, value);
    }
    static fromNameAndValue(name, value) {
        if (name === null || value === null) {
            return null;
        }
        switch (name) {
            case "fromJson": {
                return this.fromJson(value);
            }
            case "toJson": {
                return this.toJson(value);
            }
            case "toDomain": {
                return this.toDomain(value);
            }
            case "domainName": {
                return this.domainName(value);
            }
            case "jsonName": {
                return this.jsonName(value);
            }
            default:
                return null;
        }
    }
    static getName(value) {
        const regex = /((?<=@)[\w]+(?=\(([\w]*(.[\w]+)*)\)))/;
        const match = value.match(regex);
        if (match === null) {
            return null;
        }
        return match[0];
    }
    static getValue(value) {
        const regex = /((?<=@[\w]+\())[\w]+(?=\))/;
        const match = value.match(regex);
        if (match === null) {
            return null;
        }
        return match[0];
    }
    static fromJson(value) {
        return new AnnotationFromJson(value);
    }
    static toJson(value) {
        return new AnnotationToJson(value);
    }
    static domainName(value) {
        return new AnnotationDomainName(value);
    }
    static jsonName(value) {
        return new AnnotationJsonName(value);
    }
    static toDomain(value) {
        return new AnnotationToDomain(value);
    }
    map({ fromJson, toJson, domainName, jsonName, toDomain, }) {
        if ((this.name = "fromJson")) {
            return fromJson();
        }
        if ((this.name = "toJson")) {
            return toJson();
        }
        if ((this.name = "toDomain")) {
            return toDomain();
        }
        if ((this.name = "domainName")) {
            return domainName();
        }
        if ((this.name = "jsonName")) {
            return jsonName();
        }
        return fromJson();
    }
}
exports.default = Annotation;
class AnnotationFromJson extends Annotation {
    constructor(value) {
        super();
        this.name = "fromJson";
        this.value = value;
    }
}
class AnnotationJsonName extends Annotation {
    constructor(value) {
        super();
        this.name = "jsonName";
        this.value = value;
    }
}
class AnnotationToJson extends Annotation {
    constructor(value) {
        super();
        this.name = "toJson";
        this.value = value;
    }
}
class AnnotationToDomain extends Annotation {
    constructor(value) {
        super();
        this.name = "toDomain";
        this.value = value;
    }
}
class AnnotationDomainName extends Annotation {
    constructor(value) {
        super();
        this.name = "domainName";
        this.value = value;
    }
}
//# sourceMappingURL=annotation.js.map