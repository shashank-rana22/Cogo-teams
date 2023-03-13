import React from 'react';

import DisplayAttachment from './DispalyAttachment';
import styles from './styles.module.css';
import useUpdateAnnouncement from './useUpdateAttachment';

function DisplayAttachments({ data = [], refetch = () => {}, announcement_id = '' }) {
	// console.log('acc::', data);
	const image = data?.announcement_attachments?.image || '';
	const pdf = data?.announcement_attachments?.pdf || '';
	const video = data?.announcement_attachments?.video || '';

	const { deleteAttachment } = useUpdateAnnouncement({ refetch, announcement_id });
	return (
		data?.announcement_attachments
			? (
				<div className={styles.contain}>
					{image ? (
						<DisplayAttachment
							data={image}
							deleteAttachment={deleteAttachment}
							name="Images"
						/>
					) : null}
					{pdf ? (
						<DisplayAttachment
							data={pdf}
							deleteAttachment={deleteAttachment}
							name="Files"
						/>
					) : null}
					{video ? (
						<DisplayAttachment
							data={video}
							deleteAttachment={deleteAttachment}
							name="Video"
						/>
					) : null}
				</div>
			)
			: null

	);
}

export default DisplayAttachments;
