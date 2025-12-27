import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/Home/HomePage';
import MockServerPage from './pages/MockServer/MockServerPage';
import QRCodePage from './pages/QRCode/QRCodePage';
import ComingSoonPage from './pages/Placeholder/ComingSoonPage';
import { tools } from './data/tools';
import styles from './App.module.css';

// Developer Tools
import JsonFormatter from './pages/Developer/JsonFormatter';
import JsonToCsv from './pages/Developer/JsonToCsv';
import JsonToXml from './pages/Developer/JsonToXml';
import JsonToTs from './pages/Developer/JsonToTs';
import XmlFormatter from './pages/Developer/XmlFormatter';
import SqlFormatter from './pages/Developer/SqlFormatter';
import HtmlFormatter from './pages/Developer/HtmlFormatter';
import CssFormatter from './pages/Developer/CssFormatter';
import JsFormatter from './pages/Developer/JsFormatter';
import DiffChecker from './pages/Developer/DiffChecker';
import Base64Tool from './pages/Developer/Base64Tool';
import UrlEncoder from './pages/Developer/UrlEncoder';
import UuidGenerator from './pages/Developer/UuidGenerator';
import TimestampConverter from './pages/Developer/TimestampConverter';
import CronGenerator from './pages/Developer/CronGenerator';
import RegexTester from './pages/Developer/RegexTester';

// Text Tools
import CaseConverter from './pages/Text/CaseConverter';
import WordCounter from './pages/Text/WordCounter';
import LoremIpsum from './pages/Text/LoremIpsum';
import TextToBinary from './pages/Text/TextToBinary';
import RandomString from './pages/Text/RandomString';
import AsciiArt from './pages/Text/AsciiArt';

// Security Tools
import PasswordGenerator from './pages/Security/PasswordGenerator';
import HashGenerator from './pages/Security/HashGenerator';

// Network Tools
import MyIP from './pages/Network/MyIP';
import UserAgent from './pages/Network/UserAgent';
import DnsLookup from './pages/Network/DnsLookup';

// Image Tools
import ColorPicker from './pages/Image/ColorPicker';
import ImageResizer from './pages/Image/ImageResizer';
import ImageToBase64 from './pages/Image/ImageToBase64';
import ImageCompressor from './pages/Image/ImageCompressor';

// Math Tools
import UnitConverter from './pages/Math/UnitConverter';
import PercentageCalculator from './pages/Math/PercentageCalculator';
import DateCalculator from './pages/Math/DateCalculator';

// Map of tool IDs to actual components
const COMPONENT_MAP = {
  'mock-server': MockServerPage,
  'qr-code': QRCodePage,

  // Dev - JSON
  'json-formatter': JsonFormatter,
  'json-csv': JsonToCsv,
  'json-xml': JsonToXml,
  'json-ts': JsonToTs,

  // Dev - Formatters
  'xml-formatter': XmlFormatter,
  'sql-formatter': SqlFormatter,
  'html-formatter': HtmlFormatter,
  'css-formatter': CssFormatter,
  'js-formatter': JsFormatter,

  // Dev - Utils
  'diff-checker': DiffChecker,
  'base64': Base64Tool,
  'url-encoder': UrlEncoder,
  'uuid-gen': UuidGenerator,
  'timestamp': TimestampConverter,
  'jwt-debug': Base64Tool,
  'regex-test': RegexTester,
  'cron-gen': CronGenerator,

  // Text
  'case-converter': CaseConverter,
  'word-counter': WordCounter,
  'lorem-ipsum': LoremIpsum,
  'text-binary': TextToBinary,
  'random-string': RandomString,
  'ascii-art': AsciiArt,

  // Security
  'pass-gen': PasswordGenerator,
  'hash-gen': HashGenerator,

  // Network
  'my-ip': MyIP,
  'user-agent': UserAgent,
  'dns-lookup': DnsLookup,

  // Image
  'color-picker': ColorPicker,
  'img-resize': ImageResizer,
  'img-base64': ImageToBase64,
  'img-compress': ImageCompressor,

  // Math
  'unit-convert': UnitConverter,
  'percent-calc': PercentageCalculator,
  'date-diff': DateCalculator
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className={styles.appContainer}>
        <Navbar onOpenProfile={() => setIsSidebarOpen(true)} />

        <main className={styles.mainContent}>
          <div style={{ width: '100%', margin: '0 auto' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {tools.map(tool => {
                const Component = COMPONENT_MAP[tool.id] || (() => <ComingSoonPage title={tool.title} />);
                return (
                  <Route
                    key={tool.id}
                    path={tool.path}
                    element={<Component />}
                  />
                );
              })}
            </Routes>
          </div>
        </main>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
