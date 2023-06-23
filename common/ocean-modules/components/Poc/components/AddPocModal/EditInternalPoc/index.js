import { Button, Modal } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';

import useBulkShipmentStakeholderReallocation from '../../../../../hooks/useBulkShipmentStakeholderReallocation';
import getBulkUpdateStakeholdersPayload from '../../../helpers/getBulkUpdateStakeholdersPayload';
import getEditBulkStakeholdersDefaultValues from '../../../helpers/getEditBulkStakeholdersDefaultValues';
import getServicesWithStakeholder from '../../../helpers/getServicesWithStakeholder';
import EditBulkStakeholders from '../../EditBulkStakeholders';

import styles from './styles.module.css';

function EditInternalPoc({
	setAddPoc = () => {},
	addPoc,
	servicesList = {},
	shipment_id,
	stakeholdersTrigger = () => {},
}) {
	const { stakeholder_type = '', service_type = '' } = addPoc;

	const { stakeholderTaggedInServices } = getServicesWithStakeholder({ servicesList, ...addPoc });

	const { DEFAULT_VALUES, FIELD_ARRAY_KEY } = getEditBulkStakeholdersDefaultValues({
		services: stakeholderTaggedInServices,
		...addPoc,
	});

	const { formState: { errors }, control, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES });
	const { fields } = useFieldArray({ control, name: FIELD_ARRAY_KEY });

	const refetch = () => {
		setAddPoc(null);
		stakeholdersTrigger();
	};

	const { loading, apiTrigger: updateBulkStakeholders } = useBulkShipmentStakeholderReallocation({ refetch });

	const onClose = () => setAddPoc(null);

	const onSubmit = (formValues) => {
		const payload = getBulkUpdateStakeholdersPayload({ addPoc, shipment_id, formValues, FIELD_ARRAY_KEY });

		updateBulkStakeholders(payload);
	};

	return (
		<Modal show={!isEmpty(addPoc)} onClose={onClose} placement="top" size="lg">
			<Modal.Header title="POC - Internal" />

			<Modal.Body style={{ maxHeight: '500px', minHeight: '200px' }}>
				<div>
					<div>
						<span className={styles.sub_heading}>Role - </span>
						<span className={styles.content}>{startCase(stakeholder_type)}</span>
					</div>

					{service_type ? (
						<div>
							<span className={styles.sub_heading}>Service - </span>
							<span className={styles.content}>{startCase(service_type)}</span>
						</div>
					) : null}

					<EditBulkStakeholders
						fields={fields}
						control={control}
						errors={errors}
						FIELD_ARRAY_KEY={FIELD_ARRAY_KEY}
					/>
				</div>
			</Modal.Body>

			<Modal.Footer className={styles.actions}>
				<Button
					themeType="secondary"
					onClick={onClose}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					themeType="accent"
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default EditInternalPoc;
