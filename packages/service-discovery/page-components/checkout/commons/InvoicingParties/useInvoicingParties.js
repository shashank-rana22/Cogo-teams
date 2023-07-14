import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetPaymentModes from './hooks/useGetPaymentModes';

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

const useInvoicingParties = ({ detail = {} }) => {
	const [showAddInvoicingPartyModal, setShowAddInvoicingPartyModal] =	useState(false);

	const [invoicingParties, setInvoicingParties] = useState([]);
	const [editInvoice, setEditInvoice] = useState([]);

	const [paymentModes, setPaymentModes] = useState({});

	const [{ data = {} }] = useRequest(
		{
			url    : '/list_checkout_invoices',
			method : 'GET',
			params : { filters: { checkout_id: detail.id, status: 'active' } },
		},
		{ manual: false },
	);

	const { list = [] } = data;

	const { services = {} } = detail;

	const savedServicesInvoiceTo = formatSavedServicesInvoiceTo({
		services: Object.values(services),
	});

	useEffect(() => {
		setInvoicingParties(list.map((savedInvoicingParty) => ({
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

		setEditInvoice(list.reduce((acc, { id }) => ({ ...acc, [id]: false }), {}));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

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
		editInvoice,
		loading,
		setEditInvoice,
	};
};

export default useInvoicingParties;
