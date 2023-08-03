import {
	Button, Modal,
	// Toast
} from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import styles from './styles.module.css';

function MoveSupplierModal({
	showMoveSupplierModal = false,
	setShowMoveSupplierModal = () => {},
}) {
	const [{ loading },
		// trigger
	] = useRequest(
		{
			method : 'POST',
			url    : '/update_supplier',
		},
		{ manual: true },
	);
	// const handleUpdateSupplier = async () => {
	// 	try {
	// 		await trigger({ });

	// 		setShowMoveSupplierModal(false);
	// 	} catch (error) {
	// 		Toast.error(getApiErrorString(error.response?.data));
	// 	}
	// };

	return (
		<Modal
			size="sm"
			show={showMoveSupplierModal}
			onClose={() => setShowMoveSupplierModal(false)}
			placement="top"
			className={styles.modal_container}
		>
			<Modal.Header title="Change Supplier" />

			<Modal.Body>
				<div className={styles.container}>
					<div className={styles.date_container}>
						<div className={styles.text}>Change Supplier </div>
					</div>

					<div className={styles.btn_container}>
						<Button
							type="button"
							themeType="secondary"
							disabled={loading}
							onClick={() => setShowMoveSupplierModal(false)}
						>
							No, Don&apos;t
						</Button>

						<Button
							type="button"
							className={styles.extend_button}
							loading={loading}
						>
							Yes, Change
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default MoveSupplierModal;
