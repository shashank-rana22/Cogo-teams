import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import getFileAttributes from '../../../../../../utils/getFileAttributes';
import getUrlFormatedText from '../../../../../../utils/getUrlFormatedText';

import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

const URL_ARRAY_LAST_ELEMENT = 1;

function ShowMessage({ restData = {} }) {
	let newMessage = '';

	const AdditionalData = restData?.AdditionalFields || {};

	Object.keys(AdditionalData || {}).forEach((itm) => {
		newMessage += `<br/><b>${startCase(itm)}</b>: ${AdditionalData[itm]}`;
	});

	return (
		<div dangerouslySetInnerHTML={{ __html: getUrlFormatedText(newMessage) }} />
	);
}

function MessageBody({ message = '', mediaUrls = [], restData = {} }) {
	return (
		<>
			<div>
				{(mediaUrls || []).map((mediaUrl = '') => {
					const urlArray = decodeURI(mediaUrl)?.split('/');
					const fileName = urlArray[(urlArray?.length
						|| GLOBAL_CONSTANTS.zeroth_index) - URL_ARRAY_LAST_ELEMENT] || '';
					const { fileType } = getFileAttributes({ fileName });

					return (
						<CustomFileDiv
							mediaUrl={mediaUrl}
							messageType={fileType}
							key={mediaUrl}
						/>
					);
				})}
			</div>
			<div className={styles.message_section}>
				{message && <div>{message}</div>}
				<ShowMessage message={message} restData={restData} />
			</div>
		</>
	);
}

export default MessageBody;
