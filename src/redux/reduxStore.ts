import { Action, applyMiddleware, combineReducers, createStore } from "redux"; 
import { reducer as formReducer } from 'redux-form';
import thunkMiddleWare, { ThunkAction } from 'redux-thunk';
import sidebarReducer from './sidebarReducer';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import userReducer from "./userReducer";
import authReducer from "./auth-reducer";
import appReducer from "./appReducer";

// rootReducer принимает state и возвращает новый state 
const rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

/** T extends {[key: string]: infer U}  --- это тип объекта actions из userReducer (у него ключи - классы(названия экшенов и описание функции))
 * под этот тип подстраивается Т
 */ 
//type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
// здесь TS выводит тип из T самостоятельно --- его используем для типизации всех экшенов в приложении
//export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>;




// ТО ЖЕ, что выше одной строкой
export type InferActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never;





/** общая типизация для всех санок
 * A - action type (наследуется от Action из redux)
 * R - возвращаемое значение; Promise<void> - большенство санок возвращают promise, который ничем не резолвится
 */
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;


//делаем тип по rootReducer
type RootReducerType = typeof rootReducers;  // (globalState: AppStateType) => AppStateType

/** чтобы взять глобальный state, котоорый возвращает rootReducer, пишем следующее
 * определили то, что возвращает RootReducerType и записали его в AppStateType
 * AppStateType - теперь его передаем в контейнерные компоненты mapStateToProps
 */
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(rootReducers, applyMiddleware(thunkMiddleWare));

//@ts-ignore   --- после данного комментария игнорируются замечания TS
window.store = store;

export default store;
