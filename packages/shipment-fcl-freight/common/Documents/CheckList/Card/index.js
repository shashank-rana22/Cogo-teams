import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import React from 'react';

import Content from './Content';

const TASK_INDEX_SLICE_FOR_DOC_TYPE = -1;

const Card = ({
	taskList = [],
	completedDocs = [],
	emailDocs = [],
	shipment_data = {},
	primary_service = {},
	setShowDoc = () => {},
	setShowApproved = () => {},
	shipmentDocumentRefetch = () => {},
	activeStakeholder = '',
}) => {
	const handleView = (url) => {
		window.open(url, '_blank');
	};

	const handleSave = (url) => {
		if (url) {
			saveAs(url);
		}
	};

	return (taskList || []).map((item, idx) => {
		const docType =	item?.document_type
		|| item?.task?.split('upload_')?.slice(TASK_INDEX_SLICE_FOR_DOC_TYPE)[GLOBAL_CONSTANTS.zeroth_index];

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
					taskList={taskList}
					isChecked={isChecked}
					shipment_data={shipment_data}
					item={item}
					docType={docType}
					handleView={handleView}
					handleSave={handleSave}
					primary_service={primary_service}
					setShowDoc={setShowDoc}
					setShowApproved={setShowApproved}
					shipmentDocumentRefetch={shipmentDocumentRefetch}
					activeStakeholder={activeStakeholder}
				/>
			);
		});
	});
};
export default Card;
