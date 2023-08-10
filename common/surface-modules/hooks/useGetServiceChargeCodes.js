import { useEffect, useCallback } from 'react';

import useGetShipmentAdditionalServiceCodes from './useGetShipmentAdditionalServiceCodes';
import useListRateChargeCodes from './useListRateChargeCodes';

const servicesChargeCodes = {
	ftl_freight_service           : ['ftl_freight_charges'],
	haulage_freight_service       : ['haulage_freight_charges'],
	ltl_freight_service           : ['ltl_freight_charges'],
	rail_domestic_freight_service : ['rail_domestic_freight_charges'],
};

const useGetServiceChargeCodes = ({ service_name, shipment_id, defaultFilters }) => {
	const serviceName = servicesChargeCodes[service_name];

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
