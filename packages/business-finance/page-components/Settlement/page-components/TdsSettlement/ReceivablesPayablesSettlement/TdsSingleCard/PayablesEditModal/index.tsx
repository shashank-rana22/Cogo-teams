import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { GenericObject } from '../Interfaces/index';
import ReceivablesPayablesFrom from '../ReceivablesPayablesForm';

interface Props {
	show?:boolean
	approveTds?:any,
	globalFilters?:GenericObject,
	editTdsLoading?:boolean
	setShow?:(p:boolean)=> void,
}
function PayablesEditModal({
	show,
	setShow,
	editTdsLoading,
	approveTds,
	globalFilters,
}:Props) {
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data) => {
		approveTds(data, setShow, reset);
	};

	return (
		<Modal
			show={show}
			onClose={() => setShow(false)}
			size="md"
		>
			<Modal.Header title="TDS Edit" />
			<Modal.Body>
				<ReceivablesPayablesFrom
					control={control}
					errors={errors}
					TypeKey="AP"
					globalFilters={globalFilters}
				/>
			</Modal.Body>
			<Modal.Footer>
				<div style={{ display: 'flex' }}>
					<Button
						size="md"
						themeType="secondary"
						style={{ marginRight: '10px' }}
						onClick={() => {
							setShow(false);
							reset();
						}}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						size="md"
						disabled={editTdsLoading}
						onClick={
							handleSubmit(onSubmit)
}
					>
						Send For Approval
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default PayablesEditModal;
