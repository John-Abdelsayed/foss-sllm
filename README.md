# SLLM
A command line interface for the GPT3 LLM (Bring your own token).

In addition to providing a simple interface for talking with GPT3, this tool also offers a few extra features built on top of the GPT3 API. 

### Extra Features:
- Act as a chat bot (emulates chatGPT)
- Read local files
- Automatically prepend subject domains (Bash, JS, Physics etc.)

> $ sllm what would be the avantage of talking to a LLM via the command line?
> 
> The advantage of talking to a LLM via the command line is that it allows for a more efficient and direct way of communicating. It also allows for more precise and specific commands to be used, which can help to quickly get the desired results.

---

> $ sllm what can be used to check the status of a running systemd service? -e bash scripting
> 
> The command to check the status of a running systemd service is "systemctl status <service_name>".
> 
> 
> $ sllm how can I get the full log instead? -d bash -H 1
> 
> To get the full log of a running systemd service, you can use the command "journalctl -u <service_name>".


## Install

```
npm install -g sllm
```

## Setup

Get an OpenAI [API KEY](https://platform.openai.com/account/api-keys).

```
export OPENAI_API_KEY=<your_api_key>
```

## Quick Start

```
$ sllm how many people live in china? 

According to the latest estimates, there are approximately 1.4 billion people living in China.
```

## Chat Mode
To enable a "chat mode" similar to chatGPT, run the following command:

```
sllm set -H 4
```

This will remind the LLM about the last 4 prompts it was given. 

## Overview
```
$ sllm -h

Usage: sllm [options] [command]

CLI for GPT3. Created by Mathieu Dombrock 2023. GPL3 License.

Options:
  -V, --version                 output the version number
  -h, --help                    display help for command

Commands:
  prompt [options] <prompt...>  Send a prompt (default command)
  set [options]                 Set a persistant command option
  settings                      View the current settings that were changed via the `set` command.
  hist [options]                Manage the prompt/response history
  help [command]                display help for command
```

## Prompt

```
$ sllm -h prompt

Usage: sllm prompt [options] <prompt...>

Send a prompt (default command)

Arguments:
  prompt                      the prompt text

Options:
  -m, --max-tokens <number>   maximum tokens to use (default: "256")
  -t, --temperature <number>  temperature to use (default: "0.2")
  -c, --context <string...>   Context to prepend
  -d, --domain <string...>    Subject domain to prepend
  -e, --expert <string...>    Act as an expert on this domain
  -H, --history <number>      Prepend history (chatGPT mode) (default: "0")
  -v, --verbose               verbose output
  -M, --mock                  Dont actually send the prompt to the API
  -h, --help                  display help for command
```

## Working With Files

You can prepend a reference to a file with the `-f` or `--file` option.

However, be aware that files can not exceed 4k tokens.

```
$ sllm what dependancies does this have -f ./package.json

 This package.json file has two dependencies: gpt-3-encoder and openai.

$ sllm what version of npm is this file built for? -f ./package.json

  This package.json file is built for npm version 6.14.4 or higher.

$ cat example.js

  const e = require('./llm.js');
  console.log(e);

$ sllm is this file NodeJS or Browser JS? -f example.js

  This file is Node.js.

$ sllm why do you say that?

  This file contains code that is specific to Node.js, such as the require statement, which is not supported in browser JavaScript.

```
