import { Placeholder } from '@cogoport/components';
import React from 'react';

import DisplayAttachment from './DisplayAttachment';
import styles from './styles.module.css';
import useUpdateAnnouncement from './useUpdateAttachment';

const displayPlaceHolders = () => (
	<div className={styles.contain}>
		<Placeholder
			height="100px"
			width="31%"
			margin="16px 0px 20px 0px"
		/>
		<Placeholder
			height="100px"
			width="31%"
			margin="16px 0px 20px 0px"
		/>
		<Placeholder
			height="100px"
			width="31%"
			margin="16px 0px 20px 0px"
		/>
	</div>
);
function DisplayAttachments({ data = {}, index, refetch = () => {}, announcement_id = '' }) {
	const image = data?.announcement_attachments?.image || '';
	const pdf = data?.announcement_attachments?.pdf || '';
	const video = data?.announcement_attachments?.video || '';

	const { status = '' } = data;

	const {
		deleteAttachment,
		editAttachment,
		addAttachment,
		loadingUpdateAttachment,
		loadingAddAttachment,
	} = useUpdateAnnouncement({ refetch, announcement_id });

	const displayBoxes = (item) => {
		if (!item) {
			return null;
		}

		return (
			<div className={styles.contain}>
				<DisplayAttachment
					data={image}
					announcement_id={data?.id}
					index={index}
					status={status}
					loadingUpdateAttachment={loadingUpdateAttachment}
					loadingAddAttachment={loadingAddAttachment}
					deleteAttachment={deleteAttachment}
					editAttachment={editAttachment}
					addAttachment={addAttachment}
					name="image"
				/>
				<DisplayAttachment
					data={pdf}
					announcement_id={data?.id}
					index={index}
					status={status}
					loadingUpdateAttachment={loadingUpdateAttachment}
					loadingAddAttachment={loadingAddAttachment}
					deleteAttachment={deleteAttachment}
					editAttachment={editAttachment}
					addAttachment={addAttachment}
					name="pdf"
				/>
				<DisplayAttachment
					data={video}
					announcement_id={data?.id}
					index={index}
					status={status}
					loadingUpdateAttachment={loadingUpdateAttachment}
					loadingAddAttachment={loadingAddAttachment}
					deleteAttachment={deleteAttachment}
					editAttachment={editAttachment}
					addAttachment={addAttachment}
					name="video"
				/>
			</div>
		);
	};

	return (
		data?.announcement_attachments ? displayBoxes(data?.announcement_attachments) : displayPlaceHolders()

	);
}

export default DisplayAttachments;
