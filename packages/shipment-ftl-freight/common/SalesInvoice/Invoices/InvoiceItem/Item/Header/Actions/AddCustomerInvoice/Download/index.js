import { IcMDownload } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Download({ invoiceUrl = '', invoiceNumber = '' }) {
	return (
		<div className={styles.container}>
			<IcMDownload color="#5936f0" />
            &nbsp;
			<a
				href={invoiceUrl}
				target="_blank"
				rel="noreferrer"
			>
				{`Download customer_ftl_invoice_${invoiceNumber}`}
			</a>
		</div>
	);
}

export default Download;
