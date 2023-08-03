import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import React from 'react';

import Content from './Content';

const TASK_INDEX_SLICE_FOR_DOC_TYPE = -1;
const IGM_DOCUMENTS = ['bill_of_lading',
	'draft_bill_of_lading', 'house_bill_of_lading', 'draft_house_bill_of_lading', 'igm_document'];

const Card = ({
	taskList = [],
	completedDocs = [],
	emailDocs = [],
	shipment_data = {},
	primary_service = {},
	setShowDoc = () => {},
	setShowApproved = () => {},
	canEditDocuments = true,
	showIgmDocs = false,
	shipmentDocumentRefetch = () => {},
	activeStakeholder = '',
	bl_details = [],
}) => {
	const handleView = (url) => {
		window.open(url, '_blank');
	};

	const handleSave = (url) => {
		if (url) {
			saveAs(url);
		}
	};

	const IGM_TASK_LIST = [];

	const getDocType = (item) => item?.document_type
		|| item?.task?.split('upload_')?.slice(TASK_INDEX_SLICE_FOR_DOC_TYPE)[GLOBAL_CONSTANTS.zeroth_index];

	(taskList || []).forEach((item) => {
		const docType =	getDocType(item);
		if (!IGM_TASK_LIST.includes(docType) && IGM_DOCUMENTS.includes(docType)) {
			IGM_TASK_LIST.push(item);
		}
	});

	const updatedTaskList = showIgmDocs ? IGM_TASK_LIST : taskList;

	return (updatedTaskList || []).map((item, idx) => {
		const docType =	getDocType(item);

		let allUploadedDocs = (completedDocs || []).filter((doc) => doc.document_type === docType)
			|| emailDocs.filter((doc) => doc?.entity_type === docType);

		if (isEmpty(allUploadedDocs)) {
			allUploadedDocs = [{}];
		}

		return allUploadedDocs.map((uploadedItem) => {
			const isChecked = uploadedItem?.document_type === docType;
			const receivedViaEmail = !isChecked && uploadedItem?.entity_type === docType;
			const showUploadText = item?.pendingItem ? 'Upload' : '';

			return (
				<Content
					key={uploadedItem?.id || docType}
					uploadedItem={uploadedItem}
					receivedViaEmail={receivedViaEmail}
					showUploadText={showUploadText}
					idx={idx}
					taskList={updatedTaskList}
					isChecked={isChecked}
					shipment_data={shipment_data}
					item={item}
					docType={docType}
					handleView={handleView}
					handleSave={handleSave}
					primary_service={primary_service}
					setShowDoc={setShowDoc}
					setShowApproved={setShowApproved}
					canEditDocuments={canEditDocuments}
					shipmentDocumentRefetch={shipmentDocumentRefetch}
					activeStakeholder={activeStakeholder}
					bl_details={bl_details}
				/>
			);
		});
	});
};
export default Card;
