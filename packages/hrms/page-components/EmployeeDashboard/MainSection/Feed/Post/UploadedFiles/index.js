import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';
import { deleteFile } from './uploadFileHelpers';

function IMAGEVIDEO({ fileUrl = '', extension = '' }) {
	if (extension === 'video') {
		return (
			<video controls width="250" height="150">
				<source src={fileUrl} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		);
	}

	return (
		<img src={fileUrl} alt="img" width={200} height={150} />
	);
}

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
		fileType,
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
			<IMAGEVIDEO fileUrl={fileUrl} extension={fileType} />
			<div style={{ display: 'flex', margin: '4px 0' }}>
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
		</div>
	);
}

export default UploadedFiles;
