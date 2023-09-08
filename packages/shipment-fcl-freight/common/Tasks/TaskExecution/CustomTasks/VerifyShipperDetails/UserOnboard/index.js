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

function UserOnboard() {
	const { control, watch, formState:{ errors = {} }, handleSubmit, setValue, resetField } = useForm();
	const formValues = watch();

	return (
		<div>
			<form>
				<div className={styles.row}>
					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Country of Registration</label>
						<CountrySelectController
							name="country_id"
							control={control}
							size="sm"
							placeholder="Enter or Select Country"
							optionValueKey="id"
							// value={(COUNTRY_DATA?.[tradePartyType])?.country_id}
							rules={{ required: 'Country of Registration is required' }}
						/>
						{/* {Error('country', errors)} */}
					</div>

					<div className={styles.pan_number}>
						{/* <label className={styles.form_label}>
							{`${countryValidation?.others?.identification_number?.label || 'PAN'} ${
                        	['collection_party', 'paying_party'].includes(tradePartyType) ? '' : '(Optional)'}`}
						</label> */}
						<InputController
							size="sm"
							name="registration_number"
							control={control}
							// placeholder={`Enter ${countryValidation?.others?.identification_number?.label}`}
							rules={{
                        	// required : ['collection_party', 'paying_party'].includes(tradePartyType),
                        	// pattern  : {
                        	// 	value   : countryValidation?.regex?.PAN,
                        	// 	message : `${countryValidation?.others?.identification_number?.label}}
								//     Number is invalid`,
                        	// },
							}}
						/>
						{/* {Error('registration_number', errors)} */}
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
					{/* {Error('address', errors)} */}
				</div>
				<div>
					<Button>
						Cancel
					</Button>
					<Button>
						Next
					</Button>
				</div>

			</form>
		</div>
	);
}

export default UserOnboard;
