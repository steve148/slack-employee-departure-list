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

A requirement of this script is that you have a token to access the slack workspace. As of writing this README, this can be done by going to https://api.slack.com/custom-integrations/legacy-tokens and creating a legacy token. You will need to use the token for commands that access the slack API.

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
