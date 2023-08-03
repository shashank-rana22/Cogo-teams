import { Button, Modal } from '@cogoport/components';

import useUpdateCapacityConfig from '../../../hooks/useUpdateCapacityConfig';

import styles from './styles.module.css';

function DeactivateModal({
	showModal = false, setShowModal = () => {},
	id = '', fetchList = () => {}, source = '', setSource = '',
}) {
	const { loading, updateCapacityConfig } = useUpdateCapacityConfig({ setShowModal, configId: id, fetchList });

	const message = source === 'active' ? 'Activate' : 'Deactivate';

	const configStatus = source === 'active' ? 'active' : 'inactive';

	return (
		<Modal
			size="md"
			show={showModal}
			onClose={() => {
				setShowModal(false);
				setSource('');
			}}
			placement="center"
			showCloseIcon={false}
		>
			<Modal.Header
				title={`Are you sure you want to ${message} this configuration?`}
				style={{ textAlign: 'center' }}
			/>

			<Modal.Body>
				<div className={styles.btn_container}>
					<Button
						type="button"
						themeType="secondary"
						disabled={loading}
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>

					<Button
						type="button"
						style={{ marginLeft: '12px' }}
						disabled={loading}
						onClick={() => updateCapacityConfig({ status: configStatus, id })}
					>
						{message}
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeactivateModal;
