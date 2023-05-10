import { Button, Modal } from '@cogoport/components';
import React from 'react';

import InvoiceDetailCard from './InvoiceDetailCard';
import Loader from './Loader';
import SageDetailsCard from './SageDetailsCard';
import styles from './styles.module.css';

function FinalPostModal({
	finalPostToSageModal, setFinalPostToSageModal, finalPostFromSage,
	sageInvoiceData, sageInvoiceLoading,
}) {
	const { platformInvoiceInfo = [], sageInvoiceInfo = [] } = sageInvoiceData || {};

	const platformInvoiceInfoObject = platformInvoiceInfo[0] || {};

	const {
		job_number: JobNumber = '',
	} = platformInvoiceInfoObject;

	return (
		<Modal
			show={finalPostToSageModal}
			size="xl"
			onClose={() => {
				setFinalPostToSageModal(false);
			}}
		>

			<Modal.Header title={(
				<div className={styles.styled_header}>
					FINAL POST TO SAGE : #
					<span className={styles.styled_job_number}>{JobNumber}</span>
				</div>
			)}
			/>
			<Modal.Body>

				{ sageInvoiceLoading ? <Loader />

					: (
						<div className={styles.styled_body}>

							<div className={styles.styled_text}>Invoice Details</div>

							<InvoiceDetailCard platformInvoiceInfo={platformInvoiceInfo} />
							<div className={styles.flex_style}>
								<div className={styles.styled_text}>Invoice Details On</div>
								<div className={styles.sage_style}> SAGE</div>
							</div>

							<SageDetailsCard sageInvoiceInfo={sageInvoiceInfo} />

						</div>
					)}

			</Modal.Body>
			<Modal.Footer>

				<Button
					disabled={false}
					onClick={() => {
						finalPostFromSage();
					}}
				>
					FINAL POST
				</Button>

			</Modal.Footer>
		</Modal>
	);
}

export default FinalPostModal;
