import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useState, useCallback, useContext } from 'react';

const timelineData = [
	{
		milestone         : 'Booking Placed',
		completed_on      : '2023-02-08T15:35:12.085Z',
		is_sub            : false,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'Booking Confirmed',
		completed_on      : '2023-02-08T15:36:31.570Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'Booking Note Upload',
		completed_on      : '2023-02-09T11:51:26.564Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'Booking Note Expiry',
		completed_on      : '2023-02-12T11:50:00.000Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone           : 'Container Picked Up',
		completed_on        : '2023-02-10T11:09:00.000Z',
		is_sub              : false,
		actual_completed_on : null,
		is_date_fluctuate   : false,
	},
	{
		milestone         : 'Tr - cutoff',
		completed_on      : '2023-02-11T11:50:00.000Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'Customs cleared ',
		completed_on      : '2023-02-13T04:18:00.000Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'Container Reached port',
		completed_on      : '2023-02-10T11:10:09.095Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'VGM Cutoff',
		completed_on      : '2023-02-11T11:50:00.000Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'SI Cutoff',
		completed_on      : '2023-02-10T11:50:00.000Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'Gate Cutoff',
		completed_on      : '2023-02-13T11:50:00.000Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'Doc Cutoff',
		completed_on      : '2023-02-10T11:50:00.000Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone           : 'Containers Gated In',
		completed_on        : '2023-02-13T04:18:00.000Z',
		is_sub              : true,
		actual_completed_on : '2022-08-29T11:30:37.000Z',
		is_date_fluctuate   : true,
	},
	{
		milestone           : 'Vessel Departed From Origin (ETD)',
		completed_on        : '2023-02-13T04:18:00.000Z',
		is_sub              : false,
		actual_completed_on : '2023-02-10T11:50:00.000Z',
		is_date_fluctuate   : false,
	},
	{
		milestone           : 'Vessel Arrived At Destination (ETA)',
		completed_on        : '2023-02-20T10:37:00.000Z',
		is_sub              : false,
		actual_completed_on : null,
		is_date_fluctuate   : false,
	},
	{
		milestone         : 'Customs cleared ',
		completed_on      : '2023-02-20T10:42:06.774Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone         : 'Do released',
		completed_on      : '2023-02-20T10:42:06.650Z',
		is_sub            : true,
		is_date_fluctuate : false,
	},
	{
		milestone           : 'Containers Delivered',
		completed_on        : '2023-02-22T04:18:51.122Z',
		is_sub              : false,
		actual_completed_on : null,
		is_date_fluctuate   : false,
	},
];

function useGetShipmentTimeLine() {
	const [data, setData] = useState([]);

	const { shipment_data: { id: shipment_id } } = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url    : 'get_service_timeline',
		method : 'GET',
	}, { manual: true });

	const getShipmentTimeline = useCallback((async () => {
		try {
			const res = await trigger({
				params: { shipment_id },
			});
			if (res.status === 200) {
				setData(res.data);
			}
			// else {
			// setData([]);
			// 	Toast.error(JSON.stringify(res.error));
			// }
		} catch (e) {
			setData([]);
			Toast.error(e.message);
		}
	}), [shipment_id, trigger]);

	console.log({ loading });

	return {
		loading,
		// timelineData: data || [],
		timelineData,
		getShipmentTimeline,
	};
}

export default useGetShipmentTimeLine;
