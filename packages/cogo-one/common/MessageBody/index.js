import { cl } from '@cogoport/components';
import { IcMUserAllocations, IcMEyeclose } from '@cogoport/icons-react';

import MESSAGE_MAPPING from '../../constants/MESSAGE_MAPPING';
import whatsappTextFormatting from '../../helpers/whatsappTextFormatting';

import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

function MessageBody({ response = {}, message_type = 'text' }) {
	const { message = '', media_url = '', profanity_check = '' } = response;
	const hasProfanity = profanity_check === 'nudity';
	const fileExtension = media_url?.split('.').pop();
	const { renderURLText, renderBoldText } = whatsappTextFormatting();

	const renderText = (txt = '') => {
		let newTxt = renderURLText(txt);
		newTxt = renderBoldText(newTxt);
		return newTxt;
	};

	function ShowMessage() {
		return message_type === 'template'
			? <div dangerouslySetInnerHTML={{ __html: message.replace(/(\r\n|\r|\n)/g, '<br>') }} />
			: <div dangerouslySetInnerHTML={{ __html: renderText(message.replace(/(\r\n|\r|\n)/g, '<br>')) }} />;
	}

	function LoadMedia(type) {
		switch (type) {
			case 'image':
				return (
					<img
						src={media_url}
						alt={message_type}
						className={cl`${styles.object_styles}
						 ${hasProfanity ? styles.profanity_blur : ''}`}
					/>
				);
			case 'audio':
				return (
					<audio
						controls
						className={styles.object_styles}
					>
						<source src={media_url} type={`audio/${fileExtension}`} />
					</audio>
				);
			case 'video':
				return (
					<video
						controls
						className={styles.object_styles}
					>
						<source src={media_url} type={`video/${fileExtension}`} />
					</video>
				);
			default:
				return null;
		}
	}

	if (MESSAGE_MAPPING.media.includes(message_type)) {
		return (
			<>
				<div
					className={cl`${styles.clickable_object} ${hasProfanity ? styles.reduce_blur : ''}`}
					role="presentation"
					onClick={() => {
						window.open(
							media_url,
							'_blank',
							'noreferrer',
						);
					}}
				>
					{hasProfanity && (
						<div className={styles.sensitive_content}>
							<IcMEyeclose fill="#828282" />
							<div className={styles.sensitive_text}>Sensitive Content</div>
						</div>
					)}
					{LoadMedia(message_type)}
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
		const { name: { formatted_name = '' } = {}, phones = [] } = JSON.parse(message || '') || {};

		return (
			<div className={styles.contact_card}>
				<IcMUserAllocations height="30px" width="30px" fill="#7278AD" className={styles.user_allocation} />
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
