import {
	CheckboxController,
	CountrySelectController,
	CreatableSelectController,
	InputController, MobileNumberController,
	UploadController,
	useForm,
} from '@cogoport/forms';
import MultiSelectController from '@cogoport/forms/page-components/Controlled/MultiSelectController';
import { useImperativeHandle, forwardRef, useEffect, useState, useCallback } from 'react';

import POC_WORKSCOPE_MAPPING from '../../../../../../contants/POC_WORKSCOPE_MAPPING';
import useListOrganizationTradeParties from '../../../../../../hooks/useListOrganizationTradeParties';
import { convertObjectMappingToArray } from '../../../../../../utils/convertObjectMappingToArray';
import formValuePatterns from '../../../../../../utils/formValuePatterns';
import getBillingAddressFromRegNum, { getAddressRespectivePincodeAndPoc } from
	'../../helpers/getBillingAddressFromRegNum';

import styles from './styles.module.css';

function CreateNewCompanyForm({ tradePartyType }, ref) {
	const { data, setFilters } = useListOrganizationTradeParties({
		defaultParams: {
			billing_addresses_data_required : true,
			other_addresses_data_required   : true,
			poc_data_required               : true,
		},
	});

	const [addressOptions, setAddressOptions] = useState([]);
	const [addressData, setAddressData] = useState([]);

	const [pocNameOptions, setPocNameOptions] = useState([]);

	const { control, watch, formState:{ errors = {} }, handleSubmit, setValue, resetField } = useForm();
	const formValues = watch();

	const resetMultipleFields = useCallback((fields = []) => {
		fields?.map((field) => resetField(field));
	}, [resetField]);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	useEffect(() => {
		if (formValues?.registration_number) {
			setFilters({ registration_number: formValues?.registration_number });
		}
	}, [formValues?.registration_number, setFilters]);

	useEffect(() => {
		setAddressOptions([]);
		setValue('address', undefined);
		if (formValues?.registration_number && data?.list?.length)	{
			const { formttedData, addressOptions:regNumberAddress } = getBillingAddressFromRegNum({ data: data?.list });
			setAddressOptions(regNumberAddress);
			setAddressData(formttedData);
		}
	}, [data, formValues?.registration_number, setValue]);

	useEffect(() => {
		resetMultipleFields(['name', 'pincode', 'business_name']);

		if (formValues?.address) {
			const { pocNameOptions:nameOptions, pincode, business_name } = getAddressRespectivePincodeAndPoc({
				data    : addressData,
				address : formValues?.address,

			});

			setPocNameOptions(nameOptions);
			setValue('pincode', pincode);
			setValue('business_name', business_name);
		}
	}, [formValues?.address, addressData, setValue, resetMultipleFields]);

	useEffect(() => {
		resetMultipleFields(['work_scopes', 'email', 'mobile_number']);

		if (formValues?.name) {
			const selectedName = pocNameOptions?.find((item) => item?.value === formValues?.name);
			setValue('work_scopes', selectedName?.work_scopes || []);
			setValue('email', selectedName?.email || '');

			setValue('mobile_number', {
				country_code : selectedName?.mobile_country_code,
				number       : selectedName?.mobile_number,
			});
		}
	}, [formValues?.name, pocNameOptions, setValue, resetMultipleFields]);

	const workScopeOptions = convertObjectMappingToArray(POC_WORKSCOPE_MAPPING);

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
							valueKey="id"
							rules={{ required: { value: true, message: 'Country of Registration is required' } }}
						/>
						{Error('country')}
					</div>
					<div className={styles.pan_number}>
						<label className={styles.form_label}>
							{`PAN Number / Registration Number ${
								['collection_party', 'paying_party'].includes(tradePartyType) ? '' : '(Optional)'}`}
						</label>
						<InputController
							size="sm"
							name="registration_number"
							control={control}
							placeholder="Enter Registration Number"
							rules={{
								required : ['collection_party', 'paying_party'].includes(tradePartyType),
								pattern  : {
									value   : formValuePatterns.PAN_NUMBER,
									message : 'Pan Number is invalid',
								},
							}}
						/>
						{Error('registration_number')}
					</div>
				</div>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Address</label>
					<CreatableSelectController
						size="sm"
						control={control}
						name="address"
						placeholder="Enter Address"
						options={addressOptions}
						rules={{ required: { value: true, message: 'Address is required' } }}

					/>
					{Error('address')}
				</div>

				<div className={styles.form_item_container}>
					<label className={styles.form_label}>Company Name</label>
					<InputController
						name="business_name"
						control={control}
						size="sm"
						rules={{ required: { value: true, message: 'Company Name is required' } }}
						placeholder="Enter Company Name"
					/>
					{Error('business_name')}
				</div>

				<div className={styles.row}>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Pincode / Zip Code</label>
						<InputController
							size="sm"
							control={control}
							name="pincode"
							rules={{ required: { value: true, message: 'Pincode is required' } }}
						/>
						{Error('pincode')}
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>POC Name</label>
						<CreatableSelectController
							size="sm"
							control={control}
							name="name"
							placeholder="Enter your POC Name"
							options={pocNameOptions}
						/>
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Workscopes</label>
						<MultiSelectController
							size="sm"
							control={control}
							name="work_scopes"
							placeholder="Choose workscope Type"
							options={workScopeOptions}

						/>
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Email Address</label>
						<InputController
							name="email"
							control={control}
							size="sm"
							rules={{
								pattern: {
									value   : formValuePatterns.EMAIL,
									message : 'Enter valid email',
								},
							}}
							placeholder="Enter Email Address"
						/>
						{Error('email')}
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
						{Error('mobile_number')}
					</div>

					<div className={styles.form_item_container}>
						<label className={styles.form_label}>Alternate Mobile Number (optional)</label>
						<MobileNumberController size="sm" control={control} name="alternate_mobile_number" />
					</div>

				</div>

				<div className={styles.checkbox}>
					<CheckboxController name="not_reg_under_gst" control={control} />
					<label className={styles.form_label}>Not registered under GST</label>
				</div>

				<div className={styles.row}>
					<div>
						<label className={styles.form_label}>GST Number</label>
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
					<div className={styles.upload_container}>
						<label className={styles.form_label}>GST Proof</label>
						<UploadController
							className="tax_document"
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

			</form>
		</div>
	);
}

export default forwardRef(CreateNewCompanyForm);
