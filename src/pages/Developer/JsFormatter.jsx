import { Code } from 'lucide-react';
import GenericFormatter from '../../components/Tools/GenericFormatter';
import { formatCode } from '../../utils/formatters';

const JsFormatter = () => {
    return (
        <GenericFormatter
            title="JS Formatter"
            description="Beautify JavaScript code."
            icon={Code}
            onFormat={formatCode}
            inputPlaceholder="function test() { return true; }"
        />
    );
};

export default JsFormatter;
