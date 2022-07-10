import CliCommand from './CliCommand';
import { Command } from "commander";

export default abstract class CommanderCliCommand implements CliCommand {
    abstract readonly description;
    abstract readonly name;
    abstract action(...args: string[]);
    private _command: Command;

    protected abstract configure();

    protected addArgument(name: string, description: string, defaultValue?: string) {
        this._command.argument(name, description, defaultValue);
    }

    protected addOption(flags: string, description: string, defaultValue?: string) {
        this._command.option(flags, description, defaultValue);
    }

    private setUpCommanderCliCommand() {
        this._command = new Command(this.name);
        this._command.description(this.description);
        this._command.action(this.action);
        this.configure();
    }

    run() {
        this.setUpCommanderCliCommand();
        this._command.parse(process.argv);
    }
}