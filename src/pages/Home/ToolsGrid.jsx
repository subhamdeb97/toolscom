import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ToolsGrid.module.css';

const ToolsGrid = ({ tools }) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const filteredTools = useMemo(() => {
        return tools.filter(tool =>
            tool.title.toLowerCase().includes(search.toLowerCase()) ||
            tool.description.toLowerCase().includes(search.toLowerCase()) ||
            tool.category.toLowerCase().includes(search.toLowerCase())
        );
    }, [tools, search]);

    const groupedTools = useMemo(() => {
        const groups = {};
        filteredTools.forEach(tool => {
            if (!groups[tool.category]) groups[tool.category] = [];
            groups[tool.category].push(tool);
        });
        return groups;
    }, [filteredTools]);

    return (
        <div className={styles.container}>
            <div className={styles.heroSection}>
                <h1 className={styles.heroTitle}>Developer tools, <span className="text-gradient">minus the fluff.</span></h1>
                <p className={styles.heroSubtitle}>Open source, client-side only, and blazing fast. No ads, no tracking, just utilities.</p>

                <div className={styles.searchWrapper}>
                    <div className={styles.searchIcon}>
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tools (e.g., 'json', 'base64', 'regex')..."
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className={styles.shortcutHint}>Cmd + K</div>
                </div>
            </div>

            <div className={styles.categoriesGrid}>
                {Object.entries(groupedTools).map(([category, categoryTools]) => (
                    <div key={category} className={styles.categoryCard}>
                        <h2 className={styles.categoryTitle}>{category}</h2>
                        <div className={styles.toolList}>
                            {categoryTools.map(tool => (
                                <div
                                    key={tool.id}
                                    className={styles.toolItem}
                                    onClick={() => navigate(tool.path)}
                                >
                                    <span className={styles.toolBullet}>•</span>
                                    {tool.title}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {Object.keys(groupedTools).length === 0 && (
                    <div className={styles.noResults}>
                        <p>No tools found matching "{search}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolsGrid;
