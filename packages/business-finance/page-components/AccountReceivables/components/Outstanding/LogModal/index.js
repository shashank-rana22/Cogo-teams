import { Button, Modal } from '@cogoport/components';
import { useFieldArray, useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import ActivityLog from '../ActivityLog';

function LogModal({ showLog = false, setShowLog = () => {} }) {
	const [formData, setFormData] = useState({});
	const {
		control,
		register,
		watch,
		setValue,
	} = useForm();
	const { append, remove } = useFieldArray({ control, name: 'feedback' });
	const feedback = watch('feedback');

	const title = formData?.reminder ? 'Add Reminder' : 'Add Activity Log';

	const handleClose = () => {
		setShowLog(false);
		setFormData({});
	};

	const onSubmit = () => {
		setShowLog(false);
		setFormData({});
	};

	return (
		<Modal size="lg" show={showLog} onClose={handleClose} placement="center">
			<Modal.Header title={title} />
			<Modal.Body>
				<ActivityLog
					formData={formData}
					setFormData={setFormData}
					feedback={feedback}
					append={append}
					remove={remove}
					control={control}
					setValue={setValue}
					register={register}
					watch={watch}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onSubmit}>Add Activity Log</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default LogModal;
