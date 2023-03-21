import { Button, Modal, Select } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function EditInternalPoc({ setAddPoc = () => {}, addPoc }) {
	const { stakeholder_type = '', service_type = '', stakeholder_id:current_stakeholder_id = '' } = addPoc;

	const [stakeholder_id, set_stakeholder_id] = useState(current_stakeholder_id);

	useEffect(() => {
		set_stakeholder_id(current_stakeholder_id);
	}, [current_stakeholder_id]);

	const onClose = () => {
		setAddPoc(null);
	};

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
							<span className={styles.sub_heading}>Serivice - </span>
							<span className={styles.content}>{startCase(service_type)}</span>
						</div>
					) : null}
					<div className={styles.form_item_container}>
						<div>Stakeholder Name</div>
						<Select options={[]} value={stakeholder_id} onChange={set_stakeholder_id} size="sm" />
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}><Button themeType="secondary" onClick={onClose}>Cancel</Button></div>
					<div><Button themeType="accent">Submit</Button></div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default EditInternalPoc;
