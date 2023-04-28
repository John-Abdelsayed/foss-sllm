#! /usr/bin/env node
/*
	Commander Setup
*/
import { Command } from 'commander'; // (normal include)

import VERSION_NUMBER from './util/getPkgVer.js';

import SLLM from './sllm.js';

const sllm: SLLM = new SLLM;

const program = new Command();

program
	.name('sllm')
	.description(`
         ____    
    ___ / / /_ _ 
   (_-</ / /  ' \\
  /___/_/_/_/_/_/					

CLI for OpenAI Large Language Models. v${VERSION_NUMBER}
Created by Mathieu Dombrock 2023. GPL3 License.
`
	)
	//.helpOption(false)
	.addHelpCommand(false)
	.addHelpText('after','\nNote: All commands are prefixed with "." to avoid conflicting with prompts!')
	.showHelpAfterError('Use `sllm --help` or `sllm [cmd] --help` for more info.')
	.version(VERSION_NUMBER);

program
	.command('.help')
	.description('show sllm help')
	.action(()=>{
		program.help();
	});

program
	.command('.prompt', { isDefault: true })
	.description('send a prompt (default command)')
	.argument('<prompt...>', 'the prompt text')
	.option('-v, --verbose', 'verbose output')
	.option('-x, --max-tokens <number>', 'maximum tokens to use in response', '256')
	.option('-X, --unlimited', 'do not limit tokens used in reponse')
	.option('-t, --temperature <number>', 'temperature to use', '0.2')
	.option('-c, --context <string...>', 'context to prepend')
	.option('-d, --domain <string...>', 'subject domain to prepend')
	.option('-e, --expert <string...>', 'act as an expert on this domain')
	.option('-5, --like-im-five', 'explain it like I\'m 5 years old')
	.option('-H, --history <number>', 'prepend history (chatGPT mode)')
	.option('-f, --file <path>', 'preprend the given file contents')
	.option('-T, --trim', 'automatically trim the given file contents')
	.option('-m, --model <model-name>', 'specify the model name', 'gpt-3.5-turbo')
	.option('--mock', 'dont actually send the prompt to the API')
	.action((prompt, options) => {
		sllm.completion(prompt, options);
	});

program
	.command('.settings')
	.description('set a persistant command option')
	.option('-v, --verbose', 'verbose output')
	.option('-x, --max-tokens <number>', 'maximum tokens to use in response', '256')
	.option('-X, --no-limit', 'do not limit tokens used in reponse')
	.option('-t, --temperature <number>', 'temperature to use', '0.2')
	.option('-c, --context <string...>', 'context to prepend')
	.option('-d, --domain <string...>', 'subject domain to prepend')
	.option('-e, --expert <string...>', 'act as an expert on this domain')
	.option('-5, --like-im-five', 'explain it like I\'m 5 years old')
	.option('-H, --history <number>', 'prepend history (chatGPT mode)')
	.option('-f, --file <path>', 'preprend the given file contents')
	.option('-T, --trim', 'automatically trim the given file contents')
	.option('-m, --model <model-name>', 'specify the model name', 'gpt-3.5-turbo')
	.option('--mock', 'dont actually send the prompt to the API')
	.action((options) => {
		sllm.settings(options);
	});

program
	.command('.settings-view')
	.description(
		'view the current settings that were changed via the `settings` command'
	)
	.action(() => {
		sllm.settingsView();
	});

program
	.command('.settings-purge')
	.description(
		'purge the current settings that were changed via the `settings` command'
	)
	.action(() => {
		sllm.settingsPurge();
	});

program
	.command('.history-view')
	.description('view the conversation history')
	.option('-n, --number <count>', 'how far back to read', '99')
	.action((options)=>{
		sllm.historyView(options);
	});

program
	.command('.history-purge')
	.description('view the conversation history')
	.option('-n, --number <count>', 'how far back to read', '99')
	.action((options)=>{
		sllm.historyPurge(options);
	});

program
	.command('.history-undo')
	.description('undo the conversation history')
	.option('-n, --number <count>', 'how far back to undo', '1')
	.action((options)=>{
		sllm.historyUndo(options);
	});

program
	.command('.purge')
	.description('delete all history and settings')
	.action(() => {
		sllm.purge();
	});

program
	.command('.count')
	.description('estimate the tokens used by a prompt or file')
	.option('-p, --prompt <string...>', 'the prompt string to check')
	.option('-f, --file <path>', 'the file path to check')
	.option('-T, --trim', 'automatically trim the given file contents')
	.option('-m, --model <string>', 'specify the model name', 'gpt-3.5-turbo')
	.action((options) => {
		sllm.countTokens(options);
	});

program
	.command('.repeat')
	.description('repeat the last response')
	.action(() => {
		sllm.repeat();
	});

program
	.command('.models')
	.description('list the available models')
	.action(() => {
		sllm.listModels();
	});

program.parse();