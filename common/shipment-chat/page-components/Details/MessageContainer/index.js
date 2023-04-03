import { useSelector } from '@cogoport/store';
import React, { useEffect, useRef } from 'react';

import useUpdateMessage from '../../../hooks/useUpdateMessage';
import MsgLoader from '../MsgLoader';

import MessageContent from './MessageContent';
import styles from './styles.module.css';

function MessageContainer({ msgContent, loadingChannel, showImpMsg }) {
	const { user_id } = useSelector((state) => ({ user_id: state?.profile?.user.id }));
	const { onUpdateMessage } = useUpdateMessage();
	const containerRef = useRef(null);

	const handleClick = (msg) => {
		onUpdateMessage({
			payload: {
				id: msg?.mainKey, important: !msg?.important,
			},
		});
	};

	let sortedMessageContentArr = [];
	Object.keys(msgContent || {}).forEach((key) => {
		const newObj = {
			...msgContent[key],
			mainKey: key,
		};
		sortedMessageContentArr.push(newObj);
	});

	sortedMessageContentArr = sortedMessageContentArr.sort((a, b) => {
		const date1 = new Date(a.created_at);
		const date2 = new Date(b.created_at);

		return date1 - date2;
	});

	let importantMessage = [];
	importantMessage = sortedMessageContentArr.filter((obj) => obj?.important === true);

	const totalMessages = showImpMsg ? importantMessage : sortedMessageContentArr;

	useEffect(() => {
		const container = containerRef.current;
		container.scrollTop = container.scrollHeight;
	}, [totalMessages]);

	return (
		<div className={styles.main_container} ref={containerRef}>
			{loadingChannel ? (
				<MsgLoader />
			) : (
				<>
					{(totalMessages || []).map((msg) => (
						<MessageContent
							msg={msg}
							user_id={user_id}
							handleClick={handleClick}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default MessageContainer;
