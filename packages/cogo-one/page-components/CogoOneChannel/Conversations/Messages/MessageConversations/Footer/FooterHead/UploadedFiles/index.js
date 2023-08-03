import { IcMDelete } from '@cogoport/icons-react';

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

function UploadedFiles({ uploadedFiles = [], id = '', setDraftUploadedFiles = () => {}, uploaderRef = {} }) {
	return uploadedFiles?.map((eachFileData) => {
		const { file, icon = null, fileUrl = '' } = eachFileData || {};
		return (
			<div
				role="presentation"
				className={styles.files_container}
				key={fileUrl}
				onClick={() => {
					window.open(fileUrl, '_blank', 'noreferrer');
				}}
			>
				{icon || null}
				<div className={styles.file_name}>{file}</div>
				<IcMDelete
					className={styles.delete_icon}
					onClick={(e) => {
						e.stopPropagation();

						setDraftUploadedFiles((prev) => ({
							...prev,
							[id]: deletefile({
								fileUrl,
								uploadedFiles: prev?.[id],
								uploaderRef,
							}),
						}));
					}}
				/>
			</div>
		);
	});
}
export default UploadedFiles;
