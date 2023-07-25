import { Input } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useImperativeHandle, forwardRef } from 'react';

import getCompanyAddressOptions from '../../../../components/Poc/helpers/getCompanyAddressOptions';
import getCompanyNameOptions from '../../../../components/Poc/helpers/getCompanyNameOptions';
import getTradePartiesDefaultParams from '../../../../components/Poc/helpers/getTradePartiesDefaultParams';
import useListOrganizationTradeParties from '../../../../hooks/useListOrganizationTradeParties';

import styles from './styles.module.css';

const PINCODE_IN_ADDRESS_INDEX = 1;

function DefaultForm({
	companyType = '',
	tradePartyType = '',
	importer_exporter_id,
	organization_id,
}, ref) {
	const {
		data:{ list = [] } = {},
		loading,
		setFilters,
	} = useListOrganizationTradeParties({
		...getTradePartiesDefaultParams({ companyType, tradePartyType }),
		organization_id: organization_id || importer_exporter_id,
	});

	const {
		control,
		watch,
		reset,
		resetField,
		handleSubmit,
		formState:{ errors = {} },
	} = useForm();

	const formValues = watch();

	useEffect(() => {
		setFilters((p) => ({ ...p }));
		reset();
	}, [companyType, tradePartyType, setFilters, reset]);

	useEffect(() => {
		resetField('address');
	}, [formValues?.trade_party_id, resetField]);

	const company_options = getCompanyNameOptions(list);
	const address_options = getCompanyAddressOptions(list);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<div>
			<form className={styles.form_container}>
				{!loading
					? (
						<>
							<div className={styles.form_item_container}>
								<label className={styles.form_label}>Select Company</label>

								<SelectController
									style={{ maxWidth: '350px', minWidth: '300px' }}
									size="sm"
									name="trade_party_id"
									placeholder="Select Company"
									control={control}
									options={company_options}
									rules={{ required: { value: true, message: 'Company is required' } }}
								/>

								{Error('trade_party_id')}
							</div>

							{!isEmpty(formValues?.trade_party_id) && (
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Select Address</label>

									<SelectController
										style={{ maxWidth: '350px', minWidth: '300px' }}
										size="sm"
										name="address"
										placeholder="Select Address"
										control={control}
										options={address_options?.[formValues?.trade_party_id]}
										rules={{ required: { value: true, message: 'Address is required' } }}
									/>
									{Error('address')}
								</div>
							)}

							{!isEmpty(formValues?.address) && (
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Pincode</label>

									<Input
										disabled
										value={formValues.address?.split('::')?.[PINCODE_IN_ADDRESS_INDEX]}
										size="sm"
									/>
								</div>
							)}
						</>

					) : null}
			</form>
		</div>
	);
}

export default forwardRef(DefaultForm);
