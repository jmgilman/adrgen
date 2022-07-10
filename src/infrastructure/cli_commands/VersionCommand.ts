import CommanderCliCommand from "./CommanderCliCommand";
import CliCommand from "./CliCommand";

export default class VersionCommand extends CommanderCliCommand implements CliCommand {
    readonly name: string = "version";
    readonly description: string = "Get the ADRGen release number";

    action() {
        console.log(`Version: ${process.env.npm_package_version}`);
    }

    protected configure() {
        return;
    }

    run() {
        this.runCommander();
    }
}