import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import { DEFAULT_INDEX, INCREMENT_BY_ONE } from '../page-components/constants';

const useUpdateRatesPreferences = ({
	supplierPayload,
	// inventory,
	serviceData,
	reason,
	othertext,
	sellRateDetails = {},
	setShowDetailPage,
	shipmentData,
}) => {
	const ZERO_VALUE = 0;
	const API_TO_CALL = '/bulk_create_shipment_booking_confirmation_preferences';

	const [{ loading }, trigger] = useRequest({
		method: 'POST', url: API_TO_CALL,
	}, { manual: true, autoCancel: false });
	const REVENUE_DESK_DECISION = [];

	const preference_set_ids = Object.keys(supplierPayload || {});

	preference_set_ids.forEach((service_id) => {
		const service = serviceData.find((serviceItem) => serviceItem.id === service_id);
		let similarServices = [];
		if (service.service_type === 'ftl_freight_service') {
			similarServices = serviceData.filter(
				(serviceItem) => serviceItem.id !== service_id
				&& serviceItem.truck_type === service.truck_type && serviceItem.trade_type === service.trade_type,
			).map((serviceItem) => serviceItem.id);
		}
		const selectedRates = supplierPayload?.[service_id] || [];
		const SERVICE_PROVIDERS = [];
		const AMOUNT = [];

		(selectedRates).forEach((provider, index) => {
			const totalSellValue = provider?.data?.rowData?.total_sell_price_in_preferred_currency;
			const totalBuyValue = provider?.data?.rowData?.total_buy_price_in_preferred_currency;
			const amount_Value = totalBuyValue - totalSellValue;
			const preferred_currency = provider?.data?.rowData?.preferred_currency;
			SERVICE_PROVIDERS.push({
				priority                    : index + INCREMENT_BY_ONE,
				rate_id                     : provider?.rate_id,
				id                          : provider?.id,
				validity_id                 : provider?.validity_id,
				booking_confirmation_status : service?.service_type === 'air_freight_service' ? 'pending' : undefined,
			});
			AMOUNT.push({ amount: amount_Value, priority: index + INCREMENT_BY_ONE, currency: preferred_currency });
		});

		let mergedAmount = {
			wallet_amount: 0,
		};

		AMOUNT.forEach((amt) => {
			if (amt?.amount > mergedAmount?.wallet_amount) {
				const result = {
					wallet_amount            : amt?.amount,
					apply_rd_wallet          : true,
					rate_priority_for_wallet : amt?.priority,
					wallet_currency          : amt?.currency,
				};
				mergedAmount = result;
			}
		});

		const { service_type } = service;

		const MAX_VALUE = mergedAmount?.wallet_amount > ZERO_VALUE;

		const final_payload = {
			service_providers : SERVICE_PROVIDERS,
			wallet_amount     : MAX_VALUE ? mergedAmount?.wallet_amount : undefined,
			apply_rd_wallet   : MAX_VALUE ? mergedAmount?.apply_rd_wallet : undefined,
			rate_priority_for_wallet:
			MAX_VALUE ? mergedAmount?.rate_priority_for_wallet : undefined,
			wallet_currency: MAX_VALUE
				? mergedAmount?.wallet_currency : undefined,
			booking_confirmation_docs       : [],
			service_id                      : service_id || undefined,
			service_type                    : service.service_type || undefined,
			set_similar_services_preference : similarServices.length > DEFAULT_INDEX,
			similar_service_ids             : similarServices,
			sell_rate_preferences:
					service_type && service_type === 'fcl_freight_service' && sellRateDetails?.[service_id]
						? sellRateDetails?.[service_id]
						: [],
		};
		if (SERVICE_PROVIDERS.length) {
			REVENUE_DESK_DECISION.push(final_payload);
		}
	});

	const updateTrigger = async () => {
		try {
			await trigger({
				data: {
					shipment_id            : shipmentData?.id,
					remarks                : othertext || reason,
					revenue_desk_decisions : REVENUE_DESK_DECISION,
				},
			});
			Toast.success('Preferences Updated');
			setShowDetailPage(null);
		} catch (err) {
			Toast.error("Preferences didn't save, Please Try Again");
		}
	};

	return {
		loading,
		updateTrigger,
	};
};

export default useUpdateRatesPreferences;
