import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import Filter from '../../../../../commons/Filters';
import { nonRecurringUploadInvoice } from '../../../Controls/nonRecurringUploadInvoice';
import { recurringUploadInvoice } from '../../../Controls/recurringUploadInvoice';
import LineItemsForm from '../../LineItemsForm';

import styles from './styles.module.css';

interface FilterInterface {
	uploadedInvoice?:string,
	repeatEvery?:string
}
interface Props {
	filters:FilterInterface,
	setFilters:(p:object) => void,
	createExpenseType:string
}

function UploadInvoiceForm({ filters, setFilters, createExpenseType }:Props) {
	const [isUploadConfirm, setIsUploadConfirm] = useState(false);
	const uploadUrl = filters?.uploadedInvoice;

	let uploadControls;
	if (createExpenseType === 'recurring') {
		uploadControls = recurringUploadInvoice;
	} else {
		uploadControls = nonRecurringUploadInvoice;
	}

	return (
		<div className={styles.container}>
			<div className={styles.uploadInvoice}>
				{!isUploadConfirm ? (
					<>
						<Filter
							controls={uploadControls()}
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
									data={filters?.uploadedInvoice}
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
