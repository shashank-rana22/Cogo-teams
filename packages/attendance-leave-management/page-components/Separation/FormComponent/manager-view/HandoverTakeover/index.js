import { Button } from '@cogoport/components';
import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	CheckboxController,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import ModalComponent from './ModalComponent';
import styles from './styles.module.css';
import useHandoverTakeover from './useHandoverTakeover';

function HandoverTakeover({ data = {}, refetch = () => {} }) {
	const {
		showModal,
		setShowModal,
		control,
		handleSubmit,
		errors,
		onSubmit,
		loading,
		is_complete,
	} = useHandoverTakeover({ data, refetch });

	const { applicant_details } = data || {};
	const { employee_id } = applicant_details || {};

	return (
		<div>
			<div className={styles.title}>ASSIGN HANDOVER/TAKEOVER</div>
			<div className={styles.sub_heading}>Select people for HOTO</div>

			{is_complete ? (
				<div className={styles.completed}>
					<img
						src={GLOBAL_CONSTANTS.image_url.tick_icon_green}
						width="20px"
						height="20px"
						alt="Empty-state"
						style={{ marginRight: 10 }}
					/>
					You have successfully completed your tasks. No further changes are allowed.
				</div>
			) : null}

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
							params={{ filters: { status: 'active' } }}
							size="md"
							value={employee_id}
							disabled
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
							params={{ filters: { status: 'active' }, source: 'api' }}
							size="md"
							disabled={is_complete}
							rules={{ required: true }}
						/>
						<div className={styles.error}>{errors?.takeover_by ? '*required' : null}</div>
					</div>
				</div>

				<div className={styles.Additional_remark}>
					<div className={styles.label}>Additional Remark (if any)</div>
					<InputController
						control={control}
						name="additional_remark"
						disabled={is_complete}
					/>
				</div>
			</div>

			<div className={styles.styled_component}>
				<div className={styles.header}>Suggest Last Working Day</div>
				<DatepickerController
					placeholder="Select Date"
					name="last_working_day"
					control={control}
					rules={{ required: true }}
					disabled={is_complete}
				/>
				<div className={styles.error}>{errors?.last_working_day ? '*required' : null}</div>
			</div>

			<div className={styles.styled_component}>
				<div className={styles.header}>Notes for HRBP</div>
				<InputController
					placeholder="Type your notes here..."
					name="notes_for_hrbp"
					control={control}
					disabled={is_complete}
				/>
			</div>

			<div className={styles.styled_component}>
				<div className={styles.title}>TERMS & CONDITIONS</div>
				<div className={styles.sub_heading} style={{ fontSize: 12 }}>PLEASE READ CAREFULLY</div>

				<div className={styles.checkbox_container}>
					<CheckboxController
						control={control}
						name="accept_tnc"
						disabled={is_complete}
						rules={{ required: { value: true, message: '*required' } }}
					/>
					<div>
						The details you provide guide critical decisions, making accuracy paramount.
						By submitting this form, you affirm the accuracy of all information.
						Any discrepancies could lead to losses for which you&#39;ll bear full responsibility.
						This self-attestation is legally binding.
						<br />
						<br />
						Enter your Full Name, confirm your understanding and commitment to these terms.

						<div className={styles.error}>{errors?.accept_tnc ? '*required' : null}</div>
					</div>
				</div>

				<div>
					<div className={styles.header} style={{ marginTop: 16 }}>Full Name</div>
					<InputController
						control={control}
						name="full_name"
						rules={{ required: '*required' }}
						disabled={is_complete}
					/>
					<div className={styles.error}>{errors?.full_name ? '*required' : null}</div>
				</div>
			</div>

			{!is_complete
				? (
					<div className={styles.button_container}>
						<Button onClick={handleSubmit(() => setShowModal(true))}>
							Accept & Proceed
							<IcMArrowRight height="18px" width="18px" />
						</Button>
					</div>
				) : null}

			<ModalComponent
				showModal={showModal}
				setShowModal={setShowModal}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				loading={loading}
			/>
		</div>
	);
}

export default HandoverTakeover;
