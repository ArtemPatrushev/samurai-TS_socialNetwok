import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hi, how are you?', likeCount: 15 },
                { id: 2, message: "it's all good", likeCount: 12 },
                { id: 3, message: "bla-bla", likeCount: 5 },
                { id: 4, message: "da-da", likeCount: 7 }
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dmitry' },
                { id: 2, name: 'Andrey' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Sasha' },
                { id: 5, name: 'Victor' },
                { id: 6, name: 'Valera' }
            ],
            messages: [
                { id: 1, message: 'Hi, how are you?' },
                { id: 2, message: 'How is your dog' },
                { id: 3, message: 'Yo' },
                { id: 4, message: 'Yo' },
                { id: 5, message: 'Yo' }
            ],
            newMessageText: ''
        },
        sidebar: {
            sidebarMenu: [
                { name: 'Profile', path: '/profile' },
                { name: 'Messages', path: '/dialogs' },
                { name: 'Users', path: '/users' },
                { name: 'News', path: '/news' },
                { name: 'Music', path: '/music' },
                { name: 'Settings', path: '/settings' }
            ],
            sidebarFriends: [
                { name: 'Andrew', photo: 'https://lh3.googleusercontent.com/proxy/Rx6hB1sk3kNHYLVRc3kt6iSvL9rLvV-gcRNvzznsOx3e51uN4hNKoO1V8k45mo12z8TTAqr7T6fXr4_f3pvhx-pDJS0SCAs5u4nOzI3WdYYqPF88Ms_8iHKyu4za-iTFoa8OETUDGsAJZujcGahPUt7ofgiYHu22_rE4zfoRLlGokELjwAk9dKT2V_Q' },
                { name: 'Sveta', photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VsGzl_ZOajsj5KaZpbvzW2bYtf-UZ3mo0A&usqp=CAU' },
                { name: 'Sasha', photo: 'https://image.freepik.com/free-photo/surikat-stands-in-alert-pose_174343-479.jpg' }
            ]
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('State changed');
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {
        
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
};

export default store;
window.store = store;
