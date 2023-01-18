import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function SureModal({ showModal, handleCloseModal, handleFinalSubmit, toFinish = false }) {
	return (
		<Modal
			show={showModal}
			onClose={() => {
				handleCloseModal();
			}}
		>
			<Modal.Body>
				<div>
					Are You Sure To
					{' '}
					{toFinish
						? 'Finish Job' : startCase(showModal?.payload?.status === 'rejected' ? 'reject' : 'approve')}
					{' '}
					?
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_container}>
					<Button themeType="primary" onClick={handleFinalSubmit}>Yes</Button>
					<Button themeType="secondary" onClick={handleCloseModal}>No</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default SureModal;
