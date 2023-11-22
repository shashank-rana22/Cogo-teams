import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef, useState } from 'react';

import useCreateShipmentTradePartner from '../../../../../../../hooks/useCreateShipmentTradePartner';

import getCreateTradePartnerPocParams from './helpers/getCreateTradePartnerPocParams';
import SelfAndTradePartyForm from './SelfAndTradePartyForm';
import styles from './styles.module.css';

function AddPocModal({
	showModal = {},
	setShowModal = () => {},
	setShowUserModal = () => {},
	mobileNumber = '',
	mobileCountryCode = '',
	username = '',
	email = '',
}) {
	const [showAdditionalDetail, setShowAdditionalDetail] = useState(false);
	const formRef = useRef(null);

	const onClose = () => {
		setShowModal(false);
		setShowUserModal(false);
	};

	const createRefetch = () => {
		onClose();
	};

	const { apiTrigger:createTrigger, loading:createLoading } = useCreateShipmentTradePartner({
		refetch: createRefetch,
	});

	const onSubmit = (formValues) => {
		const params = getCreateTradePartnerPocParams({ ...formValues });
		createTrigger(params);
	};

	const formSubmit = () => formRef?.current?.handleSubmit(onSubmit)();

	return (
		<Modal show={!isEmpty(showModal)} placement="top" size="lg" onClose={onClose}>
			<Modal.Header title="Add Shipment Poc" />

			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }}>
				<div className={styles.modal_body_container}>
					<SelfAndTradePartyForm
						ref={formRef}
						mobileNumber={mobileNumber}
						mobileCountryCode={mobileCountryCode}
						username={username}
						email={email}
						showAdditionalDetail={showAdditionalDetail}
						setShowAdditionalDetail={setShowAdditionalDetail}
					/>
				</div>

			</Modal.Body>

			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}>
						<Button
							themeType="secondary"
							onClick={onClose}
							disabled={createLoading}
						>
							Cancel
						</Button>

					</div>

					<div>
						<Button
							themeType="accent"
							onClick={formSubmit}
							disabled={createLoading}
						>
							Submit
						</Button>
					</div>
				</div>
			</Modal.Footer>

		</Modal>
	);
}

export default AddPocModal;
