import { Button, Modal } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import React from 'react';

import ActivityLog from '../ActivityLog';

function LogModal({ showLog = false, setShowLog = () => { }, organizationId = '' }) {
	const {
		profile,
	} = useSelector((state) => state);

	const {
		control,
		watch,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { append, remove } = useFieldArray({ control, name: 'feedback' });
	const formData = watch();
	const feedback = formData?.feedback;

	const title = formData?.reminder ? 'Add Reminder' : 'Add Activity Log';

	const handleClose = () => {
		reset();
		setShowLog(false);
	};

	const onSubmit = () => {
		const {
			reminder, reminderDateTime, reminderType, attendee, title:formTitle,
			summary, feedback: formFeedback, primaryAttendeeFromOrg, additionalAttendeeFromOrg,
		} = formData || {};

		const payload = {
			reminder_date         : reminderDateTime,
			is_reminder           : reminder === 'reminder',
			communication_type    : reminderType,
			agent_id              : attendee,
			title                 : formTitle,
			user_id               : primaryAttendeeFromOrg,
			additional_user_ids   : additionalAttendeeFromOrg,
			communication_summary : summary,
			organization_id       : organizationId,
			partner_id            : profile?.partner?.id,
			feedback              : formFeedback?.map((singleFeedback) => ({
				feedback_type : singleFeedback?.feedback_type,
				feedback_data : [
					{
						general_feedback: singleFeedback?.feedback_type === 'general_feedback'
							? singleFeedback?.general_feedback_text : undefined,
						call_feedback      : singleFeedback?.call_feedback || undefined,
						payment_commitment : singleFeedback?.payment_commitment || undefined,
						obstacle_faced     : singleFeedback?.obstacle_faced || undefined,
						reminder_date      : singleFeedback?.reminder_date || undefined,
						commitment_date    : singleFeedback?.commitment_date || undefined,
						currency           : singleFeedback?.currency || undefined,
						price              : singleFeedback?.price || undefined,
					},
				],
			})),

		};
		console.log({ payload });
		setShowLog(false);
		reset();
	};

	return (
		<Modal size="lg" show={showLog} onClose={handleClose} placement="center">
			<Modal.Header title={title} />
			<Modal.Body>
				<ActivityLog
					formData={formData}
					feedback={feedback}
					append={append}
					remove={remove}
					control={control}
					setValue={setValue}
					watch={watch}
					errors={errors}
					organizationId={organizationId}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit(onSubmit)}>Add Activity Log</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LogModal;
