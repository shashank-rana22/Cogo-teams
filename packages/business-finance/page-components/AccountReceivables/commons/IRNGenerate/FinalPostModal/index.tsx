import { Button, Modal, Placeholder } from '@cogoport/components';
import React from 'react';

import Loader from './Loader';
import SageDetailsCard from './SageDetailsCard';
import styles from './styles.module.css';

function FinalPostModal({
	finalPostToSageModal, setFinalPostToSageModal, finalPostFromSage,
	sageInvoiceData, sageInvoiceLoading, finalPostLoading,
}) {
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
			<Modal.Footer>

				{	sageInvoiceLoading

					? <Placeholder width="100px" height="30px" />

					:				(
						<Button
							disabled={finalPostLoading}
							onClick={() => {
								finalPostFromSage();
							}}
						>
							FINAL POST
						</Button>
					)}

			</Modal.Footer>
		</Modal>
	);
}

export default FinalPostModal;
