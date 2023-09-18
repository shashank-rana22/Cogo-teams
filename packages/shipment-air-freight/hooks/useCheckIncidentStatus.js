import { useRequestBf } from '@cogoport/request';

const useCheckIncidentStatus = ({ shipment_data = {} }) => {
	const [{ data = {}, loading = false }, refetch] = useRequestBf({
		url     : '/incident-management/incident/job-reopen-incident-exists',
		method  : 'GET',
		authKey : 'get_incident_management_incident_job_reopen_incident_exists',
		params  : {
			jobNumber    : shipment_data?.serial_id,
			shipmentType : (shipment_data?.shipment_type)?.toUpperCase(),
		},
	}, { manual: false });

	return {
		incidentStatusData    : data,
		incidentStatusRefetch : refetch,
		incidentStatusLoading : loading,
	};
};

export default useCheckIncidentStatus;
