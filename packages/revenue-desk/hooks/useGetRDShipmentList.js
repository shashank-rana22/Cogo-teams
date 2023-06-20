import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetRDShipmentList = () => {
	const [filters, setFilters] = useState({
		service  : 'fcl_freight',
		sort_by  : 'created_at_desc',
		state    : 'active',
		rd_state : 'active',
	});
	const apiMapping = {
		fcl_freight     : 'fcl_freight/list_revenue_desk_shipments',
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
					filters: {
						...requiredFilterChange,
						page      : undefined,
						sort_by   : undefined,
						sort_type : undefined,
					},
					page               : requiredFilterChange?.page,
					sort_by            : requiredFilterChange?.sort_by || undefined,
					sort_type          : requiredFilterChange?.sort_type || undefined,
					additional_methods : ['pagination'],
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	const requiredFilterChange = {
		origin_location_id              : filters?.origin_location_id || undefined,
		destination_location_id         : filters?.destination_location_id || undefined,
		origin_port_id                  : filters?.origin_port_id || undefined,
		destination_port_id             : filters?.destination_port_id || undefined,
		origin_airport_id               : filters?.origin_airport_id || undefined,
		destination_airport_id          : filters?.destination_airport_id || undefined,
		port_id                         : filters?.port_id || undefined,
		airpot_id                       : filters?.airpot_id || undefined,
		trade_type                      : filters?.trade_type || undefined,
		state                           : shipmentStatusMapping[filters?.state] || undefined,
		source                          : filters?.source || undefined,
		schedule_departure_greater_than : filters?.departure_date?.startDate || undefined,
		schedule_departure_less_than    : filters?.departure_date?.endDate || undefined,
		created_at_greater_than         : filters?.created_date?.startDate || undefined,
		created_at_less_than            : filters?.created_date?.endDate || undefined,
		page                            : filters?.page,
		rd_state                        : filters?.rd_state || undefined,
		q                               : filters?.q || undefined,
		sort_type                       : filters?.sort_by.split('_').pop() || undefined,
		sort_by                         : filters?.sort_by.split('_').slice(0, 2).join('_') || undefined,
		cargo_readiness_greater_than    : filters?.cargo_readiness_date?.startDate || undefined,
		cargo_readiness_less_than       : filters?.cargo_readiness_date?.endDate || undefined,

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
