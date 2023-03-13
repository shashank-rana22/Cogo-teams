import { IcMUserAllocations } from '@cogoport/icons-react';

import { URL_MATCH_REGEX, ENDS_WITH_STAR_SPACE, ENDS_WITH_STAR_CHAR } from '../../constants';
import MESSAGE_MAPPING from '../../constants/MESSAGE_MAPPING';

import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

function MessageBody({ response = {}, message_type = 'text' }) {
	const { message = '', media_url = '' } = response;
	const URLRegex = new RegExp(URL_MATCH_REGEX);
	const endWithStarSpace = new RegExp(ENDS_WITH_STAR_SPACE);
	const endWithStarChar = new RegExp(ENDS_WITH_STAR_CHAR);
	const fileExtension = media_url?.split('.').pop();

	const renderURLText = (txt = '') => (
		(txt?.split(' ') || [])
			.map((part) => (URLRegex.test(part) ? (
				`<a href=${part} target="_blank">${part} </a>`
			) : `${part} `))
	).join(' ');

	const replaceStarSpace = (txt = '') => (
		txt.split(endWithStarSpace).map((str, i) => {
			if (i === 0) {
				return ` <strong>${str.substring(0, txt.length - 1)}</strong> `;
			}
			return str;
		}).join('')
	);

	const replaceStarChar = (txt = '') => {
		if (txt.match(/\*/g).length === 1) {
			return txt.split('*').map((str, i) => {
				if (i === 0) {
					return ` <strong>${str.substring(0, txt.length - 1)}</strong>`;
				}
				return str;
			}).join('');
		}
		return txt;
	};

	const addStrongTag = (txt = '') => {
		const boldText = ` ${txt} `.split(' *').map((part, index) => {
			if (index === 0) return part;
			if (endWithStarSpace.test(part)) {
				return replaceStarSpace(part);
			}
			if (endWithStarChar.test(part)) {
				return replaceStarChar(part);
			}
			return ` *${part}`;
		}).join('');
		return boldText.substring(1, boldText.length - 1);
	};

	const renderBoldText = (txt = '') => (
		(txt?.split('<br>') || [])
			.map((part) => (
				addStrongTag(part)
			))
	).join('<br>');

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
