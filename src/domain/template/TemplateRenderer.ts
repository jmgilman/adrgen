import TemplateContentReader from "./TemplateContentReader";
import Template from "./Template";
import TemplateDefaultContent from "./TemplateDefaultContent";
import TemplateContentNotValid from "./TemplateContentNotValid";
import TemplateContentValidator from "./TemplateContentValidator";

export default class TemplateRenderer {
    constructor(private readonly templateContentReader: TemplateContentReader,
        private readonly templateContentValidator: TemplateContentValidator) { }

    render(templateData: Template, customTemplate = false) {
        const templateContent = customTemplate ? this.templateContentReader.read() : TemplateDefaultContent;
        if (!this.templateContentValidator.validate(templateContent))
            throw new TemplateContentNotValid();
        const contentWithoutMetadata = templateContent.replace("{ID}", templateData.ID)
            .replace("{title}", templateData.title)
            .replace("{status}", templateData.status)
            .replace("{date}", templateData.date);
        return `${this.renderMetadata(templateData.metadata)}\n${contentWithoutMetadata}`;
    }

    renderMetadata(metadata: Map<string, string>) {
        if (metadata.size === 0)
            return '';

        let metadataContent = "";
        metadata.forEach((value, key) => metadataContent += `${key}: "${value}"\n`)
        return `---\n${metadataContent}---`;
    }
}