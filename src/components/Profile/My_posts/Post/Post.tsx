import { FC } from 'react';
import like from '../../../../assets/images/heart-solid.svg';

import s from './Post.module.css';

type PropsType = {
    message: string
    likeCount: number
};

const Post: FC<PropsType> = ({ message, likeCount }) => {
    return  (
        <div className={s.user_post_item}>
            <div className={s.user_post_content}>
                <div></div>
                {message}
            </div>
            <div className={s.user_likes}>
                <img className={s.like_img} src={like} alt="svg" />
                {likeCount}
            </div>
        </div>
    );
};

export default Post;
