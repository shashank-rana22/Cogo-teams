import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { React, useState, useContext } from 'react';

import useCreateTaskList from '../../hooks/useCreateTaskList';
import useGetShipmentMails from '../../hooks/useListRpaMails';
import useUpdateDocument from '../../hooks/useUpdateDocument';

import Approve from './Approve';
import CheckList from './CheckList';
import HeaderComponent from './Header';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import UploadForm from './UploadForm';
import Wallet from './Wallet';

function Documents() {
	const [showDoc, setShowDoc] = useState(null);
	const [showApproved, setShowApproved] = useState(false);
	const [activeToggle, setActiveToggle] = useState(false);
	const [activeWallet, setActiveWallet] = useState('trade_documents');
	const [addToWallet, setAddToWallet] = useState(true);

	const { updateDocument } = useUpdateDocument();
	const { shipment_data, primary_service, activeStakeholder } = useContext(ShipmentDetailContext);

	const {
		loading,
		taskList,
		completedDocs,
		docTypes,
		filters,
		setFilters,
		refetch,
	} = useCreateTaskList({ shipment_data, primary_service });

	const emailPayload = {
		cogo_shipment_id : shipment_data?.id,
		entity_type      : docTypes,
	};

	console.log('completedDocs', completedDocs?.list);

	const { emailList } = useGetShipmentMails({
		payload: emailPayload,
	});

	const handleApprove = async () => {
		setShowDoc(showApproved);
		setShowApproved(null);
		if (addToWallet) {
			await updateDocument({
				values: {
					name            : showApproved?.file_name || showApproved?.document_url,
					document_type   : showApproved?.document_type,
					image_url       : showApproved?.document_url,
					organization_id : showApproved?.organization_id,
				},
			});
		}
	};

	return !loading
		? (
			<div className={styles.main_container}>
				<HeaderComponent
					activeToggle={activeToggle}
					setActiveToggle={setActiveToggle}
					shipment_data={shipment_data}
					data={completedDocs?.organizations}
					filters={filters}
					setFilters={setFilters}
					activeWallet={activeWallet}
					setActiveWallet={setActiveWallet}
					activeStakeholder={activeStakeholder}
					refetch={refetch}
				/>

				{!activeToggle ? (
					<CheckList
						taskList={taskList}
						emailDocs={emailList}
						completedDocs={completedDocs}
						setShowDoc={setShowDoc}
						setShowApproved={setShowApproved}
					/>
				) : <Wallet activeWallet={activeWallet} />}

				<Modal
					className={styles.modal_container}
					show={showDoc}
					size="lg"
					onClose={() => setShowDoc(null)}
					placement="top"
					closeOnOuterClick={false}
				>
					<UploadForm
						showDoc={showDoc}
						setShowDoc={setShowDoc}
						refetch={refetch}
						activeWallet={activeWallet}
						setActiveWallet={setActiveWallet}
					/>
				</Modal>
				<Approve
					showApproved={showApproved}
					setShowApproved={setShowApproved}
					addToWallet={addToWallet}
					setAddToWallet={setAddToWallet}
					handleApprove={handleApprove}
					setShowDoc={setShowDoc}
				/>

			</div>
		) : <LoadingState />;
}

export default Documents;
