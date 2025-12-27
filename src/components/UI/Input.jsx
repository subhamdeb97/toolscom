import styles from './Input.module.css';

const Input = ({ label, id, error, className = '', ...props }) => {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {label && <label htmlFor={id} className={styles.label}>{label}</label>}
            <input
                id={id}
                className={`${styles.input} ${error ? styles.error : ''}`}
                {...props}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};

export default Input;
