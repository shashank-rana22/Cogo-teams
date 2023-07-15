import { Modal, Button } from '@cogoport/components';
import React from 'react';

import Layout from '../../common/Layout/index.tsx';
import useCreateSailingSchedule from '../hooks/useCreateSailingSchedule';

import styles from './styles.module.css';

function CreateModal({ showModal, setShowModal, refetch }) {
	const handleClose = () => {
		setShowModal(false);
	};

	const { createSchedule, handleSubmit, newField, control, errors, onError } = 	useCreateSailingSchedule(
		{ refetch, setShowModal },
	);
	return (
		<Modal
			size="lg"
			show={showModal}
			onClose={() => {
				handleClose();
			}}
			closeOnOuterClick
			scroll
		>
			<div className={styles.shadow}>
				<Modal.Header
					title={
						<div className={styles.heading_container}>Create Vessel Schedule</div>
                    }
				/>
			</div>

			<Modal.Body>
				<div className={styles.inputGroup}>
					<Layout fields={newField} control={control} errors={errors} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.clear}>
					<Button
						themeType="secondary"
						onClick={() => {
							handleClose();
						}}
					>
						Cancel
					</Button>
				</div>
				<div>
					<Button
						onClick={handleSubmit(createSchedule, onError)}
					>
						Create Sailing Schedule
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateModal;
