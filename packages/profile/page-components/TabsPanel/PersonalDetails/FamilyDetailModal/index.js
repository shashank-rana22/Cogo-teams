import { Button, Modal } from '@cogoport/components';
import { InputController, SelectController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const options = [
	{ label: 'Yes', value: 'yes' },
	{ label: 'No', value: 'no' },
];
function FamilyDetailModal({ control = () => {}, show = false, handleModal = () => {} }) {
	return (
		<div>
			<Modal size="md" show={show} onClose={handleModal} placement="center">
				<Modal.Header title="Edit Family Details" />
				<Modal.Body>
					<div className={styles.modal_form}>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter fathers Name</div>
							<InputController
								control={control}
								name="fathers_name"
								type="text"
								placeholder="Enter Father's name"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter mothers Name</div>
							<InputController
								control={control}
								name="mothers_name"
								type="text"
								placeholder="Enter Mother's name"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter fathers Number</div>
							<InputController
								control={control}
								name="fathers_number"
								type="number"
								placeholder="Enter Father's Number"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter fathers Number</div>
							<InputController
								control={control}
								name="mothers_number"
								type="number"
								placeholder="Enter Mother's Number"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Are your parents senior citizens?</div>
							<SelectController
								control={control}
								name="senior_citizens"
								options={options}
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Dependent/Disability</div>
							<SelectController
								control={control}
								name="disability"
								options={options}
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Allergies if any</div>
							<InputController
								control={control}
								name="allergies"
								type="text"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Blood Group</div>
							<InputController
								control={control}
								name="blood_group"
								type="text"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Guardians Name</div>
							<InputController
								control={control}
								name="guardians_name"
								type="text"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Guardians Phone Number</div>
							<InputController
								control={control}
								name="guardians_number"
								type="number"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Family Physician</div>
							<InputController
								control={control}
								name="family_physician"
								type="text"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Family Physician Number</div>
							<InputController
								control={control}
								name="family_physician_number"
								type="number"
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleModal}>OK</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default FamilyDetailModal;
