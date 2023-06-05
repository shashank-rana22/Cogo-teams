import { Button, Loader, Toast } from '@cogoport/components';
import { SelectController, useFieldArray, useForm } from '@cogoport/forms';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useCreateShipmentOperatingInstruction from '../../../../../hooks/useCreateShipmentOperatingInstruction';
import useGetShipmentOperatingProcedure from '../../../../../hooks/useGetShipmentOperatingProcedure';
import useUpdateShipmentOperatingInstruction from '../../../../../hooks/useUpdateShipmentOperatingInstruction';
import getInvoicOptions from '../../../helpers/getInvoiceOptions';
import getCreateInstructionParams from '../helpers/getCreateInstructionParams';
import getUpdateInstructionParams from '../helpers/getUpdateInstructionParams';

import styles from './styles.module.css';

const EMPTY_VALUES = {
	invoice_preference_service      : '',
	billing_party                   : '',
	billing_party_address           : '',
	invoicing_party                 : '',
	invoice_preference_email        : '',
	invoice_preference_name         : '',
	invoice_preference_contact_no   : '',
	invoice_preference_country_code : '',
};

function InvoicePrefForm({
	setShowForm = () => {}, data = [], showForm = '', shipment_ids = {},
	getProcedureTrigger = () => {},
	auditsTrigger = () => {},
	services = [],
	primary_service,
}) {
	const { shipment_id, organization_id, procedure_id } = shipment_ids;
	const { trade_type } = primary_service || {};

	const { data: orgData, loading } = useGetShipmentOperatingProcedure({
		defaultParams  : { org_data_required: true },
		defaultFilters : { service_type: 'fcl_freight', trade_type },
		shipment_id,
		organization_id,
	});

	const afterUpdateOrCreateRefetch = () => {
		setShowForm(false);
		getProcedureTrigger();
		if (showForm === 'edit') auditsTrigger();
	};

	const { apiTrigger:createTrigger, loading:createLoading } =	 useCreateShipmentOperatingInstruction({
		shipment_id,
		organization_id,
		procedure_id,
		refetch: afterUpdateOrCreateRefetch,
	});

	const { apiTrigger:updateTrigger, loading:updateLoading } = useUpdateShipmentOperatingInstruction({
		procedure_id,
		instruction : 'invoice_preference',
		refetch     : afterUpdateOrCreateRefetch,
	});

	const {
		invoice_preference_service:serviceOptions,
		billing_party:billingPartyOptions,
		billing_party_address:billingPartyAddressOptions,
		invoicing_party              :invoicingPartyOptions,
		invoice_preference_email     :emailOptions,
		invoice_preference_name      :nameOptions,
		invoice_preference_contact_no:contactOptions,
		mobile_country_code          :countryCodeOptions,
	} = getInvoicOptions(orgData?.organization_handling_preference || [], services);

	const defaultValue = EMPTY_VALUES;
	if (showForm === 'edit') {
		const { sop_detail = {} } = data?.[0] || {};
		Object.keys(defaultValue).forEach((key) => { defaultValue[key] = sop_detail[key] || ''; });
	}

	const { control, handleSubmit, formState:{ errors = {} }, reset } = useForm({
		defaultValues: {
			invoice_pref: [defaultValue],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'invoice_pref',
	});

	const onCancel = () => {
		reset({ invoice_pref: [EMPTY_VALUES] });
		setShowForm(false);
	};

	const onSubmit = (formValues) => {
		if (showForm === 'edit') {
			const params = getUpdateInstructionParams({ formValues, data });

			if (isEmpty(params)) {
				Toast.error('Please add service');
				return;
			}

			updateTrigger(params);
			return;
		}

		const params = getCreateInstructionParams({ formValues, data });
		if (isEmpty(params)) {
			Toast.error('Please update service');
			return;
		}
		createTrigger(params);
	};

	function Error(key) {
		const [object, index, keyName] = (key || '').split('.');

		return errors?.[object]?.[index]?.[keyName]
			? <div className={styles.errors}>{errors?.[object]?.[index]?.[keyName]?.message}</div> : null;
	}

	return (
		<div className={styles.form_container}>
			{loading && <Loader />}
			{!loading
			&& (
				<form>
					{fields.map((item, index) => (
						<div key={item.id} className={styles.field_array_container}>
							<div className={styles.row}>
								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Service</label>
									<SelectController
										size="sm"
										name={`invoice_pref.${index}.invoice_preference_service`}
										control={control}
										options={serviceOptions}
										rules={{ required: { value: true, message: 'Service is required' } }}
									/>
									{Error(`invoice_pref.${index}.invoice_preference_service`)}

								</div>

								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Invoicing Partner</label>
									<SelectController
										size="sm"
										name={`invoice_pref.${index}.invoicing_party`}
										control={control}
										options={invoicingPartyOptions}
										rules={{ required: { value: true, message: 'Invoicing Partner is required' } }}
									/>
									{Error(`invoice_pref.${index}.invoicing_party`)}
								</div>
							</div>

							<div className={styles.form_item_container}>
								<label className={styles.form_label}>Billing Party Name</label>
								<SelectController
									size="sm"
									name={`invoice_pref.${index}.billing_party`}
									control={control}
									options={billingPartyOptions}
									rules={{ required: { value: true, message: 'Billing Party Name is required' } }}
								/>
								{Error(`invoice_pref.${index}.billing_party`)}
							</div>

							<div className={styles.form_item_container}>
								<label className={styles.form_label}>Billing Party Address</label>
								<SelectController
									size="sm"
									name={`invoice_pref.${index}.billing_party_address`}
									control={control}
									options={billingPartyAddressOptions}
									rules={{ required: { value: true, message: 'Billing Party Address is required' } }}
								/>
								{Error(`invoice_pref.${index}.billing_party_address`)}
							</div>

							<div className={styles.row}>

								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Name</label>
									<SelectController
										size="sm"
										name={`invoice_pref.${index}.invoice_preference_name`}
										control={control}
										options={nameOptions}
										rules={{ required: { value: true, message: 'Name is required' } }}
									/>
									{Error(`invoice_pref.${index}.invoice_preference_name`)}
								</div>

								<div className={styles.form_item_container}>
									<label className={styles.form_label}>Email</label>
									<SelectController
										size="sm"
										name={`invoice_pref.${index}.invoice_preference_email`}
										control={control}
										options={emailOptions}
										rules={{ required: { value: true, message: 'Email is required' } }}
									/>
									{Error(`invoice_pref.${index}.invoice_preference_email`)}
								</div>
							</div>

							<div className={styles.contact_form_item}>
								<div className={styles.country_code}>
									<label className={styles.form_label}>Country Code</label>
									<SelectController
										size="sm"
										name={`invoice_pref.${index}.invoice_preference_country_code`}
										control={control}
										options={countryCodeOptions}
										rules={{ required: { value: true, message: 'Country Code is required' } }}
									/>
									{Error(`invoice_pref.${index}.invoice_preference_country_code`)}
								</div>

								<div className={styles.contact_number}>
									<label className={styles.form_label}>Contact Number</label>
									<SelectController
										size="sm"
										name={`invoice_pref.${index}.invoice_preference_contact_no`}
										control={control}
										options={contactOptions}
										rules={{ required: { value: true, message: 'Contact Number is required' } }}
									/>
									{Error(`invoice_pref.${index}.invoice_preference_contact_no`)}
								</div>
							</div>

							<Button type="button" onClick={() => remove(index)} themeType="tertiary">
								<span className={styles.delete_content}>
									<IcMDelete />
									Delete
								</span>
							</Button>
						</div>
					))}
					<div className={styles.add_container}>
						<Button onClick={() => append(EMPTY_VALUES)} themeType="tertiary">
							<div className={styles.add_content}>
								<IcMPlusInCircle height={16} width={16} />
								&nbsp;
								Add
							</div>
						</Button>
					</div>

					<div className={styles.form_action}>
						<div className={styles.cancel}>
							<Button
								onClick={onCancel}
								size="sm"
								themeType="secondary"
							>
								Cancel

							</Button>
						</div>
						<div>
							<Button
								size="sm"
								themeType="accent"
								onClick={handleSubmit(onSubmit)}
								disabled={createLoading || updateLoading}
							>
								Submit

							</Button>
						</div>
					</div>

				</form>
			)}
		</div>
	);
}
export default InvoicePrefForm;
