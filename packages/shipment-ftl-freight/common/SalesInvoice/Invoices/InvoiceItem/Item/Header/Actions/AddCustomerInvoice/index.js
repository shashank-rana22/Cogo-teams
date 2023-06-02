import { Modal, Button, Toggle } from '@cogoport/components';
import { useState } from 'react';

import useCreateShipmentDocument from '../../../../../../../../hooks/useCreateShipmentDocument';
import useListShipmentTradePartners from '../../../../../../../../hooks/useListShipmentTradePartners';

import Download from './Download';
import Invoices from './Invoices';
import styles from './styles.module.css';
import UploadProof from './UploadProof';
import { shipperToPanMapping } from './utils/serviceDescriptionMappings';

function AddCustomerInvoice({
	closeModal = () => {},
	setShow = () => {},
	show = false,
	handleRefetch = () => {},
	invoice = {},
	shipmentData = {},
}) {
	const [uploadProof, setUploadProof] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [toggle, setToggle] = useState(false);

	const { data: tradePartnerData } = useListShipmentTradePartners({
		defaultFilters: {
			shipment_id      : shipmentData?.id,
			trade_party_type : 'shipper',
		},
		defaultParams: { add_service_objects_required: true },
	});

	const isFTLFortigoShipper =	 (tradePartnerData || [])
		.some((singleItem) => Object.values(shipperToPanMapping).includes(
			singleItem?.trade_partner_details?.registration_number,
		)) && invoice?.status === 'approved';

	const handleClose = () => {
		setUploadProof(null);
		closeModal();
	};

	const callback = () => {
		handleRefetch();
		handleClose();
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

	const handleSubmit = () => {
		console.log(uploadProof);
	};

	return (
		<section>
			<Modal
				show={show}
				showCloseIcon={false}
				closeOnOuterClick={false}
			>
				<Modal.Header title="AddCustomerInvoice" />
				<Modal.Body>
					{isFTLFortigoShipper ? (
						<div className="toggle">
							<Toggle
								offLabel={invoice?.customer_ftl_invoice
									? 'Download'
									: 'Upload'}
								onLabel="Generate"
								value={toggle}
								onChange={() => setToggle(!toggle)}
							/>
						</div>
					) : null}

					{toggle === false && !invoice?.customer_ftl_invoice ? (
						<UploadProof
							uploadProof={uploadProof}
							setUploadProof={setUploadProof}
							handleClose={handleClose}
							loading={loading}
							handleSubmit={handleSubmit}
						/>
					) : null}
					{toggle === false && invoice?.customer_ftl_invoice ? (
						<Download
							invoiceNumber={invoice?.live_invoice_number}
							invoiceUrl={invoice?.customer_ftl_invoice}
						/>
					) : null}
					{toggle ? (
						<div className={styles.button_wrapper}>
							<Button
								onClick={handleClose}
								disabled={loading}
							>
								Cancel
							</Button>

							<Button onClick={handleGenerate}>
								Generate
							</Button>
						</div>
					) : null}
				</Modal.Body>
				<Modal.Footer className={styles.button_wrapper}>
					<Button onClick={() => setShow(false)} themeType="secondary"> Cancel</Button>
					<Button>Submit</Button>
				</Modal.Footer>
			</Modal>

			{showModal ? (
				<Modal
					size="fullscreen"
					onClose={handleCloseModal}
					show={showModal}
					className={styles.custom_modal}
				>
					<Modal.Header title="Template" />
					<Modal.Body>
						<Invoices
							shipmentData={shipmentData}
							invoice={invoice}
							handleRefetch={handleRefetch}
							handleCloseModal={handleCloseModal}
							handleClose={handleClose}
							tradePartnerData={tradePartnerData}
						/>
					</Modal.Body>
				</Modal>
			) : null}
		</section>
	);
}

export default AddCustomerInvoice;
