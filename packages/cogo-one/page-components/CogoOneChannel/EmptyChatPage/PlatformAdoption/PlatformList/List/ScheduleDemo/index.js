import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import FormLayout from '../../../../../../../common/FormLayout';
import getScheduleControls from '../../../../../../../configurations/schedule-demo-controls';
import useAssignMeetingAgent from '../../../../../../../hooks/useAssignMeetingAgent';
import useScheduleCalendar from '../../../../../../../hooks/useScheduleCalendar';

import styles from './styles.module.css';

function ScheduleDemo({ scheduleDemo = {}, setScheduleDemo = () => {}, onboardingRequest = () => {} }) {
	const { isScheduleDemo = false, scheduleData = {}, scheduleType = '' } = scheduleDemo || {};

	const { metadata = {} } = scheduleData || {};
	const {
		description = '', subject = '', schedule = {}, lead_organization_id = '', organization_id = '',
		user_id = '', customer = {},
	} = metadata || {};
	const { schedule_start = '', calendar_id = '', id = '' } = schedule || {};
	const { lead_user_id = '' } = customer || {};

	const { performedById = '' } = useSelector(({ profile }) => ({
		performedById: profile?.user?.id || {},
	}));

	const {
		control, formState:{ errors = {} },
		handleSubmit,
		setValue,
		watch,
		reset,
	} = useForm();

	const controls = getScheduleControls({ scheduleType, watch });

	const { meetingAgent = () => {}, updateLoader = false } = useAssignMeetingAgent({
		setScheduleDemo,
		onboardingRequest,
	});

	const { loading = false, createMeeting = () => {} } = useScheduleCalendar({
		reset,
		setScheduleDemo,
		onboardingRequest,
	});

	const onSubmit = (val) => {
		if (scheduleType === 'organic') {
			createMeeting({ val, lead_organization_id, lead_user_id, user_id, organization_id });
		} else {
			meetingAgent({
				agentId    : performedById,
				calendarId : calendar_id,
				scheduleId : id,
				isEmail    : false,
			});
		}
	};

	const handleClose = () => {
		reset();
		setScheduleDemo((prev) => ({
			...prev,
			isScheduleDemo : false,
			scheduleData   : {},
			scheduleType   : '',
		}));
	};

	useEffect(() => {
		if (scheduleType === 'organic') {
			return;
		}

		if (!isEmpty(scheduleData)) {
			setValue('description', description);
			setValue('validity_start', new Date(schedule_start));
			setValue('subject', subject);
		}
	}, [description, scheduleData, schedule_start, setValue, subject, scheduleType]);

	return (
		<Modal
			show={isScheduleDemo}
			size="sm"
			placement="center"
			scroll={false}
			closeOnOuterClick={handleClose}
			onClose={handleClose}
		>
			<Modal.Header title="Schedule Demo" />

			<Modal.Body className={styles.modal_body}>
				<FormLayout
					control={control}
					controls={controls}
					errors={errors}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					className={styles.cancel_cta}
					onClick={handleClose}
					disabled={loading || updateLoader}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					loading={loading || updateLoader}
				>
					Approve
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default ScheduleDemo;
