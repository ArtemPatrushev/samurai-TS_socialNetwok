import { DialogType, MessageType } from './../types/types';
import { InferActionsType } from './reduxStore';

const ADD_MESSAGE = 'sn/dialogs/ADD-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Dmitry' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Valera' }
    ] as Array<DialogType>,   // массив с объектами типа DialogsType
    messages: [
        { id: 1, message: 'Hi, how are you?' },
        { id: 2, message: 'How is your dog' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' }
    ] as Array<MessageType>
};

export type initialStateType = typeof initialState;

type ActionType = InferActionsType<typeof actions>;

const dialogsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE: {
            let newMessage = action.newMessageBody;
            return {  
                ...state,
                messages: [...state.messages, { id: 6, message: newMessage }],
            };
        };
        default:
            return state;
    };
};

// БЫЛО - action и его тип
// type addMessageActionType = {
//     type: typeof ADD_MESSAGE,
//     newMessageBody: string
// };
// export const addMessage = (newMessageBody: string): addMessageActionType => {
//     return {
//         type: ADD_MESSAGE,
//         newMessageBody
//     };
// };

// СТАЛО
export const actions = {
    addMessage: (newMessageBody: string) => ({type: ADD_MESSAGE, newMessageBody})
};

export default dialogsReducer;
