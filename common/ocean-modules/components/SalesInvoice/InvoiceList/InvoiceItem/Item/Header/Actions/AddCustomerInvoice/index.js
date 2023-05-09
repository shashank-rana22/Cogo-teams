// import { AwsUploader } from '@cogo/smart-components';
import { Modal, Button } from '@cogoport/components';
import { IcMCloudUpload, IcMDownload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import styles from './styles.module.css';
// import useCreateCustomerInvoice from '../../../../../../../../hooks/useCreateCustomerInvoice';

function AddCustomerInvoice({
	closeModal = () => {},
	show = false,
	handleRefetch = () => {},
	invoice = {},
	shipment_data = {},
}) {
	const [uploadProof, setUploadProof] = useState(null);

	const handleClose = () => {
		setUploadProof(null);
		closeModal();
	};

	const callback = () => {
		handleRefetch();
		handleClose();
	};

	// const { loading, createCustomerInvoice } = useCreateCustomerInvoice({
	// 	callback,
	// 	shipment_data,
	// 	invoice,
	// });

	// const handleSubmit = () => {
	// 	createCustomerInvoice(uploadProof);
	// };

	const customerInvoicePresent = !isEmpty(invoice?.customer_ftl_invoice);

	return (
		<Modal onClose={() => closeModal()} show={show}>
			<Modal.Header title="customerInvoicePresent ? Download : Add}
					Customer Invoice"
			/>
			<Modal.Body>
				<div className={styles.Container}>
					{customerInvoicePresent ? (
						<div className={styles.DownloadContainer}>
							<IcMDownload color="#5936f0" />
						&nbsp;
							<div
								className={styles.DownloadLink}
								href={invoice?.customer_ftl_invoice}
								target="_blank"
								rel="noreferrer"
							>
								{`Download customer_ftl_invoice_${invoice?.live_invoice_number}`}
							</div>
						</div>
					) : (
						<div>
							{/* <AwsUploader
							value={uploadProof}
							onChange={setUploadProof}
							showProgress
							onlyURLOnChange
							themeType="secondary"
							lowerlabel="Choose a file or drag it here ↑"
							label="Please upload rate sheet"
							accept="image/*,.pdf,.csv,.xlsx,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
							drag
							uploadType="aws"
							uploadIcon={() => <IcMCloudUpload height={42} width={42} />}
							height={77}
							width="100%"
						/> */}
						</div>
					)}
				</div>

			</Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary md cancel"
					onClick={handleClose}
					style={{ marginRight: '12px' }}
				>
					Cancel
				</Button>
				<Button
					className="primary md"
				>
					Submit
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default AddCustomerInvoice;
