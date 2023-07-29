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

function RenderContent({
	loading = true, activeToggle = true, canEditDocuments = true, filteredTaskList = [], emailList = [],
	completedDocs = {}, setShowDoc = () => {}, setShowApproved = () => {},
	showIgmDocs = false, refetch = () => {}, activeStakeholder = '',
	bl_details = [], activeWallet = '', orgDocService = '',
}) {
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
				canEditDocuments={canEditDocuments}
				showIgmDocs={showIgmDocs}
				shipmentDocumentRefetch={refetch}
				activeStakeholder={activeStakeholder}
				bl_details={bl_details}
			/>
		);
	}
	if (canEditDocuments) {
		return (
			<Wallet
				activeWallet={activeWallet}
				orgDocService={orgDocService}
			/>
		);
	}
	return null;
}

function Documents() {
	const { shipment_data, primary_service, stakeholderConfig, activeStakeholder } = useContext(ShipmentDetailContext);

	const [showDoc, setShowDoc] = useState(null);
	const [showApproved, setShowApproved] = useState(false);
	const [activeToggle, setActiveToggle] = useState(false);
	const [activeWallet, setActiveWallet] = useState('trade_documents');
	const [addToWallet, setAddToWallet] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const [orgDocService, setOrgDocService] = useState('');

	const { updateDocument } = useUpdateDocument({});

	const {
		loading,
		taskList,
		completedDocs,
		docTypes,
		filters,
		setFilters,
		refetch,
		bl_details,
	} = useCreateTaskList({ shipment_data, primary_service });

	const emailPayload = {
		cogo_shipment_id : shipment_data?.id,
		entity_type      : docTypes,
	};

	const { emailList } = useGetShipmentMails({
		payload: emailPayload,
	});

	const handleApprove = async () => {
		setShowDoc(showApproved);
		setShowApproved(null);
		if (addToWallet) {
			const values = {
				name            : showApproved?.file_name || showApproved?.document_url,
				document_type   : showApproved?.document_type,
				image_url       : showApproved?.document_url,
				organization_id : showApproved?.organization_id,
			};
			await updateDocument(values);
		}
	};

	const filteredTaskList = taskList?.filter((item) => item?.label?.toLowerCase().includes(searchValue)
	|| item?.document_type?.toLowerCase().includes(searchValue));

	const canEditDocuments = !!stakeholderConfig?.documents?.can_edit_documents;
	const showIgmDocs = !!stakeholderConfig?.documents?.show_igm_docs;

	return (
		<section className={styles.main_container}>
			{!showIgmDocs ? (
				<HeaderComponent
					activeToggle={activeToggle}
					setActiveToggle={setActiveToggle}
					data={completedDocs?.organizations}
					filters={filters}
					setFilters={setFilters}
					setSearchValue={setSearchValue}
					searchValue={searchValue}
					activeWallet={activeWallet}
					setActiveWallet={setActiveWallet}
					refetch={refetch}
					setOrgDocService={setOrgDocService}
					orgDocService={orgDocService}
				/>
			) : null}

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

			<RenderContent
				loading={loading}
				activeToggle={activeToggle}
				canEditDocuments={canEditDocuments}
				filteredTaskList={filteredTaskList}
				emailList={emailList}
				setShowDoc={setShowDoc}
				setShowApproved={setShowApproved}
				activeStakeholder={activeStakeholder}
				showIgmDocs={showIgmDocs}
				completedDocs={completedDocs}
				refetch={refetch}
				bl_details={bl_details}
				activeWallet={activeWallet}
				orgDocService={orgDocService}
			/>

			{canEditDocuments ? (
				<Approve
					showApproved={showApproved}
					setShowApproved={setShowApproved}
					addToWallet={addToWallet}
					setAddToWallet={setAddToWallet}
					handleApprove={handleApprove}
					setShowDoc={setShowDoc}
				/>
			) : null }
		</section>
	);
}

export default Documents;
