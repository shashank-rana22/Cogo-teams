import { Button, Modal } from '@cogoport/components';
import { InputController, SelectController, DatepickerController } from '@cogoport/forms';
import React from 'react';

import { gender_options, marry_options } from '../../../../utils/constants';

import styles from './styles.module.css';

function PersonalDetailModal({ control = () => {}, show = false, handleModal = () => {} }) {
	return (
		<div>
			{' '}
			<Modal size="md" show={show} onClose={handleModal} placement="center">
				<Modal.Header title="Edit Personal Details" />
				<Modal.Body>
					<div className={styles.modal_form}>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter First Name</div>
							<InputController
								control={control}
								name="first_name"
								type="text"
								placeholder="Enter first name"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Last Name</div>
							<InputController
								control={control}
								name="last_name"
								type="text"
								placeholder="Enter Last name"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Email</div>
							<InputController
								control={control}
								name="email"
								type="email"
								placeholder="Enter Email"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Number</div>
							<InputController
								control={control}
								name="number"
								type="number"
								placeholder="Enter Number"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Personal Email</div>
							<InputController
								control={control}
								name="personal_email"
								type="email"
								placeholder="Enter Personal Email"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter Alternate Number</div>
							<InputController
								control={control}
								name="alternate_number"
								type="number"
								placeholder="Enter Alternate Number"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Select Gender</div>
							<SelectController
								control={control}
								name="gender"
								options={gender_options}
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Enter D.O.B.</div>
							<DatepickerController
								control={control}
								name="date_of_birth"
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Select Marital Status</div>
							<SelectController
								control={control}
								name="marital_status"
								options={marry_options}
							/>
						</div>
						<div className={styles.form_data}>
							<div className={styles.modal_heading}>Disability if any</div>
							<InputController
								control={control}
								name="disability"
								type="text"
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
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleModal}>OK</Button>
				</Modal.Footer>
			</Modal>

		</div>
	);
}

export default PersonalDetailModal;
