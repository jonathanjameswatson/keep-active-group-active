import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let lastViewColumn: vscode.ViewColumn | undefined = vscode.window.activeTextEditor?.viewColumn;
	console.log(`keep-active-group-active enabled with initial view column ${lastViewColumn}.`);

	let shouldRevertActiveGroup = false;

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((textEditor) => {
		if (!textEditor) { return; };

		if (shouldRevertActiveGroup && lastViewColumn !== undefined) {
			shouldRevertActiveGroup = false;
			console.log(`Moving text editor ${textEditor.document.fileName} to view column ${lastViewColumn}.`);
			vscode.commands.executeCommand("moveActiveEditor", {
				to: "position",
				by: "group",
				value: lastViewColumn
			});
			return;
		}

		console.log(`Active text editor changed to ${textEditor.document.fileName} in view column ${lastViewColumn}.`);
		lastViewColumn = textEditor.viewColumn;
	}));

	context.subscriptions.push(vscode.commands.registerCommand('keep-active-group-active.revert-next-active-text-editor-view-column', () => {
		if (lastViewColumn) {
			shouldRevertActiveGroup = true;
			console.log(`Next active text editor will be moved to view column ${lastViewColumn}.`);
			return;
		}
		console.log("keep-active-group-active with not revert the next active text editor, as the last view column is unknown.");
	}));

	context.subscriptions.push(vscode.commands.registerCommand('keep-active-group-active.cancel', () => {
		console.log(`Next active text editor will not be reverted.`);
		shouldRevertActiveGroup = false;
	}));
}

export function deactivate() { }
