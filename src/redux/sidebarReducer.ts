import { SidebarFriendsType, SidebarMenuType } from './../types/types';

export type initialStateType = typeof initialState;

let initialState = {
    sidebarMenu: [
        { id: 1, name: 'Profile', path: '/profile' },
        { id: 2, name: 'Messages', path: '/dialogs' },
        { id: 3, name: 'Users', path: '/users' },
        { id: 4, name: 'News', path: '/news' },
        { id: 5, name: 'Music', path: '/music' },
        { id: 6, name: 'Settings', path: '/settings' }
    ] as Array<SidebarMenuType>,
    sidebarFriends: [
        { id: 1, name: 'Andrew', photo: 'https://lh3.googleusercontent.com/proxy/Rx6hB1sk3kNHYLVRc3kt6iSvL9rLvV-gcRNvzznsOx3e51uN4hNKoO1V8k45mo12z8TTAqr7T6fXr4_f3pvhx-pDJS0SCAs5u4nOzI3WdYYqPF88Ms_8iHKyu4za-iTFoa8OETUDGsAJZujcGahPUt7ofgiYHu22_rE4zfoRLlGokELjwAk9dKT2V_Q' },
        { id: 2, name: 'Sveta', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VsGzl_ZOajsj5KaZpbvzW2bYtf-UZ3mo0A&usqp=CAU' },
        { id: 3, name: 'Sasha', photo: 'https://image.freepik.com/free-photo/surikat-stands-in-alert-pose_174343-479.jpg' }
    ] as Array<SidebarFriendsType>
};

const sidebarReducer = (state = initialState, action: any): initialStateType => {
    return state;
};

export default sidebarReducer;
