import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import AddPocModal from './AddPocModal';
import styles from './styles.module.css';

function OnboardUserModal({
	handleRoute = () => {},
	showUserModal = false,
	setShowUserModal = () => {},
	mobileNumber = '',
	mobileCountryCode = () => {},
	name = '',
	email = '',
}) {
	const [showAddPocModal, setShowAddPocModal] = useState(false);
	return (
		<>

			<Modal
				placement="center"
				size="md"
				show={showUserModal}
				closeOnOuterClick={() => { setShowUserModal(false); }}
				onClose={() => { setShowUserModal(false); }}
				className={styles.styled_modal}
			>
				<Modal.Header title="Onboard User" />

				<Modal.Body>
					<Button
						size="sm"
						themeType="secondary"
						onClick={handleRoute}
					>
						Onboard User On CRM
					</Button>
					<Button
						size="sm"
						themeType="secondary"
						onClick={() => { setShowAddPocModal(true); }}
					>
						Poc Shipment
					</Button>
				</Modal.Body>

			</Modal>
			{showAddPocModal ? (
				<AddPocModal
					showModal={showAddPocModal}
					setShowModal={setShowAddPocModal}
					setShowUserModal={setShowUserModal}
					mobileNumber={mobileNumber}
					mobileCountryCode={mobileCountryCode}
					username={name}
					email={email}
				/>
			) : null}

		</>
	);
}

export default OnboardUserModal;
