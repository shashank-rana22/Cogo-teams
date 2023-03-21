import { Button } from '@cogoport/components';
import { SelectController, useFieldArray, useForm } from '@cogoport/forms';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';

import useGetShipmentOperatingProcedure from '../../../../../hooks/useGetShipmentOperatingProcedure';

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

function InvoicePrefForm({ setShowForm = () => {}, data = [], showForm = '' }) {
	const { data: orgData, loading } = useGetShipmentOperatingProcedure({
		defaultParams  : { org_data_required: true },
		defaultFilters : { service_type: 'fcl_freight' },

	});

	const { sop_detail = {} } = data?.[0] || {};

	const defaultValue = EMPTY_VALUES;
	if (showForm === 'edit') {
		Object.keys(defaultValue).forEach((key) => { defaultValue[key] = sop_detail[key] || ''; });
	}

	const { control } = useForm({
		defaultValues: {
			invoice_pref: [defaultValue],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'invoice_pref',

	});

	return (
		<div className={styles.form_container}>

			<form>
				{fields.map((item, index) => (
					<div key={item.id} className={styles.field_array_container}>
						<div className={styles.row}>
							<div className={styles.form_item_container}>
								<label>Service</label>
								<SelectController
									size="sm"
									name={`invoice_pref.${index}.invoice_preference_service`}
									control={control}
								/>
							</div>

							<div className={styles.form_item_container}>
								<label>Invoicing Partner</label>
								<SelectController
									size="sm"
									name={`invoice_pref.${index}.invoicing_party`}
									control={control}
								/>
							</div>
						</div>

						<div className={styles.form_item_container}>
							<label>Billing Party Name</label>
							<SelectController
								size="sm"
								name={`invoice_pref.${index}.billing_party`}
								control={control}
							/>
						</div>

						<div className={styles.form_item_container}>
							<label>Billing Party Address</label>
							<SelectController
								size="sm"
								name={`invoice_pref.${index}.billing_party_address`}
								control={control}
							/>
						</div>

						<div className={styles.row}>

							<div className={styles.form_item_container}>
								<label>Name</label>
								<SelectController
									size="sm"
									name={`invoice_pref.${index}.invoice_preference_name`}
									control={control}
								/>
							</div>

							<div className={styles.form_item_container}>
								<label>Email</label>
								<SelectController
									size="sm"
									name={`invoice_pref.${index}.invoice_preference_email`}
									control={control}
								/>
							</div>
						</div>

						<div className={styles.contact_form_item}>
							<div className={styles.country_code}>
								<label>Country Code</label>
								<SelectController
									size="sm"
									name={`invoice_pref.${index}.invoice_preference_country_code`}
									control={control}
								/>
							</div>

							<div className={styles.contact_number}>
								<label>Contact Number</label>
								<SelectController
									size="sm"
									name={`invoice_pref.${index}.invoice_preference_contact_no`}
									control={control}
								/>
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
							onClick={() => setShowForm(false)}
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
						>
							Submit

						</Button>
					</div>
				</div>

			</form>
		</div>
	);
}
export default InvoicePrefForm;
