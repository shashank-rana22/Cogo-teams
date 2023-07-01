import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { saveAs } from 'file-saver';
import React from 'react';

import Content from './Content';

const TASK_INDEX_SLICE_FOR_DOC_TYPE = -1;

const Card = ({
	taskList,
	completedDocs,
	emailDocs,
	shipment_data,
	setShowDoc,
	setShowApproved,
	setUpdateAirwayBill,
}) => {
	const handleView = (url) => {
		window.open(url, '_blank');
	};

	const handleSave = (url, name = 'file') => {
		if (url) { saveAs(url, `${shipment_data?.serial_id}-${name}`); }
	};

	return (taskList || []).map((item, idx) => {
		const docType =	item?.document_type
		|| item?.task.split('upload_').slice(TASK_INDEX_SLICE_FOR_DOC_TYPE)[GLOBAL_CONSTANTS.zeroth_index];

		let allUploadedDocs =	(completedDocs || []).filter((doc) => doc.document_type === docType)
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
					setShowDoc={setShowDoc}
					setShowApproved={setShowApproved}
					key={uploadedItem?.id || docType}
					setUpdateAirwayBill={setUpdateAirwayBill}
				/>
			);
		});
	});
};
export default Card;
