import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

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

const useInvoicingParties = ({
	detail = {},
	setInvoicingParties = () => {},
	invoicingParties = [],
	activated_on_paylater = {},
}) => {
	const [showAddInvoicingPartyModal, setShowAddInvoicingPartyModal] =		useState(false);

	const [editInvoice, setEditInvoice] = useState({});
	const [editInvoiceDetails, setEditInvoiceDetails] = useState({});

	const [paymentModes, setPaymentModes] = useState({});

	const [{ data = {}, loading: listLoading }, trigger] = useRequest(
		{
			url    : '/list_checkout_invoices',
			method : 'GET',
			params : { filters: { checkout_id: detail.id, status: 'active' } },
		},
		{ manual: false },
	);

	const { list = [] } = data;

	const { services = {} } = detail;

	const savedServicesInvoiceTo = useMemo(
		() => formatSavedServicesInvoiceTo({
			services: Object.values(services),
		}),
		[services],
	);

	const getCheckoutInvoices = () => {
		trigger({
			params: { filters: { checkout_id: detail.id, status: 'active' } },
		});
	};

	useEffect(() => {
		if (!isEmpty(list)) {
			setInvoicingParties(
				list.map((savedInvoicingParty) => ({
					...savedInvoicingParty,
					services: formatServices({
						savedServicesInvoiceTo,
						invoicingPartyServices: savedInvoicingParty?.services || [],
					}),
				})),
			);

			setEditInvoice(
				list.reduce((acc, { id }) => ({ ...acc, [id]: false }), {}),
			);

			setPaymentModes(
				list.reduce((acc, savedInvoicingParty) => {
					const {
						credit_option = {},
						organization_trade_party_id = '',
						id = '',
						payment_mode_details = {},
					} = savedInvoicingParty;

					const {
						payment_mode = '',
						payment_term = '',
						payment_method = '',
						documentCategory = '',
						documentType = '',
						documentDeliveryMode = '',
					} = payment_mode_details;

					const { selected_credit_days = 0, interest_percent = 0 } = credit_option;

					return {
						...acc,
						[id || savedInvoicingParty.length]: {
							credit_days    : selected_credit_days,
							interest       : interest_percent,
							paymentMode    : payment_mode || 'cash',
							paymentTerms   : payment_term,
							paymentMethods : payment_method,
							documentCategory,
							documentType,
							documentDeliveryMode,
							organization_trade_party_id,
						},
					};
				}, {}),
			);
		}
	}, [list, savedServicesInvoiceTo, setInvoicingParties]);

	const { PAYMENT_MODES, loading } = useGetPaymentModes({
		invoicingParties,
		detail,
		setEditInvoiceDetails,
		editInvoiceDetails,
		activated_on_paylater,
	});

	return {
		invoicingParties,
		showAddInvoicingPartyModal,
		setShowAddInvoicingPartyModal,
		PAYMENT_MODES,
		editInvoice,
		loading              : listLoading,
		paymentModesLoading  : loading,
		setEditInvoice,
		getCheckoutInvoices,
		editInvoiceDetails,
		setEditInvoiceDetails,
		allServices          : savedServicesInvoiceTo,
		paymentModeValuesObj : paymentModes,
	};
};

export default useInvoicingParties;
