import { Datepicker, Input, Select, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Filter from '../../../../../commons/Filters';
import { recurringUploadInvoice } from '../../../Controls/recurringUploadInvoice';
import LineItemsForm from '../../LineItemsForm';

import styles from './styles.module.css';

interface FilterInterface {
	uploadedInvoice?:string,
	repeatEvery?:string,
	invoiceCurrency?:string,
	invoiceDate?:Date,
}
interface Props {
	formData:FilterInterface,
	setFormData:(p:object) => void,
}

function UploadInvoice({ formData, setFormData }:Props) {
	const [isUploadConfirm, setIsUploadConfirm] = useState(false);
	const uploadUrl = formData?.uploadedInvoice;

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
							placeholder="Enter unique invoice no."
							onChange={(e:string) => setFormData({ ...formData, invoiceNumber: e })}
						/>

					</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Datepicker
						placeholder="Enter Invoice Date"
						dateFormat="yyyy-MM-dd"
						name="date"
						onChange={(e:any) => setFormData((p) => ({ ...p, invoiceDate: e }))}
						value={formData?.invoiceDate}
						style={{ margin: '8px' }}
					/>

				</div>
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

export default UploadInvoice;
