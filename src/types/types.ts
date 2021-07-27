export type PostType = {
    id: number,
    message: string,
    likeCount: number
};

export type ContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
};

export type PhotosType = {
    small: string | null,
    large: string | null
};

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
};

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}

export type SidebarMenuType = {
    id: number,
    name: string,
    path: string
};

export type SidebarFriendsType = {
    id: number,
    name: string,
    photo: string
};

export type DialogType = {
    id: number,
    name: string
};

export type MessageType = {
    id: number,
    message: string
};
