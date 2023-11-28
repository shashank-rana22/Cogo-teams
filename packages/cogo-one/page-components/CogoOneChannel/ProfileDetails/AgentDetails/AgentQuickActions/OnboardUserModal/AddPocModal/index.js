import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useRef, useState } from 'react';

import useCreateOrganizationTradePartnerPoc from '../../../../../../../hooks/useCreateOrganizationTradePartnerPoc';
import useCreateOrganizationTradeParty from '../../../../../../../hooks/useCreateOrganizationTradeParty';

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
	const [importerExporterId, setImporterExporterId] = useState(null);

	const formRef = useRef(null);

	const onClose = () => {
		setShowModal(false);
		setShowUserModal(false);
	};

	const createRefetch = () => {
		onClose();
	};

	const { apiTrigger:createTrigger, loading:createLoading } = useCreateOrganizationTradePartnerPoc({
		refetch: createRefetch,
	});

	const { createTradeParty, createTradePartyLoading } = useCreateOrganizationTradeParty({ createPoc: createTrigger });

	const onSubmit = (formValues) => {
		const params = getCreateTradePartnerPocParams({ ...formValues, importerExporterId });
		const { trade_party_id = '' } = params;
		if (isEmpty(trade_party_id)) {
			createTradeParty(params);
		} else {
			createTrigger(params);
		}
	};

	const formSubmit = () => formRef?.current?.handleSubmit(onSubmit)();

	return (
		<Modal show={!isEmpty(showModal)} placement="top" size="md" onClose={onClose}>
			<Modal.Header title="Add Shipment Stakeholder" />

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
						importerExporterId={importerExporterId}
						setImporterExporterId={setImporterExporterId}
					/>
				</div>

			</Modal.Body>

			<Modal.Footer>
				<div className={styles.actions}>
					<div className={styles.cancel}>
						<Button
							themeType="secondary"
							onClick={onClose}
							disabled={createLoading || createTradePartyLoading}
						>
							Cancel
						</Button>

					</div>

					<div>
						<Button
							themeType="accent"
							onClick={formSubmit}
							disabled={createLoading || createTradePartyLoading}
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
