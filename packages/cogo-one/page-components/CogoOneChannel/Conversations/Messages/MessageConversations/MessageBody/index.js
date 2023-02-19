import MESSAGE_MAPPING from '../../../../../../constants/MESSAGE_MAPPING';

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

	return <ShowMessage />;
}

export default MessageBody;
