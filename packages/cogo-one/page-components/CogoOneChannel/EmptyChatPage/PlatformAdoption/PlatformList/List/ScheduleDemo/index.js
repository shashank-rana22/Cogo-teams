import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import FormLayout from '../../../../../../../common/FormLayout';
import { SCHEDULE_DEMO_CONTROLS } from '../../../../../../../configurations/schedule-demo-controls';
import useAssignMeetingAgent from '../../../../../../../hooks/useAssignMeetingAgent';

import styles from './styles.module.css';

function ScheduleDemo({ scheduleDemo = {}, setScheduleDemo = () => {}, onboardingRequest = () => {} }) {
	const { isScheduleDemo = false, scheduleData = {} } = scheduleDemo || {};

	const { metadata = {} } = scheduleData || {};
	const { description = '', subject = '', schedule = {} } = metadata || {};
	const { schedule_start = '', calendar_id = '', id = '' } = schedule || {};

	const { performedById = '' } = useSelector(({ profile }) => ({
		performedById: profile?.user?.id || {},
	}));

	const {
		control, formState:{ errors = {} },
		handleSubmit,
		setValue,
	} = useForm();

	const { meetingAgent = () => {}, updateLoader = false } = useAssignMeetingAgent({
		setScheduleDemo,
		onboardingRequest,
	});

	const onSubmit = () => {
		meetingAgent({
			agentId    : performedById,
			calendarId : calendar_id,
			scheduleId : id,
			isEmail    : false,
		});
	};

	useEffect(() => {
		if (!isEmpty(scheduleData)) {
			setValue('description', description);
			setValue('validity_start', new Date(schedule_start));
			setValue('subject', subject);
		}
	}, [description, scheduleData, schedule_start, setValue, subject]);

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
					disabled={updateLoader}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					loading={updateLoader}
				>
					Approve
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default ScheduleDemo;
