import { APIResponseType, ResultCodeEnum } from "../../api/api";
import { usersAPI } from "../../api/usersApi";
import { actions, followThunkCreator, unfollowThunkCreator } from "../userReducer";

// при помощи jest.mock("../userReducer") - получаем фэйковый usersAPI
jest.mock("../../api/usersApi");
// далее обращаясь к usersAPI, обращаемся уже к фэйковому
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

// создаем фэйковый dispatch, чтобы при тестировании не использовать настоящий и не трогать реальные redusers, actions и API
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

// зачищаем изменения после тестов
beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.followUser.mockClear();
    userAPIMock.unfollowUser.mockClear();
});

// генерируем фэйковый ответ с фэйкового сервера (берем необходисые данные из api.ts)
const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
};

test('success follow thunk', async () => {
    // теперь прописываем, что при вызове фэйкового API метода followUser, всегда нужно вохвращать ответ типа const result
    userAPIMock.followUser.mockReturnValue(Promise.resolve(result));
    const thunk = followThunkCreator(1);

    await thunk(dispatchMock, getStateMock, {});

    // здесь одидаем, что dispatch был вызван 3 раза - смотрим followThunkCreator в reduser (там видно, сколько раз вызывается)
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test('success unfollow thunk', async () => {
    // теперь прописываем, что при вызове фэйкового API метода followUser, всегда нужно вохвращать ответ типа const result
    userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));
    const thunk = unfollowThunkCreator(1);

    await thunk(dispatchMock, getStateMock, {});

    // здесь одидаем, что dispatch был вызван 3 раза - смотрим followThunkCreator в reduser (там видно, сколько раз вызывается)
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});
