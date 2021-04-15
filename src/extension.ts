import * as vscode from "vscode";
import DtoGenerator from "./models/dto_generator";

export function activate(context: vscode.ExtensionContext) {
  console.log("init");
  let disposable = vscode.languages.registerCodeActionsProvider(
    { scheme: "file", language: "dart" },
    new DtoGenerator(),
    {
      providedCodeActionKinds: [vscode.CodeActionKind.QuickFix],
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
