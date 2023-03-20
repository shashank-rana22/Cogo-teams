// import useAddDocument from '@cogo/bookings/ShipmentDetails/hooks/useAddDocument';

// import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { React, useState, useContext } from 'react';

import useCreateTaskList from '../../../../hooks/useCreateTaskList';
// import Approve from './Approve';
import useGetShipmentMails from '../../../../hooks/useGetShipmentMails';

import CheckList from './CheckList';
import HeaderComponent from './Header';
import styles from './styles.module.css';
import Wallet from './Wallet';
// import { MainContainer } from './styles';
// import UploadForm from './UploadForm';

function Documents() {
	const [activeToggle, setActiveToggle] = useState(false);
	const [activeWallet, setActiveWallet] = useState('trade_documents');
	const [show, setShow] = useState(null);
	const [showConfirmed, setShowConfirmed] = useState(false);
	const [addToWallet, setAddToWallet] = useState(true);

	// const { addDocument } = useAddDocument();

	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);

	// const handleApprove = async () => {
	// 	setShow(showConfirmed);
	// 	setShowConfirmed(null);
	// 	if (addToWallet) {
	// 		await addDocument({
	// 			values: {
	// 				name          : showConfirmed?.file_name || showConfirmed?.document_url,
	// 				document_type : showConfirmed?.document_type,
	// 				image_url     : showConfirmed?.document_url,
	// 			},
	// 		});
	// 	}
	// };

	const {
		// loading,
		taskList,
		completedDocs,
		docTypes,
		filters,
		setFilters,
		// shipmentDocumentsHookSetters,
		// shipmentFilters,
		// refetch,
	} = useCreateTaskList({ shipment_data, primary_service });

	const { emailList : emailDocs } = useGetShipmentMails({
		cogo_shipment_id : shipment_data?.id,
		cogo_serial_id   : shipment_data?.serial_id,
		document_type    : docTypes,
	});

	return (
		<div className={styles.main_container}>
			<HeaderComponent
				activeToggle={activeToggle}
				setActiveToggle={setActiveToggle}
				// shipmentDocumentsHookSetters={shipmentDocumentsHookSetters}
				// shipmentFilters={shipmentFilters}
				shipment_data={shipment_data}
				data={completedDocs?.organizations}
				filters={filters}
				setFilters={setFilters}
				activeWallet={activeWallet}
				setActiveWallet={setActiveWallet}
			/>
			{!activeToggle ? (
				<CheckList
					data={taskList}
					setShow={setShow}
					setShowConfirmed={setShowConfirmed}
				// loading={loading}
					emailDocs={emailDocs}
					completedDocs={completedDocs?.list}
				/>
			) : <Wallet activeWallet={activeWallet} />}
			{/* <Modal
				show={show}
				onClose={() => setShow(null)}
				onOuterClick={() => {
					setShow(null);
				}}
				className="primary lg"
			>
				<UploadForm show={show} setShow={setShow} refetch={refetch} />
			</Modal> */}
			{/* <Approve
				showConfirmed={showConfirmed}
				setShowConfirmed={setShowConfirmed}
				addToWallet={addToWallet}
				setAddToWallet={setAddToWallet}
				handleApprove={handleApprove}
				setShow={setShow}
			/> */}
		</div>
	);
}

export default Documents;
