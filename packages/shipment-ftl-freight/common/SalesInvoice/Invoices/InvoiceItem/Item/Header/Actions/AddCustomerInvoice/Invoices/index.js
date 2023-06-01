import { Button } from '@cogoport/components';
import React, { useRef } from 'react';

import useCreateShipmentDocument from '../../../../../../../../../hooks/useCreateShipmentDocument';
import useGeneratePdf from '../hooks/useGeneratePdf';
import useGetCustomInvoiceData from '../hooks/useGetCustomInvoiceData';
import useGetImageSource from '../hooks/useGetImageSource';
import useGetTradeParties from '../hooks/useGetTradeParties';
import { componentMapper } from '../utils/componentMapper';

import styles from './styles.module.css';

function Invoices({
	shipment_data = {},
	invoice = {},
	tradePartnerData = {},
	handleRefetch = () => {},
	handleCloseModal = () => {},
	handleClose = () => {},
}) {
	const callbackCustomerInvoice = () => {
		handleRefetch();
		handleCloseModal();
		handleClose();
	};

	const { docLoading, apiTrigger } = useCreateShipmentDocument({
		callback: callbackCustomerInvoice,
		shipment_data,
		invoice,
	});

	const ref = useRef(null);
	const { loading: generateLoading, generatePdf } = useGeneratePdf();
	const { data: tradePartyData } = useGetTradeParties({ shipment_data });
	const shipperTradePartyPanNumber = 'AABCA8056G';
	// tradePartnerData?.list?.[0]?.trade_partner_details?.registration_number;

	const callbackGeneratePdf = (res) => {
		apiTrigger(res?.data?.pdf_url);
	};
	const { logoData, stampData } = useGetImageSource();
	const { loading: customDataLoading, data: customData } = useGetCustomInvoiceData({
		shipment_id                 : shipment_data?.serial_id,
		invoice_combination_id      : invoice?.id,
		shipper_registration_number : shipperTradePartyPanNumber,
	});
	const generateInvoice = () => {
		const html = `<html><body>
		${ref.current.innerHTML}</body></html>`;
		generatePdf({ html, scale: 0.7, callback: callbackGeneratePdf });
	};

	const Component = componentMapper[shipperTradePartyPanNumber].component;

	return (
		<>
			<div ref={ref}>
				{Component ? (
					<Component
						logoData={logoData}
						stampData={stampData}
						customData={customData}
						tradePartnerData={tradePartnerData}
						invoice={invoice}
						// tradePartyData={tradePartyData}
						importerExporterId={shipment_data?.importer_exporter_id}
					/>
				) : null}
			</div>
			<div className={styles.button_wrapper}>
				<Button
					className="primary md"
					onClick={generateInvoice}
					// loading={generateLoading || docLoading || customDataLoading}
				>
					Submit
				</Button>
			</div>
		</>
	);
}

export default Invoices;
