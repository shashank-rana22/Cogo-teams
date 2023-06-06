import { Modal, Button, Toggle } from '@cogoport/components';
import { useState, useRef } from 'react';

import useCreateShipmentDocument from '../../../../../../../../hooks/useCreateShipmentDocument';
import useListShipmentTradePartners from '../../../../../../../../hooks/useListShipmentTradePartners';

import Download from './Download';
import Invoices from './Invoices';
import styles from './styles.module.css';
import UploadProof from './UploadProof';
import { getPayload } from './utils/getPayload';

const INVOICE_STATUS_REVIEWED = ['reviewed', 'approved'];

function AddCustomerInvoice({
	closeModal = () => {},
	setShow = () => {},
	show = false,
	handleRefetch = () => {},
	invoice = {},
	shipmentData = {},
}) {
	const [showModal, setShowModal] = useState(false);
	const [toggle, setToggle] = useState(false);

	const formRef = useRef(null);

	const { data: tradePartnerData } = useListShipmentTradePartners({
		defaultFilters: {
			shipment_id      : shipmentData?.id,
			trade_party_type : 'shipper',
		},
		defaultParams: { add_service_objects_required: true },
	});

	const isAllowedToggle =	 INVOICE_STATUS_REVIEWED.includes(invoice?.status);

	const callback = () => {
		handleRefetch();
		closeModal();
	};

	const handleCloseModal = () => {
		setShow(true);
		setShowModal(false);
	};

	const handleGenerate = () => {
		setShowModal(true);
		setShow(false);
	};

	const { docLoading: loading, apiTrigger } = useCreateShipmentDocument({ refetch: callback });

	const customHandleSubmit = () => {
		const handleSubmitCallback = (data) => {
			const pdfUrl = data?.upload_proof?.finalUrl;
			const payload = getPayload({ shipmentData, invoice, pdfUrl });
			apiTrigger(payload);
		};
		formRef?.current?.handleSubmit?.(handleSubmitCallback)();
	};

	return (
		<section>
			{show ? (
				<Modal
					show
					showCloseIcon={false}
					closeOnOuterClick={false}
				>
					<Modal.Header title="Add Customer Invoice" />
					<Modal.Body>
						{isAllowedToggle ? (
							<Toggle
								offLabel={invoice?.customer_ftl_invoice
									? 'Download'
									: 'Upload'}
								onLabel="Generate"
								checked={toggle}
								onChange={() => setToggle(!toggle)}
							/>
						) : null}

						{toggle ? (
							<div className={styles.button_wrapper}>
								<Button onClick={handleGenerate}>
									Generate
								</Button>
							</div>
						)
							: (
								<>
									<UploadProof ref={formRef} />
									{invoice?.customer_ftl_invoice ? (
										<Download
											invoiceNumber={invoice?.live_invoice_number}
											invoiceUrl={invoice?.customer_ftl_invoice}
										/>
									) : null}
								</>
							)}
					</Modal.Body>
					<Modal.Footer className={styles.button_wrapper}>
						<Button onClick={() => setShow(false)} themeType="secondary"> Cancel</Button>
						<Button onClick={customHandleSubmit} disabled={loading}>Submit</Button>
					</Modal.Footer>
				</Modal>
			) : null}

			{showModal ? (
				<Modal
					size="fullscreen"
					onClose={handleCloseModal}
					show={showModal}
					className={styles.custom_modal}
				>
					<Modal.Header title="Invoice" />
					<Modal.Body>
						<Invoices
							shipmentData={shipmentData}
							invoice={invoice}
							handleRefetch={handleRefetch}
							handleCloseModal={handleCloseModal}
							handleClose={closeModal}
							tradePartnerData={tradePartnerData?.list}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</section>
	);
}

export default AddCustomerInvoice;
