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
	showModal?:boolean,
	setShowModal?:Function,
	finalPostFromSage?:Function,
	sageInvoiceData?:InvoiceData,
	sageInvoiceLoading?:boolean,
	finalPostLoading?:boolean,
	postToSage?: Function;
}

function SageInformation({
	showModal, setShowModal, sageInvoiceData, sageInvoiceLoading, finalPostLoading, finalPostFromSage, postToSage,
}:Props) {
	const { platformInvoiceInfo = {}, sageInvoiceInfo = {} } = sageInvoiceData || {};

	const { status = '' } = platformInvoiceInfo;

	let BUTTON_ACTION;

	const STATUS = ['IRN_GENERATED', 'FAILED'];

	if (STATUS.includes(status)) {
		BUTTON_ACTION = 'POST INVOICE TO SAGE';
	} else if (status === 'POSTED') {
		BUTTON_ACTION = 'POST INVOICE FROM SAGE';
	}

	const handleClick = () => {
		if (STATUS.includes(status)) {
			postToSage();
		} else if (status === 'POSTED') {
			finalPostFromSage();
		}
	};

	return (
		<Modal
			show={showModal}
			size="xl"
			onClose={() => {
				setShowModal(false);
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

			{!sageInvoiceLoading && (
				<Modal.Footer>
					<Button
						size="sm"
						disabled={finalPostLoading || status === 'FINAL_POSTED'}
						onClick={() => handleClick()}
					>
						{BUTTON_ACTION || status}
					</Button>
				</Modal.Footer>
			)}

		</Modal>
	);
}

export default SageInformation;
