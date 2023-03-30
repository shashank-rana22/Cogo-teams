import { Datepicker, Input, Select, Button } from '@cogoport/components';
import React, { useEffect } from 'react';

import Filter from '../../../../commons/Filters';
import { CURRENCY_OPTIONS } from '../../../constants/CURRENCY_OPTIONS';
import { recurringUploadInvoice } from '../../../Controls/recurringUploadInvoice';
import LineItemsForm from '../../LineItemsForm';

import styles from './styles.module.css';

interface FilterInterface {
	uploadedInvoice?:string,
	repeatEvery?:string,
	invoiceCurrency?:string,
	invoiceDate?:Date,
	invoiceNumber?:string,
	lineItemsList?:any,
}
interface Props {
	formData:FilterInterface,
	setFormData:(p:object) => void,
	taxOptions?:object[],
	setTaxOptions?:(p:object)=>void,
	setIsUploadConfirm?:(p:any)=>void,
	isUploadConfirm?:boolean,
	setIsFormValidated?:(p:boolean)=>void,
}

function UploadInvoice({
	formData, setFormData, setTaxOptions, taxOptions,
	isUploadConfirm, setIsUploadConfirm, setIsFormValidated,
}:Props) {
	const {
		uploadedInvoice:uploadUrl, invoiceCurrency,
		invoiceNumber, invoiceDate, uploadedInvoice, lineItemsList,
	} = formData || {};

	const isLineItemPresent = lineItemsList?.[0]?.payable_amount;

	useEffect(() => {
		// validations to ensure data is filled before going to next page
		if (invoiceCurrency && invoiceNumber && invoiceDate && uploadedInvoice && isLineItemPresent) {
			setIsFormValidated(true);
		} else {
			setIsFormValidated(false);
		}
	}, [invoiceCurrency,
		invoiceNumber,
		invoiceDate,
		uploadedInvoice,
		isLineItemPresent,
		setIsFormValidated]);

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
				<div className={styles.select}>
					<Select
						value={invoiceCurrency}
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
						value={invoiceNumber}
						onChange={(e:string) => setFormData({ ...formData, invoiceNumber: e })}
					/>

				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div>
						<Datepicker
							placeholder="Enter Invoice Date"
							dateFormat="yyyy-MM-dd"
							name="date"
							isPreviousDaysAllowed
							onChange={(e:any) => setFormData((p) => ({ ...p, invoiceDate: e }))}
							value={invoiceDate}
							style={{ marginBottom: '-10px' }}
						/>

					</div>

				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.upload_invoice}>
					{!isUploadConfirm ? (
						<>
							<Filter
								controls={recurringUploadInvoice()}
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
								<div style={{ margin: '4px 20px 8px 20px' }}>
									<object
										data={uploadedInvoice}
										type="application/pdf"
										height="400px"
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

export default UploadInvoice;
