export default class Template {
    constructor(public readonly ID,
        public readonly title,
        public readonly date,
        public readonly status,
        public readonly metadata?: Map<string, string>) { }
}