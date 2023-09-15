import { Avatar, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRight } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { startCase } from '@cogoport/utils';

import getActiveCardDetails from '../../../../../../utils/getActiveCardDetails';

import styles from './styles.module.css';

function MailsCardData({ item = {}, setActiveMessage = () => {} }) {
	const formattedData = getActiveCardDetails(item) || {};

	const {
		search_user_name = '',
		chat_tags = [],
		new_message_sent_at = '',
		last_message = '',
		last_message_document: lastMessageDocument = null,
		new_message_count = 0,
	} = formattedData || {};

	const { response = {} } = lastMessageDocument || {};

	const {
		subject = '',
		body = '',
		body_preview: bodyPreview = '',
	} = response || {};

	const isImportant = chat_tags?.includes('important') || false;

	return (
		<div
			className={cl`${styles.mail_card} ${new_message_count ? styles.border_left : ''}`}
			onClick={() => setActiveMessage(item)}
			role="presentation"
		>
			<div className={styles.user_details}>
				<div className={styles.header_card}>
					<Avatar
						src={GLOBAL_CONSTANTS.image_url.user_avatar_image}
						alt="user-img"
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
							width={10}
							height={10}
						/>
					</div>
				) : null}
			</div>
			<IcMArrowRight width={20} height={20} fill="#828282" />
		</div>
	);
}

export default MailsCardData;
