import { Modal, Button } from '@cogoport/components';

import ModalHeader from './components/Header';
import ModalBody from './components/ModalBody';
import styles from './styles.module.css';

function NewDislikeModal({
	rate = {},
	show = false,
	onClose = () => {},
	details = {},
	refetchSearch = () => {},
}) {
	return (
		<Modal size="lg" show={show} onClose={onClose} animate className={styles.modal_container}>
			<Modal.Header title={<ModalHeader />} />

			<Modal.Body>
				<ModalBody rate={rate} details={details} refetchSearch={refetchSearch} />
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					themeType="secondary"
					onClick={onClose}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default NewDislikeModal;
