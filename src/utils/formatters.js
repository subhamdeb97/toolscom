// Basic formatting utilities to avoid heavy dependencies

export const formatXml = (xml) => {
    let formatted = '';
    let reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    let pad = 0;
    xml.split('\r\n').forEach((node) => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad !== 0) pad -= 1;
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        let padding = '';
        for (let i = 0; i < pad; i++) padding += '  ';

        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted.trim();
};

export const formatSql = (sql) => {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'DISTINCT', 'AS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'];

    let formatted = sql;
    // Uppercase keywords
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        formatted = formatted.replace(regex, kw);
    });

    // Basic newlining (very simple)
    formatted = formatted
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',\n  ')
        .replace(/\s+(FROM|WHERE|ORDER BY|GROUP BY|LIMIT|JOIN|LEFT|RIGHT|INNER|OUTER)\s+/g, '\n$1 ')
        .replace(/\s+(AND|OR)\s+/g, '\n  $1 ');

    return formatted.trim();
};

export const formatCss = (css) => {
    return css
        .replace(/\s*\{\s*/g, ' {\n  ')
        .replace(/;\s*/g, ';\n  ')
        .replace(/,\s*/g, ', ')
        .replace(/\s*\}\s*/g, '\n}\n')
        .replace(/\n\s*\n/g, '\n')
        .trim();
};

export const minifyCss = (css) => {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ')
        .replace(/\s*([{:;,}])\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
};

// Basic HTML/JS formatter (using basic indentation)
export const formatCode = (code) => {
    // This is a naive implementation. For robust formatting, libraries like Prettier are needed.
    // Converting basic braces to indented blocks.
    let indent = 0;
    const lines = code.split(/[{}]/); // Split crudely
    // Note: Writing a full JS parser in utils is out of scope. 
    // We will assume "Prettier code" or just return basic spacing.

    // For now, let's just do a simple brace replacement
    return code
        .replace(/;\s*/g, ';\n')
        .replace(/\{\s*/g, ' {\n')
        .replace(/\}\s*/g, '\n}\n');
};
