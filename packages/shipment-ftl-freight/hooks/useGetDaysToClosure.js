import { useRequestBf } from '@cogoport/request';

const useGetDaysToClosure = ({ serial_id = '' }) => {
	const [{ data = 0, loading = false }] = useRequestBf({
		url     : '/incident-management/job/get-remaining-days-to-job-closure',
		method  : 'GET',
		authKey : 'get_common_job_get_remaining_days_to_job_closure',
		params  : {
			jobNumber : serial_id,
			jobType   : 'SHIPMENT',
			jobSource : 'LOGISTICS',
		},
	}, { manual: false });

	return {
		remaining_closure_days: data, loading,
	};
};

export default useGetDaysToClosure;
