import { Modal, Button, Toggle } from '@cogoport/components';
import FooterButtonWrapper from '@cogoport/surface-modules/common/FooterButtonWrapper';
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
	handleRefetch = () => {},
	invoice = {},
	shipmentData = {},
	setShowModal = () => {},
}) {
	const [showInvoiceModal, setShowInvoiceModal] = useState(false);
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
		setShowModal(false);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleGenerate = () => {
		setShowInvoiceModal(true);
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
				<Modal.Footer>
					<FooterButtonWrapper>
						<Button onClick={handleCloseModal} themeType="secondary"> Cancel</Button>
						<Button onClick={customHandleSubmit} disabled={loading}>Submit</Button>
					</FooterButtonWrapper>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showInvoiceModal}
				size="fullscreen"
				onClose={handleCloseModal}
				className={styles.custom_modal}
			>
				<Modal.Header title="Invoice" />
				<Modal.Body>
					<Invoices
						shipmentData={shipmentData}
						invoice={invoice}
						handleRefetch={handleRefetch}
						handleCloseModal={handleCloseModal}
						handleClose={() => setShowInvoiceModal(false)}
						tradePartnerData={tradePartnerData?.list}
					/>
				</Modal.Body>
			</Modal>
		</section>
	);
}

export default AddCustomerInvoice;
