import { Button, Modal } from '@cogoport/components';

import useShareModal from '../../../hooks/useShareModal';

import List from './List';
import styles from './styles.module.css';

function ShareToUsersModal({
	shareType = '',
	onClose = () => {},
	onSuccess = () => {},
	rate = {},
	source = '',
	org_id = '',
	show = false,
	comparedRateCardDetails = [],
}) {
	const {
		shareRateCardLoading = false,
		handleSubmit,
		onCreate,
		selectedUser = {},
		setSelectedUser,
	} = useShareModal({
		rate,
		onSuccess,
		source,
		shareType,
		comparedRateCardDetails,
	});

	return (
		<Modal
			show={show}
			onClose={onClose}
			onOuterClick={onClose}
			scroll={false}
		>
			<Modal.Header title="Share Rate Cards" />

			<Modal.Body>
				<div className={styles.title}>
					Select user from list below
				</div>

				<List
					selectedId={selectedUser.id}
					setSelectedUser={setSelectedUser}
					org_id={org_id}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Button
					type="button"
					disabled={shareRateCardLoading}
					onClick={handleSubmit(onCreate)}
					size="md"
					themeType="accent"
				>
					Share
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ShareToUsersModal;
