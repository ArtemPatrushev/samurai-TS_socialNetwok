import { FC } from 'react';
import { DialogsReduxForm} from './AddMessageForm/AddMessageForm';
import DialogItem from './DialogsItem/DialogItem';
import Message from './Message/Message';
import { DialogType, MessageType } from '../../types/types';

import s from './Dialogs.module.css';

type PropsType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>,
    addMessage: (newMessageBody: string) => void
};

export type NewMessageFormType = {
    newMessageBody: string
};

const Dialogs: FC<PropsType> = ({ dialogs, messages, addMessage }) => {
    
    let dialogsElements = dialogs.map ((d) => {
        return <DialogItem id={d.id} name={d.name} key={d.id} />
    });
    
    let messagesElements = messages.map ((m) => {
        return <Message /*id={m.id}*/ message={m.message} key={m.id} />
    });

    let addNewMessage = (values: NewMessageFormType) => {
        addMessage(values.newMessageBody);
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs_users}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <DialogsReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    );
};

export default Dialogs;
