import { Code } from 'lucide-react';
import GenericFormatter from '../../components/Tools/GenericFormatter';
import { formatXml } from '../../utils/formatters'; // HTML can share basic XML formatting

const HtmlFormatter = () => {
    return (
        <GenericFormatter
            title="HTML Beautifier"
            description="Format and indent HTML code."
            icon={Code}
            onFormat={formatXml}
            inputPlaceholder="<div><p>Hello</p></div>"
        />
    );
};

export default HtmlFormatter;
