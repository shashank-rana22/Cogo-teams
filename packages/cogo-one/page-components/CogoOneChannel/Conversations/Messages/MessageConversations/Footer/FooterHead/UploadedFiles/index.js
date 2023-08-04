import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function deletefile({
	uploadedFiles,
	fileUrl,
	uploaderRef = {},
}) {
	if (typeof uploadedFiles === 'string') {
		uploaderRef.current?.externalHandleDelete(null);
		return null;
	}

	const filteredFiles = uploadedFiles.filter((eachFile) => eachFile !== fileUrl);

	uploaderRef.current?.externalHandleDelete(filteredFiles);

	return filteredFiles;
}

function UploadedFiles({
	id = '',
	setDraftUploadedFiles = () => {},
	uploaderRef = {},
	eachFileData = {},
}) {
	const handleDelete = ({ event, fileUrl }) => {
		event.stopPropagation();

		setDraftUploadedFiles(
			(prev) => ({
				...prev,
				[id]: deletefile({
					fileUrl,
					uploadedFiles: prev?.[id],
					uploaderRef,
				}),
			}),
		);
	};

	const {
		fileName,
		fileIcon = null,
		fileUrl = '',
		fileExtension = '',
	} = eachFileData || {};

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
				onClick={(event) => handleDelete({ event, fileUrl })}
			/>
		</div>

	);
}

export default UploadedFiles;
