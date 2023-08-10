import { IcMPdf, IcMDelete } from '@cogoport/icons-react';
import { useState, useRef } from 'react';

import getFileAttributes from '../../../utils/getFileAttributes';
import CustomFileUploader from '../../CustomFileUploader';

import styles from './styles.module.css';

function TemplateDocument({
	fileValue = '',
	fileName = '',
	setFileValue = () => {},
}) {
	const uploaderRef = useRef(null);

	const [uploading, setUploading] = useState(false);

	const { fileIcon } = getFileAttributes({ fileName, finalUrl: fileValue });

	return (
		<div className={styles.container}>
			<CustomFileUploader
				disabled={uploading}
				handleProgress={setUploading}
				className="file_uploader"
				accept=".png, .pdf, .doc, .docx, .csv, .svg, .jpg, .jpeg"
				uploadIcon={(
					<div className={styles.upload_content}>
						<IcMPdf />
						<span>Attach Document</span>
					</div>
				)}
				value={fileValue}
				onChange={setFileValue}
				showProgress={false}
				ref={uploaderRef}
				channel="whatsapp_sid"
			/>

			{(fileValue && !uploading) && (
				<div className={styles.files_view}>
					<div className={styles.file_icon_container}>
						{fileIcon}
					</div>
					<div
						role="presentation"
						className={styles.file_name_container}
						onClick={() => {
							window.open(fileValue, '_blank', 'noreferrer');
						}}
					>
						{fileName}
					</div>
					<div className={styles.delete_icon_container}>
						<IcMDelete
							className={styles.delete_icon}
							onClick={() => setFileValue('')}
						/>
					</div>
				</div>
			)}
			{uploading && (
				<div className={styles.uploading}>uploading.....</div>
			)}
		</div>
	);
}

export default TemplateDocument;
