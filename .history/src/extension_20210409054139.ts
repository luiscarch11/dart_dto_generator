// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import DtoGenerator from "./models/dto_generator";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  console.log("init");
  let disposable = vscode.languages.registerCodeActionsProvider(
    { scheme: "file", language: "dart" },
    new DtoGenerator(),
    {
      providedCodeActionKinds: DtoGenerator.providedCodeActionKinds,
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
