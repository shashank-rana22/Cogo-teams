import { cl } from '@cogoport/components';
import { IcMDownload } from '@cogoport/icons-react';

import getDownloadFiles from '../../../../../utils/getDownloadFiles';
import { getFileAttributes } from '../../../../../utils/getFileAttributes';

import styles from './styles.module.css';

const DOT_AFTER_SLASH = 1;

function ShipmentLabel({ documentUrl = '', isAlreadySent = false }) {
	const decodedUrl = decodeURI(documentUrl);
	const fileName = decodedUrl?.substring(decodedUrl.lastIndexOf('/') + DOT_AFTER_SLASH);

	const { fileIcon } = getFileAttributes({ fileName, finalUrl: decodedUrl });

	return (
		<div className={styles.each_file}>
			{fileIcon}
			<div className={cl`${styles.file_name} 
			${isAlreadySent ? styles.already_sent_file_name : ''}`}
			>
				{fileName}
			</div>
			<IcMDownload
				className={styles.download_icon}
				onClick={(e) => {
					e.preventDefault();
					getDownloadFiles({ imgUrl: documentUrl });
				}}
			/>
		</div>
	);
}

export const getCheckboxOptions = ({ documents = [], alreadySentData = [] }) => documents?.map((eachDocument) => {
	const isAlreadySent = alreadySentData?.includes(eachDocument?.id);

	return {
		label: <ShipmentLabel
			documentUrl={eachDocument?.document_url}
			isAlreadySent={isAlreadySent}
		/>,
		value : eachDocument?.id,
		style : isAlreadySent ? { border: '1px solid #C26D1A' } : {},
	};
});
