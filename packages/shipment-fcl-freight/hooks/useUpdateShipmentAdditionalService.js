import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const geo = getGeoConstants();

const useUpdateShipmentAdditionalService = ({
	item = {},
	refetch = () => {},
	showIp = false,
	task = {},
}) => {
	const [remarks, setRemarks] = useState(null);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_additional_service',
		method : 'POST',
	});

	const handleSubmit = async (data) => {
		try {
			await trigger({
				data: {
					...data,
					pending_task_id: showIp ? undefined : task?.id,
				},
			});

			Toast.success('Service Updated successfully');
			setRemarks(null);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	const handleShipperConfirm = () => {
		const payload = {
			id    : item?.id,
			state : 'accepted_by_importer_exporter',
		};
		handleSubmit(payload);
	};

	const handleShipperRevision = () => {
		if (!remarks) {
			Toast.error('Please provide revison remarks');
			return;
		}
		const payload = {
			id      : item.id,
			state   : 'amendment_requested_by_importer_exporter',
			remarks : [remarks],
		};
		handleSubmit(payload);
	};

	const handleBuyPriceReRequest = () => {
		const payload = {
			id    : item.id,
			state : 'requested_for_service_provider',
		};
		handleSubmit(payload);
	};

	const handleShipperSideCancel = () => {
		if (!remarks) {
			Toast.error('Please provide cancellation remarks');
		}
		const payload = {
			id      : item.id,
			state   : 'cancelled',
			remarks : [remarks],
		};
		handleSubmit(payload);
	};

	const handleSupplierCancel = () => {
		if (!remarks) {
			Toast.error('Please provide cancellation remarks');
		}
		const payload = {
			id      : item.id,
			state   : 'cancelled_by_supplier',
			remarks : [remarks],
		};
		handleSubmit(payload);
	};

	const handleAddInvoicingParty = () => {
		const payload = {
			id                 : item.serviceListItem.id,
			invoice_preference : {},
		};
		handleSubmit(payload);
	};

	const requestRateFromTechops = () => {
		const payload = {
			id                : item.serviceListItem.id,
			is_rate_available : false,
			state             : 'requested_for_importer_exporter',
		};
		handleSubmit(payload);
	};

	const handleInvoicingParty = (billing_address) => {
		if (!billing_address) {
			Toast.error('Please select invoicing party');
			return;
		}

		const {
			tax_number, poc, pincode, organization_country_id, organization_id, is_sez, address,
			organization_trade_party_id, business_name, name, invoice_currency, registration_number,
		} = billing_address;

		const payload = {
			id                 : item.serviceListItem.id,
			invoice_preference : {
				billing_address: {
					tax_number,
					poc,
					pincode,
					organization_id,
					organization_country_id,
					name,
					is_sez,
					business_name,
					address,
					invoice_currency: invoice_currency || geo.country.currency.code,
					organization_trade_party_id,
					registration_number,
				},
				invoice_currency: invoice_currency || geo.country.currency.code,
			},
		};

		handleSubmit(payload);
	};

	const updateBillingInfo = async (value, onComplete) => {
		try {
			const payload = {
				add_to_sell_quotation: value === 'bill',
				state:
					value === 'not_bill' ? 'accepted_by_importer_exporter' : undefined,
				id: item.serviceListItem.id,
			};
			await handleSubmit(payload);
			if (onComplete) {
				onComplete();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	const cancelAdditionalService = async (payload) => {
		try {
			await handleSubmit(payload);
		} catch (err) {
			toastApiError(err);
		}
	};

	const handleAddSellPrice = async (payload) => {
		try {
			await handleSubmit(payload);
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		handleShipperConfirm,
		handleShipperRevision,
		handleShipperSideCancel,
		handleSupplierCancel,
		handleAddInvoicingParty,
		handleBuyPriceReRequest,
		requestRateFromTechops,
		handleInvoicingParty,
		updateBillingInfo,
		cancelAdditionalService,
		handleAddSellPrice,
		remarks,
		setRemarks,
		loading,
	};
};

export default useUpdateShipmentAdditionalService;
