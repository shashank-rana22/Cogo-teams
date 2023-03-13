import React from 'react';

import DisplayAttachment from './DispalyAttachment';
import styles from './styles.module.css';

function DisplayAttachments({ data = [] }) {
	// console.log('acc::', data);
	const image = data?.announcement_attachments?.image || '';
	const pdf = data?.announcement_attachments?.pdf || '';
	const video = data?.announcement_attachments?.video || '';
	return (
		data?.announcement_attachments
			? (
				<div className={styles.contain}>
					{image ? <DisplayAttachment data={image} name="Images" /> : null}
					{pdf ? <DisplayAttachment data={pdf} name="Files" /> : null}
					{video ? <DisplayAttachment data={video} name="Video" /> : null}
				</div>
			)
			: null

	);
}

export default DisplayAttachments;
