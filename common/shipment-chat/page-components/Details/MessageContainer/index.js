import { useSelector } from '@cogoport/store';
import React, { useMemo } from 'react';

import useUpdateMessage from '../../../hooks/useUpdateMessage';
import MsgLoader from '../MsgLoader';

import MessageContent from './MessageContent';
import styles from './styles.module.css';

function MessageContainer({ msgContent, isGettingShipment, showImpMsg }) {
	const { user_id } = useSelector((s) => ({ user_id: s?.profile?.user.id }));
	const { onCreate } = useUpdateMessage();

	const handleClick = (msg) => {
		onCreate({
			params: {
				id: msg?.mainKey, important: !msg?.important,
			},
		});
	};

	// let sortedMessageContentArr = useMemo(
	// 	() => [
	// 		Object.keys(msgContent || {}).forEach((key) => {
	// 			const newObj = {
	// 				...msgContent[key],
	// 				mainKey: key,
	// 			};
	// 			sortedMessageContentArr.push(newObj);
	// 		}),
	// 	],
	// 	[msgContent],
	// );

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

	const handleScroll = (id) => {
		if (id) {
			const docs = document.getElementById(id);

			if (docs) {
				docs.scrollIntoView({
					block: 'end', inline: 'nearest',
				});
				docs.focus();
			}
		}
	};

	// useMemo(() => {
	// 	const lastIndex = sortedMessageContentArr.length - 1;

	// 	handleScroll(`shipment_chat_message_container${lastIndex}`);
	// }, [sortedMessageContentArr]);

	handleScroll('shipment_chat_message_container');

	return (
		<div className={styles.main_container}>
			{isGettingShipment ? (
				<MsgLoader />
			) : (
				<>
					{(totalMessages || []).map((msg, index) => (
						<MessageContent
							msg={msg}
							user_id={user_id}
							index={index}
							handleClick={handleClick}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default MessageContainer;
