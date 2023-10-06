import { Modal } from '@cogoport/components';

import AddressCard from '../AddressCard';

import styles from './styles.module.css';

function AddressModal({ addressModal, setAddressModal, data = [], selectedAddress, setSelectedAddress }) {
	const { openModal, isCreate, isView } = addressModal || {};

	const closeModalHandler = () => {
		setAddressModal({
			openModal: false,
		});
	};

	return (
		<Modal
			size="sm"
			show={openModal}
			onClose={closeModalHandler}
			placement={isCreate ? 'center' : 'right'}
			closeOnOuterClick
		>
			<Modal.Header title="Are you sure?" />
			<div className={styles.modal_body}>
				{isView ? data.map((ele) => (
					<div key={ele?.id} className={styles.card_container}>
						<AddressCard
							key={ele?.id}
							info={ele}
							selectedAddress={selectedAddress}
							setSelectedAddress={setSelectedAddress}
						/>
					</div>
				)) : null}
			</div>
			{/* <Modal.Footer>
				<Button>Cancel</Button>
				<Button />
			</Modal.Footer> */}

		</Modal>
	);
}

export default AddressModal;
