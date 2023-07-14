import { Input } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useImperativeHandle, forwardRef } from 'react';

import useListOrganizationTradeParties from '../../../../../../hooks/useListOrganizationTradeParties';
import getCompanyAddressOptions from '../../../../helpers/getCompanyAddressOptions';
import getCompanyNameOptions from '../../../../helpers/getCompanyNameOptions';
import getGSTINOptions from '../../../../helpers/getGSTINOptions';
import getPANOptions from '../../../../helpers/getPANOptions';
import getTradePartiesDefaultParams from '../../../../helpers/getTradePartiesDefaultParams';

import styles from './styles.module.css';

const SHIPPER = 'shipper';
const PINCODE_INDEX = 1;

function Error({ keyName = '', errors = {} }) {
	return errors?.[keyName] ? <div className={styles.errors}>{errors?.[keyName]?.message}</div> : null;
}

function TaxNumber({ prefix = '', postfix = '', country_id = '' }) {
	return (
		<>
			{prefix}
			<CountrySpecificData
				country_id={country_id}
				accessorType="registration_number"
				accessor="label"
			/>
			{postfix}
		</>
	);
}

function DefaultForm({
	companyType = '',
	tradePartyType = '',
	importer_exporter_id = '',
	organization_id = '',
	query = '',
	country_id = '',
	shipment_type = '',
}, ref) {
	const {
		data:{ list = [] } = {},
		loading,
		setFilters,
	} = useListOrganizationTradeParties({
		...getTradePartiesDefaultParams({ companyType, tradePartyType }),
		organization_id: organization_id || importer_exporter_id,
		query,
	});
	const isShipperFTL = tradePartyType === SHIPPER && shipment_type === 'ftl_freight';

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
	const pan_options = getPANOptions(list);
	const gstin_options = getGSTINOptions(list);

	useImperativeHandle(ref, () => ({ handleSubmit }));

	return (
		<div>
			<form className={styles.form_container}>
				{!loading
					? (
						<>
							<div className={styles.form_item_container}>
								<label className={styles.form_label}>Select Company</label>
								<SelectController
									style={{ maxWidth: '250px', minWidth: '200px' }}
									size="sm"
									name="trade_party_id"
									placeholder="Select Company"
									control={control}
									options={company_options}
									rules={{ required: { value: true, message: 'Company is required' } }}
								/>

								<Error keyName="trade_party_id" errors={errors} />
							</div>

							{!isEmpty(formValues?.trade_party_id) && (
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Select Address</label>
									<SelectController
										style={{ maxWidth: '300px', minWidth: '250px' }}
										size="sm"
										name="address"
										placeholder="Select Address"
										control={control}
										options={address_options[formValues.trade_party_id]}
										rules={{ required: { value: true, message: 'Address is required' } }}
									/>
									<Error keyName="address" errors={errors} />
								</div>
							)}
							{!isEmpty(formValues?.address) && isShipperFTL
							&& !isEmpty(pan_options[formValues.trade_party_id])
								&&	 (
									<div className={styles.form_item_container}>
										<label className={styles.form_label}>Select PAN</label>
										<SelectController
											style={{ maxWidth: '250px', minWidth: '200px' }}
											size="sm"
											name="registration_number"
											placeholder="Select PAN"
											control={control}
											options={pan_options[formValues.trade_party_id]}
											rules={{ required: { value: true, message: 'PAN is required' } }}
										/>
										<Error keyName="registration_number" errors={errors} />
									</div>
								)}
							{!isEmpty(formValues?.address) && isShipperFTL
							&& !isEmpty(gstin_options[formValues.trade_party_id])
								&& (
									<div className={styles.form_item_container}>
										<label className={styles.form_label}>
											<TaxNumber country_id={country_id} prefix="Select " />
										</label>
										<SelectController
											style={{ maxWidth: '250px', minWidth: '200px' }}
											size="sm"
											name="tax_number"
											placeholder={<TaxNumber country_id={country_id} prefix="Select " />}
											control={control}
											options={gstin_options[formValues.trade_party_id]}
											rules={{
												required: {
													value   : true,
													message : <TaxNumber
														country_id={country_id}
														postfix=" is required"
													/>,
												},
											}}
										/>
										<Error keyName="tax_number" errors={errors} />
									</div>
								)}
							{!isEmpty(formValues?.address) && (
								<div className={styles.form_item_container}>
									<div>Pincode</div>
									<Input
										disabled
										value={formValues.address?.split('::')?.[PINCODE_INDEX]}
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
