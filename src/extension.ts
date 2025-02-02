'use strict';
// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as path from 'path';

let getPath = function(args) {
    let path = null;
    if (args && args.length > 0) {
        path = args[0].fsPath;
    }
    if (!path)
        path =  vscode.window.activeTextEditor.document.fileName;
    return path;
}

let pasteAndShowMessage = function(fileName: string) {
    vscode.env.clipboard.writeText(fileName);
    vscode.window.setStatusBarMessage(`The filename "${fileName}" was copied to the clipboard.`, 3000);
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('copy-file-name.copyFileName', (...args) => {  
        var fullPath = getPath(args);
        var extName = path.extname(fullPath);
        var fileName = path.basename(fullPath, extName);
        if (vscode.window.activeTextEditor.selection.isEmpty) {
	  pasteAndShowMessage(fileName);
        }
        else {
          const currentLine = vscode.window.activeTextEditor.selection.active.line + 1;
          pasteAndShowMessage(fileName + ':' + currentLine);
        }
    });

    context.subscriptions.push(disposable);
    
    disposable = vscode.commands.registerCommand('copy-file-name.copyFileNameWithExtension', (...args) => {
        var fullPath = getPath(args);
        var fileName = path.basename(fullPath);
	if (vscode.window.activeTextEditor.selection.isEmpty) {
          pasteAndShowMessage(fileName);
        }
        else {
          const currentLine = vscode.window.activeTextEditor.selection.active.line + 1;
          pasteAndShowMessage(fileName + ':' + currentLine);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}
