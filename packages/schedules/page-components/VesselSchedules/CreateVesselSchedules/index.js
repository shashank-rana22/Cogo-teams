import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import Layout from '../../common/Layout';
import useCreateVesselSchedules from '../hooks/useCreateVesselSchedule';

import styles from './styles.module.css';

function CreateModal({ showModal, setShowModal, makeRequest }) {
	const handleClose = () => {
		setShowModal(false);
	};
	const { handleSubmit, control, watch } = useForm();
	const formValues = watch();

	const { createSchedule, fields, onError, errors } =	 useCreateVesselSchedules(
		{ makeRequest, formValues, watch, handleClose },
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
						onClick={handleSubmit(createSchedule, onError)}
					>
						Create Vessel Schedule
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateModal;
