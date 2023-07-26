import { Button, Modal } from '@cogoport/components';

import styles from './styles.module.css';

function DeactivateModal({ showModal = false, setShowModal = () => {} }) {
	// const { loading, updateCsdConfig } = useUpdateCsdConfig({ setShowModal });

	return (
		<Modal
			size="md"
			show={showModal}
			onClose={() => setShowModal(false)}
			placement="center"
			showCloseIcon={false}
		>
			<Modal.Header
				title="Are you sure you want to Deactivate this configuration?"
				style={{ textAlign: 'center' }}
			/>

			<Modal.Body>
				<div className={styles.btn_container}>
					<Button
						type="button"
						themeType="secondary"
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>

					<Button
						type="button"
						style={{ marginLeft: '12px' }}
					>
						Deactivate
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeactivateModal;
