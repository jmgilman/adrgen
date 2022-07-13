import TemplateRenderer from "../../../src/domain/template/TemplateRenderer";
import {
    templateDefaultContentWithMetaStub,
    templateDefaultContentWithoutMetaStub
} from "../../stubs/template/TemplateStubs";
import { createMock } from 'ts-auto-mock';
import TemplateContentValidator from "../../../src/domain/template/TemplateContentValidator";
import TemplateContentReader from "../../../src/domain/template/TemplateContentReader";
import * as fs from "fs";

const readerMock = createMock<TemplateContentReader>();
const validatorMock = createMock<TemplateContentValidator>({
    validateOrThrowException: () => true
});
const renderer = new TemplateRenderer(readerMock, validatorMock);

describe('Template renderer: render template content', () => {
    it('should render default data without meta', () => {
        const expected = fs.readFileSync('tests/stubs/template/template_default.md', 'utf8');
        const result = renderer.render(templateDefaultContentWithoutMetaStub);
        expect(result).toBe(expected);
    });
    it('should render default data with meta', () => {
        const expected = fs.readFileSync('tests/stubs/template/template_default_meta.md', 'utf8');
        const result = renderer.render(templateDefaultContentWithMetaStub);
        expect(result).toBe(expected);
    });
});

describe('Template renderer: render metadata', () => {
    it('should render the metadata block', () => {
        const metadata = new Map<string, string>([["test1", ""], ["test2", ""]]);
        const expected = `---
test1: ""
test2: ""
---`;
        const result = renderer.renderMetadata(metadata);
        expect(result).toBe(expected);
    });
    it('should render empty string if there is no metadata', () => {
        const metadata = new Map<string, string>();
        const expected = ``;
        const result = renderer.renderMetadata(metadata);
        expect(result).toBe(expected);
    });
});