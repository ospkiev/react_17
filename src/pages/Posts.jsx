import React, {useEffect, useState, useRef} from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from '../utils/pages'
import Pagination from "../components/UI/pagination/Pagination";
import Counter from "../components/Counter";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";


function Posts() {
    const [value, setValue] = useState('test');
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();
    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const res = await PostService.getAll(limit, page)
        setPosts([...posts, ...res.data])
        const totalCount = res.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    });
    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit]);
    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    });

    const createPost = function (newPost) {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const changePage = async (page) => {
        await setPage(page)
    };

    const removePost = function (post) {
        setPosts(posts.filter(el => el.id !== post.id))
    };

    return (
        <div className="App">
            {/*Управляемый компонент*/}
            <h2>{value}</h2>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <Counter/>
            <button onClick={fetchPosts}>Get Posts</button>
            <MyButton onClick={() => setModal(true)} style={{marginTop: '30px'}}>Создать пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost}/></MyModal>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue={'Количество элементов на странице'}
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 15, name: '15'},
                    {value: -1, name: 'All'}
                ]}
            />
            {postError && <h1>Get Error ${postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchPosts} title={'Список постов'}/>
            <div ref={lastElement} style={{height: '20px', background: 'red'}}> Last element</div>
            {isPostLoading &&
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>}
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;
