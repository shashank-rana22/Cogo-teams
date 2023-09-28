import { Button, Modal } from '@cogoport/components';

import Layout from '../../../../../common/Layout';

import styles from './styles.module.css';

function CreateAllocationCard({
	setFormData = () => {},
	setShowModal = () => {},
	setFormButton = () => {},
	control = {},
	controls = {},
	handleSubmit = () => {},
	errors = {},
	reset = () => {},
}) {
	const onClickAllocate = (data) => {
		setFormData(data);
		setShowModal(true);
	};
	const onCloseModal = () => {
		reset();
		setFormButton((formButton) => !formButton);
	};
	return (
		<Modal
			show
			showCloseIcon
			size="xl"
			onClose={onCloseModal}
		>
			<Modal.Header />
			<Modal.Body>
				<div className={styles.top_container}>
					<Layout controls={controls} control={control} errors={errors} />
				</div>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_container}>
					<Button className="primary sm" onClick={handleSubmit(onClickAllocate)}>
						Allocate
					</Button>
				</div>
			</Modal.Footer>

		</Modal>
	);
}
export default CreateAllocationCard;
