"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const dto_1 = require("./dto");
class DtoGenerator {
    provideCodeActions(document, range, context, token) {
        console.log("provideCodeActions");
        const dtoClassGenerate = this.createFix(document, range);
        return [dtoClassGenerate];
    }
    createFix(document, range) {
        var _a, _b;
        const fix = new vscode.CodeAction(`Generate Data Transfer Object`, vscode.CodeActionKind.QuickFix);
        fix.edit = new vscode.WorkspaceEdit();
        const dartCode = (_b = (_a = dto_1.default.fromString(document.getText())) === null || _a === void 0 ? void 0 : _a.toDartCode()) !== null && _b !== void 0 ? _b : document.getText();
        const startLine = this.getLineToBeginReplacing(document);
        fix.edit.replace(document.uri, new vscode.Range(new vscode.Position(startLine, 0), new vscode.Position(100, 0)), dartCode.toString());
        return fix;
    }
    getLineToBeginReplacing(document) {
        let lineToReturn = 0;
        let lineCount = document.lineCount;
        for (let lineNumber = 0; lineNumber < lineCount; lineNumber++) {
            let lineText = document.lineAt(lineNumber);
            let imports = lineText.text.match(/import/g);
            if (imports) {
                lineToReturn = lineNumber + 1;
            }
        }
        return lineToReturn;
    }
}
exports.default = DtoGenerator;
DtoGenerator.providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix,
];
//# sourceMappingURL=dto_generator.js.map