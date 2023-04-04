import { Button, Modal, Select } from '@cogoport/components';
import { asyncFieldsPartnerUsers, useGetAsyncOptions } from '@cogoport/forms';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useUpdateShipmentStakeholders from '../../../../../hooks/useUpdateShipmentStakeholders';

import styles from './styles.module.css';

function EditInternalPoc({ setAddPoc = () => {}, addPoc, shipment_id, stakeholdersTrigger = () => {} }) {
	const { stakeholder_type = '', service_type = '', stakeholder_id:current_stakeholder_id = '', service_id } = addPoc;

	const [stakeholder_id, set_stakeholder_id] = useState('');

	const refetch = () => {
		setAddPoc(null);
		stakeholdersTrigger();
	};

	const { apiTrigger, loading } = useUpdateShipmentStakeholders({ shipment_id, refetch });

	const onClose = () => {
		setAddPoc(null);
	};

	const onSubmit = () => {
		const params = {
			stakeholder_id,
			stakeholder_type,
			...(service_type && { service_type }),
			...(service_id && { service_id }),
		};

		apiTrigger(params);
	};

	const stakeholderOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		valueKey    : 'user_id',
		initialCall : false,
	});

	useEffect(() => {
		set_stakeholder_id(current_stakeholder_id);
	}, [current_stakeholder_id]);

	return (
		<Modal show={!isEmpty(addPoc)} onClose={onClose} placement="top">
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
					<div className={styles.form_item_container}>
						<div>Stakeholder Name</div>
						<Select
							value={stakeholder_id}
							onChange={set_stakeholder_id}
							size="sm"
							{...stakeholderOptions}
						/>
					</div>
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
							onClick={onSubmit}
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
export default EditInternalPoc;
