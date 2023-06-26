import { Button, Modal } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';

import useBulkReallocateShipmentStakeholders from '../../../../../hooks/useBulkReallocateShipmentStakeholders';
import getBulkUpdateStakeholdersPayload from '../../../helpers/getBulkUpdateStakeholdersPayload';
import getEditBulkStakeholdersDefaultValues from '../../../helpers/getEditBulkStakeholdersDefaultValues';
import getServicesWithStakeholder from '../../../helpers/getServicesWithStakeholder';
import EditBulkStakeholders from '../../EditBulkStakeholders';

import styles from './styles.module.css';

function EditInternalPoc({
	setAddPoc = () => {},
	addPoc,
	shipment_id,
	stakeholdersTrigger = () => {},
	listStakeholdersData = [],
	servicesList = {},
}) {
	const { stakeholder_type = '', service_type = '' } = addPoc;

	const { modifiedServicesList } = getServicesWithStakeholder({ listStakeholdersData, addPoc, servicesList });

	const { DEFAULT_VALUES, fieldArrayKey } = getEditBulkStakeholdersDefaultValues({
		modifiedServicesList,
		...addPoc,
	});

	const formProps = useForm({ defaultValues: DEFAULT_VALUES });
	const { control, handleSubmit } = formProps;
	const { fields } = useFieldArray({ control, name: fieldArrayKey });

	const refetch = () => {
		setAddPoc(null);
		stakeholdersTrigger();
	};

	const { loading, apiTrigger: updateBulkStakeholders } = useBulkReallocateShipmentStakeholders({ refetch });

	const onClose = () => setAddPoc(null);

	const onSubmit = (formValues) => {
		const payload = getBulkUpdateStakeholdersPayload({ addPoc, shipment_id, formValues, fieldArrayKey });

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
						formProps={formProps}
						fieldArrayKey={fieldArrayKey}
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
