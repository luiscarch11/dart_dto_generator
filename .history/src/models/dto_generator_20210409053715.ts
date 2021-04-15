import * as vscode from "vscode";
import Dto from "./dto";

export default class DtoGenerator implements vscode.CodeActionProvider {
  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeAction[]> {
    const unionClassGenerate = this.createFix(document, range);

    return [unionClassGenerate];
  }

  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix,
  ];

  private createFix(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction {
    console.log("asdasdasd");
    const fix = new vscode.CodeAction(
      `Generate Union Class`,
      vscode.CodeActionKind.QuickFix
    );

    fix.edit = new vscode.WorkspaceEdit();
    const dartCode = document.getText();
    //   Dto.fromString(document.getText())?.toDartCode() ?? document.getText();
    fix.edit.replace(
      document.uri,
      new vscode.Range(new vscode.Position(0, 0), new vscode.Position(100, 0)),
      dartCode
    );
    return fix;
  }
}
