import { startCase } from '@cogoport/utils';

import { URL_MATCH_REGEX } from '../../../../../../../constants';
import getFileAttributes from '../../../../../../../utils/getFileAttributes';

import CustomFileDiv from './CustomFileDiv';
import styles from './styles.module.css';

const UrlRegex = new RegExp(URL_MATCH_REGEX);

function ShowMessage({ message = '', restData = {} }) {
	let newMessage = message.replace('<', '&lt;');

	Object.keys(restData || {}).forEach((itm) => {
		newMessage += `<br/>${startCase(itm)}: ${restData[itm]}`;
	});

	const renderText = (txt = '') => (txt.split(' ') || [])
		.map((part) => (UrlRegex.test(part)
			? `<a href=${part} target="_blank">${part} </a>`
			: `${part} `))
		.join(' ');

	return <div dangerouslySetInnerHTML={{ __html: renderText(newMessage) }} />;
}

function MessageBody({ message = '', media_urls = [], restData }) {
	return (
		<>
			<div>
				{(media_urls || []).map((media_url) => {
					const urlArray = decodeURI(media_url)?.split('/');
					const fileName = urlArray[(urlArray?.length || 0) - 1] || '';
					const { fileType } = getFileAttributes({ fileName });

					return <CustomFileDiv key={media_url} mediaUrl={media_url} messageType={fileType} />;
				})}
			</div>
			<div className={styles.message_section}>
				<ShowMessage message={message} restData={restData} />
			</div>
		</>
	);
}

export default MessageBody;
