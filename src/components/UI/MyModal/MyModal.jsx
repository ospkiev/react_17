import React from 'react';
import styles from './MyModal.module.css'

const MyComponent = ({children, visible, setVisible}) => {
    const rootClasses = [styles.modal];
    if (visible) {
        rootClasses.push(styles.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyComponent;
