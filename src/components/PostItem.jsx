import React from 'react';
import MyButton from "./UI/button/MyButton";
import styles from '../styles/PostItem.module.css';
import {useHistory} from 'react-router-dom';

const PostItem = ({post, remove}) => {
    const router = useHistory()
    return (
        <div className={styles.post}>
            <div>
                <h2><strong>{post.id}</strong></h2>
                <h3>{post.title}</h3>
                <h5>{post.body}</h5>
            </div>
            <div className={styles.post__btns}>
                <MyButton onClick={() => router.push(`/posts/${post.id}`)}>
                    Открыть
                </MyButton>
                <MyButton onClick={() => remove(post)}>
                    Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;