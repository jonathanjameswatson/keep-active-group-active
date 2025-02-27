# keep-active-group-active

keep-active-group-active is a simple VSCode extension that keeps track of the active tab group and provides a command that can be used to move the next active text editor to that tab group. By running this command (`keep-active-group-active.revert-next-active-text-editor-view-column`) before commands that open editors and setting the following options:

```json
"workbench.editor.closeEmptyGroups": false,
"workbench.editor.revealIfOpen": true,
```

it is possible to emulate opening existing editors in the current tab group.

You should also run `keep-active-group-active.cancel` before commands that you expect to change the active tab group, in case a command that you expected to change the active text editor didn't.

This extension is a hacky substitute for this pull request: https://github.com/microsoft/vscode/pull/205442
