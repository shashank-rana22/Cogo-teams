import { Modal, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React from 'react';

const TITLE = 'Upload Document';

function UploadDocument({
	showDocument = false,
	setShowDocument = () => {},
	onOuterClick = () => {},
	fileValue = {},
	setFileValue = () => {},
}) {
	return (
		<Modal
			show={showDocument}
			onClose={() => { setShowDocument(false); }}
			onOuterClick={() => onOuterClick()}
			size="md"
		>
			<Modal.Header title={TITLE} />
			<Modal.Body>
				<div style={{ display: 'block', alignItems: 'center', marginBottom: '16px' }}>
					<p>Drag and drop your files here!</p>
					<FileUploader
						defaultValues={fileValue?.finalUrl || fileValue}
						onChange={setFileValue}
						draggable
						type="card"
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>

				<Button
					style={{ marginRight: '6px' }}
					onClick={() => { setShowDocument(false); }}
					themeType="secondary"
				>
					Upload
				</Button>
				<Button
					themeType="secondary"
					onClick={() => { setShowDocument(false); setFileValue({}); }}
				>
					Cancel/Remove File
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default UploadDocument;
