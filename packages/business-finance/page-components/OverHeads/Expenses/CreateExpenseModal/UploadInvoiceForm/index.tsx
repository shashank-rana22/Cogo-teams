import { Input, Select, Button } from '@cogoport/components';
import React from 'react';

import Filter from '../../../../commons/Filters';
import { nonRecurringUploadInvoice } from '../../../Controls/nonRecurringUploadInvoice';
import { recurringUploadInvoice } from '../../../Controls/recurringUploadInvoice';
import LineItemsForm from '../../LineItemsForm';

import styles from './styles.module.css';

interface FilterInterface {
	uploadedInvoice?:string,
	repeatEvery?:string,
	invoiceCurrency?:string,
	invoiceNumber?:number,
}
interface Props {
	formData:FilterInterface,
	setFormData:(p:object) => void,
	createExpenseType:string,
	isUploadConfirm?:boolean,
	setIsUploadConfirm?:(p:any)=>void,
	taxOptions?:object[],
	setTaxOptions?:(p:any)=>void,
}

function UploadInvoiceForm({
	formData,
	setFormData,
	createExpenseType,
	isUploadConfirm,
	setIsUploadConfirm,
	taxOptions,
	setTaxOptions,
}:Props) {
	const uploadUrl = formData?.uploadedInvoice;

	let uploadControls:any;
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
		<div>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
				<div className={styles.select}>
					<Select
						value={formData?.invoiceCurrency}
						onChange={(val:string) => setFormData({ ...formData, invoiceCurrency: val })}
						placeholder="Currency*"
						options={currencyOptions}
						size="sm"
					/>

				</div>
				<div className={styles.input}>
					<Input
						name="invoiceNumber"
						size="sm"
						placeholder="Unique invoice no."
						value={formData?.invoiceNumber}
						onChange={(e:string) => setFormData({ ...formData, invoiceNumber: e })}
					/>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.upload_invoice}>
					{!isUploadConfirm ? (
						<>
							<Filter
								controls={uploadControls({ formData })}
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
								<div style={{ margin: '4px 20px 0px 20px' }}>
									<object
										data={formData?.uploadedInvoice}
										type="application/pdf"
										height="450px"
										width="100%"
										aria-label="Document"
									/>
								</div>
							</div>
						)}

				</div>
				<div className={`${styles.upload_invoice} ${styles.line_item}`}>
					<LineItemsForm
						setFormData={setFormData}
						formData={formData}
						taxOptions={taxOptions}
						setTaxOptions={setTaxOptions}
					/>
				</div>
			</div>
		</div>

	);
}

export default UploadInvoiceForm;
