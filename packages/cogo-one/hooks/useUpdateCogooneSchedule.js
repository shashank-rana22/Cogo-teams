// import { Toast } from '@cogoport/components';
// import getApiErrorString from '@cogoport/forms/utils/getApiError';
// import { useRequest } from '@cogoport/request';

// const useUpdateCogooneSchedule = () => {
// 	const [{ loading }, trigger] = useRequest({
// 		url    : '/list_cogoone_schedules',
// 		method : 'post',
// 	}, { manual: true });

// 	const updateCogooneSchedule = async () => {
// 		try {
// 			await trigger({
// 				data: getPayload({ profile, actionType, id, description }),
// 			});

// 			refreshTickets();
// 			fetchTickets();
// 			Toast.success('Ticket Status Updated Successfully!');
// 		} catch (e) {
// 			Toast.error(e?.response?.data || 'something went wrong');
// 		}
// 	};

// 	return { loading, updateCogooneSchedule };
// };

// export default useUpdateCogooneSchedule;
