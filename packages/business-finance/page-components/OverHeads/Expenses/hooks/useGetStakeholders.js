import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

const useGetStakeholders = ({ incidentSubType, incidentType, entityId }) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : '/incident-management/incident/get-incident-approval-management',
			method  : 'get',
			authKey : 'get_incident_management_incident_get_incident_approval_management',
		},
		{ manual: true },
	);

	useEffect(() => {
		const api = async () => {
			try {
				await trigger({
					params: {
						entityId,
						incidentSubType: incidentSubType || undefined,
						incidentType,
					},
				});
			} catch (err) {
				console.error('error-', err);
			}
		};
		api();
	}, [trigger, incidentType, entityId, incidentSubType]);

	return {
		stakeholdersData: data,
		loading,
	};
};

export default useGetStakeholders;
