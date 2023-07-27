import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import RenderTooltip from '../../../../commons/RenderTooltip';
import { openDownloadLink } from '../../utils';

import styles from './styles.module.css';

function DownloadUploadHistoryFile({ itemData = {} }) {
	const { fileName = '', fileUrl = '' } = itemData;
	return (
		<div className={styles.container}>
			<RenderTooltip content={fileName} maxLength={60} />
			<div className={styles.button}>
				<IcMDownload
					onClick={() => openDownloadLink(fileUrl)}
					height={20}
					width={20}
					color="#F68B21"
				/>
			</div>
		</div>
	);
}

export default DownloadUploadHistoryFile;
