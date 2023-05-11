import { Button, Modal } from '@cogoport/components';

import FilePreview from '../../../commons/FilePreview';
import useUpdateBookingNote from '../../../hooks/useUpdateBookingNote';

import ExtendExpiryModal from './ExtendExpiryModal';
import styles from './styles.module.css';

const modalHeader = {
	view_document   : 'Booking Note',
	move_to_expired : 'Move To Expired',
};

export default function ActionModals({ modalKey, setShow, item, refetchList }) {
	const closeModal = () => setShow(null);

	const successRefetch = () => {
		refetchList(); closeModal();
	};

	const { loading, updateBookingNote } = useUpdateBookingNote({
		refetch        : successRefetch,
		successMessage : 'Booking Note has been moved to expired',
	});

	const modalBodyContent = {
		view_document   : <FilePreview url={item?.url} />,
		move_to_expired : <h2>Are you sure, you want to move this to Expired ?</h2>,
	};

	const buttonsContainer = {
		view_document   : <Button onClick={closeModal}>Close</Button>,
		move_to_expired : (
			<>
				<Button disabled={loading} themeType="secondary" onClick={closeModal}>No</Button>
				<Button
					disabled={loading}
					onClick={() => updateBookingNote({
						id     : item?.id,
						status : 'inactive',
					})}
				>
					Yes
				</Button>
			</>
		),
	};

	return (modalKey === 'extend_expiry'
		? <ExtendExpiryModal closeModal={closeModal} item={item} successRefetch={successRefetch} />
		: (
			<Modal
				show
				onClose={closeModal}
				closeOnOuterClick={false}
				size="lg"
				className={styles.customized_modal}
				showCloseIcon={!loading}
			>
				<Modal.Header title={modalHeader[modalKey]} />

				<Modal.Body className={styles.modal_body}>
					{modalBodyContent[modalKey]}
				</Modal.Body>

				<Modal.Footer className={styles.modal_footer}>
					{buttonsContainer[modalKey]}
				</Modal.Footer>
			</Modal>
		)
	);
}
