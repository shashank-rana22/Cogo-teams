import { Loader, cl } from '@cogoport/components';
import {
	CreatableSelectController,
	InputController,
	MobileNumberController,
	MultiselectController,
	SelectController,
	useForm,
} from '@cogoport/forms';
import getGeoConstants, { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react';

import getCompanyAddressOptions from '../../../../components/Poc/helpers/getCompanyAddressOptions';
import getCompanyNameOptions from '../../../../components/Poc/helpers/getCompanyNameOptions';
import getTradePartiesDefaultParams from '../../../../components/Poc/helpers/getTradePartiesDefaultParams';
import POC_WORKSCOPE_MAPPING from '../../../../constants/POC_WORKSCOPE_MAPPING';
import useListOrganizationTradeParties from '../../../../hooks/useListOrganizationTradeParties';
import { convertObjectMappingToArray } from '../../../../utils/convertObjectMappingToArray';
import validateMobileNumber from '../../../../utils/validateMobileNumber';
import { getAddressRespectivePincodeAndPoc } from '../../helpers/getBillingAddressFromRegNum';

import styles from './styles.module.css';

const PINCODE_IN_ADDRESS_INDEX = 1;

function SelfAndTradePartyForm({
	companyType = '',
	tradePartyType = '',
	importer_exporter_id = '',
	organization_id = '',
	poc_required = false,
}, ref) {
	const [addressData, setAddressData] = useState([]);
	const [id, setId] = useState('');
	const [pocNameOptions, setPocNameOptions] = useState([]);
	const [countryId, setCountryId] = useState('');
	const [registrationNumber, setRegistrationNumber] = useState('');
	const {
		data:{ list = [] } = {},
		loading,
	} = useListOrganizationTradeParties({
		...getTradePartiesDefaultParams({ companyType, tradePartyType }),
		organization_id: organization_id || importer_exporter_id,
	});
	const geo = getGeoConstants();

	const {
		control, watch, resetField, handleSubmit, formState:{ errors = {} }, setValue,
	} = useForm();

	const { trade_party_id, address, name } = watch();

	const firstTradeParty = list?.[GLOBAL_CONSTANTS.zeroth_index]?.id;

	const resetMultipleFields = useCallback((fields = []) => {
		fields?.map((field) => resetField(field));
	}, [resetField]);

	useEffect(() => {
		if (companyType === 'self') {
			setValue('trade_party_id', firstTradeParty);
		}
	}, [firstTradeParty, companyType, setValue]);

	useEffect(() => {
		const selectedTradeParty = list?.find((t) => t.id === trade_party_id);
		setValue('registration_number', selectedTradeParty?.registration_number || '');
		setRegistrationNumber(selectedTradeParty?.registration_number);

		if (!isEmpty(selectedTradeParty)) {
			setAddressData([...(selectedTradeParty?.billing_addresses || []),
				...(selectedTradeParty.other_addresses || [])]);
			setId(selectedTradeParty?.id);
			setCountryId(selectedTradeParty?.country?.id);
		}

		resetField('address');
		resetField('pincode');
	}, [trade_party_id, list, setValue, resetField]);

	useEffect(() => {
		setValue('pincode', address?.split('::')?.[PINCODE_IN_ADDRESS_INDEX]);
	}, [address, setValue]);

	useEffect(() => {
		resetMultipleFields(['name']);

		const { pocNameOptions:nameOptions } = getAddressRespectivePincodeAndPoc({
			data: addressData,
			address,
			id,
		});

		setPocNameOptions(nameOptions);
	}, [address, addressData, setValue, resetMultipleFields, id]);

	useEffect(() => {
		resetMultipleFields(['work_scopes', 'email']);

		if (name) {
			const { work_scopes, email, mobile_number, mobile_country_code } = (pocNameOptions || []).find(
				(item) => item?.value === name,
			) || {};

			setValue('work_scopes', work_scopes || []);
			setValue('email', email || '');
			setValue('mobile_number', {
				country_code : mobile_country_code,
				number       : mobile_number,
			});
		}
	}, [name, pocNameOptions, setValue, resetMultipleFields]);

	const company_options = getCompanyNameOptions(list);
	const address_options = getCompanyAddressOptions(list);
	const workScopeOptions = convertObjectMappingToArray(POC_WORKSCOPE_MAPPING);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}
	const countryValidation = getCountryConstants({ country_id: countryId, isDefaultData: false });

	useEffect(() => {
		if (trade_party_id) {
			setValue('mobile_number', { country_code: countryValidation?.country?.mobile_country_code });
		}
	}, [trade_party_id, countryValidation?.country?.mobile_country_code, setValue]);

	return (
		<div>
			<form>
				{loading ? <div><Loader /></div>
					: (
						<>
							<div className={styles.row}>
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Select Company</label>
									<SelectController
										size="sm"
										name="trade_party_id"
										placeholder="Select Company"
										control={control}
										options={company_options}
										disabled={companyType === 'self'}
										rules={{ required: { value: true, message: 'Company is required' } }}
									/>
									{Error('trade_party_id')}
								</div>

								<div className={styles.form_item_container}>
									<label className={styles.form_label}>
										{countryValidation?.others?.identification_number?.label || 'PAN Number'}
									</label>
									<InputController
										size="sm"
										name="registration_number"
										control={control}
										placeholder={`Enter ${countryValidation?.others?.identification_number?.label
											|| 'PAN Number'}`}
										disabled={registrationNumber}
									/>
								</div>
							</div>

							<div className={styles.row}>
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Select Address</label>
									<CreatableSelectController
										size="sm"
										name="address"
										placeholder="Select Address"
										control={control}
										options={address_options[trade_party_id] || []}
										// rules={{ required: { value: true, message: 'Address is required' } }}
									/>
									{/* {Error('address')} */}
								</div>

								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Pincode / Zip Code</label>
									<InputController
										control={control}
										name="pincode"
										placeholder="Enter Pincode"
										size="sm"
										// rules={{
										// 	required: {
										// 		value   : true,
										// 		message : 'Pincode / Zip Code is required',
										// 	},
										// }}
									/>
									{/* {Error('pincode')} */}
								</div>
							</div>

							<div className={styles.row}>
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>POC Name</label>
									<CreatableSelectController
										size="sm"
										control={control}
										name="name"
										placeholder="Enter your POC Name"
										options={pocNameOptions}
										rules={poc_required ? { required: 'POC Name is required' } : {}}
									/>
									{Error('name', errors)}
								</div>
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Workscopes</label>
									<MultiselectController
										size="sm"
										control={control}
										name="work_scopes"
										placeholder="Choose workscope Type"
										options={workScopeOptions}
									/>
								</div>
							</div>

							<div className={styles.row}>
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Email Address</label>
									<InputController
										name="email"
										control={control}
										size="sm"
										rules={{
											pattern: { value: geo.regex.EMAIL, message: 'Enter valid email' },
											...(poc_required ? { required: 'POC Email is required' } : {}),
										}}
										placeholder="Enter Email Address"
									/>
									{Error('email', errors)}
								</div>

								<div className={cl`${styles.form_item_container}  ${styles.mobile_number_controller}`}>
									<label className={styles.form_label}>Mobile Number</label>
									<MobileNumberController
										size="sm"
										control={control}
										name="mobile_number"
										rules={poc_required ? {
											required : 'Mobile Number is required',
											validate : validateMobileNumber,
										} : {}}
									/>
									{Error('mobile_number', errors)}
								</div>
							</div>

							<div className={styles.row}>
								<div className={cl`${styles.form_item_container} ${styles.mobile_number_controller}`}>
									<label className={styles.form_label}>Alternate Mobile Number (Optional)</label>
									<MobileNumberController
										size="sm"
										control={control}
										name="alternate_mobile_number"
									/>
								</div>
							</div>
						</>
					)}
			</form>
		</div>
	);
}

export default forwardRef(SelfAndTradePartyForm);
