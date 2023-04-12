import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import useSeen from '../hooks/useSeen';

import List from './List';
import styles from './styles.module.css';

function ShipmentChat({ setMessagesCount = () => { } }) {
	const { user_id } = useSelector((state) => ({ user_id: state?.profile?.user.id }));

	const [show, setShow] = useState(false);
	const [seenLoading, setSeenLoading] = useState(false);

	const { msgSeen } = useSeen();

	const messageContentArr = [];
	Object.keys(msgSeen || {}).forEach((key) => {
		const newObj = {
			...msgSeen[key],
			mainKey: key,
		};
		messageContentArr.push(newObj);
	});

	let totalCount = [];
	messageContentArr?.map((count) => totalCount.push(count[user_id]));

	totalCount = totalCount?.filter((item) => item !== undefined);

	const inititalValue = 0;
	const count = totalCount?.reduce((a, b) => a + b, inititalValue);

	useEffect(() => {
		setMessagesCount((pv) => ({ ...pv, shipment_chat: count }));
	}, [count, setMessagesCount, show]);

	return (
		<div className={styles.chat_container}>
			<div
				className={styles.chat_icon}
				role="button"
				tabIndex={0}
				onClick={() => setShow(true)}
			>
				{count > 0 && !show ? <div className={styles.circle}>{count}</div> : null}
				<div className={styles.icon}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shipment-chat-icon.svg"
						alt="chat"
					/>
				</div>
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
							messageContentArr={messageContentArr}
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
