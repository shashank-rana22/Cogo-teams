import { IcMDownload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const COLOR_MAPPING = {
	success    : '#CDF7D4',
	processing : '#FBE39F',
	error      : '#ff726f',
	uploaded   : '#F2F2EA',
};
function DownloadUploadHistoryStatusFile({ itemData }) {
	const { status, statusId } = itemData || [];
	const displayStatus = status === 'processing' ? 'In Process' : status;

	return (
		<div className={styles.container}>
			<div style={{ backgroundColor: COLOR_MAPPING[status] }} className={styles.status}>
				{startCase(displayStatus)}
			</div>
			{itemData?.status === 'error' ? (
				<div className={styles.button}>
					<IcMDownload
						onClick={() => {
							const downloadFile = `${process.env.NEXT_PUBLIC_BUSINESS_FINANCE_BASE_URL}`
                            + `/purchase/download/document?id=${statusId}`;
							window.open(downloadFile);
						}}
						id="download"
						width={20}
						height={20}
						color="#F68B21"
					/>
				</div>
			) : null}
		</div>
	);
}

export default DownloadUploadHistoryStatusFile;
