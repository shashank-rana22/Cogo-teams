import { Modal, Button } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import React from 'react';

function UploadDocument({
	showDocument = false,
	setShowDocument = () => {},
	onOuterClick = () => {},
	fileValue = {},
	setFileValue = () => {},
	t = () => {},
}) {
	return (
		<Modal
			show={showDocument}
			onClose={() => { setShowDocument(false); }}
			onOuterClick={() => onOuterClick()}
			size="md"
		>
			<Modal.Header title={t('settlement:upload_document_title')} />
			<Modal.Body>
				<div style={{ display: 'block', alignItems: 'center', marginBottom: '16px' }}>
					<p>{t('settlement:drag_drop')}</p>
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
					{t('settlement:upload_btn')}
				</Button>
				<Button
					themeType="secondary"
					onClick={() => { setShowDocument(false); setFileValue({}); }}
				>
					{t('settlement:cancel_btn')}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default UploadDocument;
