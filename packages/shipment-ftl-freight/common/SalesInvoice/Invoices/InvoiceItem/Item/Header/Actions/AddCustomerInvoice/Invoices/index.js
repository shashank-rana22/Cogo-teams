import { Button } from '@cogoport/components';
import React, { useRef } from 'react';

import useCreateShipmentDocument from '../../../../../../../../../hooks/useCreateShipmentDocument';
import useGetShipmentFortigoTripDetail from '../../../../../../../../../hooks/useGetShipmentFortigoTripDetail';
import useListOrganizationTradeParties from '../../../../../../../../../hooks/useListOrganizationTradeParties';
import useGeneratePdf from '../hooks/useGeneratePdf';
import useGetImageSource from '../hooks/useGetImageSource';
import { getComponentMapping } from '../utils/componentMapper';
import { getPayload } from '../utils/getPayload';

import styles from './styles.module.css';

function Invoices({
	shipmentData = {},
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

	const { docLoading, apiTrigger } = useCreateShipmentDocument({ refetch: callbackCustomerInvoice });

	const InvoiceRef = useRef(null);
	const { loading: generateLoading, generatePdf } = useGeneratePdf();

	const params = {
		defaultParams: {
			documents_data_required         : true,
			other_addresses_data_required   : true,
			poc_data_required               : true,
			billing_addresses_data_required : true,
			page_limit                      : 50,
		},
		defaultFilters: {
			trade_party_type : 'self',
			status           : 'active',
		},
		organization_id: shipmentData?.importer_exporter_id,
	};

	const { data: tradePartyData } = useListOrganizationTradeParties({ ...params });

	const callbackGeneratePdf = (res) => {
		const pdfUrl = res?.data?.pdf_url;
		const payload = getPayload({ shipmentData, invoice, pdfUrl });
		apiTrigger(payload);
	};

	const { logoData, stampData } = useGetImageSource();

	const { loading: customDataLoading, data: customData } = useGetShipmentFortigoTripDetail({
		defaultParams: {
			shipment_id            : shipmentData?.serial_id,
			invoice_combination_id : invoice?.id,
		},
	});
	const finalRegistrationNumber = customData?.customer_details?.customer_pan;

	const Component = getComponentMapping(finalRegistrationNumber);

	const generateInvoice = () => {
		const html = `<html><body>${InvoiceRef.current.innerHTML}</body></html>`;
		generatePdf({ html, scale: 0.6, callback: callbackGeneratePdf });
	};

	return (
		<>
			<div ref={InvoiceRef}>
				{Component ? (
					<Component
						logoData={logoData}
						stampData={stampData}
						customData={customData}
						tradePartnerData={tradePartnerData}
						invoice={invoice}
						tradePartyData={tradePartyData}
						importerExporterId={shipmentData?.importer_exporter_id}
					/>
				) : null}
			</div>
			<div className={styles.button_wrapper}>
				<Button
					onClick={generateInvoice}
					loading={generateLoading || docLoading || customDataLoading}
				>
					Submit
				</Button>
			</div>
		</>
	);
}

export default Invoices;
