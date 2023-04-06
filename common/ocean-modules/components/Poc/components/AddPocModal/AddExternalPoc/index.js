import { Button, Modal } from '@cogoport/components';
import {
	asyncFieldsLocations, InputController, MobileNumberController, MultiselectController,
	SelectController, useForm, useGetAsyncOptions,
} from '@cogoport/forms';
import { isEmpty, upperCase } from '@cogoport/utils';

import POC_PROCESS_MAPPING from '../../../../../contants/POC_PROCESS_MAPPIING';
import POC_WORKSCOPE_MAPPING from '../../../../../contants/POC_WORKSCOPE_MAPPING';
import useCreateOrganizationPoc from '../../../../../hooks/useCreateOrganizationPoc';
import { convertObjectMappingToArray } from '../../../../../utils/convertObjectMappingToArray';
import validateMobileNumber from '../../../../../utils/validateMobileNumber';

import getCreateOrgPocParams from './helpers/getCreateOrgPocParams';
import styles from './styles.module.css';

function AddExternalPoc({
	addPoc = {},
	setAddPoc = () => {},
	importer_exporter_id = '',
	tradePartnerTrigger = () => {},
	shipment_id = '',
}) {
	const {	organization_branch_name = '', trade_type = ''	} = addPoc;

	const onClose = () => setAddPoc(null);

	const createRefetch = () => {
		onClose();
		tradePartnerTrigger();
	};

	const { apiTrigger, loading } = useCreateOrganizationPoc({
		shipment_id,
		organization_id : importer_exporter_id,
		refetch         : createRefetch,
	});

	const { control, formState:{ errors = {} }, handleSubmit } = useForm();

	const title = (
		<div>
			<div>{`ADD EXTERNAL ${upperCase(trade_type)} POC`}</div>

			<div>
				Company Name:&nbsp;
				<span>{organization_branch_name}</span>
			</div>
		</div>
	);

	const onSubmit = (value) => {
		const params = getCreateOrgPocParams({ formValues: value, trade_type });
		apiTrigger(params);
	};

	const pocessOptions = convertObjectMappingToArray(POC_PROCESS_MAPPING[trade_type]);
	const workScopeOptions = convertObjectMappingToArray(POC_WORKSCOPE_MAPPING);
	const originAsyncOptions = useGetAsyncOptions(asyncFieldsLocations());

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<Modal show={!isEmpty(addPoc)} onClose={onClose} placement="top" size="lg">
			<Modal.Header title={title} />
			<Modal.Body style={{ maxHeight: '500px' }}>
				<div>
					<form>
						<div className={styles.row}>
							<div className={styles.form_item_container}>
								<label>Process</label>
								<MultiselectController
									size="sm"
									control={control}
									name="processes"
									options={pocessOptions}
									rules={{ required: { value: true, message: 'Process is required' } }}
								/>
								{Error('processes')}
							</div>

							<div className={styles.form_item_container}>
								<label>POC Name</label>
								<InputController
									size="sm"
									control={control}
									name="name"
									rules={{ required: { value: true, message: 'POC Name is required' } }}
								/>
								{Error('name')}
							</div>
						</div>

						<div className={styles.row}>
							<div className={styles.form_item_container}>
								<label>Workscope</label>
								<MultiselectController
									size="sm"
									control={control}
									name="work_scopes"
									options={workScopeOptions}
									rules={{ required: { value: true, message: 'Workscope is required' } }}
								/>
								{Error('work_scopes')}
							</div>

							<div className={styles.form_item_container}>
								<label>Email Address</label>
								<InputController
									size="sm"
									control={control}
									name="email"
									rules={{ required: { value: true, message: 'Email is required' } }}
								/>
								{Error('email')}
							</div>
						</div>

						<div className={styles.row}>
							<div className={styles.form_item_container}>
								<label>Mobile Number</label>
								<MobileNumberController
									size="sm"
									control={control}
									name="mobile_number"
									rules={{
										validate: validateMobileNumber,
									}}
								/>
								{Error('mobile_number')}
							</div>

							<div className={styles.form_item_container}>
								<label>Alternate Mobile Number (optional)</label>
								<MobileNumberController size="sm" control={control} name="alternate_mobile_number" />
							</div>

						</div>

						<div className={styles.location}>
							<label>Location / Branch Name</label>
							<SelectController
								size="sm"
								control={control}
								name="origin_location_id"
								rules={{ required: { value: true, message: 'Location / Branch Name is required' } }}
								{...originAsyncOptions}
							/>
							{Error('origin_location_id')}
						</div>

					</form>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}><Button themeType="secondary" onClick={onClose}>Cancel</Button></div>
					<div>
						<Button
							themeType="accent"
							onClick={handleSubmit(onSubmit)}
							disabled={loading}
						>
							Submit
						</Button>

					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default AddExternalPoc;
