import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetRDShipmentList = () => {
	const [filters, setFilters] = useState({ service: 'air_freight', sort_by: 'created_at_desc' });
	const apiMapping = {
		air_customs     : './list_revenue_desk_air_customs_shipments',
		air_freight     : './list_revenue_desk_air_freight_shipments',
		ftl_freight     : './list_revenue_desk_ftl_freight_shipments',
		haulage_freight : './list_revenue_desk_haulage_freight_shipments',
		ltl_freight     : './list_revenue_desk_ltl_freight_shipments',
	};
	const shipmentStatusMapping = {
		active    : ['in_progress', 'confirmed_by_importer_exporter'],
		completed : ['completed'],
		cancelled : ['cancelled'],
	};
	const api = apiMapping[filters?.service];
	const [{ data:shipmentList, loading }, trigger] = useRequest({
		method : 'get',
		url    : api,
	}, { manual: true });

	const fetchShipments = async (requiredFilterChange) => {
		try {
			await trigger({
				params: {
					filters   : { ...requiredFilterChange, page: undefined, sort_by: undefined, sort_type: undefined },
					page      : requiredFilterChange?.page,
					sort_by   : requiredFilterChange?.sort_by || undefined,
					sort_type : requiredFilterChange?.sort_type || undefined,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	const requiredFilterChange = {
		origin_location_id      : filters?.origin_location_id || undefined,
		destination_location_id : filters?.destination_location_id || undefined,
		origin_port_id          : filters?.origin_port_id || undefined,
		destination_port_id     : filters?.destination_port_id || undefined,
		origin_airport_id       : filters?.origin_airport_id || undefined,
		destination_airport_id  : filters?.destination_airport_id || undefined,
		port_id                 : filters?.port_id || undefined,
		airpot_id               : filters?.airpot_id || undefined,
		trade_type              : filters?.trade_type || undefined,
		state                   : shipmentStatusMapping[filters?.state] || undefined,
		source                  : filters?.source || undefined,
		departure_start_date    : filters?.departure_date?.startDate || undefined,
		departure_end_date      : filters?.departure_date?.endDate || undefined,
		created_at_start_date   : filters?.created_date?.startDate || undefined,
		created_at_end_date     : filters?.created_date?.endDate || undefined,
		page                    : filters?.page,
		q                       : filters?.q || undefined,
		sort_type               : filters?.sort_by.split('_').pop() || undefined,
		sort_by                 : filters?.sort_by.split('_').slice(0, 2).join('_') || undefined,

	};
	useEffect(() => {
		fetchShipments(requiredFilterChange);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(requiredFilterChange), filters.service]);

	return {
		shipmentList,
		loading,
		setFilters,
		filters,
	};
};
export default useGetRDShipmentList;
