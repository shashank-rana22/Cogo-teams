import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import { deleteFile } from './uploadFileHelpers';

function UploadedFiles({
	roomId = '',
	setDraftUploadedFiles = () => {},
	uploaderRef = {},
	eachFileData = {},
}) {
	const {
		fileName,
		fileIcon = null,
		fileUrl = '',
		fileExtension = '',
	} = eachFileData || {};

	const handleDelete = ({ event, fileLink }) => {
		event.stopPropagation();

		setDraftUploadedFiles(
			(prev) => ({
				...prev,
				[roomId]: deleteFile({
					fileLink,
					uploadedFiles: prev?.[roomId],
					uploaderRef,
				}),
			}),
		);
	};

	return (
		<div
			role="presentation"
			className={styles.files_container}
			key={fileUrl}
			onClick={() => {
				window.open(fileUrl, '_blank', 'noreferrer');
			}}
		>
			{fileIcon || null}

			<div className={styles.file_name}>
				{startCase(fileName)}
			</div>

			<div className={styles.extension}>
				{fileExtension ? `.${fileExtension}` : ''}
			</div>

			<IcMDelete
				className={styles.delete_icon}
				onClick={(event) => handleDelete({ event, fileLink: fileUrl })}
			/>
		</div>

	);
}

export default UploadedFiles;
