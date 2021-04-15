import * as vscode from "vscode";
import Dto from "./dto";

export default class DtoGenerator implements vscode.CodeActionProvider {
  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeAction[]> {
    const dtoClassGenerate = this.createFix(document, range);

    return [dtoClassGenerate];
  }

  public static readonly providedCodeActionKinds = [
    vscode.CodeActionKind.QuickFix,
  ];

  private createFix(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction {
    const fix = new vscode.CodeAction(
      `Generate Data Transfer Object`,
      vscode.CodeActionKind.QuickFix
    );
    fix.edit = new vscode.WorkspaceEdit();

    const dartCode =
      Dto.fromString(document.getText())?.toDartCode() ?? document.getText();
    console.log(dartCode);
    fix.edit.replace(
      document.uri,
      new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0)),
      dartCode.toString()
    );
    return fix;
  }
  private getLineToBeginReplacing(document: vscode.TextDocument): number {
    let lineToReturn = 0;

    let lineCount = document.lineCount;

    for (let lineNumber = 0; lineNumber < lineCount; lineNumber++) {
      let lineText = document.lineAt(lineNumber);
      let tests = lineText.text.match(/import/g);
      if (tests) {
        for (let i = 0; i < tests.length; i++) {
          lineToReturn = lineNumber;
        }
      }
    }
  }
}
