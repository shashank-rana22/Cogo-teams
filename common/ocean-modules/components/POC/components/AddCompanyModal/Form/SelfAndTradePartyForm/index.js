import { Loader } from '@cogoport/components';
import {
	CreatableSelectController,
	InputController,
	MobileNumberController,
	MultiselectController,
	SelectController,
	useForm,
} from '@cogoport/forms';
import { useEffect, useImperativeHandle, forwardRef } from 'react';

import POC_WORKSCOPE_MAPPING from '../../../../../../contants/POC_WORKSCOPE_MAPPING';
import useListOrganizationTradeParties from '../../../../../../hooks/useListOrganizationTradeParties';
import { convertObjectMappingToArray } from '../../../../../../utils/convertObjectMappingToArray';
import formValuePatterns from '../../../../../../utils/formValuePatterns';
import getCompanyAddressOptions from '../../../../helpers/getCompanyAddressOptions';
import getCompanyNameOptions from '../../../../helpers/getCompanyNameOptions';
import getTradePartiesDefaultParams from '../../../../helpers/getTradePartiesDefaultParams';

import styles from './styles.module.css';

function SelfAndTradePartyForm({
	companyType = '',
	tradePartyType = '',
	importer_exporter_id,
	organization_id,
}, ref) {
	const {
		data:{ list = [] } = {},
		loading,
	} = useListOrganizationTradeParties({
		...getTradePartiesDefaultParams({ companyType, tradePartyType }),
		organization_id: organization_id || importer_exporter_id,
	});

	const {
		control,
		watch,
		resetField,
		handleSubmit,
		formState:{ errors = {} },
		setValue,
	} = useForm();

	const formValues = watch();

	useEffect(() => {
		if (companyType === 'self') {
			setValue('trade_party_id', list?.[0]?.id);
		}
	}, [list, companyType, setValue]);

	useEffect(() => {
		const selectedTradeParty = list?.find((t) => t.id === formValues?.trade_party_id);
		setValue('registration_number', selectedTradeParty?.registration_number || '');

		resetField('address');
		resetField('pincode');
	}, [formValues?.trade_party_id, list, setValue, resetField]);

	useEffect(() => {
		setValue('pincode', formValues.address?.split('::')?.[1]);
	}, [formValues?.address, setValue]);

	const company_options = getCompanyNameOptions(list);
	const address_options = getCompanyAddressOptions(list);
	const workScopeOptions = convertObjectMappingToArray(POC_WORKSCOPE_MAPPING);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

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
										PAN Number / Registration Number
									</label>
									<InputController
										size="sm"
										name="registration_number"
										control={control}
										placeholder="Enter Registration Number"
										disabled
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
										options={address_options[formValues.trade_party_id]}
										rules={{ required: { value: true, message: 'Address is required' } }}
									/>
									{Error('address')}
								</div>

								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Pincode / Zip Code</label>
									<InputController
										control={control}
										name="pincode"
										placeholder="Enter Pincode"
										size="sm"
										rules={{ required: { value: true, message: 'Pincode / Zip Code is required' } }}
									/>
									{Error('pincode')}
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
									/>
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
											pattern: {
												value   : formValuePatterns.EMAIL,
												message : 'Enter valid email',
											},
										}}
										placeholder="Enter Email Address"
									/>
									{Error('email')}
								</div>

								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Mobile Number</label>
									<MobileNumberController
										size="sm"
										control={control}
										name="mobile_number"
									/>
									{Error('mobile_number')}
								</div>
							</div>

							<div className={styles.row}>
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Alternate Mobile Number (optional)</label>
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
