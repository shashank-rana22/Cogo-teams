import { useEffect, useCallback } from 'react';

import useGetShipmentAdditionalServiceCodes from './useGetShipmentAdditionalServiceCodes';
import useListRateChargeCodes from './useListRateChargeCodes';

const SERVICE_CHARGE_CODES = {
	ftl_freight_service : ['ftl_freight_charges'],
	air_freight_service : [
		'air_freight_charges',
		'air_freight_surcharges',
		'air_freight_warehouse_charges',
	],
	air_freight_local_service : ['air_freight_local_charges'],
	air_customs_service       : ['air_customs_charges'],
	ltl_freight_service       : ['ltl_freight_charges'],
};

const useGetServiceChargeCodes = ({ service_name, shipment_id, defaultFilters }) => {
	const serviceName = SERVICE_CHARGE_CODES[service_name];

	const {
		data:rateChargeCodesData,
		loading:rateChargeCodesLoading,
		apiTrigger:rateChargeCodesTrigger,
		setFilters:rateChargeCodesSetFilters,
	} = useListRateChargeCodes({
		defaultParams: {
			service_names: [...(serviceName || []), 'platform_charges'],
		},
		defaultFilters,
	});

	const {
		data:additionalServiceCodesData,
		loading:additionalServiceCodesLoading,
		apiTrigger:additionalServiceCodesTrigger,
		setFilters:additionalServiceCodesSetFilters,
	} = useGetShipmentAdditionalServiceCodes({ shipment_id, defaultFilters });

	const getCodesList = useCallback(async () => {
		if (serviceName) {
			await rateChargeCodesTrigger();
		} else {
			await additionalServiceCodesTrigger();
		}
	}, [rateChargeCodesTrigger, additionalServiceCodesTrigger, serviceName]);

	useEffect(() => {
		if (service_name) {
			getCodesList();
		}
	}, [service_name, getCodesList]);

	return {
		data       : serviceName ? rateChargeCodesData : additionalServiceCodesData,
		loading    : serviceName ? rateChargeCodesLoading : additionalServiceCodesLoading,
		setFilters : serviceName ? rateChargeCodesSetFilters : additionalServiceCodesSetFilters,
	};
};

export default useGetServiceChargeCodes;
