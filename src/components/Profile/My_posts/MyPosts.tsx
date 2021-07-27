import React, { FC } from 'react';
import { AddPostFormValuesType, PostReduxForm } from './AddPostForm/AddPostForm';
import { PostType } from '../../../types/types';
import Post from './Post/Post';

import s from './MyPosts.module.css';

// определили типы здесь и экспортируем их для контейнерной компоненты
export type MapPropsType = {
    posts: Array<PostType>
};
export type MapDispatchPropsType = {
    addPost: (newPostBody: string) => void
};

type PropsType = MapPropsType & MapDispatchPropsType;

const MyPosts: FC<PropsType> = React.memo(({ posts, addPost }) => {
    let postsElements = posts.map((p) => {
        return <Post key={p.id} message={p.message} likeCount={p.likeCount} />
    });

    let addNewPost = (values: AddPostFormValuesType) => {
        addPost(values.newPostBody);
    };

    return <div className={s.user_posts}>
        <p className={s.user_posts_header}>My posts</p>
        <PostReduxForm onSubmit={addNewPost} />
        {postsElements}
    </div>
});

export default MyPosts;
