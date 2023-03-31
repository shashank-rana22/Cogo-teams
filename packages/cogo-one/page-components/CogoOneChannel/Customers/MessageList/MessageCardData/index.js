import { cl, Tooltip } from '@cogoport/components';
import { IcCPin, IcMPin } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import UserAvatar from '../../../../../common/UserAvatar';
import { PLATFORM_MAPPING, ECLAMATION_SVG } from '../../../../../constants';
import dateTimeConverter from '../../../../../utils/dateTimeConverter';
import getActiveCardDetails from '../../../../../utils/getActiveCardDetails';

import styles from './styles.module.css';

function MessageCardData({ item = {}, activeCardId = '', userId = '', setActiveMessage, updatePin }) {
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
		new_message_count = 0,
	} = getActiveCardDetails(item) || {};

	const isImportant = chat_tags?.includes('important') || false;
	const lastActive = new Date(new_message_sent_at);
	const checkActiveCard = activeCardId === id;

	const { renderTime } = dateTimeConverter(
		Date.now() - Number(lastActive),
		Number(lastActive),
	);

	const orgName = (user_name?.toLowerCase() || '').includes('anonymous')
		? startCase(PLATFORM_MAPPING[user_type] || '') : startCase(organization_name);

	return (
		<div
			key={id}
			role="presentation"
			className={cl`
						${styles.card_container} 
						${checkActiveCard ? styles.active_card : ''} 
						${isImportant ? styles.important_styles : ''}
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
							<div className={styles.name_container}>
								<Tooltip
									content={startCase(search_user_name) || 'User'}
									placement="top"
								>
									<div className={styles.user_name}>
										{startCase(search_user_name) || 'User'}
									</div>
								</Tooltip>
								{pinnedTime[userId] > 0
									? (
										<IcCPin
											onClick={(e) => {
												updatePin({
													pinnedID    : id,
													channelType : channel_type,
													type        : 'unpin',
												});
												e.stopPropagation();
											}}
										/>
									) : (
										<IcMPin
											onClick={(e) => {
												updatePin({
													pinnedID    : id,
													channelType : channel_type,
													type        : 'pin',
												});
												e.stopPropagation();
											}}
										/>
									)}
							</div>
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
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: last_message || '' }}
					/>
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
						width="12px"
					/>
				</div>
			)}
		</div>
	);
}
export default MessageCardData;
