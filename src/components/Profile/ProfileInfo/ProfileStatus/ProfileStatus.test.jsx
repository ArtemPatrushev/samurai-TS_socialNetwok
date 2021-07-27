import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        // при помощи create фейково рендерится переданная компонента без участия браузера и проверяется
        const component = create(<ProfileStatus status="hey" />);
        // здесь просим дать нам экземпляр компоненты
        const instance = component.getInstance();
        // проверяем что в instance в status содержится строка hey
        expect(instance.state.status).toBe("hey");
    });

    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status="hey" />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test("after creation input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="hey" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    });

    test("after creation span should contains correct status", () => {
        const component = create(<ProfileStatus status="hey" />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('hey');
    });

    test("input should be displayed in editMode instead span", () => {
        const component = create(<ProfileStatus status="hey" />);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('hey');
    });

    test("callback should be called", () => {
        // создаем функцию-шпион, которая будет отслеживать, сколько раз была вызвана наша callback функция updateStatus
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="hey" updateStatusThC={mockCallback} />);
        const instance = component.getInstance();
        instance.deActivateEditMode();
        // должна быть вызвана 1 раз
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
