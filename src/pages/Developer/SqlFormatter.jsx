import { Database } from 'lucide-react';
import GenericFormatter from '../../components/Tools/GenericFormatter';
import { formatSql } from '../../utils/formatters';

const SqlFormatter = () => {
    return (
        <GenericFormatter
            title="SQL Formatter"
            description="Format and beautify Standard SQL queries."
            icon={Database}
            onFormat={formatSql}
            inputPlaceholder="SELECT * FROM users WHERE id = 1"
        />
    );
};

export default SqlFormatter;
