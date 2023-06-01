import { cl } from '@cogoport/components';

import { MESSAGE_MAPPING } from '../../../../../../../constants';

import fileViewMapping from './fileViewMapping';
import styles from './styles.module.css';

function ShowFile({ messageType = '', mediaUrl = '' }) {
	const urlArray = decodeURI(mediaUrl)?.split('/');
	const fileNameFromUrl = urlArray[(urlArray?.length || 0) - 1] || '';
	const [fileName = '', extension = ''] = fileNameFromUrl.split('.') || [];

	return (
		fileViewMapping({
			mediaUrl,
			messageType,
			extension,
			fileName,
		})?.[messageType] || null
	);
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
