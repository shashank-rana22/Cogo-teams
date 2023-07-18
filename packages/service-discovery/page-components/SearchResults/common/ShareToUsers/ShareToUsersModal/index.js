import { Modal } from '@cogoport/components';

import Footer from './Footer';
import Header from './Header';
import InviteUser from './InviteUser';
import List from './List';
import useShareModal from './useShareModal';

function ShareToUsersModal({ onClose, rate, source, org_id }) {
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
		onClose,
		source,
	});

	console.log('rate', rate);

	return (
		<div>
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
		</div>
	);
}

export default ShareToUsersModal;
