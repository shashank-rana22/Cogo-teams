import { useEffect, useCallback } from 'react';

import useGetShipmentAdditionalServiceCodes from './useGetShipmentAdditionalServiceCodes';
import useListRateChargeCodes from './useListRateChargeCodes';

const servicesChargeCodes = {
	fcl_freight_service       : ['fcl_freight_charges', 'fcl_freight_seasonal_charges'],
	fcl_freight_local_service : ['fcl_freight_local_charges'],
	ftl_freight_service       : ['ftl_freight_charges'],
	haulage_freight_service   : ['haulage_freight_charges'],
	fcl_customs_service       : ['fcl_customs_charges'],
	lcl_freight_service       : ['lcl_freight_charges', 'lcl_freight_surcharge_charges'],
	lcl_freight_local_service : ['lcl_freight_local_charges'],
	lcl_customs_service       : ['lcl_customs_charges'],
	ltl_freight_service       : ['ltl_freight_charges'],
	fcl_cfs_service           : ['fcl_cfs_charges'],
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
