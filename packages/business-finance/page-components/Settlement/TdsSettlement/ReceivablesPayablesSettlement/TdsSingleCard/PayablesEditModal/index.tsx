import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import PayablesFrom from './PayablesForm';

function PayablesEditModal({
	show,
	setShow,
	globalFilters,
	setGlobalFilters,
	editTdsLoading,
	approveTds,
}) {
	const onOuterClick = () => {
		setShow(false);
	};
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm();
	const onSubmit = (values) => {
		approveTds(values, setShow, reset);
	};

	return (
		<Modal
			show={show}
			onClose={() => setShow(false)}
			onOuterClick={() => {
				onOuterClick();
				// reset();
			}}
			size="md"
		>
			<Modal.Header title="TDS Edit" />
			<Modal.Body>
				<PayablesFrom
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					control={control}
					errors={errors}
					setShow={setShow}
					reset={reset}
					editTdsLoading={editTdsLoading}
				/>
			</Modal.Body>
		</Modal>
	);
}

export default PayablesEditModal;
