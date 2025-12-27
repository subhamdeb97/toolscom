import { FileCode } from 'lucide-react';
import GenericFormatter from '../../components/Tools/GenericFormatter';
import { formatXml } from '../../utils/formatters';

const XmlFormatter = () => {
    return (
        <GenericFormatter
            title="XML Formatter"
            description="Beautify and format generic XML data."
            icon={FileCode}
            onFormat={formatXml}
            inputPlaceholder="<root><child>value</child></root>"
        />
    );
};

export default XmlFormatter;
