import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import Layout from '../../common/Layout/index.tsx';
import useCreateServiceLane from '../hooks/useCreateServiceLane';

import styles from './styles.module.css';

function CreateModal({ showModal, setShowModal, makeRequest }) {
	const { handleSubmit, control, formState: { errors }, watch } = useForm();
	const formValues = watch();
	const {
		createServiceLane, handleClose, fields,
	} = useCreateServiceLane({ makeRequest, formValues, setShowModal, watch });

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
						<div className={styles.heading_container}>Create Service Lane</div>
                    }
				/>
			</div>

			<Modal.Body>
				<div className={styles.inputGroup}>
					<Layout fields={fields.basic} control={control} errors={errors} />
				</div>
				<div className={styles.inputGroup}>

					<Layout fields={fields.port} control={control} errors={errors} />
					<Layout fields={fields.ports} control={control} errors={errors} />
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
						onClick={handleSubmit(createServiceLane)}
					>
						Create Service Lane
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateModal;
