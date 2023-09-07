import { Button } from '@cogoport/components';
import {
	AsyncSelectController,
	CheckboxController,
	DatepickerController,
	InputController,
	useForm,
} from '@cogoport/forms';
import { IcMArrowRight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ModalComponent from './ModalComponent';
import styles from './styles.module.css';

function HandoverTakeover() {
	const [showModal, setShowModal] = useState(false);

	const { control, handleSubmit, formState: { errors } } = useForm();

	const onSubmit = (values) => {
		console.log('values :: ', values);
		setShowModal(true);
	};

	return (
		<div>
			<div className={styles.title}>ASSIGN HANDOVER/TAKEOVER</div>
			<div className={styles.sub_heading}>Select people for HOTO</div>

			<div className={styles.styled_component}>
				<div className={styles.header}>Status</div>

				<div className={styles.controller}>
					<div className={styles.handover_by}>
						<div className={styles.label}>Handover By*</div>
						<AsyncSelectController
							name="handover_by"
							asyncKey="list_employees"
							placeholder="Type to search..."
							initialCall
							control={control}
							params={{ filters: { employee_status: ['confirmed', 'probation'] } }}
							size="md"
							rules={{ required: true }}
						/>
						<div className={styles.error}>{errors?.handover_by ? '*required' : null}</div>
					</div>

					<div className={styles.takeover_by}>
						<div className={styles.label}>Takeover By*</div>
						<AsyncSelectController
							name="takeover_by"
							asyncKey="list_employees"
							placeholder="Type to search..."
							initialCall
							control={control}
							params={{ filters: { employee_status: ['confirmed', 'probation'] } }}
							size="md"
							rules={{ required: true }}
						/>
						<div className={styles.error}>{errors?.takeover_by ? '*required' : null}</div>
					</div>
				</div>

				<div className={styles.Additional_remark}>
					<div className={styles.label}>Additional Remark (if any)</div>
					<InputController
						control={control}
						name="Additional_remark"
					/>
				</div>
			</div>

			<div className={styles.styled_component}>
				<div className={styles.header}>Suggest Last Working Day</div>
				<DatepickerController
					placeholder="Select Date"
					name="suggested_last_working_day"
					control={control}
					rules={{ required: true }}
				/>
				<div className={styles.error}>{errors?.suggested_last_working_day ? '*required' : null}</div>
			</div>

			<div className={styles.styled_component}>
				<div className={styles.header}>Notes for HRBP</div>
				<InputController
					placeholder="Type your notes here..."
					name="notes_for_hrbp"
					control={control}
				/>
			</div>

			<div className={styles.styled_component}>
				<div className={styles.title}>TERMS & CONDITIONS</div>
				<div className={styles.sub_heading} style={{ fontSize: 12 }}>PLEASE READ CAREFULLY</div>

				<div className={styles.checkbox_container}>
					<CheckboxController
						control={control}
						name="accept_tnc"
						type="checkbox"
					/>
					<div>
						The details you provide guide critical decisions, making accuracy paramount.
						By submitting this form, you affirm the accuracy of all information.
						Any discrepancies could lead to losses for which you&#39;ll bear full responsibility.
						This self-attestation is legally binding.
						<br />
						<br />
						Enter your Full Name, confirm your understanding and commitment to these terms.
					</div>
				</div>

				<div>
					<div className={styles.header} style={{ marginTop: 16 }}>Full Name</div>
					<InputController
						control={control}
						name="full_name"
						rules={{ required: '*required' }}
					/>
					<div className={styles.error}>{errors?.full_name ? '*required' : null}</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button onClick={handleSubmit(onSubmit)}>
					Accept & Proceed
					<IcMArrowRight height="18px" width="18px" />
				</Button>
			</div>

			<ModalComponent showModal={showModal} setShowModal={setShowModal} />
		</div>
	);
}

export default HandoverTakeover;
