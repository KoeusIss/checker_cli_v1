```
                                        Holby Checker CLI
```

# Checker CLI

Checker command line interface is a command line application mainly for the vagrant user
to simplify code checking for holberton projects by bring a terminal result with colors to 
live the fantasy of the checker

## Installation

### Installing NodeJs

Checker command line is node js application you need to install Node js in your machine to
access and intsall checker-cli
* Installing NodeJs via the terminal:

```bash
sudo apt install npm
```
* Installing NodeJs via the website

visit the link bellow to start download NodeJs from the nodeJs official website

[NodeJs](https://nodejs.org)

### Using NPM package manager

Holberton checker command line interface is now as node js package you can run it 
as one of the npm package

```bash
npm install -g hol-checker-cli
```
If you still like the old way check below from github repository

### Clone the repository

Clone the current repository in your machine

```bash
git clone https://github.com/KoeusIss/checker_cli.git ~/checker_cli

```
after the repository loaded in your machine go to the directory of the repo and run 

```bash
cd ~/checker_cli
npm install -g .

```
Now enjoy your command line checker in your own computer

## Usage

The checker-cli is project based application whenever you create a new project and you are sure that
holberton checker is available you need to initialize the checker-cli in your project directory

```
$ checker init
```
this command will create `.checker` file in your project directory wich hold all your information,
credentials and history. keep in mind that in this early `beta` version of the application you need to handle the security of
your information manually. we are working on in the very soon release.

in order to get the list of available command ask for help

```
$ checker help

Usage: checker <command>

Commands:
  checker configure <key> [value]  Set the configuration variable  [aliases: config, cfg]
  checker init                     Initialize a project directory
  checker authenticate             Open connection on the intranet  [aliases: auth]
  checker tasks                    Find the different tasks of the project  [aliases: tsk]
  checker ask <taskId>             ask for correction
  checker correction <taskId>      Get correction of a given task  [aliases: corr]

Options:
  --version  Show version number  [boolean]
  --help     Show help  [boolean]

```

## Documentation

### Configuration
The configuration is in order to link your API_key, email and password also the project ID of
your current project.

* link your holberton email and intranet password

```
$ checker config email 1418@holbertonschool.com
$ checker config password <yourpassword>
```
* add the API_key and the current project id
```
$ checker config api_key <yourapikey>
$ checker config project  253
```

### Usage
Now with all your configuration setup you can move forward by authenticate for
the intranet API

```
$ checker authenticate
```
This command will keep your auth_token in the .checker dotfile, keep it hiden and deleted every
just after you test this application. we will noticed you for a secure version of `checker-cli`
soon in the future

* list all tasks in the project
```
$ checker tasks

[ 1233 ] - >>> ht = {}
[ 1234 ] - djb2
[ 1235 ] - key -> index
[ 1236 ] - >>> ht['betty'] = 'holberton'
[ 1251 ] - >>> ht['betty']
[ 1252 ] - >>> print(ht)
[ 1388 ] - >>> del ht
[ 1253 ] - $ht['Betty'] = 'Holberton'

```
You will get a list of all the tasks in the current project with the id wich use in in the next request

* Request a correction ID

```
$ checker ask 1234

Correction ID: 3590920
```

* Now you are ready to get your correction
```
$ checker correction 3590920
   ┏━━━━━━━━━━━━━┓
   ┃             ┃
   ┃   Check 0   ┃
   ┃             ┃
   ┗━━━━━━━━━━━━━┛

   ┌─────────────┐
   │             │
   │   Check 1   │
   │             │
   └─────────────┘

```

# Authors
Sebri Issam - Machine learning enthusiast & full stack developer - [Linkedin](https://www.linkedin.com/in/issam-sebri/) - [Twitter](https://twitter.com/KoeusIss)

Enjoy!
