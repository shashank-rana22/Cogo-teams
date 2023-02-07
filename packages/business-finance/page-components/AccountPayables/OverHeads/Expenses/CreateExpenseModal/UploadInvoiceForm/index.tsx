import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import Filter from '../../../../../commons/Filters';
import { recurringUploadInvoice } from '../../../controls/recurringUploadInvoice';
import LineItemsForm from '../../LineItemsForm';

import styles from './styles.module.css';

interface FilterInterface {
	uploadedInvoice?:{ finalUrl?:string }
	repeatEvery?:string
}
interface Props {
	filters:FilterInterface,
	setFilters:(p:object) => void,
}

function UploadInvoiceForm({ filters, setFilters }:Props) {
	const [isUploadConfirm, setIsUploadConfirm] = useState(false);
	const uploadUrl = filters?.uploadedInvoice?.finalUrl;

	return (
		<div className={styles.container}>
			<div className={styles.uploadInvoice}>
				{!isUploadConfirm ? (
					<>
						<Filter
							controls={recurringUploadInvoice()}
							filters={filters}
							setFilters={setFilters}
						/>
						{uploadUrl &&	(
							<div className={styles.confirm}>
								<Button
									onClick={() => setIsUploadConfirm(true)}
								>
									Confirm
								</Button>

							</div>
						)}
					</>
				)
					: (
						<div>
							<div style={{ margin: '64px 20px 0px 20px' }}>
								<object
									data={filters?.uploadedInvoice?.finalUrl}
									type="application/pdf"
									height="850px"
									width="100%"
									aria-label="Document"
								/>
							</div>
						</div>
					)}

			</div>
			<div className={`${styles.uploadInvoice} ${styles.lineItem}`}>
				<LineItemsForm />
			</div>
		</div>

	);
}

export default UploadInvoiceForm;
