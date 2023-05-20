import { useRequest } from '@cogoport/request';
import { startOfDay, startOfMonth, startOfWeek } from '@cogoport/utils';
import { updateDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';

function useListCheckouts({ setReminderModal, agentId, getAssignedChats }) {
	const [shipmentData, setShipmentData] = useState({});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_checkouts',
			method : 'get',
		},
		{ manual: true, autoCancel: false },
	);

	const getAgentShipmentsCount = useCallback(async ({ roomDoc = {}, type = '' }) => {
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
			const assignedChatsCount = await getAssignedChats();
			setShipmentData({
				dayCount           : currentDayData?.data?.total_count,
				weekCount          : currentWeekData?.data?.total_count,
				monthCount         : currentMonthData?.data?.total_count,
				assignedChatsCount : assignedChatsCount || 0,
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
	}, [agentId, getAssignedChats, setReminderModal, trigger]);

	return {
		loading,
		shipmentData,
		getAgentShipmentsCount,
	};
}
export default useListCheckouts;
