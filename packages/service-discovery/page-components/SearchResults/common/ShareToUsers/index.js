import { Modal } from '@cogoport/components';
import { useState } from 'react';

import ShareToUsersModal from './ShareToUsersModal';

function ShareToUsers({ rate, show, source, onClose, org_id }) {
	const [showSuccess, setShowSuccess] = useState(false);
	const onSuccess = () => {
		setShowSuccess(true);
		onClose();
	};

	return (
		<>
			<Modal
				show={show}
				onClose={onClose}
				onOuterClick={onClose}
			>
				<Modal.Header title="Share Rate within your Company" />

				<ShareToUsersModal
					source={source}
					onClose={onSuccess}
					rate={rate}
					org_id={org_id}
				/>
			</Modal>

			{/* <SuccessModal
				show={showSuccess}
				setShow={setShowSuccess}
				title={t('book:searchResults_rates_13')}
				description={t('book:searchResults_rates_14')}
			/> */}
		</>
	);
}

export default ShareToUsers;
