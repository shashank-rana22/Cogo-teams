import { Button } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';

import { BL_CATEGORY_MAPPING, BL_PREFERENCE_MAPPING } from '../../../../../constants/BL_MAPPING';
import useGetShipmentOperatingProcedure from '../../../../../hooks/useGetShipmentOperatingProcedure';
import { convertObjectMappingToArray } from '../../../../../utils/convertObjectMappingToArray';
import getDocumentOptions from '../../../helpers/getDocumentOptions';

import modeOfDocumentOptions from './modeOfDocumentOptions';
import styles from './styles.module.css';

const DOCUMENT_FORM_FIELDS = ['bl_category', 'bl_preference', 'preferred_mode_of_document_execution', 'name',
	'country_code', 'contact_no', 'address'];

function DocumentForm({ sop_detail = {}, setShowForm = () => {} }) {
	const { data: orgData, loading } = useGetShipmentOperatingProcedure({
		defaultParams  : { org_data_required: true },
		defaultFilters : { service_type: 'fcl_freight' },

	});

	const {
		name:nameOptions = [],
		address:addressOptions = [],
		country_code:countryCodeOptions = [],
		contact_number:contactNoOptions = [],
	} = getDocumentOptions(orgData?.document_handling_preference || []);

	const defaultValues = {};

	DOCUMENT_FORM_FIELDS.forEach((k) => {
		if (sop_detail[k]) defaultValues[k] = sop_detail[k];
	});

	const { control, watch } = useForm({ defaultValues });
	const watchModeOfExecution = watch('preferred_mode_of_document_execution');

	return (
		<div className={styles.form_container}>
			{!loading
				? (
					<form>
						<div className={styles.form_item_container}>
							<label>BL Category</label>
							<SelectController
								size="sm"
								name="bl_category"
								control={control}
								options={convertObjectMappingToArray(BL_CATEGORY_MAPPING)}
							/>
						</div>

						<div className={styles.form_item_container}>
							<label>BL Preferences</label>
							<SelectController
								size="sm"
								name="bl_preference"
								control={control}
								options={convertObjectMappingToArray(BL_PREFERENCE_MAPPING)}
							/>
						</div>

						<div className={styles.form_item_container}>
							<label>Delivery Preferences</label>
							<SelectController
								size="sm"
								name="preferred_mode_of_document_execution"
								control={control}
								options={modeOfDocumentOptions}
							/>
						</div>

						{watchModeOfExecution !== 'telex'
						&& (
							<div className={styles.form_item_container}>
								<label>{watchModeOfExecution === 'pickup' ? "Receiver's Name" : 'Name'}</label>
								<SelectController
									size="sm"
									name="name"
									control={control}
									options={nameOptions}
								/>
							</div>
						)}
						<div className={styles.contact_form_item}>
							{watchModeOfExecution !== 'telex'
							&& 						(
								<div className={styles.country_code}>
									<label>Country Code</label>
									<SelectController
										size="sm"
										name="country_code"
										control={control}
										options={countryCodeOptions}
									/>
								</div>
							)}

							{watchModeOfExecution !== 'telex'
							&& 						(
								<div className={styles.contact_number}>
									<label>
										{watchModeOfExecution === 'pickup' ? "Receiver's Contact Number" : 'Contact'}
									</label>
									<SelectController
										size="sm"
										name="contact_no"
										control={control}
										options={contactNoOptions}
									/>
								</div>
							)}
						</div>

						{watchModeOfExecution !== 'telex'
						&& 						(
							<div className={styles.form_item_container}>
								<label>{watchModeOfExecution === 'pickup' ? 'Pickup Address' : 'Address'}</label>
								<SelectController
									size="sm"
									name="address"
									control={control}
									options={addressOptions}
								/>
							</div>
						)}

						<div className={styles.form_action}>
							<div className={styles.cancel}>
								<Button
									onClick={() => { setShowForm(false); }}
									size="sm"
									themeType="secondary"
								>
									Cancel
								</Button>
							</div>

							<div>
								<Button
									onClick={() => { setShowForm(false); }}
									size="sm"
									themeType="accent"
								>
									Submit
								</Button>
							</div>

						</div>
					</form>
				) : null}
		</div>
	);
}
export default DocumentForm;
