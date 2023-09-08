import { Button } from '@cogoport/components';
import {
	CheckboxController,
	CountrySelectController,
	CreatableSelectController,
	InputController, MobileNumberController,
	UploadController,
	useForm,
} from '@cogoport/forms';
import MultiSelectController from '@cogoport/forms/page-components/Controlled/MultiSelectController';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import { useImperativeHandle, forwardRef, useEffect, useState, useCallback } from 'react';

import styles from './styles.module.css';

function Error(key, errors) {
	return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
}

function BillingAddress() {
	const { control, watch, formState:{ errors = {} }, handleSubmit, setValue, resetField } = useForm();
	const formValues = watch();

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Company Name</label>
					<InputController
						name="business_name"
						control={control}
						size="sm"
						rules={{ required: 'Company Name is required' }}
						placeholder="Enter Company Name"
					/>
					{/* {Error('business_name', errors)} */}
				</div>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Pincode / Zip Code</label>
					<InputController
						size="sm"
						control={control}
						name="pincode"
						rules={{ required: 'Pincode is required' }}
					/>
					{/* {Error('pincode', errors)} */}
				</div>
			</div>

			<div className={styles.row}>
				<div>
					<label className={styles.form_label}>GST Number</label>
					<InputController
						size="sm"
						name="tax_number"
						control={control}
						// rules={{

						// 	required:
						// 			{ value: !formValues.not_reg_under_gst, message: 'GST Number is required' },
						// 	pattern:
						// 			// { value: countryValidation?.regex?.GST, message: 'GST Number is invalid' },
						// }}
						// disabled={formValues.not_reg_under_gst}
					/>
					{Error('tax_number', errors)}
				</div>

				<div className={styles.upload_container}>
					<label className={styles.form_label}>
						{/* {taxLabel} */}
						{' '}
						Proof
					</label>
					<UploadController
						className="tax_document"
						name="tax_number_document_url"
						disabled={formValues.not_reg_under_gst}
						control={control}
						rules={{
							required: {
								value: !formValues.not_reg_under_gst,
								// message : `${taxLabel} Proof is required`,
							},
						}}
					/>
					{Error('tax_number_document_url', errors)}
				</div>
			</div>
			<div className={styles.form_item_container}>
				<label className={styles.form_label}>Address</label>
				<CreatableSelectController
					size="sm"
					control={control}
					name="address"
					placeholder="Enter Address"
					// options={addressOptions}
					rules={{ required: 'Address is required' }}
				/>
				{Error('address', errors)}
			</div>
			<div className={styles.row}>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>POC Name</label>
					<CreatableSelectController
						size="sm"
						control={control}
						name="name"
						placeholder="Enter your POC Name"
						// options={pocNameOptions}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Mobile Number</label>
					<MobileNumberController
						size="sm"
						control={control}
						name="mobile_number"
					/>
					{Error('mobile_number', errors)}
				</div>
			</div>
		</div>
	);
}

export default BillingAddress;
