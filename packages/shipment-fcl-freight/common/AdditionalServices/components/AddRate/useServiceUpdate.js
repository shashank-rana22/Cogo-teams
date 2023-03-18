// import getGeoConstants from '@cogoport/globalization/constants/geo';
import { toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useServiceUpdate = ({
	item,
	setAddRate,
	refetch,
	onCancel,
	showIp,
	setShowIp,
}) => {
	// const geo = getGeoConstants();
	const [remarks, setRemarks] = useState(null);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_additional_service',
		method : 'POST',
	});

	const handleSubmit = async (data) => {
		try {
			await addRateApi.trigger({
				data: {
					...data,
					pending_task_id: showIp ? undefined : item?.pending_task_id,
				},
			});
			setRemarks(null);
			setAddRate(null);
			if (setShowIp) {
				setShowIp(false);
			}
			onCancel();

			toast.success('Service Updated successfully');
			refetch();
		} catch (err) {
			toast.error(err?.data);
		}
	};

	const handleShipperConfirm = () => {
		const payload = {
			id    : item.id,
			state : 'accepted_by_importer_exporter',
		};
		handleSubmit(payload);
	};

	const handleShipperRevision = () => {
		if (!remarks) {
			toast.error('Please provide revison remarks');
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
			toast.error('Please provide cancellation remarks');
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
			toast.error('Please provide cancellation remarks');
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
			id                 : item.id,
			invoice_preference : {},
		};
		handleSubmit(payload);
	};

	const requestRateFromTechops = () => {
		const payload = {
			id                : item.id,
			is_rate_available : false,
			state             : 'requested_for_importer_exporter',
		};
		handleSubmit(payload);
	};

	const handleInvoicingParty = (ba) => {
		if (!ba) {
			toast.error('Please select invoicing party');
			return;
		}

		const payload = {
			id                 : item.id,
			invoice_preference : {
				billing_address: {
					tax_number                  : ba.tax_number,
					poc                         : ba.poc,
					pincode                     : ba.pincode,
					organization_id             : ba.organization_id,
					organization_country_id     : ba.organization_country_id,
					name                        : ba.name,
					is_sez                      : ba.is_sez,
					business_name               : ba.business_name,
					address                     : ba.address,
					invoice_currency            : ba.invoice_currency || geo.country.currency.code,
					organization_trade_party_id : ba.organization_trade_party_id,
					registration_number         : ba.registration_number,
				},
				invoice_currency: ba.invoice_currency || geo.country.currency.code,
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
				id: item.id,
			};
			await handleSubmit(payload);
			if (onComplete) {
				onComplete();
			}
		} catch (err) {
			toast.error(err?.data);
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
		remarks,
		setRemarks,
		loading: addRateApi.loading,
	};
};

export default useServiceUpdate;
