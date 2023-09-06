import { Button, Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import useSeen from '../hooks/useSeen';
import getStaticPath from '../utils/getStaticPath';

import List from './List';
import styles from './styles.module.css';

const INITIAL_MSG_COUNT = 0;

function ShipmentChat({ setMessagesCount = () => { } }) {
	const { user_id } = useSelector((state) => ({ user_id: state?.profile?.user.id }));

	const [show, setShow] = useState(false);
	const [seenLoading, setSeenLoading] = useState(false);

	let audio = null;
	if (typeof window !== 'undefined') {
		audio = new Audio(getStaticPath({ path: '/mp3/chat-notification.mp3' }));
	}

	const { msgSeen } = useSeen();

	const MESSAGE_CONTENT_ARR = [];
	Object.keys(msgSeen || {}).forEach((key) => {
		const newObj = {
			...msgSeen[key],
			mainKey: key,
		};
		MESSAGE_CONTENT_ARR.push(newObj);
	});

	let totalCount = [];
	(MESSAGE_CONTENT_ARR || []).map((count) => totalCount.push(count[user_id]));

	totalCount = totalCount?.filter((item) => item !== undefined);

	const INITIAL_VALUE = 0;
	const count = totalCount?.reduce((a, b) => a + b, INITIAL_VALUE);

	useEffect(() => {
		if (count > INITIAL_MSG_COUNT && !show) {
			audio.play();
		}

		setMessagesCount((pv) => ({ ...pv, shipment_chat: count }));
	}, [count, setMessagesCount, show, audio]);

	return (
		<div className={styles.chat_container}>
			<div className={styles.chat_icon}>
				<Button
					themeType="linkUi"
					onClick={() => setShow(true)}
				>
					{count > GLOBAL_CONSTANTS.zeroth_index && !show
						? <div className={styles.circle}>{count}</div> : null}

					<div className={styles.icon}>
						<img
							src={GLOBAL_CONSTANTS.image_url.shipment_chat_icon}
							alt="chat"
						/>
					</div>
				</Button>
			</div>

			{show ? (
				<Modal
					size="lg"
					placement="top"
					show={show}
					onClose={() => setShow(false)}
					closable={!seenLoading}
					className={styles.modal_styles}
				>
					<Modal.Body>
						<List
							setShow={setShow}
							messageContentArr={MESSAGE_CONTENT_ARR}
							user_id={user_id}
							setSeenLoading={setSeenLoading}
						/>
					</Modal.Body>
				</Modal>

			) : null}
		</div>
	);
}

export default ShipmentChat;
