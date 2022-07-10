import Template from "../../../src/domain/template/Template";

const templateWithoutMeta = new Template('0001', "Test title", "28-08-1983", "proposed");
const templateWithMeta = new Template('0001', "Test title", "28-08-1983", "proposed", new Map<string, string>([["test1", ""], ["test2", ""]]));

export const templateDefaultContentWithoutMetaStub = templateWithoutMeta;
export const templateDefaultContentWithMetaStub = templateWithMeta;