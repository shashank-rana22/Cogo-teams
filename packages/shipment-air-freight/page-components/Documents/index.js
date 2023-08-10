import { Modal } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { React, useState, useEffect, useContext } from 'react';

import useCreateOrganizationDocument from '../../hooks/useCreateOrganizationDocument';
import useCreateTaskList from '../../hooks/useCreateTaskList';
import useListRpaMails from '../../hooks/useListRpaMails';

import ApproveModal from './ApproveModal';
import CheckList from './CheckList';
import Header from './Header';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import UpdateAirwayBill from './UpdateAirwayBill';
import UploadForm from './UploadForm';
import Wallet from './Wallet';

function Documents() {
	const {
		shipment_data, activeStakeholder,
		stakeholderConfig:{ documents = {} } = {},
	} = 	useContext(ShipmentDetailContext);

	const [showDoc, setShowDoc] = useState({
		uploadModal: false,
	});
	const [showApproved, setShowApproved] = useState(false);
	const [activeToggle, setActiveToggle] = useState(false);
	const [activeWallet, setActiveWallet] = useState(documents.default_wallet);
	const [addToWallet, setAddToWallet] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [updateAirwayBill, setUpdateAirwayBill] = useState({
		updateModal: false,
	});

	const { apiTrigger:createDocumentTrigger } = useCreateOrganizationDocument({});

	const {
		loading,
		taskList,
		completedDocs,
		docTypes,
		filters,
		setFilters,
		refetch,
		sourceOptions,
	} = useCreateTaskList({ shipment_data });

	useCreateTaskList({ shipment_data });

	const { emailList = [], getShipmentEmails } = useListRpaMails({
		params: {
			cogo_shipment_id : shipment_data?.id,
			entity_type      : docTypes,
		},

	});

	useEffect(() => {
		if (docTypes.length) {
			getShipmentEmails();
		}
	}, [docTypes.length, getShipmentEmails]);

	const handleApprove = async () => {
		setShowDoc((prev) => ({ ...prev, showApproved }));

		if (addToWallet) {
			const values = {
				name            : showApproved?.file_name || showApproved?.document_url,
				document_type   : showApproved?.document_type,
				image_url       : showApproved?.document_url,
				organization_id : showApproved?.organization_id,
			};
			await createDocumentTrigger(values);
		}

		setShowApproved(false);
	};

	const filteredTaskList = taskList?.filter((item) => item?.label?.toLowerCase().includes(searchValue)
	|| item?.document_type?.toLowerCase().includes(searchValue));

	const renderContent = () => {
		if (loading) {
			return <LoadingState />;
		}

		if (!activeToggle) {
			return (
				<CheckList
					taskList={filteredTaskList}
					emailDocs={emailList}
					completedDocs={completedDocs?.list}
					setShowDoc={setShowDoc}
					setShowApproved={setShowApproved}
					setUpdateAirwayBill={setUpdateAirwayBill}
				/>
			);
		}
		return <Wallet activeWallet={activeWallet} />;
	};

	return (
		<div className={styles.main_container}>
			<Header
				activeToggle={activeToggle}
				setActiveToggle={setActiveToggle}
				shipment_data={shipment_data}
				sourceOptions={sourceOptions}
				filters={filters}
				setFilters={setFilters}
				setSearchValue={setSearchValue}
				searchValue={searchValue}
				activeWallet={activeWallet}
				setActiveWallet={setActiveWallet}
				activeStakeholder={activeStakeholder}
				refetch={refetch}
			/>

			<Modal
				className={styles.modal_container}
				show={showDoc?.uploadModal}
				size="lg"
				onClose={() => setShowDoc({ uploadModal: false })}
				placement="top"
			>
				<UploadForm
					showDoc={showDoc}
					setShowDoc={setShowDoc}
					refetch={refetch}
					activeWallet={activeWallet}
					setActiveWallet={setActiveWallet}
				/>
			</Modal>

			{renderContent()}

			<ApproveModal
				showApproved={showApproved}
				setShowApproved={setShowApproved}
				addToWallet={addToWallet}
				setAddToWallet={setAddToWallet}
				handleApprove={handleApprove}
				setShowDoc={setShowDoc}
			/>

			{updateAirwayBill ? (
				<UpdateAirwayBill
					updateAirwayBill={updateAirwayBill}
					setUpdateAirwayBill={setUpdateAirwayBill}
					refetch={refetch}
					details={updateAirwayBill}
				/>
			) : null}
		</div>
	);
}

export default Documents;
