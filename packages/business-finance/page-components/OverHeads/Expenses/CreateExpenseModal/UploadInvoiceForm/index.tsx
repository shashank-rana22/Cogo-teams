import { Input, Select, Button } from '@cogoport/components';
import React, { useEffect } from 'react';

import Filter from '../../../../commons/Filters';
import { CURRENCY_OPTIONS } from '../../../constants/CURRENCY_OPTIONS';
import { nonRecurringUploadInvoice } from '../../../Controls/nonRecurringUploadInvoice';
import { recurringUploadInvoice } from '../../../Controls/recurringUploadInvoice';
import LineItemsForm from '../../LineItemsForm';

import styles from './styles.module.css';

interface FilterInterface {
	uploadedInvoice?:string,
	repeatEvery?:string,
	invoiceCurrency?:string,
	invoiceNumber?:string,
	lineItemsList?:any,
}
interface Props {
	formData:FilterInterface,
	setFormData:(p:object) => void,
	createExpenseType:string,
	isUploadConfirm?:boolean,
	setIsUploadConfirm?:(p:any)=>void,
	taxOptions?:object[],
	setTaxOptions?:(p:any)=>void,
	setIsFormValidated?:(p:boolean)=>void,
}

function UploadInvoiceForm({
	formData,
	setFormData,
	createExpenseType,
	isUploadConfirm,
	setIsUploadConfirm,
	taxOptions,
	setTaxOptions,
	setIsFormValidated,
}:Props) {
	const { invoiceCurrency, invoiceNumber, uploadedInvoice:uploadUrl, lineItemsList } = formData || {};

	let uploadControls:any;
	if (createExpenseType === 'recurring') {
		uploadControls = recurringUploadInvoice;
	} else if (createExpenseType === 'nonRecurring') {
		uploadControls = nonRecurringUploadInvoice;
	}

	const isLineItemPresent = lineItemsList?.[0]?.payable_amount;

	useEffect(() => {
		// Validation to ensure that all data is filled before moving to next page
		const isValidated = invoiceCurrency && invoiceNumber && uploadUrl && isLineItemPresent;
		if (isValidated) {
			setIsFormValidated(true);
		} else {
			setIsFormValidated(false);
		}
	}, [
		invoiceCurrency, invoiceNumber, uploadUrl, isLineItemPresent, setIsFormValidated,
	]);

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
				<div className={styles.select}>
					<Select
						value={formData?.invoiceCurrency}
						onChange={(val:string) => setFormData({ ...formData, invoiceCurrency: val })}
						placeholder="Currency*"
						options={CURRENCY_OPTIONS}
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
									<div>&nbsp;(Please Confirm to view the uploaded invoice)</div>

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
