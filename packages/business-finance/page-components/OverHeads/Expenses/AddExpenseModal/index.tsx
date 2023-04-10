import { Modal, Button } from '@cogoport/components';
import React, { useEffect, useState } from 'react';

import { SummaryInterface } from '../../commons/Interfaces';
import useGetTradePartyDetails from '../hooks/useGetTradePartyDetails';
import useGetVendor from '../hooks/useGetVendor';
import useListCogoEntities from '../hooks/useListCogoEntities';

import MailTemplate from './MailTemplate';
import Summary from './RecurringSummary';
import styles from './styles.module.css';
import UploadInvoice from './UploadInvoice';

interface Props {
	showExpenseModal?:boolean,
	setShowExpenseModal?:(p:any)=>void,
	setShowWarning?:(p:any)=>void,
	rowData?:SummaryInterface,
}

function AddExpenseModal({
	showExpenseModal,
	setShowExpenseModal,
	rowData,
	setShowWarning = () => {},
}:Props) {
	const [mailModal, setMailModal] = useState(false);
	const [expenseData, setExpenseData] = useState({});
	const [modalView, setModalView] = useState('upload');
	const [taxOptions, setTaxOptions] = useState([]);
	const [isUploadConfirm, setIsUploadConfirm] = useState(false);
	const [isFormValidated, setIsFormValidated] = useState(false);

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
			size="xl"
			show={showExpenseModal}
			onClose={() => setShowWarning(true)}
			placement="center"
		>
			<Modal.Header title="ADD EXPENSE" />
			<Modal.Body className={styles.modal_data}>
				{modalView === 'upload' ? (
					<UploadInvoice
						formData={expenseData}
						setFormData={setExpenseData}
						taxOptions={taxOptions}
						setTaxOptions={setTaxOptions}
						isUploadConfirm={isUploadConfirm}
						setIsUploadConfirm={setIsUploadConfirm}
						setIsFormValidated={setIsFormValidated}
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
				<Button onClick={handleClick} disabled={!isFormValidated}>
					{modalView === 'upload' ? 'Save & Next' : 'Request Email'}
				</Button>

			</Modal.Footer>

			{mailModal 	&& (
				<Modal size="lg" show={mailModal} onClose={() => setMailModal(false)} placement="top">
					<Modal.Header title="Request Email Preview" />
					<Modal.Body className={styles.modal_body}>
						<MailTemplate
							expenseData={expenseData}
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
