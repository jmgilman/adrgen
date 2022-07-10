export default interface CliCommand {
    readonly description: string;
    readonly name: string;
    action(...args: string[]);
    run();
}