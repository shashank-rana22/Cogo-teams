import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function PostToSageModal({
	entryAction, PostToSageAction,
	permissionModal, paymentDocumentStatus, closePermissionModal,
	postToSageLoading, loading,
}) {
	const handlePermission = () => {
		entryAction(permissionModal?.id);
	};
	const handlePermissionPostToSage = () => {
		PostToSageAction(permissionModal?.id);
	};

	const loadingText = permissionModal.isDelete ? 'Deleting' : 'Approving';
	const btnText = permissionModal.isDelete ? 'Delete' : 'Approve';

	const isPostToSage = paymentDocumentStatus === 'APPROVED' && !permissionModal.isDelete;

	return (
		<div className={styles.modal_show}>
			<div className={styles.text_value}>
				Are you sure you want to
				{' '}
				{isPostToSage ? 'Post To Sage' : btnText}
				{' '}
				this entry?
			</div>

			<div className={styles.flex_data}>
				<Button
					style={{ marginRight: '10px' }}
					onClick={closePermissionModal}
					disabled={isPostToSage ? postToSageLoading : loading}
					type="button"
					themeType="secondary"
				>
					Cancel
				</Button>
				{isPostToSage ? (
					<Button
						onClick={handlePermissionPostToSage}
						disabled={postToSageLoading}
						type="button"
					>
						Post To Sage
					</Button>
				) : (
					<Button onClick={handlePermission} disabled={loading}>
						{loading ? loadingText : btnText}
					</Button>
				)}
			</div>
		</div>
	);
}

export default PostToSageModal;
