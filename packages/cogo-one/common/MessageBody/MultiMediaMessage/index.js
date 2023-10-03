import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import whatsappTextFormatting from '../../../helpers/whatsappTextFormatting';
import CustomFileDiv from '../CustomFileDiv';

import styles from './styles.module.css';

const { renderURLText, renderBoldText } = whatsappTextFormatting();

const DEFAULT_URL_LENGTH = 0;

const NEGATIVE_NUMBER = 1;

const EXTENTION_ORDER = {
	jpg: 1, png: 2, gif: 3, jpeg: 4, bmp: 5, svg: 6, webp: 7, xlsx: 8, docx: 9,
};

const getExtension = (url) => url.split('.').pop();

function sortByFileExtension(a, b) {
	const extA = getExtension(a).toLowerCase();
	const extB = getExtension(b).toLowerCase();

	return EXTENTION_ORDER[extA] - EXTENTION_ORDER[extB];
}

const renderText = (txt = '') => {
	let newTxt = renderURLText(txt);
	newTxt = renderBoldText(newTxt);
	return newTxt;
};

function VideoMessage({ item = '' }) {
	return (
		<video
			src={item}
			width={200}
			height={200}
			alt="video"
			style={{ margin: '4px 4px 8px 4px', boxShadow: '0 0 4px 0 #627fac40' }}
		/>
	);
}

function ImageDocument({ item = '' }) {
	return (
		<img
			src={item}
			width={200}
			height={200}
			alt="attachment"
			style={{ margin: '4px 4px 8px 4px', boxShadow: '0 0 4px 0 #627fac40' }}
		/>
	);
}

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
		<div
			className={styles.formal_message}
			dangerouslySetInnerHTML={{
				__html: renderText(
					message?.replace(GLOBAL_CONSTANTS.regex_patterns.occurrences_of_line_breaks, '<br>'),
				),
			}}
		/>
	);
}

const EXTENSION_WISE_MAPPINGS = {
	png  : ImageDocument,
	jpg  : ImageDocument,
	gif  : ImageDocument,
	jpeg : ImageDocument,
	bmp  : ImageDocument,
	svg  : ImageDocument,
	webp : ImageDocument,
	pdf  : CustomFileDiv,
	xlsx : CustomFileDiv,
	mp4  : VideoMessage,
	mkv  : VideoMessage,
	mov  : VideoMessage,
	webm : VideoMessage,
	avi  : VideoMessage,
};

function MultiMediaMessage({
	message = '',
	response = {},
	messageType = '',
}) {
	const { media_url = [] } = response || {};

	const sortedMediaUrls = (media_url || []).sort(sortByFileExtension);

	return (
		<>
			{(sortedMediaUrls || []).map((item) => {
				const urlArray = decodeURI(item)?.split('/');
				const fileNameFromUrl = urlArray[(urlArray?.length || DEFAULT_URL_LENGTH) - NEGATIVE_NUMBER] || '';
				const fileArray = fileNameFromUrl.split('.') || [];
				const extension = fileArray.pop();

				const Comp = EXTENSION_WISE_MAPPINGS[extension] || EXTENSION_WISE_MAPPINGS.pdf;

				if (!Comp) {
					return null;
				}
				return <Comp item={item} key={item} mediaUrl={item} />;
			})}
			<ShowMessage messageType={messageType} message={message} />
		</>
	);
}

export default MultiMediaMessage;
