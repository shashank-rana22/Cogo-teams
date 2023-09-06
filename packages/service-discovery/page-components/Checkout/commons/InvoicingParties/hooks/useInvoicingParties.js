import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect, useMemo, useContext } from 'react';

import { CheckoutContext } from '../../../context';

import useGetPaymentModes from './useGetPaymentModes';

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
	const { primaryService = {} } = useContext(CheckoutContext);

	const [showAddInvoicingPartyModal, setShowAddInvoicingPartyModal] =	useState(false);

	const [editInvoice, setEditInvoice] = useState({});
	const [editInvoiceDetails, setEditInvoiceDetails] = useState({});

	const [paymentModes, setPaymentModes] = useState({});

	const {
		bl_category,
		bl_delivery_mode,
		bl_type,
	} = primaryService;

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
		try {
			trigger({
				params: { filters: { checkout_id: detail.id, status: 'active' } },
			});
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	useEffect(() => {
		if (isEmpty(list)) {
			return;
		}

		setInvoicingParties(
			list.map((savedInvoicingParty) => ({
				...savedInvoicingParty,
				services: formatServices({
					savedServicesInvoiceTo,
					invoicingPartyServices: savedInvoicingParty?.services || [],
				}),
				payment_mode_details: {
					...(savedInvoicingParty.payment_mode_details || {}),
					...(savedInvoicingParty?.services.map(({ service }) => service).includes('fcl_freight') ? {
						documentCategory     : bl_category,
						documentType         : bl_type,
						documentDeliveryMode : bl_delivery_mode,
					} : {}),
				},
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
						...(savedInvoicingParty?.services.map(({ service }) => service).includes('fcl_freight') ? {
							documentCategory     : bl_category,
							documentType         : bl_type,
							documentDeliveryMode : bl_delivery_mode,
						} : {}),
						organization_trade_party_id,
					},
				};
			}, {}),
		);
	}, [bl_category, bl_delivery_mode, bl_type, list, savedServicesInvoiceTo, setInvoicingParties]);

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
