import { useEffect } from 'react';
import {useRequest} from "@cogoport/request"
import {Toast}from '@cogoport/components';

const getPrefrencesUpdatedStats = ({ shipment_id, service }) => {


	const [{data:data, loading: loading, error = error },trigger]= useRequest('/list_shipment_booking_confirmation_preferences',{manual:true})

	const handleApi = async () => {
		try {
			const params = {
				filters: {
					shipment_id,
					service_type: service?.service_type || undefined,
					service_id: service?.id || undefined,
				},
			};

			await trigger({ params });
		} catch (error) {
			Toast.error(error);
		}
	};

	useEffect(() => {
		if (shipment_id) {
			handleApi(shipment_id);
		} 
	}, []);

	return {
		data,
		statsLoading: loading,
	};
};

export default getPrefrencesUpdatedStats;