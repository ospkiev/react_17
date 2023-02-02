import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading] = useFetching(async (id) => {
        const res = await PostService.getById(id);
        setPost(res.data)
    });
    const [fetchComments, isCommentLoading, commentError] = useFetching(async (id) => {
        const res = await PostService.getCommentsByPostId(id);
        setComments(res.data)
    });

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, []);

    return (
        <div>
            <h1>Post iD {params.id}</h1>
            {isLoading ? <Loader/> : <div>{post.title}</div>}
            <h1>Comments</h1>
            {isCommentLoading
                ? <Loader/>
                : <div>
                    {comments.map(el =>
                        <div key={el.id}>
                            <h3>
                                {el.email}
                            </h3>
                            <h6>{el.name}</h6>
                            <p>{el.body}</p>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default PostIdPage;
