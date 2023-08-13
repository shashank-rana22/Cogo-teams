import { IcMDownload } from '@cogoport/icons-react';

import getDownloadFiles from '../../../../../utils/getDownloadFiles';
import { getFileAttributes } from '../../../../../utils/getFileAttributes';

import styles from './styles.module.css';

const DOT_AFTER_SLASH = 1;
export const getCheckboxOptions = ({ documents = [] }) => documents?.map((eachDocument) => ({
	label : <ShipmentLabel documentUrl={eachDocument?.document_url} />,
	value : eachDocument?.id,
}));

function ShipmentLabel({ documentUrl = '' }) {
	const decodedUrl = decodeURI(documentUrl);
	const fileName = decodedUrl?.substring(decodedUrl.lastIndexOf('/') + DOT_AFTER_SLASH);

	const { fileIcon } = getFileAttributes({ fileName, finalUrl: decodedUrl });

	return (
		<div className={styles.each_file}>
			{fileIcon}
			<div className={styles.file_name}>{fileName}</div>
			<IcMDownload
				className={styles.download_icon}
				onClick={(e) => {
					e.stopPropagation();
					getDownloadFiles({ imgUrl: documentUrl });
				}}
			/>
		</div>
	);
}
