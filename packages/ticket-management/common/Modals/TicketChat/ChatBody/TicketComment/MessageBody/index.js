import { startCase } from '@cogoport/utils';

import getFileAttributes from '../../../../../../utils/getFileAttributes';
import getUrlFormatedText from '../../../../../../utils/getUrlFormatedText';

import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

const MIN_LENGTH_CHECK = 0;
const LAST_ELEMENT = 1;

function ShowMessage({ message = '', restData = {} }) {
	let newMessage = message.replace('<', '&lt;');

	Object.keys(restData || {}).forEach((itm) => {
		newMessage += `<br/>${startCase(itm)}: ${restData[itm]}`;
	});

	return (
		<div dangerouslySetInnerHTML={{ __html: getUrlFormatedText(newMessage) }} />
	);
}

function MessageBody({ message = '', mediaUrls = [], restData }) {
	return (
		<>
			<div>
				{(mediaUrls || []).map((mediaUrl = '') => {
					const urlArray = decodeURI(mediaUrl)?.split('/');
					const fileName = urlArray[(urlArray?.length || MIN_LENGTH_CHECK) - LAST_ELEMENT] || '';
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
				<ShowMessage message={message} restData={restData} />
			</div>
		</>
	);
}

export default MessageBody;
