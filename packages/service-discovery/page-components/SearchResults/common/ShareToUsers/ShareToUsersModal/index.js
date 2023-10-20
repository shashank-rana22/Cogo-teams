import { Modal } from '@cogoport/components';

import useShareModal from '../../../hooks/useShareModal';

import Footer from './Footer';
import Header from './Header';
import List from './List';

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
				<Header />

				<List
					selectedId={selectedUser.id}
					setSelectedUser={setSelectedUser}
					org_id={org_id}
				/>
			</Modal.Body>

			<Modal.Footer>
				<Footer
					onClick={handleSubmit(onCreate)}
					loading={shareRateCardLoading}
				/>
			</Modal.Footer>
		</Modal>
	);
}

export default ShareToUsersModal;
