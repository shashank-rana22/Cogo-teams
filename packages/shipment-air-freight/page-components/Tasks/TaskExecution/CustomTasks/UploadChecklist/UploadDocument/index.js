import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

function UploadDocument({ singleItem = {}, setInvoiceData = () => {} }) {
	const [uploadDocument, setUploadDocument] = useState([]);
	useEffect(() => {
		const itemData = JSON.parse(singleItem?.data) || {};

		if (!isEmpty(uploadDocument)) {
			setInvoiceData((prev) => [...prev,
				{
					file_name     : 'Checklist Document',
					document_url  : uploadDocument,
					document_type : 'checklist',
					data          : { ...itemData, checklist_document_url: uploadDocument },
				}]);
		}
	}, [setInvoiceData, singleItem?.data, singleItem?.document_url, uploadDocument]);

	return (
		<FileUploader
			value={uploadDocument}
			onChange={setUploadDocument}
			draggable
			showProgress
		/>
	);
}

export default UploadDocument;
