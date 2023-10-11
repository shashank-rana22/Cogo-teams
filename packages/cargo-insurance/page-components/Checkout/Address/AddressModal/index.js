import { Modal } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';

import AddressCard from '../AddressCard';

import styles from './styles.module.css';

function AddressModal({
	data = [], addressModal, setAddressModal, selectedAddress,
	setSelectedAddress, setAddressData,
}) {
	const { openModal, isCreate, isView } = addressModal || {};

	const { t } = useTranslation(['cargoInsurance']);

	const closeModalHandler = () => {
		setAddressModal({
			openModal: false,
		});
	};

	const changeSelectedAdd = (info) => {
		setAddressData((prev) => ({
			mainAddress      : [info, prev.mainAddress[GLOBAL_CONSTANTS.zeroth_index]],
			remainingAddress : [prev.mainAddress[GLOBAL_CONSTANTS.one],
				...prev.remainingAddress.filter((ele) => ele?.id !== info?.id)],
		}));
		setSelectedAddress(info);
		closeModalHandler();
	};

	return (
		<Modal
			size="sm"
			show={openModal}
			onClose={closeModalHandler}
			placement={isCreate ? 'center' : 'right'}
			closeOnOuterClick
		>
			<Modal.Header title={t('cargoInsurance:select_address')} />

			<div className={styles.modal_body}>

				{isView ? (
					<div className={styles.view_container}>

						{data.map((ele) => (
							<div key={ele?.id} className={styles.card_container}>
								<AddressCard
									key={ele?.id}
									info={ele}
									selectedAddress={selectedAddress}
									setSelectedAddress={changeSelectedAdd}
								/>
							</div>
						))}

					</div>
				) : null}

			</div>
		</Modal>
	);
}

export default AddressModal;
