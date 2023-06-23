import { Button, Modal, Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import styles from './styles.module.css';

function DuplicateModal({
	showDuplicateModal,
	setShowDuplicateModal,
	id,
	fetchList,
}) {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_duplicate_test',
	}, { manual: true });

	const handleDuplicateSubmit = async () => {
		try {
			await trigger({ data: { id } });
			setShowDuplicateModal(false);
			fetchList();
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return (
		<Modal
			size="sm"
			show={showDuplicateModal}
			onClose={() => setShowDuplicateModal(false)}
			placement="center"
			showCloseIcon={false}
		>
			<Modal.Header title="Are you sure you want to duplicate this test?" />

			<Modal.Body>
				<div className={styles.btn_container}>
					<Button
						type="button"
						themeType="secondary"
						onClick={() => setShowDuplicateModal(false)}
						className={styles.btn_container}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						type="button"
						style={{ marginLeft: '8px' }}
						onClick={() => { handleDuplicateSubmit(); }}
						disabled={loading}
					>
						Duplicate
					</Button>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DuplicateModal;
