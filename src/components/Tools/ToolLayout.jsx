import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './ToolLayout.module.css';

const ToolLayout = ({ title, description, icon: Icon, children, actions }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => navigate('/')} className={styles.backBtn}>
                    <ArrowLeft size={20} />
                    <span>Back to Tools</span>
                </button>

                <div className={styles.titleSection}>
                    <div className={styles.iconWrapper}>
                        {Icon && <Icon size={32} />}
                    </div>
                    <div>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.description}>{description}</p>
                    </div>
                </div>

                {actions && <div className={styles.actions}>{actions}</div>}
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default ToolLayout;
