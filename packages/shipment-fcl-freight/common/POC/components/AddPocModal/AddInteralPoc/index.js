import { Button, Modal } from '@cogoport/components';
import { SelectController, useForm, useGetAsyncOptions, asyncFieldsPartnerUsers } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import { STAKEHOLDER_CAN_BE_ADDED } from '../../../../../constants/STAKEHOLDER_MAPPING';
import useUpdateShipmentStakeholders from '../../../../../hooks/useUpdateShipmentStakeholders';
import { convertObjectMappingToArray } from '../../../../../utils/convertObjectMappingToArray';

import styles from './styles.module.css';

const showServiceForStakeholder = (stakeholder_type) => !['booking_agent',
	'sales_agent',
	'entity_manager',
	'portfolio_manager',
	'lastmile_ops'].includes(stakeholder_type);

function AddInternalPoc({
	addPoc = {}, setAddPoc = () => {}, services = [], shipment_id,
	stakeholdersTrigger = () => {},
	servicesList = [],
}) {
	const refetch = () => {
		setAddPoc(null);
		stakeholdersTrigger();
	};
	const { apiTrigger, loading } = useUpdateShipmentStakeholders({
		shipment_id,
		refetch,
		successMessage: 'Successfully Added',
	});

	const { control, watch, resetField, handleSubmit, formState:{ errors = {} } } = useForm();
	const formValues = watch();

	const onClose = () => {
		setAddPoc(null);
	};

	const onSubmit = (value) => {
		const { stakeholder_id, stakeholder_type:formStakeholderType, service_type } = value;

		let service_id = '';

		if (service_type) {
			const service = servicesList.find((s) => s.service_type === service_type);
			service_id = service.id;
		}
		const params = {
			stakeholder_id,
			stakeholder_type: formStakeholderType,
			...(service_type && { service_type }),
			...(service_id && { service_id }),

		};

		apiTrigger(params);
	};

	useEffect(() => {
		resetField('service_id');
		resetField('stakeholder_id');
	}, [formValues?.stakeholder_type, resetField]);

	const stakeholderTypeOptions = convertObjectMappingToArray(STAKEHOLDER_CAN_BE_ADDED);
	const serviceOptions = (services || []).map((s) => ({ label: startCase(s), value: s }));

	const stakeholderOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		valueKey    : 'user_id',
		initialCall : false,
	});

	function Error(key) {
		return errors?.[key] ? <div className={styles.errors}>{errors?.[key]?.message}</div> : null;
	}

	return (
		<Modal show={!isEmpty(addPoc)} onClose={onClose} placement="top" size="lg">
			<Modal.Header title="POC - Internal" />
			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
				<div>
					<div>
						<span>Role - </span>
						{startCase(STAKEHOLDER_CAN_BE_ADDED[formValues?.stakeholder_type] || '')}
					</div>
				</div>

				<div>
					<form className={styles.form_container}>
						<div className={styles.form_item_container}>
							<label>Stakeholder Type</label>
							<SelectController
								size="sm"
								control={control}
								name="stakeholder_type"
								options={stakeholderTypeOptions}
								rules={{ required: { value: true, message: 'Stakeholder Type is required' } }}
							/>
							{Error('stakeholder_type')}
						</div>

						{formValues?.stakeholder_type && showServiceForStakeholder(formValues?.stakeholder_type)
							? (
								<div className={styles.form_item_container}>
									<label>Service</label>
									<SelectController
										size="sm"
										control={control}
										name="service_type"
										options={serviceOptions}
										rules={{ required: { value: true, message: 'Service is required' } }}
									/>
									{Error('service_type')}
								</div>
							)
							: null}

						{formValues?.stakeholder_type
						&& (
							<div className={styles.form_item_container}>
								<label>Stakeholder Name</label>
								<SelectController
									size="sm"
									control={control}
									name="stakeholder_id"
									rules={{ required: { value: true, message: 'Stakeholder Name is required' } }}
									{...stakeholderOptions}
								/>
								{Error('stakeholder_id')}
							</div>
						)}
					</form>
				</div>

			</Modal.Body>
			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}>
						<Button
							themeType="secondary"
							onClick={onClose}
							disabled={loading}
						>
							Cancel
						</Button>

					</div>
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
export default AddInternalPoc;
