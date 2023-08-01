import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect, useState } from 'react';

const INVOICE_STATUSES = ['pending', 'reviewed', 'approved'];

const fetchImageData = async ({ url = '', setterFunc }) => {
	try {
		const response = await fetch(url);
		const blobData = await response.blob();
		const reader = new FileReader();
		reader.readAsDataURL(blobData);
		reader.onloadend = () => {
			const base64data = reader.result;
			setterFunc(base64data);
		};
	} catch (err) {
		console.log(err?.data);
	}
};

const getFinalUrls = ({
	invoice = {},
	importerExporterId = '',
	invoicesList = [],
}) => {
	const { billing_address = {} } = invoice || {};

	if (
		Object.values(GLOBAL_CONSTANTS.uuid.fortigo_agencies_mapping).includes(importerExporterId)
		|| Object.values(GLOBAL_CONSTANTS.others.fortigo_company_pan_mappings).includes(
			billing_address?.registration_number,
		)
	) {
		return {
			finalLogoUrl  : GLOBAL_CONSTANTS.image_url.fortigo_logo,
			finalStampUrl : GLOBAL_CONSTANTS.image_url.other_stamp,
		};
	}

	const filteredInvoices = invoicesList.reduce(
		(acc, inv) => {
			if (INVOICE_STATUSES.includes(inv.status)) {
				acc.req_invoices.push(inv);
			}
			if (inv.status === 'approved') {
				acc.approved_invoices.push(inv);
			}

			return acc;
		},
		{ req_invoices: [], approved_invoices: [] },
	);

	const { req_invoices = [], approved_invoices = [] } = filteredInvoices;

	if (approved_invoices?.length !== req_invoices?.length) {
		return {
			finalLogoUrl  : GLOBAL_CONSTANTS.image_url.cogo_logo,
			finalStampUrl : GLOBAL_CONSTANTS.image_url.other_stamp,
		};
	}

	return {
		finalLogoUrl  : GLOBAL_CONSTANTS.image_url.cogo_logo,
		finalStampUrl : GLOBAL_CONSTANTS.image_url.cogo_mumbai_invoice_stamp,
	};
};

const useGetImageSource = ({
	invoice = {},
	importerExporterId = '',
	invoicesList = [],
}) => {
	const [logoData, setLogoData] = useState('');
	const [stampData, setStampData] = useState('');

	useEffect(() => {
		const { finalLogoUrl, finalStampUrl } = getFinalUrls({
			invoice,
			importerExporterId,
			invoicesList,
		});
		fetchImageData({ url: finalLogoUrl, setterFunc: setLogoData });
		fetchImageData({ url: finalStampUrl, setterFunc: setStampData });
	}, [invoice, importerExporterId, invoicesList]);

	return {
		logoData,
		stampData,
	};
};

export default useGetImageSource;
