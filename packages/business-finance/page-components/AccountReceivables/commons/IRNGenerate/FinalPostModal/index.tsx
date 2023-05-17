import { Button, Modal } from '@cogoport/components';
import React from 'react';

import Loader from './Loader';
import SageDetailsCard from './SageDetailsCard';
import styles from './styles.module.css';

interface InvoiceData {
	platformInvoiceInfo?:object,
	sageInvoiceInfo?:object
}

interface Props {
	finalPostToSageModal?:boolean,
	setFinalPostToSageModal?:Function,
	finalPostFromSage?:Function,
	sageInvoiceData?:InvoiceData,
	sageInvoiceLoading?:boolean,
	finalPostLoading?:boolean,
	isFinalPosted?:boolean,
}

function FinalPostModal({
	finalPostToSageModal, setFinalPostToSageModal, finalPostFromSage,
	sageInvoiceData, sageInvoiceLoading, finalPostLoading, isFinalPosted,
}:Props) {
	const { platformInvoiceInfo = {}, sageInvoiceInfo = {} } = sageInvoiceData || {};

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
					FINAL POST TO SAGE
					{isFinalPosted ? '(DETAILS)' : ''}
				</div>
			)}
			/>
			<Modal.Body>

				{ sageInvoiceLoading ? <Loader />

					: (
						<div className={styles.styled_body}>

							<div className={styles.styled_text}>Invoice Details</div>

							<SageDetailsCard InvoiceInfo={platformInvoiceInfo} />
							<div className={styles.flex_style}>
								<div className={styles.styled_text}>Invoice Details On</div>
								<div className={styles.sage_style}> SAGE</div>
							</div>

							<SageDetailsCard InvoiceInfo={sageInvoiceInfo} />

						</div>
					)}

			</Modal.Body>

			{!isFinalPosted && !sageInvoiceLoading && (
				<Modal.Footer>
					<Button
						disabled={finalPostLoading}
						onClick={() => {
							finalPostFromSage();
						}}
					>
						FINAL POST
					</Button>
				</Modal.Footer>
			)}

		</Modal>
	);
}

export default FinalPostModal;
