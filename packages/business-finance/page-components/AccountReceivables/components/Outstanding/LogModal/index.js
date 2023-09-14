import { Button, Modal } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useCreateCommunicationLog from '../../../hooks/useCreateCommunicationLog';
import ActivityLog from '../ActivityLog';

function LogModal({
	showLog = false, setShowLog = () => {},
	organizationId = '', type = 'call', refetch = () => {},
}) {
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

	const { createCommunicationLog, loading } = useCreateCommunicationLog({
		formData,
		organizationId,
		setShowLog,
		reset,
		refetch,
	});

	const onSubmit = () => {
		if (isEmpty(errors)) {
			createCommunicationLog();
		}
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
