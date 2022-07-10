import CommanderCliCommand from "./CommanderCliCommand";

export default class VersionCommand extends CommanderCliCommand {
    readonly name: string = "version";
    readonly description: string = "Get the ADRGen release number";

    action(...args: any[]) {
        console.log(`Version: ${process.env.npm_package_version}`);
    }

    protected configure() {
        return;
    }
}