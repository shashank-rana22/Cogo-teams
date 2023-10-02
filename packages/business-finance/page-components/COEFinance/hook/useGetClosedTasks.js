import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const useGetClosedTasks = ({
	job_id = '',
	activeTab = '',
}) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/common/job/get-milestone-job-audits',
			method  : 'get',
			authKey : 'get_common_job_milestone_job_audits',
		},
		{ manual: true },
	);

	const getClosedTasks = useCallback(async () => {
		try {
			await trigger({
				params: {
					milestone : (activeTab === '' ? 'OPR_CLOSED' : 'CLOSED'),
					jobId     : job_id,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [activeTab, job_id, trigger]);

	useEffect(() => {
		getClosedTasks();
	}, [getClosedTasks]);

	return {
		data,
		loading,
		getClosedTasks,
	};
};

export default useGetClosedTasks;
