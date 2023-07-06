import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

const formatSavedServicesInvoiceTo = ({ services }) => {
	const TRADE_TYPE_MAPPING = {
		export : 'origin',
		import : 'destination',
	};

	return (services || []).map((service) => {
		const { id, trade_type:tradeType, service_name, service_type } = service || {};

		let serviceName = service_name || service_type;

		if (tradeType in TRADE_TYPE_MAPPING && serviceName !== 'cargo_insurance') {
			serviceName = `${TRADE_TYPE_MAPPING[tradeType]}_${serviceName}`;
		}

		return {
			label      : startCase(serviceName),
			service_id : id,
			service    : serviceName,
		};
	});
};

const formatServices = ({ savedServicesInvoiceTo, invoicingPartyServices }) => {
	const serviceIdHash = {};
	savedServicesInvoiceTo.forEach((invoiceService) => {
		serviceIdHash[invoiceService.service_id] = invoiceService;
	});

	return invoicingPartyServices.map((invoicingPartyService) => {
		const { service_id } = invoicingPartyService;

		const keyToSearch = `[${service_id}].label`;

		return {
			...invoicingPartyService,
			label: serviceIdHash[keyToSearch] || '',
		};
	});
};

const useInvoicingParties = ({ detail = {}, invoice }) => {
	const { billing_addresses = [] } = invoice;

	const { services = {} } = detail;

	const savedServicesInvoiceTo = formatSavedServicesInvoiceTo({
		services: Object.values(services),
	});

	const savedServicesInvoiceToHash = {};
	savedServicesInvoiceTo.forEach((service) => {
		savedServicesInvoiceToHash[service.service_id] = service;
	});

	const invoiceParties = billing_addresses.map((parties) => ({
		...parties,
		poc: isEmpty(parties?.poc) ? null : parties.poc,
	}));

	const [invoicingParties, setInvoicingParties] = useState(() => invoiceParties.map((savedInvoicingParty) => ({
		...savedInvoicingParty,
		services: formatServices({
			savedServicesInvoiceTo,
			invoicingPartyServices: savedInvoicingParty[services] || [],
		}),

		state: {
			isSaved           : true,
			toDelete          : false,
			showHiddenContent : false,
		},
	})));

	return {
		invoicingParties,
	};
};

export default useInvoicingParties;
