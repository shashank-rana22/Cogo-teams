import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import RenderTooltip from '../../../../commons/RenderTooltip';

import styles from './styles.module.css';

function DownloadUploadHistoryFile({ itemData }) {
	return (
		<div className={styles.container}>
			<RenderTooltip content={itemData?.fileName} maxLength={60} />
			<div className={styles.button}>
				<IcMDownload
					onClick={() => window.open(itemData?.fileUrl)}
					id="download"
					style={{ width: 20, height: 20, fill: '#F68B21' }}
				/>
			</div>
		</div>
	);
}

export default DownloadUploadHistoryFile;
