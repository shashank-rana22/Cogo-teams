import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import usePostDownloadPayrunHistory from '../../hooks/usePostDownloadPayrunHistory';

import styles from './styles.module.css';

function DownloadOverseasInvoice({ itemData = {}, overseasData = '' }) {
	const { downloadPayrunHistory } = usePostDownloadPayrunHistory();
	return (
		<div>
			{overseasData === 'OVERSEAS'
				? (
					<div className={styles.button}>
						<IcMDownload
							onClick={() => downloadPayrunHistory(itemData?.id)}
							height={20}
							width={20}
							color="#F68B21"
						/>
					</div>
				)
				: null}
		</div>
	);
}

export default DownloadOverseasInvoice;
