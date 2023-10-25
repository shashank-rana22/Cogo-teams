import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import FormLayout from '../../../../../../../common/FormLayout';
import { SCHEDULE_DEMO_CONTROLS } from '../../../../../../../configurations/schedule-demo-controls';

import styles from './styles.module.css';

function ScheduleDemo({ scheduleDemo = {}, setScheduleDemo = () => {} }) {
	const { isScheduleDemo = false } = scheduleDemo || {};

	const {
		control, formState:{ errors = {} },
		// handleSubmit,
	} = useForm(
		{
			defaultValues: {
				validity_start: new Date(),
				// subject,
				// description,
			},
		},
	);

	return (
		<Modal
			show={isScheduleDemo}
			size="sm"
			placement="center"
			closeOnOuterClick={() => setScheduleDemo((prev) => ({ ...prev, isScheduleDemo: false, scheduleData: {} }))}
			onClose={() => setScheduleDemo((prev) => ({ ...prev, isScheduleDemo: false, scheduleData: {} }))}
		>
			<Modal.Header title="Schedule Demo" />

			<Modal.Body className={styles.modal_body}>
				<FormLayout
					control={control}
					controls={SCHEDULE_DEMO_CONTROLS}
					errors={errors}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					className={styles.cancel_cta}
					onClick={() => setScheduleDemo((prev) => ({ ...prev, isScheduleDemo: false, scheduleData: {} }))}
					// disabled={updateLoader}
				>
					Cancel
				</Button>
				<Button>Approve</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default ScheduleDemo;
