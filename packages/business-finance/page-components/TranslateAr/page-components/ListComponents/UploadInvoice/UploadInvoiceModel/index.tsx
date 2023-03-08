import { Button, Modal, Toast } from '@cogoport/components';
import FileUploader from '@cogoport/forms/page-components/Business/FileUploader';
import { IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { Refetch } from '../../../../common/interfaces';
import useUpdateStatus from '../../../../hooks/useGetUpdateStatus';

import styles from './styles.module.css';

type Props = {
	setOpen?: (v) => void;
	uploadProof: { fileName: string; finalUrl : string };
	setUploadProof?: (v) => void;
	itemData: {
		id?: string,
		[key: string]: string
	};
	refetch: Refetch
	open: boolean;
};

function UploadInvoiceModal({ setOpen, uploadProof, setUploadProof, itemData, refetch, open }: Props) {
	const { fileName = '', finalUrl } = uploadProof || {};
	const bodyStyle = finalUrl ? styles.body : '';
	const { uploadDoc, loading } = useUpdateStatus({
		finalUrl,
		setOpen,
		itemData,
		refetch,
	});
	const fileExtension = fileName.split('.').pop();
	const handleManualUpload = () => {
		if (!isEmpty(finalUrl) && fileExtension === 'pdf') {
			uploadDoc();
		} else if (fileExtension !== 'pdf' && fileExtension) {
			Toast.error('Only pdf files are allowed');
		} else {
			Toast.error('Invoice doc is required');
		}
	};
	return (
		<Modal show={open} size="sm" onClose={() => setOpen(false)} className={styles.modal_container}>
			<Modal.Header title="Upload Scan of Invoice" />
			<Modal.Body>
				<section className={bodyStyle}>
					<FileUploader
						value={finalUrl}
						docName={fileName}
						fileName={fileName}
						onChange={setUploadProof}
						showProgress
						draggable
						fileLink={finalUrl}
						multipleUploadDesc="Upload Invoice"
						uploadIcon={<IcMUpload height={40} width={40} />}
						accept="application/pdf"
					/>
				</section>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					style={{ marginRight: 10 }}
					themeType="secondary"
					onClick={() => {
						setOpen(false);
						setUploadProof(null);
					}}
				>
					Cancel
				</Button>
				<Button
					size="md"
					onClick={handleManualUpload}
					loading={loading}
				>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UploadInvoiceModal;
