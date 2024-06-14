# StreamDoodle

This is a Twitch overlay and chat bot integration which adds a simple todo list overlay where users can add and complete tasks with chat commands.

## Usage

### `!task:add <description>`

Add a task for the current user.

### `!task:done`

Mark the task done for the current user.

### `!task:cancel`

Cancel the task for the current user.

### `!task:show` (Moderator only)

Show the task list.

### `!task:hide` (Moderator only)

Hide the task list.

### `!task:clear` (Moderator only)

Clear the task list.

## Installation

In OBS, add a new browser source:

* URL: As provided
* Width: 600
* Height: 500
* Refresh browser when scene becomes active (checked)

If using StreamLabs desktop, the steps should be similar.

To customize the size of the overlay, don't resize the source manually otherwise it will stretch and distort it. Instead, edit the properties of the source and set the Width/Height, then drag it to where you want it in the scene.
