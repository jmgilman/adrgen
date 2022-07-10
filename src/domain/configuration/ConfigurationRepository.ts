import Configuration from "./Configuration";

export default interface ConfigurationRepository {
    write(configuration: Configuration);
    load(): Configuration;
}