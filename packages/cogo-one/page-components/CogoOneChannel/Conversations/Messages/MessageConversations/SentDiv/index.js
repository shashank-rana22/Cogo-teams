/* eslint-disable max-len */
import { cl } from '@cogoport/components';
import { format, isEmpty } from '@cogoport/utils';

import CustomFileDiv from '../CustomFileDiv';

import styles from './styles.module.css';

function SentDiv({
	eachMessage = {},
}) {
	const LOGO_URL = {
		admin : 'https://cogoport-testing.sgp1.digitaloceanspaces.com/10118f395f681ff8ce69dc191c28d45d/XMLID_816_.svg',
		bot   : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/platformnotification.svg',
	};
	const MESSAGE_MAPPING = {
		text    : ['text', 'template', 'interactive'],
		media   : ['image', 'video'],
		contact : ['contact'],
	};
	const {
		message_type = 'text',
		created_at = '',
		response: { message = '', btns = [], media_url = '' } = {},
		send_by = 'kam',
		session_type = 'bot',

	} = eachMessage;

	const date = format(new Date(created_at), 'dd MMM YYYY, HH:mm');
	const renderMessage = () => {
		if (MESSAGE_MAPPING.text.includes(message_type)) {
			return <div dangerouslySetInnerHTML={{ __html: message }} />;
		}

		if (MESSAGE_MAPPING.media.includes(message_type)) {
			return <obj data={media_url} />;
		}
		if (message_type === 'document') {
			return <CustomFileDiv pdfURL={media_url} />;
		}
		return <div dangerouslySetInnerHTML={{ __html: message }} />;
	};
	return (
		<div className={styles.container}>
			<div className={styles.message_div}>
				<div className={styles.name}>
					Replied by
					{' '}
					{session_type === 'admin' ? send_by : 'bot'}
					,
					<span className={styles.time_stamp}>{date}</span>
				</div>
				<div className={styles.styled_div}>
					<div className={cl`${styles.receive_message_container} ${session_type === 'admin' ? styles.admin_message_container : ''}`}>
						{renderMessage()}
					</div>

					{!isEmpty(btns)
					&& (
						<div className={styles.btns_container}>
							{(btns || []).map((eachbtn) => <div className={styles.btn}>{eachbtn}</div>)}
						</div>
					) }

				</div>
			</div>
			<img
				src={LOGO_URL[session_type || 'bot']}
				alt="KAM"
			/>
		</div>
	);
}
export default SentDiv;
