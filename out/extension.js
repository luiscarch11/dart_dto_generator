"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const dto_generator_1 = require("./models/dto_generator");
function activate(context) {
    console.log("init");
    let disposable = vscode.languages.registerCodeActionsProvider({ scheme: "file", language: "dart" }, new dto_generator_1.default(), {
        providedCodeActionKinds: [vscode.CodeActionKind.QuickFix],
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map