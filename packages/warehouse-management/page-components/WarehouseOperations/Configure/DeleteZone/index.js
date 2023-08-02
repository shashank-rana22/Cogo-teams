import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DeleteZoneModal({
	item = {},
	deleteZone = false,
	setDeleteZone = () => {},
	handleDelete = () => {},
}) {
	return (
		<div>
			<Modal
				size="md"
				show={deleteZone}
				onClose={() => setDeleteZone(false)}
			/>
			<Modal.Header title={(
				<h4 className={styles.warning_icon}>
					<IcCError />
				</h4>
			)}
			/>
			<Modal.Body>
				<div className={styles.sure_delete}>
					Are you sure you want to delete this Zone ?
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					style={{ }}
					size="md"
					onClick={() => setDeleteZone(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					onClick={() => { handleDelete(item); }}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</div>
	);
}

export default DeleteZoneModal;
