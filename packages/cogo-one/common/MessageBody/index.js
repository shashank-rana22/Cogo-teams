import { IcMUserAllocations } from '@cogoport/icons-react';

import MESSAGE_MAPPING from '../../constants/MESSAGE_MAPPING';

import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

function MessageBody({ response = {}, message_type = 'text' }) {
	const { message = '', media_url = '' } = response;

	function ShowMessage() {
		return <div dangerouslySetInnerHTML={{ __html: message }} />;
	}

	if (MESSAGE_MAPPING.media.includes(message_type)) {
		return (
			<>
				<div
					className={styles.clickable_object}
					role="presentation"
					onClick={() => {
						// eslint-disable-next-line no-undef
						window.open(
							media_url,
							'_blank',
							'noreferrer',
						);
					}}
				>
					<object
						data={media_url}
						aria-label={message_type}
						className={styles.object_styles}
					/>
				</div>
				<ShowMessage />
			</>
		);
	}
	if (message_type === 'document') {
		return (
			<>
				<CustomFileDiv mediaUrl={media_url} />
				<ShowMessage />
			</>
		);
	}
	if (message_type === 'contacts') {
		const { name:{ formatted_name = '' } = {}, phones = [] } = JSON.parse(message || '') || {};

		return (
			<div className={styles.contact_card}>
				<IcMUserAllocations height="30px" width="30px" fill="#7278AD" style={{ marginRight: '10px' }} />
				<div>
					<div className={styles.contact_name}>
						{formatted_name}
					</div>
					{(phones || []).map(({ phone = '' }) => <div className={styles.mobile_no}>{phone}</div>)}
				</div>
			</div>
		);
	}

	return <ShowMessage />;
}

export default MessageBody;
