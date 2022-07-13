import TemplateContentNotValid from "./TemplateContentNotValid";

export default class TemplateContentValidator {
    validateOrThrowException(content: string) {
        ["{title}", "{status}", "{date}"].forEach(field => {
            if (content.search(field) === -1)
                throw new TemplateContentNotValid(`${field} is required in the template file`);
        });

        if (content.search(/^## Status\n\n?(.+)$/gm) === -1)
            throw new TemplateContentNotValid(`Status is required in the template file, it should be written in this format
        ## Status
        {status}
            `);

        return true;

    }
}