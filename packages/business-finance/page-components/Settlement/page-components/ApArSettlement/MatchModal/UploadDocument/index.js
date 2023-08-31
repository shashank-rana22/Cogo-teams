import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React from 'react';

function UploadDocument({ setFileValue = () => {}, fileValue = '' }) {
	return (
		<div>
			<div style={{ display: 'block', alignItems: 'center', marginBottom: '16px' }}>
				<p>Drag and drop your files here!</p>
				<FileUploader defaultValues={fileValue?.finalUrl || fileValue} onChange={setFileValue} type="card" />
			</div>
		</div>
	);
}
export default UploadDocument;
