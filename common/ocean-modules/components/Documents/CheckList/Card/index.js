import { saveAs } from 'file-saver';
import React from 'react';

import Content from './Content';

const Card = ({
	data,
	completedDocs,
	emailDocs,
	shipment_data,
	primary_service,
}) => {
	const handleView = (url) => {
		window.open(url, '_blank');
	};

	const handleSave = (url) => {
		if (url) {
			saveAs(url);
		}
	};

	return (data || []).map((item, idx) => {
		const docType =	item?.document_type || item?.task.split('upload_').slice(-1)[0];

		let allExtraItem =	(completedDocs || []).filter((doc) => doc.document_type === docType)
			|| emailDocs.filter((doc) => doc?.entity_type === docType);

		if (allExtraItem.length === 0) {
			allExtraItem = [{}];
		}

		return allExtraItem.map((extraItem) => {
			const isChecked = extraItem?.document_type === docType;
			const receivedViaEmail = !isChecked && extraItem?.entity_type === docType;
			const showUploadButton = item?.pendingItem ? 'Upload' : '';

			return (
				<Content
					extraItem={extraItem}
					receivedViaEmail={receivedViaEmail}
					showUploadButton={showUploadButton}
					idx={idx}
					data={data}
					isChecked={isChecked}
					shipment_data={shipment_data}
					item={item}
					docType={docType}
					handleView={handleView}
					handleSave={handleSave}
					primary_service={primary_service}
				/>
			);
		});
	});
};
export default Card;
