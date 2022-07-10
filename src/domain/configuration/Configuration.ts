export default class Configuration {
    constructor(public readonly targetDirectory: string,
        public readonly templateFilename: string,
        public readonly metaparams: string[],
        public readonly statuses: string[],
        public readonly defaultStatus: string,
        public readonly IDDigitNumber: number) { }
}