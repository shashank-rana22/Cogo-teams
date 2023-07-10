import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import useGetPaymentModes from './hooks/useGetPaymentModes';

const DEFAULT_VALUE = 0;

const formatSavedServicesInvoiceTo = ({ services }) => {
	const TRADE_TYPE_MAPPING = {
		export : 'origin',
		import : 'destination',
	};

	return (services || []).map((service) => {
		const {
			id,
			trade_type: tradeType,
			service_name,
			service_type,
		} = service || {};

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
	const SERVICE_ID_HASH = {};
	savedServicesInvoiceTo.forEach((invoiceService) => {
		SERVICE_ID_HASH[invoiceService.service_id] = invoiceService;
	});

	return invoicingPartyServices.map((invoicingPartyService) => {
		const { service_id } = invoicingPartyService;

		return {
			...invoicingPartyService,
			label: SERVICE_ID_HASH[service_id].label || '',
		};
	});
};

const useInvoicingParties = ({ detail = {}, invoice }) => {
	const { billing_addresses = [] } = invoice;

	const { services = {} } = detail;

	const savedServicesInvoiceTo = formatSavedServicesInvoiceTo({
		services: Object.values(services),
	});

	const savedServicesInvoiceToHash = savedServicesInvoiceTo.reduce(
		(acc, curr) => ({ ...acc, [curr.service_id]: curr }),
		{},
	);

	const invoiceParties = billing_addresses.map((parties) => ({
		...parties,
		poc: isEmpty(parties?.poc) ? null : parties.poc,
	}));

	const [showAddInvoicingPartyModal, setShowAddInvoicingPartyModal] =	useState(false);

	const [invoicingParties, setInvoicingParties] = useState(() => invoiceParties.map((savedInvoicingParty) => ({
		...savedInvoicingParty,
		services: formatServices({
			savedServicesInvoiceTo,
			invoicingPartyServices: savedInvoicingParty?.services || [],
		}),

		state: {
			isSaved           : true,
			toDelete          : false,
			showHiddenContent : false,
		},
	})));

	const [paymentModes, setPaymentModes] = useState(() => {
		let mode = {};
		billing_addresses.forEach((savedInvoicingParty) => {
			const {
				payment_mode = '',
				payment_term = '',
				payment_method = '',
			} = savedInvoicingParty?.payment_mode_details || {};

			const { credit_option = {} } = savedInvoicingParty;

			mode = {
				...mode,
				[savedInvoicingParty?.organization_trade_party_id || savedInvoicingParty.length]: {
					credit_days    : credit_option?.selected_credit_days || DEFAULT_VALUE,
					interest       : credit_option?.interest_percent || DEFAULT_VALUE,
					paymentMode    : payment_mode || 'cash',
					paymentTerms   : payment_term,
					paymentMethods : payment_method,
				},
			};
		});
		return mode;
	});

	const { PAYMENT_MODES, loading } = useGetPaymentModes({
		invoicingParties,
		detail,
		paymentModes,
		setPaymentModes,
	});

	return {
		invoicingParties,
		showAddInvoicingPartyModal,
		setShowAddInvoicingPartyModal,
		PAYMENT_MODES,
		loading,
	};
};

export default useInvoicingParties;
