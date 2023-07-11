import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { startOfDay, startOfMonth, startOfWeek } from '@cogoport/utils';
import { setDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';

const getDateString = (date) => formatDate({
	date,
	dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
	formatType : 'date',
}) || '';

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

		try {
			const currentDayData = await trigger({
				params: {
					data_required : false,
					filters       : {
						is_converted_to_booking        : true,
						quotation_sent_at_greater_than : getDateString(startOfDay(currentTimeStamp)),
					},
				},
			});
			const currentWeekData = await trigger({
				params: {
					data_required : false,
					filters       : {
						is_converted_to_booking        : true,
						quotation_sent_at_greater_than : getDateString(startOfWeek(currentTimeStamp)),
					},
				},
			});
			const currentMonthData = await trigger({
				params: {
					data_required : false,
					filters       : {
						is_converted_to_booking        : true,
						quotation_sent_at_greater_than : getDateString(startOfMonth(currentTimeStamp)),
					},
				},
			});
			const assignedChatsCount = await getAssignedChats();
			setShipmentData({
				dayCount   : currentDayData?.data?.total_count,
				weekCount  : currentWeekData?.data?.total_count,
				monthCount : currentMonthData?.data?.total_count,
				assignedChatsCount,
			});
			setReminderModal(true);
		} catch (error) {
			console.log(error);
		} finally {
			if (type === 'update') {
				await setDoc(roomDoc, {
					agent_id      : agentId,
					last_reminder : Date.now(),
				}, { merge: true });
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
