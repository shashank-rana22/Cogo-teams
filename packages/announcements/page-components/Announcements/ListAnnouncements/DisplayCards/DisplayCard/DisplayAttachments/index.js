import { Placeholder } from '@cogoport/components';
import React from 'react';

import DisplayAttachment from './DisplayAttachment';
import styles from './styles.module.css';
import useUpdateAnnouncement from './useUpdateAttachment';

function DisplayAttachments({ data = [], index, refetch = () => {}, announcement_id = '', isValid }) {
	const image = data?.announcement_attachments?.image || '';
	const pdf = data?.announcement_attachments?.pdf || '';
	const video = data?.announcement_attachments?.video || '';

	const {
		deleteAttachment,
		editAttachment,
		addAttachment,
		openDocument,
	} = useUpdateAnnouncement({ refetch, announcement_id });

	const displayBoxes = (item) => (
		item ? (
			<div className={styles.contain}>
				<DisplayAttachment
					data={image}
					announcement_id={data?.id}
					index={index}
					isValid={isValid}
					deleteAttachment={deleteAttachment}
					editAttachment={editAttachment}
					addAttachment={addAttachment}
					openDocument={openDocument}
					name="image"
				/>
				<DisplayAttachment
					data={pdf}
					announcement_id={data?.id}
					index={index}
					isValid={isValid}
					deleteAttachment={deleteAttachment}
					editAttachment={editAttachment}
					addAttachment={addAttachment}
					openDocument={openDocument}
					name="pdf"
				/>
				<DisplayAttachment
					data={video}
					announcement_id={data?.id}
					index={index}
					isValid={isValid}
					deleteAttachment={deleteAttachment}
					editAttachment={editAttachment}
					addAttachment={addAttachment}
					openDocument={openDocument}
					name="video"
				/>
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
