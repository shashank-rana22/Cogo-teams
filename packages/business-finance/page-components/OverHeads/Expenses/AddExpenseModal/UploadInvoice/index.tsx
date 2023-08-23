import { Datepicker, Input, Select, Button, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import { IcMRefresh } from '@cogoport/icons-react';
import React, { useEffect } from 'react';

import Filter from '../../../../commons/Filters';
import { recurringUploadInvoice } from '../../../Controls/recurringUploadInvoice';
import LineItemsForm from '../../LineItemsForm';

import styles from './styles.module.css';

interface FilterInterface {
	uploadedInvoice?: string;
	repeatEvery?: string;
	invoiceCurrency?: string;
	invoiceDate?: Date;
	invoiceNumber?: string;
	lineItemsList?: any;
}
interface Props {
	formData: FilterInterface;
	setFormData: (p: object) => void;
	taxOptions?: object[];
	setTaxOptions?: (p: object) => void;
	setIsUploadConfirm?: (p: any) => void;
	isUploadConfirm?: boolean;
	setIsFormValidated?: (p: boolean) => void;
	isTaxApplicable?: boolean;
}

function UploadInvoice({
	formData,
	setFormData,
	setTaxOptions,
	taxOptions,
	isUploadConfirm,
	setIsUploadConfirm,
	setIsFormValidated,
	isTaxApplicable,
}: Props) {
	const {
		uploadedInvoice: uploadUrl,
		invoiceCurrency,
		invoiceNumber,
		invoiceDate,
		lineItemsList = [],
	} = formData || {};

	const isLineItemPresent = lineItemsList?.[GLOBAL_CONSTANTS.zeroth_index]?.payable_amount;

	useEffect(() => {
		// validations to ensure data is filled before going to next page
		if (
			invoiceCurrency
			&& invoiceNumber
			&& invoiceDate
			&& uploadUrl
			&& isLineItemPresent
		) {
			setIsFormValidated(true);
		} else {
			setIsFormValidated(false);
		}
	}, [
		invoiceCurrency,
		invoiceNumber,
		invoiceDate,
		uploadUrl,
		isLineItemPresent,
		setIsFormValidated,
	]);

	return (
		<div>
			<div
				style={{
					display      : 'flex',
					alignItems   : 'center',
					marginBottom : '20px',
				}}
			>
				<div className={styles.select}>
					<Select
						value={invoiceCurrency}
						onChange={(val: string) => setFormData({ ...formData, invoiceCurrency: val })}
						placeholder="Currency*"
						options={getCurrencyOptions()}
						size="sm"
					/>
				</div>
				<div className={styles.input}>
					<Input
						name="invoiceNumber"
						size="sm"
						placeholder="Unique invoice no."
						value={invoiceNumber}
						onChange={(e: string) => setFormData({ ...formData, invoiceNumber: e })}
					/>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div>
						<Datepicker
							placeholder="Enter Invoice Date"
							dateFormat="yyyy-MM-dd"
							name="date"
							isPreviousDaysAllowed
							onChange={(e: any) => setFormData((p) => ({ ...p, invoiceDate: e }))}
							value={invoiceDate}
							style={{ marginBottom: '-10px' }}
						/>
					</div>
				</div>
			</div>

			<div className={styles.container}>
				<div className={styles.upload_invoice}>
					{!isUploadConfirm ? (
						<div>
							{!uploadUrl ? (
								<Filter
									controls={recurringUploadInvoice()}
									filters={formData}
									setFilters={setFormData}
								/>
							) : (
								<div style={{ margin: '8px' }}>
									<object
										data={uploadUrl}
										type="application/pdf"
										height="450px"
										width="100%"
										aria-label="Document"
									/>
									<div className={styles.confirm}>
										<Button
											onClick={() => {
												setFormData((p) => ({
													...p,
													uploadedInvoice: null,
												}));
												setIsUploadConfirm(false);
											}}
											style={{ marginRight: '20px' }}
											themeType="secondary"
										>
											Reset
											<IcMRefresh />
										</Button>
										<Button
											onClick={() => setIsUploadConfirm(true)}
										>
											Confirm
										</Button>
									</div>
								</div>
							)}
						</div>
					) : (
						<div>
							<div style={{ margin: '8px' }}>
								<object
									data={uploadUrl}
									type="application/pdf"
									height="500px"
									width="100%"
									aria-label="Document"
								/>
							</div>
						</div>
					)}
				</div>

				<div className={cl`${styles.upload_invoice} ${styles.line_item}`}>
					<LineItemsForm
						setFormData={setFormData}
						formData={formData}
						taxOptions={taxOptions}
						setTaxOptions={setTaxOptions}
						isTaxApplicable={isTaxApplicable}
					/>
				</div>
			</div>
		</div>
	);
}

export default UploadInvoice;
