import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { React, useState, useContext } from 'react';

import useCreateTaskList from '../../hooks/useCreateTaskList';
import useGetShipmentMails from '../../hooks/useListRpaMails';

import CheckList from './CheckList';
import HeaderComponent from './Header';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import UploadForm from './UploadForm';
import Wallet from './Wallet';

function Documents() {
	const [showDoc, setShowDoc] = useState(null);
	// const [showConfirmed, setShowConfirmed] = useState(false);
	const [activeToggle, setActiveToggle] = useState(false);
	const [activeWallet, setActiveWallet] = useState('trade_documents');
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);

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

	const { emailList } = useGetShipmentMails({
		payload: emailPayload,
	});

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
				/>

				{!activeToggle ? (
					<CheckList
						taskList={taskList}
						emailDocs={emailList}
						completedDocs={completedDocs?.list}
						setShowDoc={setShowDoc}
						// setShowConfirmed={setShowConfirmed}
					/>
				) : <Wallet activeWallet={activeWallet} />}

				<Modal
					show={showDoc}
					size="lg"
					onClose={() => setShowDoc(null)}
					placement="top"
					// closeOnOuterClick={false}
				>
					<UploadForm
						showDoc={showDoc}
						setShowDoc={setShowDoc}
						refetch={refetch}
						activeWallet={activeWallet}
						setActiveWallet={setActiveWallet}
					/>
				</Modal>

			</div>
		) : <LoadingState />;
}

export default Documents;
