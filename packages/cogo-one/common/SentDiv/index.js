import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import { LOGO_URL } from '../../constants';
import MESSAGE_STATUS_ICON_MAPPING from '../../constants/messageStatusIconMapping';
import MessageBody from '../MessageBody';
import MessageTags from '../MessageTags';

import FooterItems from './FooterItems';
import styles from './styles.module.css';

function SentDiv({
	eachMessage = {},
}) {
	const {
		message_type = 'text',
		created_at = '',
		response,
		send_by = '',
		session_type = 'bot',
		message_status = 'sent',
	} = eachMessage;

	const date = created_at && formatDate({
		date       : new Date(created_at),
		dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'dateTime',
		separator  : ' ',
	});
	const adminStyles = !!(send_by || session_type === 'admin') || false;

	const hasTags = !isEmpty(response?.tags);

	const statusIcon = MESSAGE_STATUS_ICON_MAPPING[message_status] || null;

	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					Replied by
					{' '}
					{send_by || (session_type === 'admin' ? 'kam' : 'bot')}
					,
					<span className={styles.time_stamp}>{date || ''}</span>
				</div>

				<div className={styles.styled_div}>
					<div className={cl`${styles.receive_message_container} 
						${adminStyles ? styles.admin_message_container : ''}
						${hasTags ? styles.tags_styles : ''}`}
					>
						{hasTags && <div className={styles.tags}><MessageTags tags={response.tags || []} /></div>}
						<MessageBody
							response={response}
							message_type={message_type}
						/>
						<div
							className={styles.message_tick_container}
						>
							{statusIcon || null}
						</div>

					</div>
					<FooterItems response={response} />
				</div>
			</div>
			<img
				src={LOGO_URL[adminStyles ? 'admin' : 'bot']}
				alt="KAM"
				className={styles.user_logo}
			/>
		</div>
	);
}
export default SentDiv;
