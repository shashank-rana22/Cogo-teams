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
	uploadProof: string;
	setUploadProof?: (v) => void;
	itemData: {
		id?: string,
		[key: string]: string
	};
	refetch: Refetch
	open: boolean;
};

function UploadInvoiceModal({ setOpen, uploadProof, setUploadProof, itemData, refetch, open }: Props) {
	const bodyStyle = uploadProof ? styles.body : '';
	const { uploadDoc, loading } = useUpdateStatus({
		uploadProof,
		setOpen,
		itemData,
		refetch,
	});
	const handleManualUpload = () => {
		if (!isEmpty(uploadProof)) {
			uploadDoc();
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
						value={uploadProof}
						onChange={setUploadProof}
						showProgress
						draggable
						multipleUploadDesc="Upload Invoice"
						uploadIcon={<IcMUpload height={40} width={40} />}
						accept=".pdf"
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
