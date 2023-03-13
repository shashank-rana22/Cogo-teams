import { Placeholder } from '@cogoport/components';
import React from 'react';

import DisplayAttachment from './DispalyAttachment';
import styles from './styles.module.css';
import useUpdateAnnouncement from './useUpdateAttachment';

function DisplayAttachments({ data = [], index, refetch = () => {}, announcement_id = '' }) {
	// console.log('acc::', data);
	const image = data?.announcement_attachments?.image || '';
	const pdf = data?.announcement_attachments?.pdf || '';
	const video = data?.announcement_attachments?.video || '';

	const { deleteAttachment, editAttachment } = useUpdateAnnouncement({ refetch, announcement_id });

	console.log('data:::', data);
	const displayBoxes = (item) => (
		item ? (
			<div className={styles.contain}>
				{image ? (
					<DisplayAttachment
						data={image}
						index={index}
						deleteAttachment={deleteAttachment}
						editAttachment={editAttachment}
						name="Images"
					/>
				) : null}
				{pdf ? (
					<DisplayAttachment
						data={pdf}
						index={index}
						deleteAttachment={deleteAttachment}
						editAttachment={editAttachment}
						name="Files"
					/>
				) : null}
				{video ? (
					<DisplayAttachment
						data={video}
						index={index}
						deleteAttachment={deleteAttachment}
						editAttachment={editAttachment}
						name="Video"
					/>
				) : null}
				{image || pdf || video ? null : <div className={styles.nodisplay}>No Attachments to Display...</div>}
			</div>
		)
			: null
	);

	const displayPlaceHolders = () => (
		<div className={styles.contain}>
			<Placeholder
				height="100px"
				width="90%"
				margin="16px 0px 20px 0px"
			/>
			<Placeholder
				height="100px"
				width="90%"
				margin="16px 0px 20px 0px"
			/>
			<Placeholder
				height="100px"
				width="90%"
				margin="16px 0px 20px 0px"
			/>
		</div>
	);

	return (
		data?.announcement_attachments ? displayBoxes(data?.announcement_attachments) : displayPlaceHolders()

	);
}

export default DisplayAttachments;
