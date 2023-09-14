import { Button } from '@cogoport/components';
import {
	CountrySelectController,
	CreatableSelectController,
	InputController,
	useForm,
} from '@cogoport/forms';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';
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
		handleSubmit,
		reset,
		watch,
	} = useForm();

	const { ...formValues } = watch();

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const countryValidation = getCountryConstants({ country_id: leadsData?.country_id, isDefaultData: false });

	const {
		updateLoading = false,
		updateLeadOrganization = () => {},
	} = useUpdateLeadOrganization({ leadsData, refetchList });

	const { business_name = '', country_id = '', registration_number = '' } = leadsData || {};

	return (
		<div className={styles.details_form}>
			<div className={styles.row}>
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
						{countryValidation?.others?.pan_number?.label || 'PAN'}
					</label>

					<InputController
						size="sm"
						name="registration_number"
						control={control}
						placeholder={`Enter ${countryValidation?.others?.pan_number?.label || 'PAN'}`}
						value={registration_number}
						rules={{
							required : { value: !formValues?.pan_number, message: 'PAN number is required' },
							pattern  : {
								value   : countryValidation?.others?.pan_number?.pattern,
								message : `${countryValidation?.others?.pan_number?.label}
								Number is invalid`,
							},
						}}
					/>
					{Error('registration_number', errors)}
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="accent"
					onClick={handleSubmit(updateLeadOrganization)}
					disabled={isEqual(formValues, defaultValues) || updateLoading}
					loading={updateLoading}
				>
					Update
				</Button>
			</div>

		</div>
	);
}

export default UserOnboard;
