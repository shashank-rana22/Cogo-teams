import { Button, Modal } from '@cogoport/components';
import { SelectController, useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import STAKEHOLDER_MAPPING from '../../../../../constants/STAKEHOLDER_MAPPING';
import { convertObjectMappingToArray } from '../../../../../utils/convertObjectMappingToArray';

import styles from './styles.module.css';

const showServiceForStakeholder = (stakeholder_type) => !['booking_agent',
	'sales_agent',
	'entity_manager',
	'portfolio_manager',
	'lastmile_ops'].includes(stakeholder_type);

function AddInternalPoc({ addPoc = {}, setAddPoc = () => {} }) {
	const { stakeholder_type = '' } = addPoc;

	const { control, watch, resetField, handleSubmit, formState:{ errors = {} } } = useForm();
	const formValues = watch();

	const onClose = () => {
		setAddPoc(null);
	};

	const onSubmit = (value) => {
		console.log({ value });
	};

	useEffect(() => {
		resetField('service_id');
		resetField('stakeholder_id');
	}, [formValues?.stakeholder_type]);

	const stakeholderTypeOptions = convertObjectMappingToArray(STAKEHOLDER_MAPPING);

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
						{startCase(stakeholder_type)}
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
										name="service_id"
										options={[]}
										rules={{ required: { value: true, message: 'Service is required' } }}
									/>
									{Error('service_id')}
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
								/>
								{Error('stakeholder_id')}
							</div>
						)}
					</form>
				</div>

			</Modal.Body>
			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}><Button themeType="secondary" onClick={onClose}>Cancel</Button></div>
					<div><Button themeType="accent" onClick={handleSubmit(onSubmit)}>Submit</Button></div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default AddInternalPoc;
