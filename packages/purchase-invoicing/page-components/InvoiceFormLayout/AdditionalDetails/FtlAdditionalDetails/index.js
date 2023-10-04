import { Toast } from '@cogoport/components';
import { SelectController, UploadController, InputNumberController } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useCallback, useEffect } from 'react';

import options from '../../../../common/currencies';
import { PAYMENT_TYPE, IS_INVOICE_INCEDENTAL, REMARKS_FOR_CN } from '../../../../constants';
import styles from '../styles.module.css';

const MINIMUM_ADVANCED_PAYMENT_VALUE = 0;
const PERCENTAGE_FACTOR_FOR_ADVANCED_PAYMENT = 0.8;

function FtlAdditionalDetails({ control = {}, formValues = {}, calculatedValues = {} }) {
	const geo = getGeoConstants();
	const advanceAmount = formValues?.advanced_amount;

	const totalAmount = calculatedValues.invoice_amount * PERCENTAGE_FACTOR_FOR_ADVANCED_PAYMENT;

	// console.log('totalAmount', totalAmount);

	const handleInputChange = useCallback(() => {
		if (advanceAmount > totalAmount) {
			// eslint-disable-next-line max-len
			Toast.info('Post completing the cost booking, upload High Advance Payment Proof by completing Upload High Advance Payment Proof task');
		}
	}, [advanceAmount, totalAmount]);

	useEffect(() => {
		handleInputChange();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>

			{ ['purchase_invoice', 'proforma_invoice'].includes(formValues.invoice_type)
            && (
	<div className={styles.selectcontainer}>
		<div className={styles.label}>Payment Type :</div>
		<div>
			<SelectController
				control={control}
				name="payment_type"
				placeholder="Payment Type"
				options={PAYMENT_TYPE}
				value="full"
			/>
		</div>
	</div>
            )}

			{formValues?.payment_type === 'advanced'
            && ['purchase_invoice', 'proforma_invoice'].includes(formValues.invoice_type)
            && (
	<div className={styles.inputcontainer}>
		<div className={styles.label}>Advance Amount:</div>
		<div>
			<InputNumberController
				control={control}
				name="advanced_amount"
				placeholder="Advance Amount"
			/>

		</div>
	</div>

            )}

			{formValues?.payment_type === 'advanced'
            && ['purchase_invoice', 'proforma_invoice'].includes(formValues.invoice_type)
            && (
	<div className={styles.selectcontainer}>
		<div className={styles.label}>Advance Amount currency :</div>
		<div>
			<SelectController
				control={control}
				name="unit"
				placeholder={`Eg: ${geo.country.currency.code}`}
				options={options}

			/>
		</div>
	</div>

            )}

			{['purchase_invoice'].includes(formValues.invoice_type)
                   && (
	<div className={styles.selectcontainer}>
		<div className={styles.label}>Is Incedental :</div>
		<div>
			<SelectController
				control={control}
				name="is_invoice_incedental"
				placeholder="Yes or No"
				options={IS_INVOICE_INCEDENTAL}
				value="no"
			/>
		</div>
	</div>
                   )}

			<div className={styles.upload_container}>
				<label className={styles.label}>Outstanding Document :</label>
				<UploadController
					name="outstanding_document"
					control={control}
				/>
			</div>
			{
				formValues.payment_type === 'advanced'
				&& +(calculatedValues?.invoice_amount || MINIMUM_ADVANCED_PAYMENT_VALUE)
					* PERCENTAGE_FACTOR_FOR_ADVANCED_PAYMENT
					<= +(formValues?.advanced_amount || MINIMUM_ADVANCED_PAYMENT_VALUE) && (
						<div className={styles.upload_container}>
							<label className={styles.label}>Advance Payment Proof :</label>
							<UploadController
								name="advance_payment_proof"
								control={control}
							/>
						</div>
				)
			}

			{['credit_note'].includes(formValues.invoice_type)
            && (
	<div className={styles.selectcontainer}>
		<div className={styles.label}>Select Reason For CN :</div>
		<div>
			<SelectController
				control={control}
				name="reason_for_cn"
				placeholder="Select Reason"
				options={REMARKS_FOR_CN}
				value="no"
			/>
		</div>
	</div>
            )}

		</>
	);
}

export default FtlAdditionalDetails;
