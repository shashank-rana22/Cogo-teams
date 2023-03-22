import { Modal, Button } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import useGetTradePartyDetails from '../hooks/useGetTradePartyDetails';
import useGetVendor from '../hooks/useGetVendor';
import useListCogoEntities from '../hooks/useListCogoEntities';

import MailTemplate from './MailTemplate';
import Summary from './RecurringSummary';
import styles from './styles.module.css';
import UploadInvoice from './UploadInvoice';

function AddExpenseModal({
	showExpenseModal,
	setShowExpenseModal,
	rowData,
}) {
	const [mailModal, setMailModal] = useState(false);
	const [expenseData, setExpenseData] = useState({});
	const [modalView, setModalView] = useState('upload');

	const { cogoEntityId, vendorId } = rowData;

	const { entityList } = useListCogoEntities({ cogoEntityId });
	const { tradePartyData } = useGetTradePartyDetails(vendorId);

	const { vendorList } = useGetVendor(vendorId);

	useEffect(() => {
		if (vendorList?.length > 0) {
			setExpenseData((p) => ({ ...p, vendorData: vendorList[0] }));
		}
	}, [vendorList]);

	useEffect(() => {
		if (entityList?.length > 0) {
			setExpenseData((p) => ({ ...p, entityObject: entityList[0] }));
		}
		if (tradePartyData?.length > 0) {
			setExpenseData((p) => ({ ...p, tradeParty: tradePartyData[0] }));
		}
	}, [entityList, expenseData, tradePartyData]);

	const handleClick = () => {
		if (modalView === 'upload') {
			setModalView('summary');
		} else {
			setMailModal(true);
		}
	};

	return (
		<Modal
			size="fullscreen"
			show={showExpenseModal}
			onClose={() => setShowExpenseModal(false)}
			placement="center"
		>
			<Modal.Header title="ADD EXPENSE" />
			<Modal.Body className={styles.modal_data}>
				{modalView === 'upload' ? (
					<UploadInvoice
						formData={expenseData}
						setFormData={setExpenseData}
					/>
				) : (
					<Summary
						expenseData={expenseData}
						setExpenseData={setExpenseData}
						rowData={rowData}
					/>
				)}
			</Modal.Body>

			<Modal.Footer>
				{
					modalView !== 'upload' && (
						<Button
							onClick={() => setModalView('upload')}
							style={{ marginRight: '8px' }}
						>
							Go Back
						</Button>
					)
				}
				<Button onClick={handleClick}>
					{modalView === 'upload' ? 'Save & Next' : 'Request Email'}
				</Button>

			</Modal.Footer>

			{mailModal 	&& (
				<Modal size="lg" show={mailModal} onClose={() => setMailModal(false)} placement="top">
					<Modal.Header title="Request Email Preview" />
					<Modal.Body className={styles.modal_body}>
						<MailTemplate
							expenseData={expenseData}
							setExpenseData={setExpenseData}
							setShowModal={setShowExpenseModal}
							getList={() => {}}
							rowData={rowData}
						/>
					</Modal.Body>
				</Modal>
			)}
		</Modal>
	);
}

export default AddExpenseModal;
