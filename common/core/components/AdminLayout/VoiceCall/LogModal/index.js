import { Button, Modal } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useCreateCommunicationLog from '../hooks/useCreateCommunicationLogs';

import ActivityLog from './ActivityLog';

function LogModal({
	organizationId = '',
	type = 'call',
	unmountVoiceCall = () => {},
}) {
	const {
		control,
		watch,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { append, remove } = useFieldArray({ control, name: 'feedback' });
	const formData = watch();
	const feedback = formData?.feedback;

	const title = formData?.reminder ? 'Add Reminder' : 'Add Activity Log';

	const { createCommunicationLog, loading } = useCreateCommunicationLog({
		formData,
		organizationId,
		unmountVoiceCall,
	});

	const onSubmit = () => {
		if (isEmpty(errors)) {
			createCommunicationLog();
		}
	};

	return (
		<Modal size="lg" show placement="center" showCloseIcon={false}>
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
					type={type}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
				>
					Add Activity Log
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LogModal;
