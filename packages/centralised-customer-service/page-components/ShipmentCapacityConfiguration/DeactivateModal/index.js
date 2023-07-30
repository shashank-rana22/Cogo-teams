import { Button, Modal } from '@cogoport/components';

import useUpdateCapacityConfig from '../../../hooks/useUpdateCapacityConfig';

import styles from './styles.module.css';

const STATUS_MAPPING = {
	active : 'inactive',
	draft  : 'active',
};

const MESSAGE_MAPPING = {
	active : 'Deactivate',
	draft  : 'Activate',
};

function DeactivateModal({ showModal = false, setShowModal = () => {}, id, status = 'draft', fetchList = () => {} }) {
	const { loading, updateCapacityConfig } = useUpdateCapacityConfig({ setShowModal, configId: id, fetchList });

	return (
		<Modal
			size="md"
			show={showModal}
			onClose={() => setShowModal(false)}
			placement="center"
			showCloseIcon={false}
		>
			<Modal.Header
				title={`Are you sure you want to ${MESSAGE_MAPPING[status]} this configuration?`}
				style={{ textAlign: 'center' }}
			/>

			<Modal.Body>
				<div className={styles.btn_container}>
					<Button
						type="button"
						themeType="secondary"
						loading={loading}
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>

					<Button
						type="button"
						style={{ marginLeft: '12px' }}
						loading={loading}
						onClick={() => updateCapacityConfig({ status: STATUS_MAPPING[status], id })}
					>
						{MESSAGE_MAPPING[status]}
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeactivateModal;
