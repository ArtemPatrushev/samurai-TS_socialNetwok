import { connect } from 'react-redux';
import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import MyPosts, { MapDispatchPropsType, MapPropsType } from './MyPosts';

// export type MapStatePropsType = {
//     posts: Array<PostType>
//     newPostText: string
// };

// export type MapDispatchPropsType = {
//     addPost: (newPostBody: string) => void
// };

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        //newPostText: state.profilePage.newPostText
    };
};

const MyPostsContainer = connect<MapPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    addPost: actions.addPost
})(MyPosts);

export default MyPostsContainer;
