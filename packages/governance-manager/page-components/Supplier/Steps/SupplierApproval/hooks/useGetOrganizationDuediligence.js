import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetOrganizationDueDiligence() {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_organization_due_diligence',
	}, { manual: true });

	const getOrganizationDueDiligence = async () => {
		try {
			await trigger({
				params: {
					organization_id: 'd7a6df4b-a229-4e4b-b1db-a64eaf763597',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getOrganizationDueDiligence();
		// put a id check
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	console.log(data);
	return {
		data,
		loading,
		getOrganizationDueDiligence,
	};
}

export default useGetOrganizationDueDiligence;
