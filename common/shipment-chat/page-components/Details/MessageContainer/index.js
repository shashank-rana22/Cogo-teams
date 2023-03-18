import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMStar, IcCStar, IcMDocument } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import useUpdateMessage from '../../../hooks/useUpdateMessage';
import MsgLoader from '../MsgLoader';

import styles from './styles.module.css';

function MessageContainer({ msgContent, isGettingShipment, showImpMsg }) {
	const {
		// user_name,
		user_id,
	} = useSelector((s) => ({
		user_name: s?.profile?.name, user_id: s?.profile.id,
	}));

	const { onCreate } = useUpdateMessage();

	const handleClick = (msg) => {
		onCreate({
			params: {
				id: msg?.mainKey, important: !msg?.important,
			},
		});
	};

	let sortedMessageContentArr = useMemo(
		() => [
			Object.keys(msgContent || {}).forEach((key) => {
				const newObj = {
					...msgContent[key],
					mainKey: key,
				};
				sortedMessageContentArr.push(newObj);
			}),

		],
		[msgContent],
	);

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

	useMemo(() => {
		const lastIndex = sortedMessageContentArr.length - 1;

		handleScroll(`shipment_chat_message_container${lastIndex}`);
	}, [sortedMessageContentArr]);
	handleScroll('shipment_chat_message_container');

	const getSplited = (str) => {
		const all = str.split('\\n');
		let res = '';
		(all || []).forEach((ele) => {
			res += `${ele}\n`;
		});
		return res;
	};

	const allMessage = () => (
		<div className={styles.main_container}>
			{isGettingShipment ? (
				<MsgLoader />
			) : (
				<>
					{(totalMessages || []).map((msg, index) => (
						<div
							className={styles.container}
							id={`shipment_chat_message_container${index}`}
						// className={
						// 	msg?.created_by_user === user_name ? 'right' : 'left'
						// }
						>
							{(msg?.visible_to_user_ids || []).map((item) => (item === user_id ? (
								<div style={{ display: 'flex' }}>
									<div
										className={styles.send_msg}
									// className={
									// 	msg?.created_by_user === user_name
									// 		? 'right'
									// 		: 'left'
									// }
									>
										<div className={styles.details}>
											<div
												className={styles.imp_sign}
												role="button"
												tabIndex={0}
												// className={
												// 	msg?.created_by_user === user_name
												// 		? 'right'
												// 		: 'left'
												// }
												onClick={() => handleClick(msg)}
											>
												{msg?.important === true ? (
													<IcCStar
														style={{ width: '1.3em', height: '1.3em' }}
													/>
												) : (
													<IcMStar
														style={{ width: '1.3em', height: '1.3em' }}
													/>
												)}
											</div>

											<span style={{ margin: '0px 8px' }}>
												{msg?.created_by_stakeholder ? (
													<span>
														{msg?.created_by_stakeholder
															=== 'booking_agent'
															? 'KAM'
															: startCase(msg?.created_by_stakeholder)}
													</span>
												) : null}
											</span>
										</div>

										{(msg?.attachment_urls || []).map((url) => (
											<div className={styles.file_name}>
												<div
													role="button"
													tabIndex={0}
													className={styles.flex_row}
													onClick={() => window.open(url, '_blank')}
												>
													<IcMDocument style={{ marginRight: '6px' }} />
													{url?.split('/').pop()}
												</div>
											</div>
										))}

										{msg?.content ? (
											<div className={styles.msg}>{`${getSplited(msg.content)}`}</div>
										) : null}

										<div className={styles.time}>
											{formatDate({
												date: msg?.created_at,
												dateFormat:
																GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
												timeFormat:
																GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
												formatType : 'dateTime',
												separator  : ' | ',
											})}
										</div>
									</div>
								</div>
							) : null))}
						</div>
					))}
				</>
			)}
		</div>
	);

	return (
		<>
			{allMessage()}
		</>
	);
}

export default MessageContainer;
