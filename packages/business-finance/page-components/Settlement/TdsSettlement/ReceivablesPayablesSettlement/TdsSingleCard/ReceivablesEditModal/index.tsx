import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import ReceivablesFrom from './ReceivablesForm';
import styles from './styles.module.css';

function ReceivavlesEditModal({
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
				reset();
			}}
			size="md"
		>
			<Modal.Header title="TDS Deduction Style" />
			<Modal.Body>
				<div className={styles.main}>
					<div className={styles.text}>
						Current TDS Style :
						{' '}
						<span className={styles.values}>Gross</span>
					</div>
					<div className={styles.text}>
						Current TDS Rate :
						{' '}
						<span className={styles.values}>2%</span>
					</div>
				</div>
				<ReceivablesFrom
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

export default ReceivavlesEditModal;
