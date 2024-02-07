# VS Code Sessionizer

> A remake of [ThePrimeagen's tmux-sessionizer](https://github.com/ThePrimeagen/.dotfiles/blob/master/bin/.local/scripts/tmux-sessionizer) ported to VS Code.

# Overview

Easily open directories (sessions) in specified roots by fuzzy finding them.

Based on the notion that fuzzy finding is the fastest and most efficient way to selecting items.

# How To Use

first, specify the `sessionizer.sessionRoots` setting, which is an array of the root directories of sessions, for example: ["\~/Desktop/projects", "\~/Desktop/work"]

Then, open the command palette (cmd+shift+p) and run any one of the following commands:

- "Sessionizer: Open"
- "Sessionizer: Open In Place"

You will be prompted to select a directory from any one of the roots specified.
