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
				<div>
					<object
						type="video/mp4"
						data="https://www.youtube.com/watch?v=Sp9ZfSvpf7A"
						width="1280"
						height="720"
					>
						alt
					</object>
				</div>
			</div>
			<div className={`${styles.uploadInvoice} ${styles.lineItem}`}>
				fieldarray
			</div>
		</div>

	);
}

export default UploadInvoiceForm;
