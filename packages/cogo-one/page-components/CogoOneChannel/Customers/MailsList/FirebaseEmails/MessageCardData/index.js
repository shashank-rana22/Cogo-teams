import { cl, Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcCPin, IcMPin } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { isEmpty, startCase } from '@cogoport/utils';

// import getUserNameFromEmail from '../../../../../../helpers/getUserNameFromEmail';
import updatePin from '../../../../../../helpers/updatePin';
import getActiveCardDetails from '../../../../../../utils/getActiveCardDetails';

import styles from './styles.module.css';

const LAST_UPDATED_PIN_TIME = 0;

function MessageCardData({
	item = {},
	activeTab = {},
	userId = '',
	// setActiveMessage = () => {},
	firestore = {},
	activeFolder = '',
}) {
	const formattedData = getActiveCardDetails(item) || {};

	const {
		search_user_name = '',
		chat_tags = [],
		id = '',
		channel_type: channelType = '',
		new_message_sent_at = '',
		pinnedTime = {},
		last_message = '',
		last_message_document = null,
		new_message_count = 0,
		last_inbound_document = null,
		last_outbound_document = null,
		// user_name = '',
	} = formattedData || {};

	const reqLastDocumentMapping = {
		sent_items : last_outbound_document,
		inbox      : last_inbound_document,
	};

	const lastMessageVar = isEmpty(reqLastDocumentMapping[activeFolder])
		? last_message_document
		: reqLastDocumentMapping[activeFolder];

	const { response = {} } = lastMessageVar || {};

	const {
		subject = '',
		body = '',
		body_preview: bodyPreview = '',
	} = response || {};

	const isImportant = chat_tags?.includes('important') || false;

	const checkActiveCard = activeTab?.data?.id === id;

	const updatePinnedChats = (e, type) => {
		e.stopPropagation();

		updatePin({
			pinnedID: id,
			channelType,
			type,
			firestore,
			userId,
		});
	};
	// const { shortName } = getUserNameFromEmail({ query: search_user_name || user_name || 'User' });

	return (
		<div
			role="presentation"
			onClick={() => {
				// if (source === 'flash_messages') {
				// 	return;
				// }

				// setActiveMessage(item);
			}}
			className={cl`
						${styles.card_container} 
						${checkActiveCard ? styles.active_card : ''}
						${new_message_count ? styles.border_left : styles.no_border_left}
					`}
		>
			<div className={styles.header_card}>
				<Avatar
					src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
					alt="user-img"
					// personName={shortName}
					disabled={false}
					size="30px"
				/>

				<div className={styles.header_title}>
					<div className={styles.user_name_title}>
						{startCase(search_user_name) || 'User'}
					</div>

					<div className={styles.header_time}>
						{formatDate({
							date       : new_message_sent_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : ', ',
						})}
					</div>
				</div>
			</div>

			<div className={styles.subject_container}>
				{subject || last_message}
			</div>

			<div
				className={styles.message_content}
				dangerouslySetInnerHTML={{ __html: bodyPreview || body }}
			/>

			{isImportant ? (
				<div className={styles.important_icon}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.eclamation_svg}
						alt="important"
						width="10"
						height="10"
					/>
				</div>
			) : null}

			<div className={styles.pinned_div}>
				{pinnedTime[userId] > LAST_UPDATED_PIN_TIME
					? <IcCPin onClick={(e) => updatePinnedChats(e, 'unpin')} />
					: <IcMPin onClick={(e) => updatePinnedChats(e, 'pin')} />}
			</div>
		</div>
	);
}

export default MessageCardData;
