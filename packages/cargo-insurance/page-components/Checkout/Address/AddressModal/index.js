import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useTranslation } from 'next-i18next';

import FormItem from '../../../../common/FormItem';
import useAddressModal from '../../../../hooks/useAddressModal';
import AddressCard from '../AddressCard';

import styles from './styles.module.css';

function AddressModal({
	data = [], orgId = '', addressModal, setAddressModal, selectedAddress,
	setSelectedAddress, setAddressData, getBillingAddress,
}) {
	const { openModal, isCreate, isView } = addressModal || {};

	const { t } = useTranslation(['cargoInsurance']);

	const {
		formhook, addressControl, submitHandler, loading,
		closeModalHandler,
	} = useAddressModal({ orgId, setAddressModal, getBillingAddress });

	const { handleSubmit } = formhook || {};

	const changeSelectedAdd = (info) => {
		setAddressData((prev) => ({
			...prev,
			mainAddress: [info, prev.mainAddress[GLOBAL_CONSTANTS.zeroth_index]],
		}));
		setSelectedAddress(info);
		closeModalHandler();
	};

	return (
		<Modal
			size={isCreate ? 'md' : 'sm'}
			show={openModal}
			onClose={closeModalHandler}
			placement={isCreate ? 'center' : 'right'}
			closeOnOuterClick
		>
			<Modal.Header title={isCreate ? t('cargoInsurance:create_address') : t('cargoInsurance:select_address')} />

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

				{isCreate ? (
					<>
						<div className={styles.form_body}>
							<FormItem controls={addressControl} formhook={formhook} />
						</div>

						<div className={styles.footer}>
							<Button themeType="secondary" disabled={loading}>{t('cargoInsurance:cancel')}</Button>
							<Button
								themeType="accent"
								className={styles.submit_btn}
								onClick={handleSubmit(submitHandler)}
								loading={loading}
							>
								{t('cargoInsurance:add')}
							</Button>
						</div>
					</>

				) : null}

			</div>
		</Modal>
	);
}

export default AddressModal;
