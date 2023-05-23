import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import dummyData from '../DummyData/shipment_data.json';

export default function useGetShipment() {
	const router = useRouter();
	const { shipment_id } = router.query || {};
	const isGettingShipment = false;

	// const [{ loading: isGettingShipment, data }, trigger] = useRequest({
	// 	url    : '/get_shipment',
	// 	method : 'GET',
	// }, {manual: true});

	// const getShipment = useCallback(async () => {
	// 	await trigger({
	// 		params: {
	// 			id: shipment_id
	// 		}
	// 	});
	//   }, [trigger, shipment_id])

	// useEffect(() => {
	// 	getShipment();
	// }, [getShipment])

	const getShipment = () => {};

	return {
		isGettingShipment,
		refetch               : getShipment,
		documents             : dummyData?.documents,
		primary_service       : dummyData?.primary_service_detail,
		shipment_data         : dummyData?.summary,
		document_delay_status : dummyData?.document_delay_status,
		booking_note_details  : dummyData?.booking_note_details,
	};
}
