import React, { useState, useEffect } from 'react';
import { useSelector } from '@cogoport/store';
import { Modal } from '@cogoport/components';
// import getStaticPath from '@cogo/static';
import List from './List';
import useSeen from '../hooks/useSeen';
import styles from './styles.module.css';
// import { ChatContainer, Circle, CustomModal, ChatIcon } from './styles';

function ShipmentChat({ setMessagesCount = () => { } }) {

    const [show, setShow] = useState(false);
    const [seenLoading, setSeenLoading] = useState(false);

    const { isMobile, user_id } = useSelector(({ general, profile }) => ({
        isMobile: general?.isMobile,
        user_id: profile?.id,
    }));

    // let audio = null;
    // if (typeof window !== 'undefined') {
    // 	audio = new Audio(getStaticPath('/mp3/chat-notification.mp3'));
    // }

    const handleShow = () => {
        setShow(true);
    };

    const { msgSeen } = useSeen();

    const MessageContentArr = [];
    Object.keys(msgSeen || {}).forEach((key) => {
        const newObj = {
            ...msgSeen[key],
            mainKey: key,
        };
        MessageContentArr.push(newObj);
    });

    let totalCount = [];
    MessageContentArr?.map((count) => {
        return totalCount.push(count[user_id]);
    });

    totalCount = totalCount?.filter((item) => item !== undefined);

    const inititalValue = 0;
    const count = totalCount?.reduce((a, b) => a + b, inititalValue);

    useEffect(() => {
        if (count > 0 && !show) {
            audio.play();
        }

        setMessagesCount((pv) => ({ ...pv, shipment_chat: count }));
    }, [count]);

    return (
        <div className={styles.chat_container}>
            <div className={styles.chat_icon} ChatIcon onClick={() => handleShow()} size={400}>
                {count > 0 && !show ? <div className={styles.circle}>{count || '5'}</div> : null}
                <img
                    src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shipment-chat-icon.svg"
                    alt="chat"
                    style={{ width: 60, height: 60 }}
                />
            </div>

            {show ? (
                <Modal
                    size="lg"
                    placement="top"
                    show={show}
                    onClose={() => setShow(false)}
                    closable={!seenLoading}
                    styles={{ dialog: { width: isMobile ? 360 : 850 } }}
                    className={styles.modal_styles}
                >
                    <Modal.Body>
                        <div style={{ display: 'flex' }}>
                            <List
                                setShow={setShow}
                                isMobile={isMobile}
                                MessageContentArr={MessageContentArr}
                                user_id={user_id}
                                setSeenLoading={setSeenLoading}
                            />
                        </div>
                    </Modal.Body>
                </Modal>

            ) : null}
        </div>
    );
}

export default ShipmentChat;
