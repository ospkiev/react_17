import React, {useRef, useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const inputRef = useRef();
    const [post, setPost] = useState({title: '', body: ''});
    const addPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post,
            id: Date.now()
        };
        create(newPost)
        setPost({title: '', body: ''})
        // console.log('inputRef:', inputRef.current.value);
        // console.log('inputRefCurrent:', inputRef.current);
    };
    return (
        <form action="">
            {/*Управляемый компонент*/}
            <MyInput
                value={post.title}
                placeholder="Название тайтл"
                onChange={(e) => setPost({...post, title: e.target.value})}
            />
            <MyInput
                value={post.body}
                placeholder="Название боди"
                onChange={(e) => setPost({...post, body: e.target.value})}
            />
            {/*Неуправляемый (не конролируемый) элкемент*/}
            <MyInput
                ref={inputRef}
                placeholder="Описание"
            />
            <MyButton onClick={addPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;