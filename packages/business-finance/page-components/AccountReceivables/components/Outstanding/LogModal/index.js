import { Button, Modal } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import React from 'react';

import ActivityLog from '../ActivityLog';

function LogModal({ showLog = false, setShowLog = () => { } }) {
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
		setShowLog(false);
	};

	console.log(errors, 'errors');

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
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit(onSubmit)}>Add Activity Log</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LogModal;
