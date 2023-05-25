import { cl } from '@cogoport/components';
import Image from 'next/image';

import { DOCUMENT_ICON, MESSAGE_MAPPING } from '../../../../../../../../constants';

import styles from './styles.module.css';

function ShowFile({ messageType = '', mediaUrl = '' }) {
	const urlArray = decodeURI(mediaUrl)?.split('/');
	const fileNameFromUrl = urlArray[(urlArray?.length || 0) - 1] || '';
	const [fileName = '', extension = ''] = fileNameFromUrl.split('.') || [];

	switch (messageType) {
		case 'image':
			return (
				<img
					src={mediaUrl}
					alt={messageType}
					className={styles.object_styles}
				/>
			);
		case 'audio':
			return (
				<audio controls className={styles.object_styles}>
					<source src={mediaUrl} type={`audio/${extension}`} />
					<track src="" kind="captions" />
				</audio>
			);
		case 'video':
			return (
				<video controls className={styles.object_styles}>
					<source src={mediaUrl} type={`video/${extension}`} />
					<track src="" kind="captions" />
				</video>
			);
		case 'document':
			return (
				<>
					<Image alt="logo" src={DOCUMENT_ICON} width={15} height={15} />
					<div className={styles.file_name}>
						{`${fileName}${
							extension ? `.${extension}` : ''
						}`}

					</div>
				</>
			);
		default:
			return null;
	}
}

function CustomFileDiv({ mediaUrl = '', messageType = '' }) {
	const isDocument = !MESSAGE_MAPPING.media.includes(messageType);

	if (!messageType || !mediaUrl) {
		return null;
	}

	return (
		<div
			className={cl`${isDocument ? styles.container : styles.clickable_object}`}
			role="presentation"
			onClick={() => window.open(mediaUrl, '_blank')}
		>
			<ShowFile messageType={messageType} mediaUrl={mediaUrl} />
		</div>
	);
}

export default CustomFileDiv;
