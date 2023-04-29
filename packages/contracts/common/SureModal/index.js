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
				Are You Sure To
				{' '}
				{toFinish
					? 'Finish Job' : startCase(showModal?.payload?.status === 'rejected' ? 'reject' : 'approve')}
				{' '}
				?
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.button_container}>
					<Button themeType="secondary" onClick={handleCloseModal}>No</Button>
					<Button themeType="primary" onClick={handleFinalSubmit}>Yes</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default SureModal;
