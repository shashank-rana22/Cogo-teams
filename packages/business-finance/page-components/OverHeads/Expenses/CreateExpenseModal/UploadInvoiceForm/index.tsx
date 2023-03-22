import { Input, Select, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Filter from '../../../../commons/Filters';
import { nonRecurringUploadInvoice } from '../../../Controls/nonRecurringUploadInvoice';
import { recurringUploadInvoice } from '../../../Controls/recurringUploadInvoice';
import LineItemsForm from '../../LineItemsForm';

import styles from './styles.module.css';

interface FilterInterface {
	uploadedInvoice?:string,
	repeatEvery?:string,
	invoiceCurrency?:string,
}
interface Props {
	formData:FilterInterface,
	setFormData:(p:object) => void,
	createExpenseType:string
}

function UploadInvoiceForm({ formData, setFormData, createExpenseType }:Props) {
	const [isUploadConfirm, setIsUploadConfirm] = useState(false);
	const uploadUrl = formData?.uploadedInvoice;

	let uploadControls;
	if (createExpenseType === 'recurring') {
		uploadControls = recurringUploadInvoice;
	} else if (createExpenseType === 'nonRecurring') {
		uploadControls = nonRecurringUploadInvoice;
	}

	const currencyOptions = [
		{ label: 'INR', value: 'INR' },
		{ label: 'USD', value: 'USD' },
		{ label: 'VN', value: 'VN' },
		{ label: 'GBP', value: 'GBP' },
	];

	return (
		<div className={styles.container}>
			<div className={styles.upload_invoice}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Select
						value={formData?.invoiceCurrency}
						onChange={(val:string) => setFormData({ ...formData, invoiceCurrency: val })}
						placeholder="Select Invoice Currency*"
						options={currencyOptions}
						size="sm"
						className={styles.select}
					/>
					<div className={styles.input}>
						<Input
							name="invoiceNumber"
							size="sm"
							placeholder="Enter unique invoice no.*"
							onChange={(e:string) => setFormData({ ...formData, invoiceNumber: e })}
						/>

					</div>
				</div>
				{!isUploadConfirm ? (
					<>
						<Filter
							controls={uploadControls()}
							filters={formData}
							setFilters={setFormData}
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
									data={formData?.uploadedInvoice}
									type="application/pdf"
									height="850px"
									width="100%"
									aria-label="Document"
								/>
							</div>
						</div>
					)}

			</div>
			<div className={`${styles.upload_invoice} ${styles.line_item}`}>
				<LineItemsForm setFormData={setFormData} formData={formData} />
			</div>
		</div>

	);
}

export default UploadInvoiceForm;
