import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useCheckIncidentStatus = ({ defaultParams = {}, isJobClosed = false }) => {
	const [{ data = {}, loading = false }, trigger, refetch] = useRequestBf({
		url     : '/incident-management/incident/job-reopen-incident-exists',
		method  : 'GET',
		authKey : 'get_incident_management_incident_job_reopen_incident_exists',
		params  : {
			...defaultParams,
		},
	}, { manual: true });

	useEffect(() => {
		if (isJobClosed) {
			trigger();
		}
	}, [isJobClosed, trigger]);

	return {
		incidentStatusData    : data,
		incidentStatusRefetch : refetch,
		incidentStatusLoading : loading,
	};
};

export default useCheckIncidentStatus;
