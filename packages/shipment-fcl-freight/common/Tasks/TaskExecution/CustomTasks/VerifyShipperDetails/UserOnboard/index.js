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

function UserOnboard({ listLeadsData = {}, defaultValues = {} }) {
	const {
		control,
		formState:{ errors = {}, isValid = false },
		handleSubmit,
		reset,
		watch,
	} = useForm();

	const { ...formValues } = watch();

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const countryValidation = getCountryConstants({ country_id: listLeadsData?.country_id, isDefaultData: false });

	const { updateLoading = false, updateLeadOrganization } = useUpdateLeadOrganization();

	const updateDetails = (values) => {
		const PAYLOAD = {
			account_type        : 'importer_exporter',
			business_name       : values?.company_name,
			id                  : listLeadsData?.id,
			country_id          : values?.country_id,
			registration_number : values?.gst_number,

		};

		updateLeadOrganization({ payload: PAYLOAD });
	};

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
						value={listLeadsData?.business_name}
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
						value={listLeadsData?.country_id}
						rules={{ required: 'Country of Registration is required' }}
					/>
					{Error('country_id', errors)}
				</div>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>GST</label>

					<InputController
						size="sm"
						name="gst_number"
						control={control}
						placeholder="Enter GST"
						value={listLeadsData?.registration_number}
						rules={{
							required : { value: !formValues?.gst_number, message: 'GST number is required' },
							pattern  : {
								value   : countryValidation?.regex?.GST,
								message : `
									${countryValidation?.others?.identification_number?.label} Number is invalid`,
							},
						}}
					/>
					{Error('gst_number', errors)}
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					themeType="accent"
					onClick={handleSubmit(updateDetails)}
					disabled={isValid || isEqual(formValues, defaultValues) || updateLoading}
				>
					Update
				</Button>
			</div>

		</div>
	);
}

export default UserOnboard;
