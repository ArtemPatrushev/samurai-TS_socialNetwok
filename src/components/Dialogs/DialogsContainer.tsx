import { connect } from 'react-redux';
import { compose } from 'redux';
import { actions } from '../../redux/dialogsReducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Dialogs from './Dialogs';
import { AppStateType } from '../../redux/reduxStore';
import { DialogType, MessageType } from '../../types/types';

// видимо лишнее
type MapStatePropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>
};

//вопрос с типизацией dispatch
type MapDispatchPropsType = {
    addMessage: (newMessageBody: string) => void
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    };
};

// compose используется только если после connect через запятую передаем в компоненту еще что-то ---  в данном случае withAuthRedirect
export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {} ,AppStateType>(mapStateToProps, { addMessage: actions.addMessage }),
    withAuthRedirect
)(Dialogs);
