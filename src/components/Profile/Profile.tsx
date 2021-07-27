import { FC } from 'react';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './My_posts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
    isOwner: any,
    profile: ProfileType | null,
    status: string,
    updateStatusThC: (status: string) => void, 
    savePhotoThC: (file: File) => void, 
    saveProfileThC: (profileData: ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = ({ 
    status,
    isOwner,
    profile,
    updateStatusThC,
    savePhotoThC,
    saveProfileThC
 }) => {
    return (
        <div>
            <ProfileInfo 
                isOwner={isOwner}
                profile={profile} 
                status={status} 
                updateStatusThC={updateStatusThC}
                savePhotoThC={savePhotoThC}
                saveProfileThC={saveProfileThC} />
            <MyPostsContainer />
        </div>
    );
};

export default Profile;
