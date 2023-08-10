import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useGetSopList = ({
	filters = [],
	trade_partners_details,
	tradePartnerData,
	shipment_data,
	primary_service,
}) => {
	const [apiData, setApiData] = useState({});

	const importer_exporter_id = shipment_data?.importer_exporter_id;
	const conditions = {
		shipper: {
			data : trade_partners_details?.shipper?.trade_party_id,
			key  : 'shipper_trade_party_id',
		},

		consignee: {
			data : trade_partners_details?.consignee?.trade_party_id,
			key  : 'consignee_trade_party_id',
		},

		commodity: {
			data : primary_service?.commodity_description,
			key  : 'commodity',
		},

		origin: {
			data: (primary_service?.origin_port || primary_service?.origin_airport)
				?.country?.country_id,
			key: 'origin_country_id',
		},

		destination: {
			data: (
				primary_service?.destination_port
				|| primary_service?.destination_airport
			)?.country?.country_id,
			key: 'destination_country_id',
		},

		country: {
			data: (primary_service?.origin_port || primary_service?.origin_airport)
				?.country?.country_id,
			key: 'country_id',
		},
		for_this_shipment: {
			data : shipment_data?.id,
			key  : 'shipment_id',
		},
	};

	const defaultconditions = [
		{
			key   : 'shipment_id_or_nil',
			value : shipment_data?.id,
		},
		{
			key   : 'origin_country_id_or_nil',
			value : conditions.origin.data,
		},
		{
			key   : 'destination_country_id_or_nil',
			value : conditions.destination.data,
		},
		{
			key   : 'consignee_trade_party_id_or_nil',
			value : conditions.consignee.data,
		},
		{ key: 'shipper_trade_party_id_or_nil', value: conditions.shipper.data },
		{ key: 'commodity_or_nil', value: conditions.commodity.data },
	];

	const defaultFilter = { organization_id: importer_exporter_id };

	const CUSTOM_FILTER = {};

	const isDomestic = conditions?.destination?.data === conditions?.origin?.data;

	defaultconditions.forEach((condition) => {
		defaultFilter[condition.key] = condition.value || null;
		CUSTOM_FILTER[condition.key] = condition.value || null;
	});

	if (isDomestic) {
		defaultFilter.country_id_or_nil = conditions.country.data;
		CUSTOM_FILTER.country_id_or_nil = conditions.country.data;
	}

	if (filters) {
		filters.forEach((element) => {
			if (conditions[element]?.data) {
				const key = conditions[element]?.key;
				CUSTOM_FILTER[key] = conditions[element]?.data;
			}
		});
	}
	CUSTOM_FILTER.organization_id = importer_exporter_id;

	const finalFilters = filters.length ? CUSTOM_FILTER : defaultFilter;

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_operating_procedures',
		params : {
			filters    : finalFilters,
			page_limit : 100,
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if ((shipment_data?.id) && tradePartnerData) {
			apiTrigger();
		}
	}, [apiTrigger, shipment_data, tradePartnerData]);

	return {
		loading,
		sopData: apiData,
	};
};

export default useGetSopList;
