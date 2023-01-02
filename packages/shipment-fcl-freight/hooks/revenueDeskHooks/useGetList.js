import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useState, useRef } from 'react';

const useListShipments = ({ status = '' }) => {
	const shipment_type = 'fcl_freight';

	const [loading, setLoading] = useState(true);
	const firstRender = useRef(true);

	const [filters, setFilters] = useState({
		page      : 1,
		highlight : undefined,
	});

	const [list, setList] = useState({
		data         : [],
		total        : 0,
		total_page   : 0,
		fullResponse : {},
		reverted     : 0,
	});

	const { page, ...restFilters } = filters;

	const [, trigger] = useRequest('/list_shipments', false);
	const completedStatus = {
		state               : ['completed', 'in_progress', 'confirmed_by_importer_exporter'],
		fcl_freight_service : {
			state: [
				'awaiting_service_provider_confirmation',
				'confirmed_by_service_provider',
			],
		},
		shipment_type,
		booking_confirmation_preferences_set: true,
	};

	const pendingStatus = {
		state               : ['confirmed_by_importer_exporter', 'in_progress'],
		shipment_type,
		fcl_freight_service : {
			state: 'awaiting_service_provider_confirmation',
		},
		booking_confirmation_preferences_not_set: true,
	};

	const refetch = async () => {
		setLoading(true);
		try {
			const res = await trigger({
				params: {
					filters:
            status === 'completed' ? { ...completedStatus, ...restFilters } : { ...pendingStatus, ...restFilters },
					main_service_quotation_required : true,
					revenue_desk_data_required      : true,
					page_limit                      : 10,
					page,
				},
			});

			if (res?.status === 200) {
				setLoading(false);

				const { data = { list: [], total: 0 } } = res;

				setList(() => ({
					data         : data?.list || [],
					total        : data?.total_count,
					total_page   : data?.total,
					fullResponse : res.data,
					reverted     : data?.stats?.reverted,
				}));
			}
		} catch (err) {
			setLoading(false);

			setList(() => ({
				data         : [],
				total        : 0,
				total_page   : 0,
				fullResponse : {},
				reverted     : 0,
			}));
			Toast.error('Something went wrong!');
		}
	};

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		setLoading(true);
		refetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, status]);

	const hookSetters = {
		setLoading,
		setFilters,
		setList,
	};

	return {
		loading,
		page,
		filters,
		list,
		hookSetters,
		refetch,
	};
};

export default useListShipments;
