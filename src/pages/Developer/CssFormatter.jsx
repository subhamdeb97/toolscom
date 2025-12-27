import { Code } from 'lucide-react';
import GenericFormatter from '../../components/Tools/GenericFormatter';
import { formatCss, minifyCss } from '../../utils/formatters';

const CssFormatter = () => {
    return (
        <GenericFormatter
            title="CSS Minifier"
            description="Compress or beautify CSS code."
            icon={Code}
            onFormat={formatCss}
            onMinify={minifyCss}
            inputPlaceholder="body { color: red; }"
        />
    );
};

export default CssFormatter;
