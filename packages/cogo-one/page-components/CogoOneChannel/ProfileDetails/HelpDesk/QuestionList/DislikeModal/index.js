import { Modal } from '@cogoport/components';

import styles from './styles.module.css';

function DislikeModal({ setShow, show }) {
	return (
		<Modal size="sm" show={show} onClose={setShow} placement="top">
			<Modal.Header title="Please provide the reason for your dislike" />
			<div className={styles.title}>
				hello
			</div>
			{/* <Modal.Body>
				et consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda et soluta expedita
				consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda
				et soluta expedita consequuntur, voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
				Pariatur eaque aut sunt?
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose}>OK</Button>
			</Modal.Footer> */}
		</Modal>
	);
}

export default DislikeModal;
