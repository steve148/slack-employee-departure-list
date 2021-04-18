# slack-employee-departure-list

Get all employees who have their accounts deactivated on slack and therefore have departed the company.

## Motivation

I think explaining the motivation of this script is important so I put it first.

I created this script so I could keep track of coworkers that had left my workplace. I always felt sad when I would find out a week or so after the fact that so-and-so had left. This was even worse when I would find out through slack via the fact that the person's account had been deactivated.

This idea of finding out who had left my workplace never came from a place of fear that I too would lose my job. It came from a desire to have transparency and a way to start honest conversation about how to handle employee departures within a growing organization. I don't know if there's a perfect way to how to handle voluntary and involuntary departures within an organization, but I do believe that it's better to know than to be left in the dark.

## Install

```bash
# Via npm
npm install
# Via yarn
yarn
```

This project uses [nvm](https://github.com/creationix/nvm) to manage node versions. To make sure you're using the assumed version of node for this project, you can run the following:

```bash
nvm use
```

## Usage

When the project first started, you could have used the https://api.slack.com/custom-integrations/legacy-tokens to authneticate with Slack's API. Slack is moving support away from legacy tokens though and instead moving users towards their newer Apps approach. You'll need to install a slack app and get a token from that app for these scripts to work. You can install a slack app in the workspace you're interested in watching with the following steps:

1. Go to https://api.slack.com/apps. On the page you should see a button to create a new app.

![Create app button](https://user-images.githubusercontent.com/4990214/115160458-3159a900-a066-11eb-85ec-98d0b4aa5050.png)

2. A modal should open up. You'll need to give your app a name and determine which workspace you'll develop in.

![Create app modal](https://user-images.githubusercontent.com/4990214/115160513-872e5100-a066-11eb-9d21-01a86c264fa5.png)

3.Once the app is created, open the permissions section.

https://user-images.githubusercontent.com/4990214/115160540-be046700-a066-11eb-983c-73db22f9f2bf.png

3. By default, the slack app will not have permission to the `users:read` scope. You should give the app access to the `users:read` scope under the section for `User Token Scopes`.

![User Token Scopes](https://user-images.githubusercontent.com/4990214/115160580-f99f3100-a066-11eb-9940-6c6b0d8a1c97.png)

4. To have the application available in a workspace, you'll then need to install it. At the top of the permissions page, you should see a button to `Install to Workspace`. Click on that and follow the prompts.

https://user-images.githubusercontent.com/4990214/115160647-5569ba00-a067-11eb-964d-8ea6652f7f8e.png

1. After installing the app to the workspace you want to watch, a `User Oauth Token` should be shown on screen. This token is what you'll use to authenticate with the commands below.

## Commands

This project provides the following commands:

### `all`

Returns a list of all employees that have had their account deleted off of slack.

```bash
# Via npm
TOKEN=YOUR-TOKEN-HERE npm all
# Via yarn
TOKEN=YOUR-TOKEN-HERE yarn all
```

### `recent`

Prints a list of all employees that have had their accounts deleted since the last time the script was run. It also updates the locally stored state file to include the latest set of departed employees.

```bash
# Via npm
TOKEN=YOUR-TOKEN-HERE npm recent
# Via yarn
TOKEN=YOUR-TOKEN-HERE yarn recent
```
