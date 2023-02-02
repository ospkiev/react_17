import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
    if (posts.length === 0) {
        return (
            <h2 style={{textAlign: 'center', marginTop: '20px'}}>Посты не найдены!</h2>
        )
    }
    return (
        <div>
            <h1>{title}</h1>
            <TransitionGroup>
                {posts.map((post) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove={remove} post={post}/>
                    </CSSTransition>
                    )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;