import {
	CheckboxController,
	InputController, SelectController,
	UploadController,
	useForm,
} from '@cogoport/forms';
import { useImperativeHandle, forwardRef } from 'react';

import formValuePatterns from '../../../../../../utils/formValuePatterns';

import styles from './styles.module.css';

function CreateNewCompanyForm({ tradePartyType }, ref) {
	const { control, watch, formState:{ errors = {} }, handleSubmit } = useForm();
	const formValues = watch();

	useImperativeHandle(ref, () => ({ handleSubmit }));

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<div>
			<form>
				<div className={styles.row}>
					<div className={styles.form_item_container}>
						<label>Country of Registration</label>
						<SelectController
							name="country"
							control={control}
							size="sm"
							rules={{ required: { value: true, message: 'Country of Registration is required' } }}
						/>
						{Error('country')}
					</div>

					<div className={styles.form_item_container}>
						<label>Company Name</label>
						<InputController
							name="company_name"
							control={control}
							size="sm"
							rules={{ required: { value: true, message: 'Company Name is required' } }}
						/>
						{Error('company_name')}
					</div>
				</div>

				<div className={styles.pan_number}>
					<label>
						{tradePartyType === 'collection_party'
							? 'PAN Number' : 'PAN Number (Optional)'}
					</label>
					<InputController
						size="sm"
						name="registration_number"
						control={control}
						rules={{
							required : tradePartyType === 'collection_party',
							pattern  : {
								value   : formValuePatterns.PAN_NUMBER,
								message : 'Pan Number is invalid',
							},
						}}
					/>
					{Error('registration_number')}
				</div>

				<div className={styles.checkbox}>
					<CheckboxController name="not_reg_under_gst" control={control} />
					<label>Not registered under GST</label>
				</div>
				<div className={styles.row}>
					<div>
						<label>GST Number</label>
						<InputController
							size="sm"
							name="tax_number"
							control={control}
							rules={{
								required: {
									value   : !formValues.not_reg_under_gst,
									message : 'GST Number is required',
								},
								pattern: {
									value   : formValuePatterns.GST_NUMBER,
									message : 'GST Number is invalid',
								},
							}}
							disabled={formValues.not_reg_under_gst}
						/>
						{Error('tax_number')}
					</div>
					<div>
						<label>GST Proof</label>
						<UploadController
							name="tax_number_document_url"
							disabled={formValues.not_reg_under_gst}
							control={control}
							rules={{
								required: {
									value   : !formValues.not_reg_under_gst,
									message : 'GST Proof is required',
								},
							}}
						/>
						{Error('tax_number_document_url')}
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.form_item_container}>
						<label>Address</label>
						<InputController
							size="sm"
							control={control}
							name="address"
							rules={{ required: { value: true, message: 'Address is required' } }}
						/>
						{Error('address')}
					</div>

					<div className={styles.form_item_container}>
						<label>Pincode / Zip Code</label>
						<SelectController
							size="sm"
							control={control}
							name="pincode"
							rules={{ required: { value: true, message: 'Pincode is required' } }}
						/>
						{Error('pincode')}
					</div>
				</div>

			</form>
		</div>
	);
}

export default forwardRef(CreateNewCompanyForm);
