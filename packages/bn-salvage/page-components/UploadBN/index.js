import { Modal } from '@cogoport/components';

import RenderForm from '../../commons/RenderForm';
import STEP1CONTROLS from '../../config/uploadBNStep1Controls.json';
import STEP2CONTROLS from '../../config/uploadBNStep2Controls.json';
import useCreateBookingNote from '../../hooks/useCreateBookingNote';

import styles from './styles.module.css';

const controlsMapping = {
	step1 : STEP1CONTROLS,
	step2 : STEP2CONTROLS,
};

export default function UploadBN({ setShow, refetchList }) {
	const closeModal = () => setShow(false);

	const { loading, createBookingNote } = useCreateBookingNote({
		closeModal,
		refetchList,
	});

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={styles.modal_container}
		>
			<Modal.Header title="Upload Booking Note" />

			<RenderForm
				closeModal={closeModal}
				onFormSubmit={createBookingNote}
				controlsMapping={controlsMapping}
				modalBodyClass={styles.modal_body_container}
				modalFooterClass={styles.modal_footer}
			/>
		</Modal>
	);
}
