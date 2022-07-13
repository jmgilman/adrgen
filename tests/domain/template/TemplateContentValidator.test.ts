import TemplateContentNotValid from "../../../src/domain/template/TemplateContentNotValid";
import TemplateContentValidator from "../../../src/domain/template/TemplateContentValidator";

const validator = new TemplateContentValidator();

describe('Template content validator: validate the content in a template', () => {
    it('should throw a template content not valid error when content has not fields on it', () => {
        expect(() => validator.validateOrThrowException('test'))
            .toThrow(TemplateContentNotValid);
    });
    it('should throw a template content not valid error when content has not status properly configured', () => {
        const content = `## {title}
Date: {date}
Status: {status}`;
        expect(() => validator.validateOrThrowException(content))
            .toThrow(TemplateContentNotValid);
    });
    it('should return true when content has all the fields properly configured', () => {
        const content = `## {title}
Date: {date}
## Status
{status}
`;
        expect(validator.validateOrThrowException(content))
            .toBe(true);
        const content2 = `## {title}
Date: {date}
## Status

{status}
`;
        expect(validator.validateOrThrowException(content2))
            .toBe(true);
    });
});