import { useState, useEffect } from 'react';

import useGetRevenueDeskPreferedRates from './useGetRevenueDeskPreferredRates';

const useFtlFreightRateCards = ({ shipment_data = {}, services = [] }) => {
	const [allTruckDetails, setAllTruckDetails] = useState({});
	const [finalGetHookData, setFinalGetHookData] = useState({});

	const { groupedRates, loading, getRates, newRates } = useGetRevenueDeskPreferedRates({
		shipment_id  : shipment_data?.id,
		service_type : 'ftl_freight_service',
		group_by     : 'truck_type',
		services,
	});

	const { similarServiceIds } = services.reduce((acc, service) => {
		const { truck_type = '' } = service || {};
		if (acc.taken_trucks[truck_type]) {
			acc.similarServiceIds.push(service?.id);
		}
		acc.taken_trucks[truck_type] = true;

		return acc;
	}, { similarServiceIds: [], taken_trucks: {} });

	const newGroupedRates = Object.entries(groupedRates || {}).reduce((acc, [truck_type, rates]) => {
		const newRatesG = (rates || []).filter(
			(rate) => !similarServiceIds.includes(rate?.service_id),
		);
		acc[truck_type] = newRatesG;
		return acc;
	}, {});

	useEffect(() => {
		if (!loading) {
			setFinalGetHookData({ ...newGroupedRates });
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

	return {
		serviceProviderData : finalGetHookData,
		allTruckDetails,
		setAllTruckDetails,
		getRates,
		newRates,
		setFinalGetHookData,
		ratesLoading        : loading,
	};
};

export default useFtlFreightRateCards;
