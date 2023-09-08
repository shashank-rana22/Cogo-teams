import { Button } from '@cogoport/components';
import {
	// CheckboxController,
	CountrySelectController,
	CreatableSelectController,
	InputController,
	// MobileNumberController,
	// UploadController,
	useForm,
} from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
// import MultiSelectController from '@cogoport/forms/page-components/Controlled/MultiSelectController';
// import { getCountryConstants } from '@cogoport/globalization/constants/geo';
// import { useImperativeHandle, forwardRef, useEffect, useState, useCallback } from 'react';

import styles from './styles.module.css';

function Error(key, errors) {
	return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
}

function UserOnboard({ setIsLeadUpdated = () => {} }) {
	// const { control, watch, formState:{ errors = {} }, handleSubmit, setValue, resetField } = useForm();
	const { control, formState:{ errors = {} }, handleSubmit, formState: { isValid = false }, formValues } = useForm();

	const countryValidation = getCountryConstants({ country_id: formValues?.country_id, isDefaultData: false });

	const updateDetails = (values) => {
		console.log({ values });
		setIsLeadUpdated(true);
	};

	return (
		<div>
			<div className={styles.details_form}>
				<div className={styles.row}>
					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Company Name</label>

						<CreatableSelectController
							size="sm"
							control={control}
							name="company_name"
							placeholder="Enter Company Name"
							rules={{ required: 'Company Name is required' }}
						/>

						{Error('company_name', errors)}
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Country of Registration</label>

						<CountrySelectController
							name="country_id"
							control={control}
							size="sm"
							placeholder="Enter or Select Country"
							optionValueKey="id"
							rules={{ required: 'Country of Registration is required' }}
						/>
						{Error('country', errors)}
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>GST</label>

						<InputController
							size="sm"
							name="gst_number"
							control={control}
							placeholder="Enter GST"
							rules={{
								required : { value: !formValues?.gst_number, message: 'GST number is required' },
								pattern  : {
									value   : countryValidation?.regex?.GST,
									message : `
									${countryValidation?.others?.identification_number?.label}Number is invalid`,
								},
							}}
						/>
						{Error('registration_number', errors)}
					</div>
				</div>

				<div className={styles.button_container}>
					<Button
						themeType="accent"
						onClick={handleSubmit(updateDetails)}
						disabled={!isValid}
					>
						Update
					</Button>
				</div>

			</div>
		</div>
	);
}

export default UserOnboard;
