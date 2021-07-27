import { getAuthUserDataInfoThunkCreator} from './auth-reducer';
import { InferActionsType } from './reduxStore';

const SET_INITIALIZED_SUCCESS = 'sn/app/SET-INITIALIZED';

let initialState = {
    initialized: false,
    // можно показывать ошибку
    // globalError: null
};

export type InitialStateType = typeof initialState;

// не нужен, тк изменили action (ниже)
// type InitializedSuccessType = {
//     type: typeof SET_INITIALIZED_SUCCESS
// };

type ActionType = InferActionsType<typeof actions>;

//const appReducer = (state = initialState, action: any): InitialStateType - здесь после двоеточия пишется тип, который возвращается (уместно не всегда)
const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    };
};

// БЫЛ action
//эта функция возвращает тип InitializedSuccessType, поэтому ставится после скобок
// export const initializedSuccess = (): InitializedSuccessType => ({
//     type: SET_INITIALIZED_SUCCESS
// });

// СТАЛ action
export const actions = {
    initializedSuccess: () => ({type: SET_INITIALIZED_SUCCESS} as const)
};


export const initializeApp = () => (dispatch: any) => {            // эту не типизировал
    let promise = dispatch(getAuthUserDataInfoThunkCreator());
    
    promise.then(() => {
        dispatch(actions.initializedSuccess());
    });
};

export default appReducer;
