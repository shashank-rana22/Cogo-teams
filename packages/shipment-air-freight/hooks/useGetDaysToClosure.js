import { useRequestBf } from '@cogoport/request';

const useGetDaysToClosure = ({ serial_id = '' }) => {
	const [{ data = {}, loading = false }] = useRequestBf({
		url     : '/incident-management/job/get-remaining-days-to-job-closure',
		method  : 'GET',
		authKey : 'get_incident_management_incident_job_reopen_incident_exists',
		params  : {
			jobNumber : serial_id,
			jobType   : 'SHIPMENT',
			jobSource : 'LOGISTICS',
		},
	}, { manual: false });

	return {
		data, loading,
	};
};

export default useGetDaysToClosure;
