# StreamDoodle

This is a Twitch overlay and chat bot integration which adds a simple todo list overlay where users can add and complete tasks with chat commands.

## Usage

### `!task:add <description>`

Add a task for the current user.

### `!task:done`

Mark the task done for the current user.

### `!task:cancel`

Cancel the task for the current user.

### `!task:enable` (Moderator only)

Enable the task list.

### `!task:hide` (Moderator only)

Disable the task list.

### `!task:clear` (Moderator only)

Clear the task list.

## Installation

In OBS or StreamLabs Desktop, create a new browser source:

* URL: As provided
* Width & Height: Set to your stream resolution, e.g. 1920x1080
* Refresh browser when scene becomes active (checked)

Add the browser source to each scene somewhere near the top so it appears on top of other elements.
