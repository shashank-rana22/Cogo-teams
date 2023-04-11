import { cl, Tooltip, Checkbox } from '@cogoport/components';
import { IcCPin, IcMPin, IcMShip } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import UserAvatar from '../../../../../common/UserAvatar';
import { PLATFORM_MAPPING, ECLAMATION_SVG } from '../../../../../constants';
import updatePin from '../../../../../helpers/updatePin';
import dateTimeConverter from '../../../../../utils/dateTimeConverter';
import formatLastMessage from '../../../../../utils/formatLastMessage';
import getActiveCardDetails from '../../../../../utils/getActiveCardDetails';

import styles from './styles.module.css';

function MessageCardData({
	item = {},
	activeCardId = '',
	userId = '',
	setActiveMessage,
	firestore,
	autoAssignChats = true,
	handleCheckedChats = () => {},
}) {
	const {
		user_name = '',
		organization_name = '',
		user_type = '',
		search_user_name = '',
		chat_tags = [], chat_status = '',
		id = '',
		channel_type = '',
		new_message_sent_at = '',
		pinnedTime = {},
		last_message = '',
		last_message_document = null,
		new_message_count = 0,
		is_likely_to_book_shipment = false,
	} = getActiveCardDetails(item) || {};

	const lastMessageVar = last_message_document || last_message;
	const isImportant = chat_tags?.includes('important') || false;
	const lastActive = new Date(new_message_sent_at);
	const checkActiveCard = activeCardId === id;

	const { renderTime } = dateTimeConverter(
		Date.now() - Number(lastActive),
		Number(lastActive),
	);

	const orgName = (user_name?.toLowerCase() || '').includes('anonymous')
		? startCase(PLATFORM_MAPPING[user_type] || '') : startCase(organization_name);

	const updatePinnedChats = (e, type) => {
		e.stopPropagation();
		updatePin({
			pinnedID    : id,
			channelType : channel_type,
			type,
			firestore,
			userId,
		});
	};

	return (
		<div
			key={id}
			className={styles.chat_card_main_container}
		>
			{!autoAssignChats && (
				<Checkbox
					onChange={() => handleCheckedChats(item, id)}
				/>
			) }
			<div
				role="button"
				tabIndex={0}
				className={cl`
						${styles.card_container} 
						${!autoAssignChats ? styles.card_with_checkbox : ''}
						${checkActiveCard ? styles.active_card : ''} 
							`}
				onClick={() => setActiveMessage(item)}
			>
				<div className={styles.card}>
					<div className={styles.user_information}>
						<div className={styles.avatar_container}>
							<UserAvatar
								type={channel_type}
							/>
							<div className={styles.user_details}>
								<Tooltip
									content={startCase(search_user_name) || 'User'}
									placement="top"
								>
									<div className={styles.user_name}>
										{startCase(search_user_name) || 'User'}
									</div>
								</Tooltip>
								<div className={styles.organisation}>
									{orgName}
								</div>
							</div>
						</div>

						<div className={styles.user_activity}>
							<div className={styles.tags_container}>
								{!isEmpty(chat_status) && (
									<div
										className={cl`
											${styles.tags}
											${chat_status === 'warning' ? styles.warning : ''}
											${chat_status === 'escalated' ? styles.escalated : ''}
										`}
									>
										{startCase(chat_status)}
									</div>
								)}
							</div>
							<div className={styles.activity_duration}>
								{renderTime}
							</div>
						</div>
					</div>

					<div className={styles.content_div}>
						{formatLastMessage(lastMessageVar)}
						{new_message_count > 0 && (
							<div className={styles.new_message_count}>
								{new_message_count > 100 ? '99+' : (
									new_message_count
								)}
							</div>
						)}
					</div>
				</div>
				{isImportant && (
					<div className={styles.important_icon}>
						<img
							src={ECLAMATION_SVG}
							alt="important"
							width="10px"
						/>
					</div>
				)}
				<div className={styles.pinned_div}>
					{pinnedTime[userId] > 0
						? (
							<IcCPin
								onClick={(e) => updatePinnedChats(e, 'unpin')}
							/>
						) : (
							<IcMPin
								onClick={(e) => updatePinnedChats(e, 'pin')}
							/>
						)}
				</div>
				{is_likely_to_book_shipment && (
					<div className={styles.likely_to_book_shipment}>
						<IcMShip className={styles.ship_icon_container} fill="#849E4C" />
					</div>
				)}
			</div>
		</div>

	);
}
export default MessageCardData;
