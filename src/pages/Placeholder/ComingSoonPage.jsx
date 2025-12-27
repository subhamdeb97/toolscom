import { Construction } from 'lucide-react';
import styles from './ComingSoonPage.module.css';
import Button from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

const ComingSoonPage = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Construction size={48} className={styles.icon} />
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.text}>This utility tool is currently under development. Check back soon!</p>
                <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
            </div>
        </div>
    );
};

export default ComingSoonPage;
