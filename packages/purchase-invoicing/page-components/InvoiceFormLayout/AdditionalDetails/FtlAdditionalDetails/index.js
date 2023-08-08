import { SelectController, UploadController, InputNumberController } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';

import options from '../../../../common/currencies';
import { PAYMENT_TYPE, IS_INVOICE_INCEDENTAL, REMARKS_FOR_CN } from '../../../../constants';
import styles from '../styles.module.css';

function FtlAdditionalDetails({ control = {}, formValues = {} }) {
	const geo = getGeoConstants();
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
