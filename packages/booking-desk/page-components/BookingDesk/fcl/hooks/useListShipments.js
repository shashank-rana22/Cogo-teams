import { Toast } from "@cogoport/components";
import { useRequest } from "@cogoport/request";
import { useState, useEffect, useCallback } from 'react';
import tabSpecificPayload from '../configs/tabSpecificPayload.json';

const nullData = { list: [], total: 0, total_page: 0 };

const shipmentStates = {
  in_progress: [
		'shipment_received',
		'confirmed_by_importer_exporter',
		'in_progress',
	],
  cancelled: ['cancelled'],
}
shipmentStates.completed = [...shipmentStates.in_progress, 'completed'];
  
export default function useListShipments({ filters, activeTab }){
    const [data, setData] = useState(nullData);

    const [{loading}, trigger] = useRequest({
		url: '/list_booking_note_desk_shipments',
		method: 'GET',
    }, { manual: true });

    const listShipments = useCallback(async () => {
      const {page, ...restFilters } = filters;

        try {
          const res = await trigger({
            params: {
				filters: {
					state: shipmentStates[activeTab] || shipmentStates.in_progress,
					...tabSpecificPayload[activeTab],
					...restFilters,
				},
				page,
				additional_methods: ['pagination'],
				sort_by: 'created_at',
				sort_type: 'desc',
            }
          });

          if(res.status === 200){ 
				setData(res.data || {});
          }
        } catch (e) {
			Toast.error(e?.response?.data?.message || e.message || 'Something went wrong !!');
			setData(nullData);
        }
      }, [filters, activeTab])
    

    useEffect(() => {
		listShipments();
    }, [listShipments])

    return {
        data: {
			list: data.list || [],
			total: data.total_count || 0,
			total_page: data.total || 0,
        },
        loading,
        refetch: listShipments,
    }
}