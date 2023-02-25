import { IcMUserAllocations } from '@cogoport/icons-react';

import { URL_MATCH_REGEX } from '../../constants';
import MESSAGE_MAPPING from '../../constants/MESSAGE_MAPPING';

import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

function MessageBody({ response = {}, message_type = 'text' }) {
	const { message = '', media_url = '' } = response;
	const URLRegex = new RegExp(URL_MATCH_REGEX);
	const fileExtension = media_url.split('.').pop();
	const renderText = (txt = '') => (
		(txt.split(' ') || [])
			.map((part) => (URLRegex.test(part) ? (
				`<a href=${part} target="_blank">${part} </a>`
			) : `${part} `))
	).join(' ');

	function ShowMessage() {
		return (
			<div dangerouslySetInnerHTML={{ __html: renderText(message) }} />
		);
	}

	function LoadMedia(type) {
		switch (type) {
			case 'image':
				return (
					<img
						src={media_url}
						alt={message_type}
						className={styles.object_styles}
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
