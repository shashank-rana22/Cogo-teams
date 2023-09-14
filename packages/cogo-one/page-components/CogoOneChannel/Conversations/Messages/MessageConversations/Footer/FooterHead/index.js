import { cl } from '@cogoport/components';

import styles from './styles.module.css';
import UploadedFiles from './UploadedFiles';

function FooterHead({
	uploading = {},
	roomId = '',
	fileMetaData = [],
	setDraftUploadedFiles = () => {},
	hasUploadedFiles = false,
	uploaderRef = {},
}) {
	return (
		<div
			className={cl`${styles.nofile_container}
				${((hasUploadedFiles) || uploading?.[roomId]) ? styles.upload_file_container : ''}`}
		>
			{(hasUploadedFiles) && !uploading?.[roomId] ? (
				fileMetaData?.map(
					(eachFileData) => (
						<UploadedFiles
							roomId={roomId}
							key={eachFileData?.fileUrl}
							setDraftUploadedFiles={setDraftUploadedFiles}
							uploaderRef={uploaderRef}
							eachFileData={eachFileData}
						/>
					),
				)
			) : null}

			{uploading?.[roomId] ? (
				<div className={styles.uploading}>
					uploading.....
				</div>
			) : null}
		</div>
	);
}

export default FooterHead;
