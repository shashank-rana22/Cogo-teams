import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUserAllocations, IcMEyeclose } from '@cogoport/icons-react';

import whatsappTextFormatting from '../../helpers/whatsappTextFormatting';

import CustomFileDiv from './CustomFileDiv';
import Order from './Order';
import styles from './styles.module.css';
import UserActivityMessages from './UserActivityMessages';

const { renderURLText, renderBoldText } = whatsappTextFormatting();

const renderText = (txt = '') => {
	let newTxt = renderURLText(txt);
	newTxt = renderBoldText(newTxt);
	return newTxt;
};

function ShowMessage({ messageType = '', message = '' }) {
	if (messageType === 'template') {
		return (
			<div dangerouslySetInnerHTML={{
				__html: message.replace(GLOBAL_CONSTANTS.regex_patterns.occurrences_of_line_breaks, '<br>'),
			}}
			/>
		);
	}

	return (
		<div dangerouslySetInnerHTML={{
			__html: renderText(
				message?.replace(GLOBAL_CONSTANTS.regex_patterns.occurrences_of_line_breaks, '<br>'),
			),
		}}
		/>
	);
}

function CustomImage({ mediaUrl = '', hasProfanity = false }) {
	// dynamic host for image urls
	return (
		<img
			src={mediaUrl}
			alt=""
			className={cl`${styles.object_styles}
                     ${hasProfanity ? styles.profanity_blur : ''}`}
		/>
	);
}

function CustomAudio({ mediaUrl = '', fileExtension = '' }) {
	return (
		<audio
			controls
			className={styles.object_styles}
		>
			<source src={mediaUrl} type={`audio/${fileExtension}`} />
		</audio>
	);
}

function CustomVideo({ mediaUrl = '', fileExtension = '' }) {
	return (
		<video
			controls
			className={styles.object_styles}
		>
			<source src={mediaUrl} type={`video/${fileExtension}`} />
		</video>
	);
}

const MEDIA_COMPONENT_MAPPING = {
	image : CustomImage,
	audio : CustomAudio,
	video : CustomVideo,
};

function MediaComponent({
	hasProfanity = false,
	mediaUrl = '',
	fileExtension = '',
	messageType = '',
	message = '',
}) {
	const Component = MEDIA_COMPONENT_MAPPING[messageType] || null;

	if (!Component) {
		return null;
	}

	return (
		<>
			<div
				className={cl`${styles.clickable_object} ${hasProfanity ? styles.reduce_blur : ''}`}
				role="presentation"
				onClick={() => {
					window.open(
						mediaUrl,
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
				<Component
					mediaUrl={mediaUrl}
					fileExtension={fileExtension}
				/>
			</div>

			<ShowMessage messageType={messageType} message={message} />
		</>
	);
}

function CustomDocument({ mediaUrl = '', messageType = '', message = '' }) {
	return (
		<>
			<CustomFileDiv mediaUrl={mediaUrl} />
			<ShowMessage messageType={messageType} message={message} />
		</>
	);
}

function CustomContacts({ message = '' }) {
	const { name: { formatted_name = '' } = {}, phones = [] } = JSON.parse(message || '') || {};

	return (
		<div className={styles.contact_card}>
			<IcMUserAllocations
				className={styles.user_allocation}
			/>

			<div>
				<div className={styles.contact_name}>
					{formatted_name}
				</div>

				{(phones || []).map(
					({ phone = '' }) => (
						<div
							key={phone}
							className={styles.mobile_no}
						>
							{phone}
						</div>
					),
				)}
			</div>
		</div>
	);
}

const EXTENSION_WISE_MAPPINGS = {
	png  : CustomImage,
	jpg  : CustomImage,
	gif  : CustomImage,
	jpeg : CustomImage,
	bmp  : CustomImage,
	svg  : CustomImage,
	webp : CustomImage,
	pdf  : CustomFileDiv,
	xlsx : CustomFileDiv,
	mp4  : CustomVideo,
	mkv  : CustomVideo,
	mov  : CustomVideo,
	webm : CustomVideo,
	avi  : CustomVideo,
};

const DEFAULT_URL_LENGTH = 0;

const NEGATIVE_NUMBER = 1;

function MultiMediaMessage({
	message = '',
	response = {},
	messageType = '',
}) {
	const { media_url = [] } = response || {};

	const formattedMediaUrl = typeof media_url === 'string' ? [media_url] : media_url || [];

	return (
		<>
			{(formattedMediaUrl || []).map((item) => {
				const urlArray = decodeURI(item)?.split('/');
				const fileNameFromUrl = urlArray[(urlArray?.length || DEFAULT_URL_LENGTH) - NEGATIVE_NUMBER] || '';
				const fileArray = fileNameFromUrl.split('.') || [];
				const extension = fileArray.pop();

				const Comp = EXTENSION_WISE_MAPPINGS[extension] || EXTENSION_WISE_MAPPINGS.pdf;

				if (!Comp) {
					return null;
				}
				return (
					<div
						role="presentation"
						key={item}
						onClick={(e) => {
							window.open(
								item,
								'_blank',
								'noreferrer',
							);
							e.stopPropagation();
						}}
						style={{ cursor: 'pointer' }}
					>
						<Comp
							item={item}
							mediaUrl={item}
						/>
					</div>
				);
			})}
			<ShowMessage messageType={messageType} message={message} />
		</>
	);
}

export const MESSAGE_TYPE_WISE_MAPPING = {
	text        : ShowMessage,
	template    : ShowMessage,
	interactive : ShowMessage,
	image       : MediaComponent,
	audio       : MediaComponent,
	video       : MediaComponent,
	contacts    : CustomContacts,
	document    : CustomDocument,
	file        : CustomDocument,
	event       : UserActivityMessages,
	order       : Order,
	default     : ShowMessage,
	media       : MultiMediaMessage,
};
