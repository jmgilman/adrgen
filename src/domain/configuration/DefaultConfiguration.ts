import Configuration from "./Configuration";
const defaultConfiguration = new Configuration(
    'docs/adrs',
    'docs/adrs/adr_template.md',
    [],
    ['proposed', 'accepted', 'rejected', 'superseded', 'amended', 'deprecated'],
    'proposed',
    4
);
export default defaultConfiguration;