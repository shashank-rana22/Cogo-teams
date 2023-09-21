import { Button } from '@cogoport/components';
import {
	CountrySelectController,
	CreatableSelectController,
	InputController,
	useForm,
} from '@cogoport/forms';
import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import isEqual from '@cogoport/ocean-modules/utils/isEqual';
import { useEffect } from 'react';

import useUpdateLeadOrganization from '../../../../../../hooks/useUpdateLeadOrganization';

import styles from './styles.module.css';

function Error(key, errors) {
	return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
}

function UserOnboard({ leadsData = {}, defaultValues = {}, refetchList = () => {} }) {
	const {
		control,
		formState:{ errors = {} },
		handleSubmit = () => {},
		reset = () => {},
		watch = () => {},
	} = useForm();

	const { ...formValues } = watch();

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const countrySpecificLabel = getCountrySpecificData({
		country_id    : formValues?.country_id,
		accessorType  : 'identification_number',
		accessor      : 'label',
		isDefaultData : false,
	});

	const countrySpecificPattern = getCountrySpecificData({
		country_id    : formValues?.country_id,
		accessorType  : 'identification_number',
		accessor      : 'pattern',
		isDefaultData : false,
	});

	const {
		updateLoading = false,
		updateLeadOrganization = () => {},
	} = useUpdateLeadOrganization({ leadsData, refetchList });

	const { business_name = '', country_id = '', registration_number = '' } = leadsData || {};

	return (
		<div className={styles.details_form}>
			<div className={styles.form_item_container}>
				<label className={styles.form_label}>Company Name</label>

				<CreatableSelectController
					size="sm"
					control={control}
					name="company_name"
					placeholder="Enter Company Name"
					value={business_name}
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
					value={country_id}
					rules={{ required: 'Country of Registration is required' }}
				/>

				{Error('country_id', errors)}
			</div>

			<div className={styles.form_item_container}>
				<label className={styles.form_label}>
					{countrySpecificLabel || 'PAN'}
				</label>

				<InputController
					size="sm"
					name="registration_number"
					control={control}
					placeholder={`Enter ${countrySpecificLabel || 'PAN'}`}
					value={registration_number}
					rules={{
						required: {
							value   : !formValues?.pan_number,
							message : `${countrySpecificLabel} Number is required`,
						},
						pattern: {
							value   : countrySpecificPattern,
							message : `${countrySpecificLabel}
								Number is invalid`,
						},
					}}
				/>

				{Error('registration_number', errors)}
			</div>

			<Button
				themeType="accent"
				onClick={handleSubmit(updateLeadOrganization)}
				disabled={isEqual(formValues, defaultValues) || updateLoading}
				loading={updateLoading}
				className={styles.update_button}
			>
				Update
			</Button>
		</div>
	);
}

export default UserOnboard;
