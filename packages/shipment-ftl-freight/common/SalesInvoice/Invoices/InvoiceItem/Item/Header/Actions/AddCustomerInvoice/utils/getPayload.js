export const getPayload = ({ shipmentData, invoice, pdfUrl, source = '' }) => {
	const payload = {
		shipment_id        : shipmentData?.id,
		document_type      : 'customer_ftl_invoice',
		service_type       : 'ftl_freight_service',
		uploaded_by_org_id : shipmentData?.importer_exporter_id,
		documents          : [
			{
				file_name    : `customer_ftl_invoice_${invoice?.live_invoice_number}`,
				document_url : pdfUrl,
				data         : {
					proforma_number: invoice?.live_invoice_number,
					source,
				},
			},
		],
	};

	return payload;
};
