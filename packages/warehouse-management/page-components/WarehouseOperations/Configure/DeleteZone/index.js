import { Button, Modal } from '@cogoport/components';
import { IcCError } from '@cogoport/icons-react';

import useDeleteConfiguration from '../../../../hooks/useDeleteConfiguration';

import styles from './styles.module.css';

function DeleteZoneModal({
	id = '',
	deleteZone = {},
	setDeleteZone = () => {},
	listAPI = () => {},
}) {
	const { loading = false, handleDelete = () => {} } = useDeleteConfiguration({ id, setDeleteZone, listAPI });

	return (
		<Modal
			placement="center"
			show={deleteZone}
			onClose={() => setDeleteZone({})}
			closeOnOuterClick
		>
			<Modal.Footer className={styles.modal_footer}>
				<div className={styles.warning_icon}>
					<IcCError />
				</div>
				<div className={styles.sure_delete}>
					Are you sure you want to delete this Zone ?
				</div>
				<div className={styles.footer_buttons}>
					<Button
						className={styles.cancel_button}
						onClick={() => setDeleteZone({})}
						themeType="secondary"
					>
						Cancel
					</Button>
					<Button
						disabled={loading}
						onClick={handleDelete}
					>
						Confirm
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteZoneModal;
