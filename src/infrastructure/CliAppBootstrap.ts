import * as chalk from 'chalk';
import * as figlet from 'figlet';
import CliCommand from './cli_commands/CliCommand';
import VersionCommand from './cli_commands/VersionCommand';
import {EXIT_CODE_SUCCESS} from "./CliExitCodes";

const VERSION = process.env.npm_package_version;
const defaultHelp = `
Available commands:
  adrgen version 

You can use --help or -h with every command to see their usage.`
const commands = new Map<string, CliCommand>();
commands.set('version', new VersionCommand());

export default () => {
    const requestedCommandName = process.argv.length > 2 ? process.argv[2] : null;
    const helpRequested = ["help", "h", "-h", "--help"].find((value) => requestedCommandName === value);
    const requestedCommandIsAvailable = commands.has(requestedCommandName);
    if (!requestedCommandName || !requestedCommandIsAvailable || helpRequested) {
        console.log(chalk.bgBlue(figlet.textSync('ADRGen')));
        console.log(chalk.blue('A cli utility to create and manage Architecture Decision Records'))
        console.log(`Version: ${VERSION}`);

        if (!requestedCommandIsAvailable && !helpRequested)
            console.log(chalk.bgRed(`The '${requestedCommandName}' command is not supported by ADRGen.`));

        console.log(defaultHelp);
        process.exit(EXIT_CODE_SUCCESS);
    }
    const command = commands.get(requestedCommandName);
    command.run();
}