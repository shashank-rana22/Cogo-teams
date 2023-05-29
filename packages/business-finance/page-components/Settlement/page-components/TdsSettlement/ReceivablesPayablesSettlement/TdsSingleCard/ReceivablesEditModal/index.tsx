import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import ReceivablesPayablesFrom from '../ReceivablesPayablesForm';

import styles from './styles.module.css';

function ReceivavlesEditModal({
	show,
	setShow,
	editTdsLoading,
	approveTds,
	globalFilters,
	tdsStyle,
}) {
	const onOuterClick = () => {
		setShow(false);
	};
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
		getValues,
	} = useForm();

	const onSubmit = () => {
		const data = getValues();
		approveTds(data, setShow, reset);
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
						<span className={styles.values}>{tdsStyle?.style}</span>
					</div>
					<div className={styles.text}>
						Current TDS Rate :
						{' '}
						<span className={styles.values}>
							{tdsStyle?.rate}
							%
						</span>
					</div>
				</div>
				<ReceivablesPayablesFrom
					control={control}
					errors={errors}
					TypeKey="AR"
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

export default ReceivavlesEditModal;
