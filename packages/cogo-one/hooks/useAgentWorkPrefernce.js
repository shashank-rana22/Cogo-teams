import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useAgentWorkPrefernce() {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const workPrefernce = async () => {
		// const { inactive_status = '', inactive_date = {}, inactive_time = {} } = data;
		// console.log('inactive_status', inactive_status);
		// console.log('inactive_time', inactive_time);
		// console.log('inactive_date', inactive_date);
		// const checkReasons = inactive_status === 'on_break' || inactive_status === 'on_lunch';
		// const checkDate = isEmpty(inactive_date?.startDate) && isEmpty(inactive_date?.endDate);

		await trigger({
		});
	};

	useEffect(() => {
		workPrefernce();
	}, []);

	return {
		loading,
		data,
	};
}
export default useAgentWorkPrefernce;
