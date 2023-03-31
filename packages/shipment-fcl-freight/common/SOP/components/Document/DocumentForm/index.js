import { Button, Loader } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';

import { BL_CATEGORY_MAPPING, BL_PREFERENCE_MAPPING } from '../../../../../constants/BL_MAPPING';
import useCreateShipmentOperatingInstruction from '../../../../../hooks/useCreateShipmentOperatingInstruction';
import useGetShipmentOperatingProcedure from '../../../../../hooks/useGetShipmentOperatingProcedure';
import useUpdateShipmentOperatingInstruction from '../../../../../hooks/useUpdateShipmentOperatingInstruction';
import { convertObjectMappingToArray } from '../../../../../utils/convertObjectMappingToArray';
import getDocumentOptions from '../../../helpers/getDocumentOptions';
import getCreateInstructionParams from '../helpers/getCreateInstructionParams';
import getUpdateInstructionParams from '../helpers/getUpdateInstructionParams';

import modeOfDocumentOptions from './modeOfDocumentOptions';
import styles from './styles.module.css';

const DOCUMENT_FORM_FIELDS = ['bl_category', 'bl_preference', 'preferred_mode_of_document_execution', 'name',
	'country_code', 'contact_no', 'address'];

function DocumentForm({
	sop_detail = {},
	setShowForm = () => {},
	shipment_ids = {},
	showForm = '',
	instruction_id = '',
	getProcedureTrigger = () => {},
	auditsTrigger = () => {},
	primary_service = {},
}) {
	const { shipment_id, organization_id, procedure_id } = shipment_ids;
	const { trade_type } = primary_service || {};

	const afterUpdateOrCreateRefetch = () => {
		setShowForm(false);
		getProcedureTrigger();
		if (showForm === 'edit') auditsTrigger();
	};

	const { data: orgData, loading } = useGetShipmentOperatingProcedure({
		defaultParams  : { org_data_required: true },
		defaultFilters : { service_type: 'fcl_freight', trade_type },
		shipment_id,
		organization_id,
	});

	const { apiTrigger:createTrigger, loading:createLoading } =	 useCreateShipmentOperatingInstruction({
		shipment_id,
		organization_id,
		procedure_id,
		refetch: afterUpdateOrCreateRefetch,
	});

	const { apiTrigger:updateTrigger, loading:updateLoading } = useUpdateShipmentOperatingInstruction({
		procedure_id,
		instruction : 'document_handling_preference',
		refetch     : afterUpdateOrCreateRefetch,
	});

	const {
		name:nameOptions = [],
		address:addressOptions = [],
		country_code:countryCodeOptions = [],
		contact_number:contactNoOptions = [],
	} = getDocumentOptions(orgData?.document_handling_preference || []);

	const defaultValues = {};

	DOCUMENT_FORM_FIELDS.forEach((k) => { if (sop_detail[k]) defaultValues[k] = sop_detail[k]; });

	const { control, watch, handleSubmit, formState:{ errors = {} } } = useForm({ defaultValues });

	const watchModeOfExecution = watch('preferred_mode_of_document_execution');

	const onSubmit = (formValues) => {
		if (showForm === 'edit') {
			const params = getUpdateInstructionParams({ formValues, instruction_id });
			updateTrigger(params);
			return;
		}

		const params = getCreateInstructionParams({ formValues });
		createTrigger(params);
	};

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<div className={styles.form_container}>
			{loading && <Loader />}
			{!loading
				? (
					<form>
						<div className={styles.form_item_container}>
							<label className={styles.form_label}>BL Category</label>
							<SelectController
								size="sm"
								name="bl_category"
								control={control}
								options={convertObjectMappingToArray(BL_CATEGORY_MAPPING)}
								rules={{ required: { value: true, message: 'BL Category is required' } }}
							/>
							{Error('bl_category')}
						</div>

						<div className={styles.form_item_container}>
							<label className={styles.form_label}>
								BL Preferences

							</label>
							<SelectController
								size="sm"
								name="bl_preference"
								control={control}
								options={convertObjectMappingToArray(BL_PREFERENCE_MAPPING)}
								rules={{ required: { value: true, message: 'BL Preferences is required' } }}
							/>
							{Error('bl_preference')}
						</div>

						<div className={styles.form_item_container}>
							<label className={styles.form_label}>
								Delivery Preferences

							</label>
							<SelectController
								size="sm"
								name="preferred_mode_of_document_execution"
								control={control}
								options={modeOfDocumentOptions}
								rules={{ required: { value: true, message: 'Delivery Preferences is required' } }}
							/>
							{Error('preferred_mode_of_document_execution')}
						</div>

						{watchModeOfExecution !== 'telex'
						&& (
							<div className={styles.form_item_container}>
								<label className={styles.form_label}>
									{watchModeOfExecution === 'pickup' ? "Receiver's Name" : 'Name'}

								</label>
								<SelectController
									size="sm"
									name="name"
									control={control}
									options={nameOptions}
									rules={{ required: { value: true, message: 'Name is required' } }}
								/>
								{Error('name')}
							</div>
						)}
						<div className={styles.contact_form_item}>
							{watchModeOfExecution !== 'telex'
							&& 						(
								<div className={styles.country_code}>
									<label className={styles.form_label}>
										Country Code

									</label>
									<SelectController
										size="sm"
										name="country_code"
										control={control}
										options={countryCodeOptions}
										rules={{ required: { value: true, message: 'Country Code is required' } }}
									/>
									{Error('country_code')}
								</div>
							)}

							{watchModeOfExecution !== 'telex'
							&& 						(
								<div className={styles.contact_number}>
									<label className={styles.form_label}>
										{watchModeOfExecution === 'pickup' ? "Receiver's Contact Number" : 'Contact'}
									</label>
									<SelectController
										size="sm"
										name="contact_no"
										control={control}
										options={contactNoOptions}
										rules={{ required: { value: true, message: 'Contact is required' } }}
									/>
									{Error('contact_no')}
								</div>
							)}
						</div>

						{watchModeOfExecution !== 'telex'
						&& 						(
							<div className={styles.form_item_container}>
								<label className={styles.form_label}>
									{watchModeOfExecution === 'pickup' ? 'Pickup Address' : 'Address'}

								</label>
								<SelectController
									size="sm"
									name="address"
									control={control}
									options={addressOptions}
									rules={{ required: { value: true, message: 'Address is required' } }}
								/>
								{Error('address')}
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
									onClick={handleSubmit(onSubmit)}
									size="sm"
									themeType="accent"
									disabled={updateLoading || createLoading}
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
