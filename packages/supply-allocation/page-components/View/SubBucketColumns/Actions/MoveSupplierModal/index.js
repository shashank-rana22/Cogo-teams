import {
	Button, Modal,
	// Toast
} from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { AsyncSelectController, InputController, useForm } from '@cogoport/forms';
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

	const { control } = useForm({});

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

					<div>Current Supplier : Alaska </div>

					<div>Allocated: 122 TEU </div>

					<div> New Bucket </div>

					<AsyncSelectController
						name="destination_location_id"
						isClearable
						label="Select Origin SeaPort"
						control={control}
					/>

					<div>New Allocated</div>

					<InputController
						name="destination_location_id"
						isClearable
						label="Select Origin SeaPort"
						control={control}
					/>

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
