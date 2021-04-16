import * as vscode from "vscode";
import Dto from "./dto";

export default class DtoGenerator implements vscode.CodeActionProvider {
  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range,
    context: vscode.CodeActionContext,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.CodeAction[]> {
    console.log("provideCodeActions");
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
    console.log("before dartcode");
    const dartCode =
      Dto.fromString(document.getText())?.toDartCode() ?? document.getText();
    console.log("after dartcode");
    const startLine = this.getLineToBeginReplacing(document);
    fix.edit.replace(
      document.uri,
      new vscode.Range(
        new vscode.Position(startLine + 1, 0),
        new vscode.Position(100, 0)
      ),
      dartCode.toString()
    );
    return fix;
  }
  private getLineToBeginReplacing(document: vscode.TextDocument): number {
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
