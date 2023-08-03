import { Button, Modal } from '@cogoport/components';

import useCreateCssConfig from '../../../hooks/useCreateCcsConfig';

import styles from './styles.module.css';

function DeactivateModal({ showModal = false, setShowModal = () => {}, id, fetchList = () => {} }) {
	const { loading, createCcsConfig } = useCreateCssConfig({ setShowModal, source: 'list', fetchList });

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
						loading={loading}
						onClick={() => createCcsConfig({ configId: id })}
					>
						Deactivate
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeactivateModal;
