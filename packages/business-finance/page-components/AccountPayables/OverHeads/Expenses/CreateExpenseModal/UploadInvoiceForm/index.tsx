import React from 'react';

import Filter from '../../../../../commons/Filters';
import { recurringUploadInvoice } from '../../../controls/recurringUploadInvoice';

import styles from './styles.module.css';

interface Props {
	filters:object,
	setFilters:(p:object) => void,
}

function UploadInvoiceForm({ filters, setFilters }:Props) {
	return (
		<div className={styles.container}>
			<div className={styles.uploadInvoice}>
				<Filter
					controls={recurringUploadInvoice(filters, setFilters)}
					filters={filters}
					setFilters={setFilters}
				/>
			</div>
			<div className={`${styles.uploadInvoice} ${styles.lineItem}`}>
				fieldarray
			</div>
		</div>

	);
}

export default UploadInvoiceForm;
