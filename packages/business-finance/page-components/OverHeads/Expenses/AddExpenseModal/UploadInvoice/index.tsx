import { Datepicker, Input, Select, Button } from '@cogoport/components';
import React, { useState } from 'react';

import Filter from '../../../../commons/Filters';
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
						onChange={(e:string) => setFormData({ ...formData, invoiceNumber: e })}
					/>

				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div>
						<Datepicker
							placeholder="Enter Invoice Date"
							dateFormat="yyyy-MM-dd"
							name="date"
							onChange={(e:any) => setFormData((p) => ({ ...p, invoiceDate: e }))}
							value={formData?.invoiceDate}
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

								</div>
							)}
						</>
					)
						: (
							<div>
								<div style={{ margin: '4px 20px 8px 20px' }}>
									<object
										data={formData?.uploadedInvoice}
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
					<LineItemsForm setFormData={setFormData} formData={formData} />
				</div>
			</div>

		</div>

	);
}

export default UploadInvoice;
