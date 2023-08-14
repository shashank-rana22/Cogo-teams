import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import useCreateFeedback from '../../../../hooks/useCreateFeedback';
import { CONTROLS, CONTROL_MAPPING } from '../../../../utils/controls';

import styles from './styles.module.css';

function SelfRatingForm({ open, onHide, ratingCycle, refetch }) {
	const { createFeedback, loading } = useCreateFeedback({ ratingCycle, refetch, onHide });

	const { handleSubmit, control, formState: { errors } } = useForm();

	const onSubmit = (values) => {
		createFeedback(values);
	};

	return (
		<Modal size="md" show={open} onClose={onHide} placement="top">
			<Modal.Header title="Self Rating Form" />
			<Modal.Body>
				<form onSubmit={handleSubmit(onSubmit)}>
					{CONTROLS.map((val) => {
						const ControllerType = CONTROL_MAPPING[val.inputType];

						return (
							<div className={styles.controller_container} key={val.name}>
								<div className={styles.label}>{val.label}</div>
								<ControllerType {...val} control={control} />
								{errors[val.name] && <div className={styles.error}>{errors[val.name].message}</div>}
							</div>
						);
					})}

					<div className={styles.btn_container}>
						<Button
							size="md"
							className={styles.cancel_btn}
							themeType="secondary"
							onClick={onHide}
							disabled={loading}
						>
							Cancel

						</Button>
						<Button size="md" disabled={loading} type="submit">Submit</Button>
					</div>

				</form>
			</Modal.Body>
		</Modal>
	);
}

export default SelfRatingForm;
