import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { useState, useEffect } from 'react';

import useSeen from '../hooks/useSeen';

import List from './List';
import styles from './styles.module.css';

function ShipmentChat({ setMessagesCount = () => { } }) {
	const { user_id } = useSelector((s) => ({ user_id: s?.profile?.user.id }));

	const [show, setShow] = useState(false);
	const [seenLoading, setSeenLoading] = useState(false);

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
	MessageContentArr?.map((count) => totalCount.push(count[user_id]));

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
				size={400}
			>
				{count > 0 && !show ? <div className={styles.circle}>{count || '5'}</div> : null}
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shipment-chat-icon.svg"
					alt="chat"
					style={{ width: 50, height: 50, margin: '0px 20px 8px 0px' }}
				/>
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
							MessageContentArr={MessageContentArr}
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
