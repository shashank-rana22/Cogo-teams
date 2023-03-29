import { Datepicker, Input, Select, Button } from '@cogoport/components';
import React from 'react';

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
}
interface Props {
	formData:FilterInterface,
	setFormData:(p:object) => void,
	taxOptions?:object[],
	setTaxOptions?:(p:object)=>void,
	setIsUploadConfirm?:(p:any)=>void,
	isUploadConfirm?:boolean,
}

function UploadInvoice({
	formData, setFormData, setTaxOptions, taxOptions,
	isUploadConfirm, setIsUploadConfirm,
}:Props) {
	const { uploadedInvoice:uploadUrl, invoiceCurrency, invoiceNumber, invoiceDate, uploadedInvoice } = formData || {};
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
