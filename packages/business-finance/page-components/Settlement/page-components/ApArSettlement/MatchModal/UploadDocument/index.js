import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React from 'react';

// import { TextStyle, Container, HeaderDiv } from './styles';

function UploadDocument({ setFileValue, fileValue }) {
	// const handleUpload = async (value) => {
	// 	setFileValue(value);
	// 	// setShowDocument(false);
	// };
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
