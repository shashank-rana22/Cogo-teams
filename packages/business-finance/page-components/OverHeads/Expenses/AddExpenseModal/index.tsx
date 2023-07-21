import { Modal, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
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
	showExpenseModal?: boolean;
	setShowExpenseModal?: (p: any) => void;
	setShowWarning?: (p: any) => void;
	rowData?: SummaryInterface;
}

function AddExpenseModal({
	showExpenseModal,
	setShowExpenseModal,
	rowData,
	setShowWarning = () => {},
}: Props) {
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
		if (!isEmpty(vendorList)) {
			setExpenseData((p) => ({ ...p, vendorData: vendorList[GLOBAL_CONSTANTS.zeroth_index] }));
		}
	}, [vendorList]);

	useEffect(() => {
		if (!isEmpty(entityList)) {
			setExpenseData((p) => ({ ...p, entityObject: entityList[GLOBAL_CONSTANTS.zeroth_index] }));
		}
		if (!isEmpty(tradePartyData)) {
			setExpenseData((p) => ({ ...p, tradeParty: tradePartyData[GLOBAL_CONSTANTS.zeroth_index] }));
		}
	}, [entityList, tradePartyData]);

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
				{modalView !== 'upload' && (
					<Button
						onClick={() => setModalView('upload')}
						style={{ marginRight: '8px' }}
					>
						Go Back
					</Button>
				)}
				<Button onClick={handleClick} disabled={!isFormValidated}>
					{modalView === 'upload' ? 'Save & Next' : 'Request Email'}
				</Button>
			</Modal.Footer>

			<Modal
				size="lg"
				show={mailModal}
				onClose={() => setMailModal(false)}
				placement="top"
			>
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
		</Modal>
	);
}

export default AddExpenseModal;
