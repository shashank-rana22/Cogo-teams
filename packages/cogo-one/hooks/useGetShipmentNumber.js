import { useRequest } from '@cogoport/request';
import { startOfDay, startOfMonth, startOfWeek } from '@cogoport/utils';
import { updateDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';

function useGetShipmentNumber({ setReminderModal, agentId }) {
	const [shipmentData, setShipmentData] = useState({});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_checkouts',
			method : 'get',
		},
		{ manual: true, autoCancel: false },
	);

	const getAgentShipmentNumber = useCallback(async ({ roomDoc = {}, type = '' }) => {
		const currentTimeStamp = new Date();
		const commonFilters = {
			is_converted_to_booking : true,
			data_required           : false,
		};
		try {
			const currentDayData = await trigger({
				params: {
					filters: {
						...commonFilters,
						created_at_greater_than: startOfDay(currentTimeStamp),
					},
				},
			});
			const currentWeekData = await trigger({
				params: {
					filters: {
						...commonFilters,
						created_at_greater_than: startOfWeek(currentTimeStamp),
					},
				},
			});
			const currentMonthData = await trigger({
				params: {
					filters: {
						...commonFilters,
						created_at_greater_than: startOfMonth(currentTimeStamp),
					},
				},
			});
			setShipmentData({
				dayCount   : currentDayData?.data?.total_count,
				weekCount  : currentWeekData?.data?.total_count,
				monthCount : currentMonthData?.data?.total_count,
			});
			setReminderModal(true);
		} catch (error) {
			console.log(error);
		} finally {
			if (type === 'update') {
				await updateDoc(roomDoc, {
					agent_id      : agentId,
					last_reminder : Date.now(),
				});
			}
		}
	}, [agentId, setReminderModal, trigger]);

	return {
		loading,
		shipmentData,
		getAgentShipmentNumber,
	};
}
export default useGetShipmentNumber;
