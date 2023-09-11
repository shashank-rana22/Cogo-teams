import { Modal } from '@cogoport/components';

import useShareModal from '../../../hooks/useShareModal';

import Footer from './Footer';
import Header from './Header';
import InviteUser from './InviteUser';
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
		modalType = '',
		handleModalType,
		shareRateCardLoading = false,
		handleSubmit,
		onCreate,
		selectedUser = {},
		setSelectedUser,
		errors = {},
		control,
		newControls,
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
				<Header modalType={modalType} onClick={handleModalType} />

				{modalType === 'select_user' ? (
					<List
						selectedId={selectedUser.id}
						setSelectedUser={setSelectedUser}
						org_id={org_id}
					/>
				) : (
					<InviteUser
						errors={errors}
						control={control}
						newControls={newControls}
					/>
				)}
			</Modal.Body>

			<Modal.Footer>
				<Footer
					modalType={modalType}
					onClick={handleSubmit(onCreate)}
					loading={shareRateCardLoading}
				/>
			</Modal.Footer>
		</Modal>
	);
}

export default ShareToUsersModal;
