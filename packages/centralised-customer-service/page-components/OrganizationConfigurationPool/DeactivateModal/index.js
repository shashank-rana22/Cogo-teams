import { Button, Modal } from '@cogoport/components';

import useUpdateCsdConfig from '../../../hooks/useUpdateCapacityConfig';

import styles from './styles.module.css';

const STATUS_MAPPING = {
	active : 'inactive',
	draft  : 'active',
};

function DeactivateModal({ showModal = false, setShowModal = () => {}, id, status = 'draft' }) {
	const { loading, updateCsdConfig } = useUpdateCsdConfig({ setShowModal });

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
						onClick={() => updateCsdConfig({ status: STATUS_MAPPING[status], id })}
					>
						Deactivate
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeactivateModal;
