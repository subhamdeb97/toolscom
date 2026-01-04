import {
    Code, Type, Image, Globe, Activity,
    FileJson, FileCode, Database, Terminal,
    AlignLeft, Search, Shuffle, Hash, Lock,
    Cpu, Clock, Calendar, Calculator, RotateCcw, FileType
} from 'lucide-react';

export const tools = [
    // Developer & Code Tools
    { id: 'json-formatter', title: 'JSON Formatter', description: 'Format and validate JSON data', category: 'Developer', path: '/dev/json-formatter', icon: FileJson },
    { id: 'json-csv', title: 'JSON to CSV', description: 'Convert JSON to CSV format', category: 'Developer', path: '/dev/json-to-csv', icon: FileCode },
    { id: 'json-xml', title: 'JSON to XML', description: 'Convert JSON to XML format', category: 'Developer', path: '/dev/json-to-xml', icon: FileCode },
    { id: 'json-ts', title: 'JSON to TS', description: 'Generate TypeScript interfaces from JSON', category: 'Developer', path: '/dev/json-to-ts', icon: Code },
    { id: 'xml-formatter', title: 'XML Formatter', description: 'Beautify XML data', category: 'Developer', path: '/dev/xml-formatter', icon: FileCode },
    { id: 'sql-formatter', title: 'SQL Formatter', description: 'Format SQL queries', category: 'Developer', path: '/dev/sql-formatter', icon: Database },
    { id: 'html-formatter', title: 'HTML Beautifier', description: 'Format and minify HTML', category: 'Developer', path: '/dev/html-formatter', icon: Code },
    { id: 'css-formatter', title: 'CSS Minifier', description: 'Minify and format CSS', category: 'Developer', path: '/dev/css-formatter', icon: Code },
    { id: 'js-formatter', title: 'JS Formatter', description: 'Minify and format JavaScript', category: 'Developer', path: '/dev/js-formatter', icon: Code },
    { id: 'diff-checker', title: 'Diff Checker', description: 'Compare text or JSON files', category: 'Developer', path: '/dev/diff-checker', icon: Activity },
    { id: 'base64', title: 'Base64 Tool', description: 'Encode and decode Base64', category: 'Developer', path: '/dev/base64', icon: Hash },
    { id: 'url-encoder', title: 'URL Encoder', description: 'Encode and decode URLs', category: 'Developer', path: '/dev/url-encoder', icon: Globe },
    { id: 'jwt-debug', title: 'JWT Debugger', description: 'Decode and debug JWT tokens', category: 'Developer', path: '/dev/jwt-debugger', icon: Lock },
    { id: 'cron-gen', title: 'Cron Generator', description: 'Create cron job schedules', category: 'Developer', path: '/dev/cron-generator', icon: Clock },
    { id: 'regex-test', title: 'Regex Tester', description: 'Test regular expressions', category: 'Developer', path: '/dev/regex-tester', icon: Search },
    { id: 'number-base-converter', title: 'Number Base Converter', description: 'Convert between binary, decimal, hex', category: 'Developer', path: '/dev/number-base-converter', icon: Cpu },
    { id: 'uuid-gen', title: 'UUID Generator', description: 'Generate UUIDs and GUIDs', category: 'Developer', path: '/dev/uuid-generator', icon: Shuffle },
    { id: 'timestamp', title: 'Timestamp Converter', description: 'Convert Unix timestamps', category: 'Developer', path: '/dev/timestamp', icon: Clock },

    // File Converter Tools
    { id: 'file-converter', title: 'File Converter', description: 'Convert files between formats', category: 'File Converter', path: '/file-converter', icon: FileType },
    { id: 'timestamp', title: 'Timestamp Converter', description: 'Convert Unix timestamps', category: 'Developer', path: '/dev/timestamp', icon: Clock },

    // Text & String Manipulation
    { id: 'case-converter', title: 'Case Converter', description: 'Change text case style', category: 'Text', path: '/text/case-converter', icon: Type },
    { id: 'word-counter', title: 'Word Counter', description: 'Count words and characters', category: 'Text', path: '/text/word-counter', icon: AlignLeft },
    { id: 'lorem-ipsum', title: 'Lorem Ipsum', description: 'Generate placeholder text', category: 'Text', path: '/text/lorem-ipsum', icon: Type },
    { id: 'random-string', title: 'Random String', description: 'Generate random strings', category: 'Text', path: '/text/random-string', icon: Shuffle },
    { id: 'text-binary', title: 'Text to Binary', description: 'Convert text to binary', category: 'Text', path: '/text/text-binary', icon: Cpu },
    { id: 'ascii-art', title: 'ASCII Art', description: 'Generate ASCII art', category: 'Text', path: '/text/ascii-art', icon: Type },
    { id: 'text-reverser', title: 'Text Reverser', description: 'Reverse text or word order', category: 'Text', path: '/text/text-reverser', icon: RotateCcw },

    // Image & Media Tools
    { id: 'img-compress', title: 'Image Compressor', description: 'Compress PNG/JPG/WebP', category: 'Image', path: '/image/compressor', icon: Image },
    { id: 'img-resize', title: 'Image Resizer', description: 'Resize images', category: 'Image', path: '/image/resizer', icon: Image },
    { id: 'img-base64', title: 'Image to Base64', description: 'Convert image to Base64', category: 'Image', path: '/image/to-base64', icon: Image },
    { id: 'base64-to-img', title: 'Base64 to Image', description: 'Convert Base64 to image', category: 'Image', path: '/image/base64-to-image', icon: Image },
    { id: 'img-ocr', title: 'Smart Text Extractor', description: 'Extract text from Images (OCR) or Excel files', category: 'Image', path: '/image/ocr', icon: Image },
    { id: 'color-converter', title: 'Color Converter', description: 'Convert between HEX, RGB, HSL', category: 'Image', path: '/image/color-converter', icon: Image },
    { id: 'qr-code', title: 'QR Generator', description: 'Create and download QR codes', category: 'Image', path: '/qr-code', icon: Image, status: 'ready' },
    { id: 'color-picker', title: 'Color Picker', description: 'Pick and convert colors', category: 'Image', path: '/image/color-picker', icon: Image },

    // Network & Web Tools
    { id: 'my-ip', title: 'What Is My IP', description: 'Check your public IP', category: 'Network', path: '/network/my-ip', icon: Globe },
    { id: 'mock-server', title: 'Mock Server', description: 'Mock HTTP requests', category: 'Network', path: '/mock-server', icon: Activity, status: 'ready' },
    { id: 'dns-lookup', title: 'DNS Lookup', description: 'Check DNS records', category: 'Network', path: '/network/dns-lookup', icon: Globe },
    { id: 'user-agent', title: 'User Agent', description: 'Parse user agent string', category: 'Network', path: '/network/user-agent', icon: Terminal },

    // Security
    { id: 'pass-gen', title: 'Password Generator', description: 'Create secure passwords', category: 'Security', path: '/security/password-generator', icon: Lock },
    { id: 'hash-gen', title: 'Hash Generator', description: 'MD5, SHA1, SHA256 hashes', category: 'Security', path: '/security/hash-generator', icon: Hash },

    // Math
    { id: 'unit-convert', title: 'Unit Converter', description: 'Convert length, weight, etc.', category: 'Math', path: '/math/unit-converter', icon: Calculator },
    { id: 'percent-calc', title: 'Percentage Calc', description: 'Calculate percentages', category: 'Math', path: '/math/percentage', icon: Calculator },
    { id: 'date-diff', title: 'Date Calculator', description: 'Calculate days between dates', category: 'Math', path: '/math/date-diff', icon: Calendar },
];
